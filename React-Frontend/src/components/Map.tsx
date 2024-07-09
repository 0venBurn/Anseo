import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMapInit } from '../hooks/useMapInit';
import { useAddMapLayers } from '../hooks/useAddMapLayers';
import '../index.css';

interface PredictionResponse {
  predictions: { [zipcode: string]: number };
}

interface MapProps {
  selectedBoroughs: string[];
  predictions: PredictionResponse | null;
}

const Map: React.FC<MapProps> = ({ selectedBoroughs, predictions }) => {
  const { mapRef, map } = useMapInit(40.7075272168033, -74.00663048205502, 10);

  useAddMapLayers(map, selectedBoroughs, predictions);

  return <div ref={mapRef} className="map w-full h-full md:h-screen" />;
};

export default Map;
