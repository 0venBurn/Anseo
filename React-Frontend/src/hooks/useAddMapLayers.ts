import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

interface PredictionResponse {
  predictions: { [zipcode: string]: number };
}

interface ZipProbability {
  zipcode: string;
  probability: number;
}

export const useAddMapLayers = (
  map: mapboxgl.Map | null,
  selectedBoroughs: string[],
  predictions: PredictionResponse | null
) => {
  const zipProbabilities: ZipProbability[] = []
  useEffect(() => {
    if (predictions) {
      for (const [zipcode, probability] of Object.entries(predictions.predictions)) {
        zipProbabilities.push( {zipcode, probability})
      }
      zipProbabilities.sort((a, b) => a.probability - b.probability)
    }

    const sortedZipCodes: number[] = zipProbabilities.map((zip) => parseInt(zip.zipcode))
  
    if (map) {
      map.addSource('Layers', {
        type: 'vector',
        url: 'mapbox://tadghp.0lsjggwr'
      });

      const filter = ['in', ['get', 'borough'], ['literal', selectedBoroughs]];
      
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
            sortedZipCodes.slice(160, 180),  '#22c55e',
            '#16a34a',
          ],
          'fill-opacity': 0.5
        },
        filter
      });

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
    }
    
  }, [map, selectedBoroughs, predictions, zipProbabilities]);
};
