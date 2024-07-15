import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMapInit } from '../hooks/useMapInit';
import { useAddMapLayers } from '../hooks/useAddMapLayers';
import mapboxgl from 'mapbox-gl';
import '../index.css';
import { Listing } from '../MapPage';

interface PredictionResponse {
  predictions: { [zipcode: string]: number };
}

interface HighlightedLocation {
  lat: number;
  lng: number;
}

interface MapProps {
  selectedBoroughs: string[];
  predictions: PredictionResponse | null;
  listings: Listing[];
  handleSelectNeighbourhood: (location: Location | undefined) => Promise<void>;
  handleGetLocation: (name: string) => Location | undefined;
  highlightedLocation: HighlightedLocation | null;
  setMapInstance: (map: mapboxgl.Map | null) => void;
}

const Map: React.FC<MapProps> = ({
  selectedBoroughs,
  predictions,
  listings,
  handleSelectNeighbourhood,
  handleGetLocation,
  highlightedLocation,
  setMapInstance
}) => {
  const defaultCenter: [number, number] = [-74.0060, 40.7128];
  const defaultZoom: number = 9;

  const [center, setCenter] = useState<[number, number]>(defaultCenter);
  const [zoom, setZoom] = useState<number>(defaultZoom);

  useEffect(() => {
    const fetchBoroughCoordinates = async (borough: string) => {
      try {
        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${borough}.json?access_token=${mapboxgl.accessToken}`);
        const coordinates = response.data.features[0].center;
        return coordinates;
      } catch (error) {
        console.error(`Error fetching coordinates for borough ${borough}:`, error);
        return null;
      }
    };

    const updateMapCenter = async () => {
      if (selectedBoroughs.length === 1) {
        const coordinates = await fetchBoroughCoordinates(selectedBoroughs[0]);
        if (coordinates) {
          setCenter(coordinates);
          setZoom(11);
        }
      } else {
        setCenter(defaultCenter);
        setZoom(defaultZoom);
      }
    };

    updateMapCenter();
  }, [selectedBoroughs]);

  const { mapRef, map } = useMapInit(center[1], center[0], zoom);

  useEffect(() => {
    if (map) {
      setMapInstance(map);
    }
  }, [map]);

  // Custom hook to add map layers including highlighted location
  useAddMapLayers(map, selectedBoroughs, predictions, listings, handleSelectNeighbourhood, handleGetLocation, highlightedLocation);

  return <div ref={mapRef} className="map w-full h-full md:h-screen" />;
};

export default Map;
