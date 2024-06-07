import { useMapInit } from "../hooks/useMapInit";
import { useGetTaxiZones } from "../hooks/useGetTaxiZones";
import { useAddMapLayers } from "../hooks/useAddMapLayers";
import "../App.css";

export const Map = () => {
    const { mapRef, map } = useMapInit(40.7075272168033, -74.00663048205502, 10);
    const { taxiZones, loading } = useGetTaxiZones(map.current, mapRef.current);
    useAddMapLayers(map.current, taxiZones, mapRef.current);


    if (loading) {
        return <div><p>Loading..</p></div>;
    }

    if (!taxiZones.length) {
        return <div><p>Taxi zones could not be found.</p></div>;
    }

    return <div ref={mapRef} className="map" style={{ width: '100%', height: '100vh' }} />;
};
