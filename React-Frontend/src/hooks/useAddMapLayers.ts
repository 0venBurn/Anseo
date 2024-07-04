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
            sortedZipCodes.slice(0, 20), '#FF0000',
            sortedZipCodes.slice(20, 40), '#FF4040',
            sortedZipCodes.slice(40, 60), '#FF8080',
            sortedZipCodes.slice(60, 80), '#FFBFBF',
            sortedZipCodes.slice(80, 100), '#FFFF00',
            sortedZipCodes.slice(100, 120), '#BFFF00',
            sortedZipCodes.slice(120, 140), '#80FF00',
            sortedZipCodes.slice(140, 160), '#40FF00',
            sortedZipCodes.slice(160, 180), '#00FF00',
            '#008000',
          ]
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
          'line-width': 1
        },
        filter
      });
    }
  }, [map, selectedBoroughs, predictions, zipProbabilities]);
};
