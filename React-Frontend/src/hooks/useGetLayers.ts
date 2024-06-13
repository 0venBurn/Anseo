import { useEffect, useState } from "react";
import { GeoJson } from "../types/GeoJson";

export const useGetLayers = () => {
    const [layers, setLayers] = useState<GeoJson | null>(null);

    useEffect(() => {
        const getLayers = async () => {
            try {
                const res = await fetch('../../nyc_neighborhoods.geojson');
                if (!res.ok) {
                    throw new Error('Neighbourhood data could not be found');
                }
                const data: GeoJson = await res.json();
                setLayers(data);
            } catch (err) {
                console.error('Error fetching neighbourhood data:', err);
            } 
        };

        getLayers();
    }, []);

    return { layers };
};
