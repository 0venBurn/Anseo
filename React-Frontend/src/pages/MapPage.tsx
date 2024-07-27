import React, { useState, useRef } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Header from "../components/General/Header";
import "../index.css";
import Map from "../components/MapPage/Map";
import { Listing, Neighbourhood, Predictions, Indexes, HighlightedLocation, UserHistory } from "../utils/types";
import NeighbourhoodContainer from "../components/MapPage/NeighbourhoodContainer";
import useSetQuestionnaireData from "../hooks/useSetQuestionnaireData";
import useGetNeighbourhoods from "../hooks/useGetNeighbourhoods";
import useGetNeighbourhoodDetails from "../hooks/useGetNeighbourhoodDetails";
import useSetUserData from "../hooks/useSetUserData";
import Loading from "../components/MapPage/Loading";
import { useQuestionnaire } from "../context/QuestionnaireProvider";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API;

const MapPage: React.FC = () => {
  const { isQuestionnaireCompleted, setQuestionnaireDefault } = useQuestionnaire();

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
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [isClosing, setIsClosing] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [highlightedLocation, setHighlightedLocation] =
    useState<HighlightedLocation | null>(null);
  const [indexData, setIndexData] = useState<Indexes[]>([]);
  const [reRenderPolygons, setReRenderPolygons] = useState(false);
  const [activeBtn, setActiveBtn] = useState<string | null>('Results');

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
  )

  useSetUserData(
    isPageLoaded,
    setIsPageLoaded, 
    setUserFavourites,
    setUserHistory,
    neighbourhoods,
    predictions,
    selectedBoroughs
  )

  const handleReRenderPolygons = (selectedBoroughs: string[], predictions: Predictions) => {
    if (isQuestionnaireCompleted()) {
      setQuestionnaireDefault();
    }
    setReRenderPolygons(true);
    setSelectedBoroughs(selectedBoroughs);
    setPredictions(predictions)
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
      setActiveBtn('')
      const neighbourhoodListings = listings.filter(listing => listing.neighbourhoodId === neighbourhood.neighbourhood_id)
      setFilteredListings(neighbourhoodListings)
      setIsClosing(false);
      // function for zoom in when clicked learn more
      console.log(neighbourhood)
      console.log(neighbourhood.zipcode)
      const coordinates = await getCoordinatesByZipcode(neighbourhood.zipcode);
      console.log(map)  
      if (coordinates && map) {
        map && map.flyTo({ center: coordinates as [number, number], zoom: 12 });
    }
  };

  const handleListingClick = (listing: Listing) => {
    console.log(listing)
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
    setSelectedNeighbourhood(null);
    setFilteredListings([]);
    setActiveBtn('Results')
    setTimeout(() => setHighlightedLocation(null), 500);
    setTimeout(() => setSelectedNeighbourhood(null), 500);
  };
  
  const filteredIndexes = selectedNeighbourhood
    ? indexData.find(
        (index) =>
          index.neighbourhood_id === selectedNeighbourhood.neighbourhood_id,
      )
    : undefined;
  
  if (!isPageLoaded) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <div className="flex flex-col-reverse lg:flex-row h-[calc(100vh-5rem)]">
        <NeighbourhoodContainer 
          activeBtn={activeBtn}
          setActiveBtn={setActiveBtn}
          setSelectedNeighbourhood={setSelectedNeighbourhood}
          neighbourhoods={neighbourhoods}
          handleLearnMore={handleLearnMore}
          selectedNeighbourhood={selectedNeighbourhood}
          filteredListings={filteredListings} 
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
          filteredListings={filteredListings}
          highlightedLocation={highlightedLocation}
          reRenderPolygons={reRenderPolygons}
          setReRenderPolygons={setReRenderPolygons}
        />
      </div>
     </>
  )
};

export default MapPage;
