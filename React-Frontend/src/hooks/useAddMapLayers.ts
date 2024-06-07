import { useEffect, useRef } from "react";
import mapboxgl from 'mapbox-gl';
import { TaxiZone } from "../types/TaxiZone";
import parseGeoJson from "../utils/GeoJsonParser";

export const useAddMapLayers = (map: mapboxgl.Map | null, taxiZones: TaxiZone[], mapRef: HTMLDivElement | null) => {
    const layersAddedRef = useRef(false);

    useEffect(() => {
        if (map && !layersAddedRef.current) {
            const addLayers = () => {
                if (taxiZones.length > 0) {
                    taxiZones.forEach(zone => {
                        if (!map.getSource(`${zone.zoneId}`)) {
                            map.addSource(`${zone.zoneId}`, {
                                'type': 'geojson',
                                'data': {
                                    'type': 'Polygon',
                                    'coordinates': parseGeoJson(zone.polygonCoords)
                                }
                            });
                            map.addLayer({
                                'id': `${zone.zoneId}`,
                                'type': 'fill',
                                'source': `${zone.zoneId}`,
                                'layout': {},
                                'paint': {
                                    'fill-color': '#0080ff',
                                    'fill-opacity': 0.5
                                }
                            });
                            map.addLayer({
                                'id': `Outline: ${zone.zoneId}`,
                                'type': 'line',
                                'source': `${zone.zoneId}`,
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
