import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { h } from '@clerk/clerk-react/dist/controlComponents-CzpRUsyv';

interface PredictionResponse {
  predictions: { [zipcode: string]: number };
}

interface Listing {
  id: number;
  listingDetails: string;
  link: string;
  imageUrl: string;
  lat: string;
  lng: string;
  neighbourhoodId: number;
}

interface ZipProbability {
  zipcode: string;
  probability: number;
}

export const useAddMapLayers = (
  map: mapboxgl.Map | null,
  selectedBoroughs: string[],
  predictions: PredictionResponse | null,
  listings: Listing[],
  handleSelectNeighbourhood: (location: Location | undefined) => Promise<void>,
  handleGetLocation: (name: string) => Location | undefined
) => {
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const zipProbabilities: ZipProbability[] = []

  useEffect(() => {
    if (predictions) {
      for (const [zipcode, probability] of Object.entries(predictions.predictions)) {
        zipProbabilities.push({ zipcode, probability });
      }
      zipProbabilities.sort((a, b) => a.probability - b.probability);
    }

    const sortedZipCodes: number[] = zipProbabilities.map((zip) => parseInt(zip.zipcode));

    if (map) {
      // Check if the source already exists
      if (!map.getSource('Layers')) {
        map.addSource('Layers', {
          type: 'vector',
          url: 'mapbox://tadghp.0lsjggwr'
        });
      }

      const filter = ['in', ['get', 'borough'], ['literal', selectedBoroughs]];

      // Check if the LayersFill layer already exists
      if (!map.getLayer('LayersFill')) {
        map.addLayer({
          id: 'LayersFill',
          type: 'fill',
          source: 'Layers',
          'source-layer': 'neighbourhoods',
          layout: {},
          paint: {
            'fill-color': [
              'match',
              ['get', 'zipcode'],
              sortedZipCodes.slice(0, 20), '#e11d48',
              sortedZipCodes.slice(20, 40), '#f43f5e',
              sortedZipCodes.slice(40, 60), '#fb7185',
              sortedZipCodes.slice(60, 80), '#fda4af',
              sortedZipCodes.slice(80, 100), '#fecdd3',
              sortedZipCodes.slice(100, 120), '#bbf7d0',
              sortedZipCodes.slice(120, 140), '#86efac',
              sortedZipCodes.slice(140, 160), '#4ade80',
              sortedZipCodes.slice(160, 180), '#22c55e',
              '#16a34a',
            ],
            'fill-opacity': 0.5
          },
          filter
        });
      } else {
        map.setFilter('LayersFill', filter);
      }

      // Check if the LayersOutline layer already exists
      if (!map.getLayer('LayersOutline')) {
        map.addLayer({
          id: 'LayersOutline',
          type: 'line',
          source: 'Layers',
          'source-layer': 'neighbourhoods',
          layout: {},
          paint: {
            'line-color': '#000',
            'line-opacity': 0.1,
            'line-width': 0.25
          },
          filter
        });
      } else {
        map.setFilter('LayersOutline', filter);
      }

      map.on('click', 'LayersFill', (e) => {
        const neighbourhood = e.features && e.features[0].properties?.neighbourhood;

        const location = handleGetLocation(neighbourhood);

        handleSelectNeighbourhood(location);
      });


      map.on('mouseenter', 'neighbourhoods', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', 'LayersFill', () => {
        map.getCanvas().style.cursor = '';
      });

      // Remove existing markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];

      // Add new markers only if listings are present
      if (listings.length > 0) {
        listings.forEach((listing) => {
          const marker = new mapboxgl.Marker()
            .setLngLat([parseFloat(listing.lng), parseFloat(listing.lat)])
            .addTo(map);
          markersRef.current.push(marker);
        });
      }
    }
  }, [map, selectedBoroughs, predictions, listings]);
};
