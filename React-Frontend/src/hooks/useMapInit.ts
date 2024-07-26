import { useEffect } from "react";
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API;

export const useMapInit = (
    mapRef:  React.RefObject<HTMLDivElement>,
    map: mapboxgl.Map | null,
    setMap: (map: mapboxgl.Map) => void,
    lat: number, 
    lng: number, 
    zoom: number,
    pitch: number,
) => {    
    useEffect(() => {
        if (mapRef.current && !map) {
            const mapInstance = new mapboxgl.Map({
                container: mapRef.current,
                center: [lng, lat],
                zoom,
                pitch,
                pitchWithRotate: false,
                style: 'mapbox://styles/tadghp/clxbpfz0f025901pce9n78onm/draft',
            }); 

            mapInstance.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

            mapInstance.on('load', () => {
                if (!mapInstance.getSource('Layers')) {
                    console.log("adding source")
                    mapInstance.addSource('Layers', {
                      type: 'vector',
                      url: 'mapbox://tadghp.0lsjggwr'
                    });
                  }
                setMap(mapInstance);
            })        
    }  
    }, []);    
};