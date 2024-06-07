import { useEffect, useState } from "react";
import { TaxiZone } from "../types/TaxiZone";

export const useGetTaxiZones = (map: mapboxgl.Map | null, mapRef: HTMLDivElement | null) => {
    const [taxiZones, setTaxiZones] = useState<TaxiZone[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTaxiZones = async () => {
            try {
                const res = await fetch('http://localhost:8080/api/taxiZones/all');
                if (!res.ok) {
                    throw new Error('Taxi zones could not be found');
                }
                const data: TaxiZone[] = await res.json();
                setTaxiZones(data);
            } catch (err) {
                console.error('Error fetching taxi data:', err);
            } finally {
                setLoading(false);
            }
        };

        getTaxiZones();
    }, [mapRef]);

    return { taxiZones, loading };
};
