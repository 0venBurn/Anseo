import { useEffect, useRef, useState } from "react";
import mapboxgl from 'mapbox-gl';
import { environment } from '../../mapbox.config';

mapboxgl.accessToken = environment.mapbox.accessToken

export const useMapInit = (lat: number, lng: number, zoom: number) => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const [map, setMap] = useState<mapboxgl.Map | null>(null);
    
    useEffect(() => {
        if (mapRef.current && !map) {
            let mapInstance: mapboxgl.Map | null = null;

            mapInstance = new mapboxgl.Map({
                container: mapRef.current,
                center: [lng, lat],
                zoom,
                pitchWithRotate: false,
                style: 'mapbox://styles/tadghp/clxbpfz0f025901pce9n78onm/draft',
            }); 

            mapInstance.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

            mapInstance.on('load', () => {
                setMap(mapInstance);
            })
            
            return () => {
                if (mapInstance) {
                    mapInstance.remove();
                }
                if (map) {
                    (map as mapboxgl.Map).remove();
                }
            };
            }  
    }, [lat, lng, zoom]);
    
    return { mapRef, map };
};