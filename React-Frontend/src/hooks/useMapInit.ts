import { useEffect, useRef } from "react";
import mapboxgl from 'mapbox-gl';
import { environment } from '../../mapbox.config';

mapboxgl.accessToken = environment.mapbox.accessToken

export const useMapInit = (lat: number, lng: number, zoom: number) => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    
    useEffect(() => {
        if (mapRef.current && !map.current) {
            map.current = new mapboxgl.Map({
                container: mapRef.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [lng, lat],
                zoom,
                pitchWithRotate: false,
            });

            map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
        }

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, []);
    
    return { mapRef, map };
};
