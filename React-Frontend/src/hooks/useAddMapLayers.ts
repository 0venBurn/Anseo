import { useEffect, useRef } from "react";
import mapboxgl from 'mapbox-gl';
// import { TaxiZone } from "../types/TaxiZone";
import { ZipCode } from "../types/ZipCode";
import parseGeoJson from "../utils/GeoJsonParser";

export const useAddMapLayers = (map: mapboxgl.Map | null, taxiZones: ZipCode[], mapRef: HTMLDivElement | null) => {
    const layersAddedRef = useRef(false);

    useEffect(() => {
        if (map && !layersAddedRef.current) {
            const addLayers = () => {
                if (taxiZones.length > 0) {
                    taxiZones.forEach(zone => {
                        if (!map.getSource(`${zone.zipCode}`)) {
                            map.addSource(`${zone.zipCode}`, {
                                'type': 'geojson',
                                'data': {
                                    'type': 'Polygon',
                                    'coordinates': parseGeoJson(zone.geometry)
                                }
                            });
                            map.addLayer({
                                'id': `${zone.zipCode}`,
                                'type': 'fill',
                                'source': `${zone.zipCode}`,
                                'layout': {},
                                'paint': {
                                    'fill-color': '#0080ff',
                                    'fill-opacity': 0.5
                                }
                            });
                            map.addLayer({
                                'id': `Outline: ${zone.zipCode}`,
                                'type': 'line',
                                'source': `${zone.zipCode}`,
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

            if (map.isStyleLoaded()) {
                addLayers();
            } else {
                map.on('load', addLayers);
            }
        }
    }, [map, taxiZones, mapRef]);
};
