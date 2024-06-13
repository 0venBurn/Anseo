import { useEffect, useRef } from "react";
import mapboxgl from 'mapbox-gl';
import { useGetLayers } from "./useGetLayers";
import { GeoJson } from "../types/GeoJson";

export const useAddMapLayers = (map: mapboxgl.Map | null) => {
    const { layers } = useGetLayers();
    const layersAddedRef = useRef(false);

    useEffect(() => {
        if (map && layers && !layersAddedRef.current) {
            const addLayers = () => {
                if (layers.features.length > 0) {
                    if (!map.getSource("Layers")) {
                        map.addSource("Layers", {
                            'type': 'geojson',
                            'data': layers as any
                        });

                        map.addLayer({
                            'id': "LayersFill",
                            'type': 'fill',
                            'source': "Layers",
                            'layout': {},
                            'paint': {
                                'fill-color': '#0080ff',
                                'fill-opacity': 0.5
                            }
                        });

                        map.addLayer({
                            'id': "LayersOutline",
                            'type': 'line',
                            'source': "Layers",
                            'layout': {},
                            'paint': {
                                'line-color': '#000',
                                'line-width': 0.5
                            }
                        });
                    }
                }
                layersAddedRef.current = true;
            };

            if (map.isStyleLoaded()) {
                addLayers();
            } else {
                map.on('load', addLayers);
            }
        }
    }, [map, layers]);
};
