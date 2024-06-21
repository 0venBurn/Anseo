import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

interface PredictionResponse {
  predictions: { [zipcode: string]: number };
}

const getColorForProbability = (probability: number): string => {
  if (probability > 0.9) return '#ff0000'; // 90%-100% red
  if (probability > 0.8) return '#ff8000'; // 80%-90% orange
  if (probability > 0.7) return '#ffff00'; // 70%-80% yellow
  if (probability > 0.6) return '#80ff00'; // 60%-70% yellow green 
  if (probability > 0.5) return '#00ff00'; // 50%-60% green
  if (probability > 0.4) return '#00ff80'; // 40%-50% light green
  if (probability > 0.3) return '#00ffff'; // 30%-40% blue green
  if (probability > 0.2) return '#0080ff'; // 20%-30% blue
  if (probability > 0.1) return '#0000ff'; // 10%-20% dark blue
  return '#8000ff'; // 0%-10% purple
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
          'line-width': 0.5
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
                ['==', 'zipcode', zipcode],
                // Build style syntax similar to Mapbox GL JS, 
                // used to specify matching rules for conditional filters or style attributes
                getColorForProbability(predictions.predictions[zipcode])
                
              ]),
              '#ffffff' // default color
            ],
            'fill-opacity': 1
          }
        });
      }
    }
  }, [map, selectedBoroughs, predictions]);
};
