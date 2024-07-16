import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMapInit } from "../hooks/useMapInit";
import { useAddMapLayers } from "../hooks/useAddMapLayers";
import "../index.css";
import { Listing, Neighbourhood } from "../MapPage";

interface PredictionResponse {
  predictions: { [zipcode: string]: number };
}

interface MapProps {
  selectedBoroughs: string[];
  predictions: PredictionResponse | null;
  listings: Listing[];
  handleSelectNeighbourhood: (neighbourhood: Neighbourhood) => Promise<void>
  handleGetLocation: (name: string) => Neighbourhood 
  // onMapLoad: React.Dispatch<React.SetStateAction<mapboxgl.Map | null>>;
}

const Map: React.FC<MapProps> = ({ selectedBoroughs, predictions, listings, handleSelectNeighbourhood, handleGetLocation}) => {
  const { mapRef, map } = useMapInit(40.7075272168033, -74.00663048205502, 10);

  useAddMapLayers(map, selectedBoroughs, predictions , listings, handleSelectNeighbourhood, handleGetLocation);

  return <div ref={mapRef} className="map w-full h-full md:h-screen" />;
};

export default Map;
