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
        let mapInstance: mapboxgl.Map | null = null;
        if (mapRef.current && !map) {
            mapInstance = new mapboxgl.Map({
                container: mapRef.current,
                center: [lng, lat],
                zoom,
                pitch,
                pitchWithRotate: false,
                style: 'mapbox://styles/tadghp/clz5dccnk00og01r2gejp9qto',
            }); 

            mapInstance.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

            mapInstance.on('load', () => {
                if (mapInstance) {
                    if (!mapInstance.getSource('Layers')) {
                        console.log("adding source")
                    mapInstance.addSource('Layers', {
                      type: 'vector',
                      url: 'mapbox://tadghp.0lsjggwr'
                    });
                  }
                setMap(mapInstance);
            }
            })        
    }  
    return () => {
        if (mapInstance) {
          mapInstance.remove(); // Clean up on component unmount
          mapInstance = null;
        }
      };
    }, []);    
};