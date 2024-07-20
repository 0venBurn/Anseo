import React, { useState, useEffect } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useNavigate } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";
import Header from "../components/General/Header";
import "../index.css";
import { environment } from "../../mapbox.config";
import Map from "../components/MapPage/Map";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useQuestionnaire } from "../context/QuestionnaireProvider";
import { Listing, Neighbourhood, PredictionResponse, Rankings, Indexes, HighlightedLocation } from "../types";
import NeighbourhoodContainer from "../components/MapPage/NeighbourhoodContainer";

mapboxgl.accessToken = environment.mapbox.accessToken;

const MapPage: React.FC = () => {
  const fastURL = import.meta.env.VITE_FAST_URL;
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const { data, isQuestionnaireCompleted, setQuestionnaireDefault } = useQuestionnaire();
  const [selectedBoroughs, setSelectedBoroughs] = useState<string[]>([]);
  const [predictions, setPredictions] = useState<PredictionResponse>({
    predictions: {},
  });
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  useEffect(() => {
    console.log("selected boroughs:", selectedBoroughs);
    const fetchPredictions = async () => {
      if (!isLoaded) {
        return;
      }
      if (isLoaded) {
        console.log("Clerk has finished loading");
        setIsPageLoaded(true);
      }
      try {
        let payload;
        console.log(isSignedIn);
        if (isQuestionnaireCompleted()) {
          setSelectedBoroughs(data.selectedBoroughs);
          payload = { data };
          console.log(payload);
        }

        // continue as guest
        if (!isSignedIn && isQuestionnaireCompleted()) {
          console.log("test: continue as guest");
          const response = await fetch(`${fastURL}/api/v1/predict`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error("API response from ML Model was not ok.");
          }
          const predictions = await response.json();
          setPredictions(predictions);
          setQuestionnaireDefault();
          return;
        }

        // signed in and completed questionnaire
        if (isSignedIn && isQuestionnaireCompleted()) {
          console.log("test: signed in and completed questionnaire");
          const mlResponse = await fetch(`${fastURL}/api/v1/predict`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          const dbResponse = await fetch(
            `${backendURL}/api/v1/user-results/${user && user.id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                clerkUserId: user && user.id,
                results: payload,
              }),
            },
          );

          if (!mlResponse.ok) {
            throw new Error("API response from ML Model was not ok.");
          }

          if (!dbResponse.ok) {
            throw new Error("API response from DB was not ok. " + dbResponse);
          }

          const predictions = await mlResponse.json();
          setPredictions(predictions);
          setQuestionnaireDefault();
          return;
        }

        // signed in and questionnaire not completed
        if (isSignedIn && !isQuestionnaireCompleted()) {
          console.log("test: signed in and questionnaire not completed");
          const dbResponse = await fetch(
            `${backendURL}/api/v1/user-results/${user && user.id}`,
          );

          const data = await dbResponse.json();

          console.log(data);
          console.log(data.results[0].results);

          // If user has no saved results in the database, redirect to welcome page
          if (data.results.length === 0) {
            navigate("/welcome");
            throw new Error(`Couldn't find user results in database: ${user}`);
          }

          const mlResponse = await fetch(`${fastURL}/api/v1/predict`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data.results[0].results),
          });

          if (!mlResponse.ok) {
            throw new Error("API response from ML Model was not ok.");
          } else {
            console.log("ML response was ok");
          }

          const predictions = await mlResponse.json();
          console.log(predictions);
          setPredictions(predictions);
          setSelectedBoroughs(data.results[0].results.data.selectedBoroughs);
          return;
        }

        // not signed in and questionnaire not completed
        if (!isSignedIn && !isQuestionnaireCompleted()) {
          console.log("test: not signed in and questionnaire not completed");
          navigate("/welcome");
        }
      } catch (error) {
        console.error("Error fetching predictions:", error);
      }
    };
    fetchPredictions();
  }, [isLoaded, isSignedIn, user]);

  useEffect(() => {
    const fetchPage = async (page: number) => {
      try {
        const response = await axios.get(
          `${backendURL}/api/v1/neighbourhoods?page=${page}`,
        );
        return response.data._embedded.neighbourhoods;
      } catch (error) {
        console.error(`Error fetching page ${page}:`, error);
        return [];
      }
    };

    const fetchAllLocations = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/v1/neighbourhoods`);
        const totalPages = response.data.page.totalPages;

        // Fetch all pages concurrently
        const allLocationsPromises = [];
        for (let page = 0; page < totalPages; page++) {
          allLocationsPromises.push(fetchPage(page));
        }

        const allLocationsArray = await Promise.all(allLocationsPromises);
        const allLocations = allLocationsArray.flat().map((location: any) => {
          const neighbourhood_id = location._links.self.href.split("/").pop();
          return {
            name: location.name,
            borough: location.borough,
            description: location.description,
            rating: 0, // default 0，will be updated by prediction
            coordinates: [-73.936, 40.686] as [number, number],
            photoPath: `/img/neighbourhoods/${location.name}.jpg`,
            zipcode: location.zipcode,
            neighbourhood_id: parseInt(neighbourhood_id, 10),
          };
        });

        return allLocations;
      } catch (error) {
        console.error("Error fetching all locations:", error);
        return [];
      }
    };

    const fetchLocations = async () => {
      const allLocations = await fetchAllLocations();

      // Filter locations based on selected boroughs
      const filteredLocations = selectedBoroughs.includes("No preference")
        ? allLocations
        : allLocations.filter((location) =>
            selectedBoroughs.includes(location.borough),
          );

      // normalize the value
      const predictionValues = Object.values(predictions?.predictions || {});
      const minPrediction = Math.min(...predictionValues);
      const maxPrediction = Math.max(...predictionValues);

      // update rating and sort，only show the top 10
      const updatedLocations = filteredLocations
        .map((location) => {
          const normalizedValue =
            predictions?.predictions[location.zipcode] !== undefined
              ? (predictions.predictions[location.zipcode] - minPrediction) /
                (maxPrediction - minPrediction)
              : 0;
          return { ...location, rating: normalizedValue * 5 };
        })
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 10);

      setNeighbourhoods(updatedLocations);
    };
    if (predictions) {
      fetchLocations();
    }
  }, [selectedBoroughs, predictions]);

  useEffect(() => {
    const fetchPage = async (page: number) => {
      try {
        const response = await axios.get(
          `${backendURL}/api/v1/listings?page=${page}`,
        );
        return response.data._embedded.listings;
      } catch (error) {
        console.error(`Error fetching page ${page}:`, error);
        return [];
      }
    };

    const fetchAllListings = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/v1/listings`);
        const totalPages = response.data.page.totalPages;

        // Fetch all pages concurrently
        const allListingsPromises = [];
        for (let page = 0; page < totalPages; page++) {
          allListingsPromises.push(fetchPage(page));
        }

        const allListingsArray = await Promise.all(allListingsPromises);
        const allListings = allListingsArray.flat().map((listing: any) => {
          const id = parseInt(listing._links.self.href.split("/").pop(), 10);
          return {
            id,
            listingDetails: listing.listingDetails,
            link: listing.link,
            imageUrl: listing.imageUrl,
            lat: listing.lat,
            lng: listing.lng,
            neighbourhoodId: listing.neighbourhoodId,
          } as Listing;
        });

        return allListings;
      } catch (error) {
        console.error("Error fetching all listings:", error);
        return [];
      }
    };

    const fetchIndexesData = async () => {
      try {
        const response = await axios.get("/final_index_data.json");
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setIndexData(response.data);
        } else {
          throw new Error("Fetched data is not an array");
        }
      } catch (error) {
        console.error("Failed to fetch or parse indexes data:", error);
      }
    };
    fetchIndexesData();

    const fetchListings = async () => {
      const allListings = await fetchAllListings();

      setListings(allListings);
    };

    fetchListings();
    const fetchRankingsData = async () => {
      try {
        const response = await axios.get("/final_data_rankings.json");
        console.log(response.data); // Check what's actually being returned
        if (Array.isArray(response.data)) {
          setRankingsData(response.data);
        } else {
          throw new Error("Fetched data is not an array");
        }
      } catch (error) {
        console.error("Failed to fetch or parse rankings data:", error);
      }
    };
    fetchRankingsData();
  }, []);

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
    console.log(neighbourhoods);
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
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="flex flex-col-reverse xl:flex-row">
        <NeighbourhoodContainer 
          neighbourhoods={neighbourhoods}
          handleLearnMore={handleLearnMore}
          selectedNeighbourhood={selectedNeighbourhood}
          filteredListings={filteredListings} 
          filteredRankings={filteredRankings}
          filteredIndexes={filteredIndexes}
          isMobile={isMobile}
          isClosing={isClosing}
          handleClose={handleClose}
          handleListingClick={handleListingClick}
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