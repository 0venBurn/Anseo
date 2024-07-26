import React, { useEffect } from 'react';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useAddMapLayers } from '../../hooks/useAddMapLayers';
import mapboxgl from 'mapbox-gl';
import '../../index.css';
import { Listing, Neighbourhood, HighlightedLocation, Predictions } from '../../utils/types';
import { useMapInit } from '../../hooks/useMapInit';

interface MapProps {
  mapRef: React.RefObject<HTMLDivElement>;
  map: mapboxgl.Map | null;
  setMap: React.Dispatch<React.SetStateAction<mapboxgl.Map | null>>
  selectedBoroughs: string[];
  predictions: Predictions;
  listings: Listing[];
  handleSelectNeighbourhood: (location: Neighbourhood) => Promise<void>
  handleGetLocation: (name: string) => Neighbourhood
  highlightedLocation: HighlightedLocation | null;
  reRenderPolygons: boolean;
  setReRenderPolygons: (reRenderPolygons: boolean) => void;
}

const Map: React.FC<MapProps> = ({
  mapRef,
  map, 
  setMap,
  selectedBoroughs,
  predictions,
  listings,
  handleSelectNeighbourhood,
  handleGetLocation,
  highlightedLocation,
  reRenderPolygons,
  setReRenderPolygons
}) => {
  const center: [number, number] = [-74.0060, 40.7128];
  const zoom: number = 9;
  const pitch: number = 55;

  console.log(listings.length)
  useMapInit(mapRef, map, setMap, center[1], center[0], zoom, pitch);
  
  useEffect(() => {
    const fetchBoroughCoordinates = async (borough: string) => {
      try {
        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${borough}.json`, {
          params: {
            access_token: mapboxgl.accessToken,
            proximity: '-74.0060,40.7128', // New York City coordinates
            limit: 1 // Limit the results to 1 to ensure you get the closest match
          }
        });
        const coordinates = response.data.features[0].center;
        return coordinates;
      } catch (error) {
        console.error(`Error fetching coordinates for borough ${borough}:`, error);
        return null;
      }
    };

    const updateMapCenter = async () => {
      if (selectedBoroughs.length === 1 && selectedBoroughs[0] !== 'No preference') {
        const coordinates = await fetchBoroughCoordinates(selectedBoroughs[0]);
        if (coordinates) {
          map && map.flyTo({ center: coordinates, zoom: 11 });
        }
      } else {
        map && map.flyTo({ center, zoom });
      } 
    };

    updateMapCenter();
  }, [selectedBoroughs]);
  
  // Custom hook to add map layers including highlighted location
  useAddMapLayers(
    map, 
    selectedBoroughs, 
    predictions, 
    listings, 
    handleSelectNeighbourhood, 
    handleGetLocation, 
    highlightedLocation,
    reRenderPolygons,
    setReRenderPolygons,
  );

  return <div ref={mapRef} className="flex-1 min-h-[50vh] w-full" />;
};

export default Map;
