import React, { useState } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Header from "../components/General/Header";
import "../index.css";
import { environment } from "../../mapbox.config";
import Map from "../components/MapPage/Map";
import { Listing, Neighbourhood, PredictionResponse, Rankings, Indexes, HighlightedLocation, UserResult } from "../utils/types";
import NeighbourhoodContainer from "../components/MapPage/NeighbourhoodContainer";
import useSetQuestionnaireData from "../hooks/useSetQuestionnaireData";
import useGetNeighbourhoods from "../hooks/useGetNeighbourhoods";
import useGetNeighbourhoodDetails from "../hooks/useGetNeighbourhoodDetails";
import useSetUserData from "../hooks/useSetUserData";
import LoadingPage from "./LoadingPage";

mapboxgl.accessToken = environment.mapbox.accessToken;

const MapPage: React.FC = () => {
  const [selectedBoroughs, setSelectedBoroughs] = useState<string[]>([]);
  const [predictions, setPredictions] = useState<PredictionResponse>({
    predictions: {},
  });
  const [userFavourites, setUserFavourites] = useState<Neighbourhood[]>([]);
  const [userHistory, setUserHistory] = useState<UserResult[] | null>([]);
  const [neighbourhoods, setNeighbourhoods] = useState<Neighbourhood[]>([]);
  const [selectedNeighbourhood, setSelectedNeighbourhood] =
    useState<Neighbourhood | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [isClosing, setIsClosing] = useState(false);
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [rankingsData, setRankingsData] = useState<Rankings[]>([]);
  const [highlightedLocation, setHighlightedLocation] =
    useState<HighlightedLocation | null>(null);
  const [indexData, setIndexData] = useState<Indexes[]>([]);

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
  )

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
    setIsClosing(false);
    // function for zoom in when clicked learn more
    const coordinates = await getCoordinatesByZipcode(neighbourhood.zipcode);
    console.log(coordinates);
    console.log(neighbourhood.zipcode);
    if (coordinates && mapInstance) {
      mapInstance.flyTo({ center: coordinates, zoom: 12 });
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
    if (mapInstance) {
      mapInstance.flyTo({
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
        />
        <Map 
          selectedBoroughs={selectedBoroughs}
          predictions={predictions}
          handleSelectNeighbourhood={handleLearnMore}
          handleGetLocation={handleGetLocation}
          listings={filteredListings}
          highlightedLocation={highlightedLocation}
          setMapInstance={setMapInstance}
        />
      </div>
     </>
  )
};

export default MapPage;
