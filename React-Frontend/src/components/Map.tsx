import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMapInit } from "../hooks/useMapInit";
import { useAddMapLayers } from "../hooks/useAddMapLayers";
import "../index.css";
import { Listing } from "../MapPage";

interface PredictionResponse {
  predictions: { [zipcode: string]: number };
}

interface MapProps {
  selectedBoroughs: string[];
  predictions: PredictionResponse | null;
  listings: Listing[];
  // onMapLoad: React.Dispatch<React.SetStateAction<mapboxgl.Map | null>>;
}

const Map: React.FC<MapProps> = ({ selectedBoroughs, predictions, listings}) => {
  const { mapRef, map } = useMapInit(40.7075272168033, -74.00663048205502, 10);

  useAddMapLayers(map, selectedBoroughs, predictions , listings);

  return <div ref={mapRef} className="map w-full h-full md:h-screen" />;
};

export default Map;
