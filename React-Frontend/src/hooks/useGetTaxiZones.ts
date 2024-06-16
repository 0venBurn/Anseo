import { useEffect, useState } from "react";
import { Zone } from "../types/GeoJson";

export const useGetTaxiZones = (map: mapboxgl.Map | null, mapRef: HTMLDivElement | null) => {
    const [taxiZones, setTaxiZones] = useState<Zone[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTaxiZones = async () => {
            try {
                const res = await fetch('../../nycGeo.json');
                if (!res.ok) {
                    throw new Error('Zip codes could not be found');
                }
                const data = await res.json();
                setTaxiZones(data.features);
            } catch (err) {
                console.error('Error fetching zip codes:', err);
            } finally {
                setLoading(false);
            }
        };

        getTaxiZones();
    }, [mapRef]);

    return { taxiZones, loading };
};
