import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

interface PredictionResponse {
  predictions: { [zipcode: string]: number };
}

//  From green(low) to red (high)
const getColorForProbability = (probability: number): string => {
  const g = Math.floor(255 * probability);
  const r = Math.floor(255 * (1 - probability));
  return `rgb(${r},${g},0)`;
};

export const useAddMapLayers = (
  map: mapboxgl.Map | null,
  selectedBoroughs: string[],
  predictions: PredictionResponse | null
) => {
  useEffect(() => {
    if (map) {
      map.addSource('Layers', {
        type: 'vector',
        url: 'mapbox://zikangwang.8dqtmqya'
      });

      const filter = ['in', ['get', 'borough'], ['literal', selectedBoroughs]];

      map.addLayer({
        id: 'LayersFill',
        type: 'fill',
        source: 'Layers',
        'source-layer': 'neighbourhoods',
        layout: {},
        paint: {
          'fill-color': '#0080ff',
          'fill-opacity': 0
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

      if (predictions) {
        map.addLayer({
          id: 'LayersZipCodeFill',
          type: 'fill',
          source: 'Layers',
          'source-layer': 'neighbourhoods',
          layout: {},
          paint: {
            'fill-color': [
              'case',
              ...Object.keys(predictions.predictions).flatMap((zipcode) => [
                // Convert the predictions. predictions object into an array containing key value pairs. 
                // Each key value pair represents a postal code and its corresponding probability value
                ['==', ['to-string', ['get', 'zipcode']], zipcode],
                // Build style syntax similar to Mapbox GL JS, 
                // used to specify matching rules for conditional filters or style attributes
                getColorForProbability(predictions.predictions[zipcode])
                
              ]),
              '#ffffff' // default color white
            ],
            'fill-opacity': 0.5
          }
        });
      }
    }
  }, [map, selectedBoroughs, predictions]);
};
