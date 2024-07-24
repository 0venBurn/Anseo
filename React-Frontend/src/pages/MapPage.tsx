import React, { useState, useRef } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Header from "../components/General/Header";
import "../index.css";
import Map from "../components/MapPage/Map";
import { Listing, Neighbourhood, Predictions, Rankings, Indexes, HighlightedLocation, UserHistory } from "../utils/types";
import NeighbourhoodContainer from "../components/MapPage/NeighbourhoodContainer";
import useSetQuestionnaireData from "../hooks/useSetQuestionnaireData";
import useGetNeighbourhoods from "../hooks/useGetNeighbourhoods";
import useGetNeighbourhoodDetails from "../hooks/useGetNeighbourhoodDetails";
import useSetUserData from "../hooks/useSetUserData";
import LoadingPage from "./LoadingPage";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API;

const MapPage: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [selectedBoroughs, setSelectedBoroughs] = useState<string[]>([]);
  const [predictions, setPredictions] = useState<Predictions>({});
  const [userFavourites, setUserFavourites] = useState<Neighbourhood[]>([]);
  const [userHistory, setUserHistory] = useState<UserHistory[] | null>([]);
  const [neighbourhoods, setNeighbourhoods] = useState<Neighbourhood[]>([]);
  const [selectedNeighbourhood, setSelectedNeighbourhood] =
    useState<Neighbourhood | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [isClosing, setIsClosing] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [rankingsData, setRankingsData] = useState<Rankings[]>([]);
  const [highlightedLocation, setHighlightedLocation] =
    useState<HighlightedLocation | null>(null);
  const [indexData, setIndexData] = useState<Indexes[]>([]);
  const [reRenderPolygons, setReRenderPolygons] = useState(false);

  useSetQuestionnaireData(
    setPredictions, 
    setSelectedBoroughs,
  )
  
  useGetNeighbourhoods(
    predictions,
    selectedBoroughs,
    setNeighbourhoods
  )

  useGetNeighbourhoodDetails(
    setIndexData,
    setListings,
    setRankingsData,
  )

  useSetUserData(
    setIsPageLoaded, 
    setUserFavourites,
    setUserHistory,
    neighbourhoods,
    predictions,
    selectedBoroughs
  )

  const handleReRenderPolygons = (selectedBoroughs: string[], predictions: Predictions) => {
    setReRenderPolygons(true);
    setSelectedBoroughs(selectedBoroughs);
    setPredictions(predictions)
    setMap(null)
  }
  // function to convert zipcode to lat and lng
  const getCoordinatesByZipcode = async (zipcode: string) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${zipcode}.json`,
        {
          params: {
            access_token: mapboxgl.accessToken,
            proximity: "-74.0060,40.7128", // New York City coordinates
            limit: 1, // Limit the results to 1 to ensure you get the closest match
          },
        },
      );
      const coordinates = response.data.features[0].center;
      return coordinates;
    } catch (error) {
      console.error(
        `Error fetching coordinates for zipcode ${zipcode}:`,
        error,
      );
      return null;
    }
  };

  const handleLearnMore = async (neighbourhood: Neighbourhood) => {
    setSelectedNeighbourhood(neighbourhood);
    console.log(neighbourhood)
    setIsClosing(false);
    // function for zoom in when clicked learn more
    const coordinates = await getCoordinatesByZipcode(neighbourhood.zipcode);
    if (coordinates && map) {
      map.flyTo({ center: coordinates, zoom: 12 });
    }
  };

  const handleGetLocation = (name: string): Neighbourhood => {
    return neighbourhoods.find((neighbourhood) => neighbourhood.name === name)!;
  };

  const handleListingClick = (listing: Listing) => {
    setHighlightedLocation({
      lat: parseFloat(listing.lat),
      lng: parseFloat(listing.lng),
    });
    if (map) {
      map.flyTo({
        center: [parseFloat(listing.lng), parseFloat(listing.lat)],
        zoom: 14,
      });
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => setHighlightedLocation(null), 500);
    setTimeout(() => setSelectedNeighbourhood(null), 500);
  };

  const filteredListings = selectedNeighbourhood
    ? listings.filter(
        (listing) =>
          listing.neighbourhoodId === selectedNeighbourhood.neighbourhood_id,
      )
    : [];

  const filteredRankings = selectedNeighbourhood
    ? rankingsData.find(
        (ranking) =>
          ranking.neighbourhood_id === selectedNeighbourhood.neighbourhood_id,
      )
    : undefined;
  
  const filteredIndexes = selectedNeighbourhood
    ? indexData.find(
        (index) =>
          index.neighbourhood_id === selectedNeighbourhood.neighbourhood_id,
      )
    : undefined;
  
  if (!isPageLoaded) {
    return <LoadingPage />;
  }

  return (
    <>
      <Header />
      <div className="flex flex-col-reverse lg:flex-row h-[calc(100vh-5rem)]">
        <NeighbourhoodContainer 
          neighbourhoods={neighbourhoods}
          handleLearnMore={handleLearnMore}
          selectedNeighbourhood={selectedNeighbourhood}
          filteredListings={filteredListings} 
          filteredRankings={filteredRankings}
          filteredIndexes={filteredIndexes}
          isClosing={isClosing}
          handleClose={handleClose}
          handleListingClick={handleListingClick}
          userFavourites={userFavourites}
          setUserFavourites={setUserFavourites}
          userHistory={userHistory}
          handleReRenderPolygons={handleReRenderPolygons}
        />
        <Map 
          mapRef={mapRef}
          map={map}
          setMap={setMap}
          selectedBoroughs={selectedBoroughs}
          predictions={predictions}
          handleSelectNeighbourhood={handleLearnMore}
          handleGetLocation={handleGetLocation}
          listings={filteredListings}
          highlightedLocation={highlightedLocation}
          reRenderPolygons={reRenderPolygons}
          setReRenderPolygons={setReRenderPolygons}
        />
      </div>
     </>
  )
};

export default MapPage;
