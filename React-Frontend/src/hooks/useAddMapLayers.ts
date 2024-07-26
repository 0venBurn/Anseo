import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Listing, HighlightedLocation, Predictions, ZipProbability } from '../utils/types'

export const useAddMapLayers = (
  map: mapboxgl.Map | null,
  selectedBoroughs: string[],
  predictions: Predictions,
  filteredListings: Listing[],
  highlightedLocation: HighlightedLocation | null,
  reRenderPolygons: boolean,
  setReRenderPolygons: (reRenderPolygons: boolean) => void
) => {
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const highlightMarkerRef = useRef<mapboxgl.Marker | null>(null);

  const zipProbabilities: ZipProbability[] = [];
  if (selectedBoroughs.length > 0 && predictions) {
    for (const [zipcode, probability] of Object.entries(predictions)) {
      zipProbabilities.push({ zipcode, probability });
    }
    zipProbabilities.sort((a, b) => a.probability - b.probability);
  }

  const sortedZipCodes: number[] = zipProbabilities.map((zip) => parseInt(zip.zipcode));

  useEffect(() => {
    console.log(filteredListings.length)
    console.log(map, selectedBoroughs.length > 0, Object.keys(predictions).length > 0, filteredListings.length)
    if (map && selectedBoroughs.length > 0 && Object.keys(predictions).length > 0) {
      // Add or update LayersFill
    const filter = selectedBoroughs.includes('No preference')
    ? ['in', ['get', 'borough'], ['literal', ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island']]]
      : ['in', ['get', 'borough'], ['literal', selectedBoroughs]];

    console.log("filter", filter)
    console.log(reRenderPolygons)
    if (reRenderPolygons) {
      console.log(map.getLayer('LayersFill'), map.getLayer('LayersOutline'), map.getSource('Layers'))
      map.getLayer('LayersFill') && map.removeLayer('LayersFill');
      map.getLayer('LayersOutline') && map.removeLayer('LayersOutline');
      setReRenderPolygons(false)
    }
    
    if (!map.getLayer('LayersFill')) {
      console.log('adding layer')
      console.log(filter)
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
    
    // Add or update LayersOutline
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
    
    
    // Handle markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    
    if (filteredListings.length > 0) {
      filteredListings.forEach((filteredListing) => {
        const marker = new mapboxgl.Marker()
        .setLngLat([parseFloat(filteredListing.lng), parseFloat(filteredListing.lat)])
        .addTo(map);
        markersRef.current.push(marker);
      });
    }
    
    // Handle highlighted location marker
    if (highlightedLocation) {
      if (highlightMarkerRef.current) {
        highlightMarkerRef.current.remove();
      }
      
      const { lat, lng } = highlightedLocation;
      const highlightMarker = new mapboxgl.Marker({ color: 'red' })
      .setLngLat([lng, lat])
      .addTo(map);
      
      highlightMarkerRef.current = highlightMarker;
    }
    
    // Cleanup
    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      
      if (highlightMarkerRef.current) {
        highlightMarkerRef.current.remove();
        highlightMarkerRef.current = null;
      }
    };
  } 
  }, [map, selectedBoroughs, predictions, filteredListings, highlightedLocation, reRenderPolygons]);
};
