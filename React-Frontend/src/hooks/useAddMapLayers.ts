import { useEffect } from "react";
import mapboxgl from "mapbox-gl";

export const useAddMapLayers = (map: mapboxgl.Map | null) => {
  useEffect(() => {
    if (map) {
      map.addSource("Layers", {
        type: "vector",
        url: "mapbox://tadghp.7vbqyjvf",
      });

      map.addLayer({
        id: "LayersFill",
        type: "fill",
        source: "Layers",
        "source-layer": "NeighborhoodsBoundries",
        layout: {},
        paint: {
          "fill-color": "#0080ff",
          "fill-opacity": 0.5,
        },
        filter: ["==", ["get", "boroname"], "Brooklyn"],
      });

      map.addLayer({
        id: "LayersOutline",
        type: "line",
        source: "Layers",
        "source-layer": "NeighborhoodsBoundries",
        layout: {},
        paint: {
          "line-color": "#000",
          "line-width": 0.5,
        },
        filter: ["==", ["get", "boroname"], "Brooklyn"],
      });
    }
  }, [map]);
};
