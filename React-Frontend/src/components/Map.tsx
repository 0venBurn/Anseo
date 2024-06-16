import { useMapInit } from "../hooks/useMapInit";
import { useAddMapLayers } from "../hooks/useAddMapLayers";
import "../index.css";

export const Map = () => {
  const { mapRef, map } = useMapInit(40.7075272168033, -74.00663048205502, 10);
  useAddMapLayers(map);

  return (
    <div
      ref={mapRef}
      className="map"
      style={{ width: "100%", height: "100vh" }}
    />
  );
};
