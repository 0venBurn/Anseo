import { useEffect, useRef } from "react";
import mapboxgl from 'mapbox-gl';
import { Zone } from "../types/GeoJson";

export const useAddMapLayers = (map: mapboxgl.Map | null, taxiZones: Zone[], mapRef: HTMLDivElement | null) => {
    const layersAddedRef = useRef(false)

    useEffect(() => {
        if (map && !layersAddedRef.current) {
            const addLayers = () => {
                if (taxiZones.length > 0) {
                    taxiZones.forEach(zone => {
                        if (!map.getSource(`${zone.properties.zip_code}`)) {
                            map.addSource(`${zone.properties.zip_code}`, {
                                'type': 'geojson',
                                'data': {
                                    'type': 'Polygon',
                                    'coordinates': zone.geometry.coordinates
                                }
                            });
                            map.addLayer({
                                'id': `${zone.properties.zip_code}`,
                                'type': 'fill',
                                'source': `${zone.properties.zip_code}`,
                                'layout': {},
                                'paint': {
                                    'fill-color': '#0080ff',
                                    'fill-opacity': 0.5
                                }
                            });
                            map.addLayer({
                                'id': `Outline: ${zone.properties.zip_code}`,
                                'type': 'line',
                                'source': `${zone.properties.zip_code}`,
                                'layout': {},
                                'paint': {
                                    'line-color': '#000',
                                    'line-width': 0.5
                                }
                            });
                        }
                    });
                } 
                layersAddedRef.current = true;
            };

            addLayers()

            // if (map.isStyleLoaded()) {
            //     addLayers()
            // } else {
            //     map.on('load', addLayers)
            // }
        }
    }, [map, taxiZones, mapRef]);
};
