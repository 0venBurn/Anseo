import React, { useState, useEffect } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion } from 'framer-motion';
import { Button, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import Header from './Header';
import './index.css';
import { environment } from '../mapbox.config';
import Map from './components/Map';
import LocationCard from './LocationCard';
import LocationDetails from './LocationDetails';
import { useAuth, useUser } from "@clerk/clerk-react";
import { useQuestionnaire } from './context/QuestionnaireProvider';

// const ngrokForwardingAddress = import.meta.env.VITE_NGROK_FORWARDING_ADDRESS

mapboxgl.accessToken = environment.mapbox.accessToken;

export interface Location {
  name: string;
  borough: string;
  description: string;
  rating: number;
  coordinates: [number, number];
  photoPath: string;
  zipcode: string;
  neighbourhood_id: number;
}

export interface Listing {
  id: number;
  listingDetails: string;
  link: string;
  imageUrl: string;
  lat: string;
  lng: string;
  neighbourhoodId: number;
}

export interface Rankings {
  neighbourhood_id: number;
  population_density_Rank: number;
  population_by_gender_Data_Male_Rank: number;
  population_by_gender_Data_Female_Rank: number;
  Age_Diversity_Index_Rank: number;
  Employment_Health_Index_Rank: number;
  Annual_Earnings_Index_Rank: number;
  Housing_Affordability_Index_Rank: number;
  Crime_Rate_Index_Rank: number;
  Young_Index_Rank: number;
  Middle_Aged_Index_Rank: number;
  Old_Index_Rank: number;
}

interface PredictionResponse {
  predictions: { [zipcode: string]: number };
}

const MapPage: React.FC = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const { data, isQuestionnaireCompleted, setQuestionnaireDefault, dummyData } = useQuestionnaire()
  const [selectedBoroughs, setSelectedBoroughs] = useState<string[]>([]);
  const [predictions, setPredictions] = useState<PredictionResponse>({ predictions: {} });
    const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [isClosing, setIsClosing] = useState(false);
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [rankingsData, setRankingsData] = useState<Rankings[]>([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navigate = useNavigate();
  // const location = useLocation();
  // const { state } = location;
  
  useEffect(() => {          
            const fetchPredictions = async () => {
              if (!isLoaded) {
                return
              }
              if (isLoaded) {
                console.log("Clerk has finished loading");
                setIsPageLoaded(true)
                  }
              try {
                if (dummyData) {
                  console.log('test: dummy data')
                  const payload = {
                    'data': {
                      "businessType": "Industry_Commercial Lessor",
                      "openHour": 8,
                      "closeHour": 18,
                      "budget": 20,
                      "selectedAgeGroup": [
                          11,
                          59
                      ],
                      "ageImportance": 0.5,
                      "selectedIncomeLevel": [
                          18000,
                          84000
                      ],
                      "incomeImportance": 0.5,
                      "targetGroup": [
                          "Singles"
                      ],
                      "proximityImportance": 0.5,
                      "footfallImportance": 0.5,
                      "surroundingBusinessesImportance": 0.5,
                      "rentBudget": 500,
                      "genderRatio": 0.5,
                      "employmentStatus": [
                          "Full Time"
                      ],
                      "homeValue": 50,
                      "populationDensity": 0.5,
                      "selectedBoroughs": [
                          "Manhattan",
                          "Brooklyn",
                          "Queens"
                      ],
                      "areaType": [
                          "Residential"
                      ]
                  }
                    }
                    const response = await fetch('http://localhost:8000/api/v1/predict', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(payload),
                    });
                  console.log(payload)
                    
                    if (!response.ok) {
                      throw new Error('API response from ML Model was not ok.');
                    }

                    const predictions = await response.json();
                    console.log(response)
                    console.log(predictions)
                    setPredictions(predictions);
                    setSelectedBoroughs(payload.data.selectedBoroughs)
                    setQuestionnaireDefault()
                    return
                  }
          let payload
          console.log(isSignedIn)
          if (isQuestionnaireCompleted()){
            setSelectedBoroughs(data.selectedBoroughs)
            payload = { data }
            console.log(payload)

          }
          
          // continue as guest
          if (!isSignedIn && isQuestionnaireCompleted()) {
            console.log('test: continue as guest')
            const response = await fetch('http://localhost:8000/api/v1/predict', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error('API response from ML Model was not ok.');
          }
          const predictions = await response.json();
          setPredictions(predictions);
          setQuestionnaireDefault()
          return
        }
        
        // signed in and completed questionnaire
        if (isSignedIn && isQuestionnaireCompleted()) {
          console.log('test: signed in and completed questionnaire')
          const mlResponse = await fetch('http://localhost:8000/api/v1/predict', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
          
          
          const dbResponse = await fetch(`http://localhost:8080/api/user-results/${user && user.id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(
              { 
                clerkUserId: user && user.id, 
                results: payload
              }
            )
          });
          
          if (!mlResponse.ok) {
            throw new Error('API response from ML Model was not ok.');
          }
          
          if (!dbResponse.ok) {
            throw new Error('API response from DB was not ok.');
          }
          
          const predictions = await mlResponse.json();
          setPredictions(predictions);
          setQuestionnaireDefault()
          return
        }

        // signed in and questionnaire not completed
        if (isSignedIn && !isQuestionnaireCompleted()) {
          console.log('test: signed in and questionnaire not completed')
          // console.log(ngrokForwardingAddress)
          const dbResponse = await fetch(`http://localhost:8080/api/user-results/${user && user.id}`)
          
          const data = await dbResponse.json()
          
          console.log(data)
          console.log(data.results[0].results)

          // If user has no saved results in the database, redirect to welcome page
          if (data.results.length === 0) {
            navigate('/welcome')
            throw new Error(`Couldn't find user results in database: ${user}`)
          }

          const mlResponse = await fetch('http://localhost:8000/api/v1/predict', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data.results[0].results),
          });

          if (!mlResponse.ok) {
            throw new Error('API response from ML Model was not ok.');
          } else{
            console.log('ML response was ok')
          }

          const predictions = await mlResponse.json();
          console.log(predictions)
          setPredictions(predictions);
          setSelectedBoroughs(data.results[0].results.data.selectedBoroughs)
          return
        }

        // not signed in and questionnaire not completed
        if (!isSignedIn && !isQuestionnaireCompleted()) {
          console.log('test: not signed in and questionnaire not completed')
          navigate('/welcome')
      } 
    }  catch (error) {
        console.error('Error fetching predictions:', error);
      }      
    }
    fetchPredictions();
  }, [isLoaded, isSignedIn, user]);

  useEffect(() => {
    const fetchPage = async (page: number) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/neighbourhoods?page=${page}`);
        return response.data._embedded.neighbourhoods;
      } catch (error) {
        console.error(`Error fetching page ${page}:`, error);
        return [];
      }
    };

    const fetchAllLocations = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/neighbourhoods');
        const totalPages = response.data.page.totalPages;
        
        // Fetch all pages concurrently
        const allLocationsPromises = [];
        for (let page = 0; page < totalPages; page++) {
          allLocationsPromises.push(fetchPage(page));
        }
        
        const allLocationsArray = await Promise.all(allLocationsPromises);
        const allLocations = allLocationsArray.flat().map((location: any) => {
          const neighbourhood_id = location._links.self.href.split('/').pop();
          return {
            name: location.name,
            borough: location.borough,
            description: location.description,
            rating: 0, // default 0，will be updated by prediction
            coordinates: [-73.936, 40.686] as [number, number],
            photoPath: `/img/neighbourhoods/${location.name}.jpg`,
            zipcode: location.zipcode,
            neighbourhood_id: parseInt(neighbourhood_id, 10)
          };
        });

        return allLocations;
      } catch (error) {
        console.error('Error fetching all locations:', error);
        return [];
      }
    };

    const fetchLocations = async () => {
      const allLocations = await fetchAllLocations();
      
      // Filter locations based on selected boroughs
      const filteredLocations = allLocations.filter(location => selectedBoroughs.includes(location.borough));

      // normalize the value
      const predictionValues = Object.values(predictions?.predictions || {});
      const minPrediction = Math.min(...predictionValues);
      const maxPrediction = Math.max(...predictionValues);

      // update rating and sort，only show the top 10
      const updatedLocations = filteredLocations.map(location => {
        const normalizedValue = predictions?.predictions[location.zipcode] !== undefined 
          ? (predictions.predictions[location.zipcode] - minPrediction) / (maxPrediction - minPrediction)
          : 0;
        return { ...location, rating: normalizedValue * 5 };
      }).sort((a, b) => b.rating - a.rating).slice(0, 10);

      setLocations(updatedLocations);
    };
    if (predictions) {
      fetchLocations();
    }
  }, [selectedBoroughs, predictions]);

  useEffect(() => {
    const fetchPage = async (page: number) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/listings?page=${page}`);
        return response.data._embedded.listings;
      } catch (error) {
        console.error(`Error fetching page ${page}:`, error);
        return [];
      }
    };

    const fetchAllListings = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/listings');
        const totalPages = response.data.page.totalPages;
        
        // Fetch all pages concurrently
        const allListingsPromises = [];
        for (let page = 0; page < totalPages; page++) {
          allListingsPromises.push(fetchPage(page));
        }
        
        const allListingsArray = await Promise.all(allListingsPromises);
        const allListings = allListingsArray.flat().map((listing: any) => {
          const id = parseInt(listing._links.self.href.split('/').pop(), 10);
          return {
            id,
            listingDetails: listing.listingDetails,
            link: listing.link,
            imageUrl: listing.imageUrl,
            lat: listing.lat,
            lng: listing.lng,
            neighbourhoodId: listing.neighbourhoodId
          } as Listing;
        });
        
        return allListings;
      } catch (error) {
        console.error('Error fetching all listings:', error);
        return [];
      }
    };

    const fetchListings = async () => {
      const allListings = await fetchAllListings();
      
      setListings(allListings);
    };

    fetchListings();
    const fetchRankingsData = async () => {
      try {
        const response = await axios.get('/final_data_rankings.json');
        console.log(response.data); // Check what's actually being returned
        if (Array.isArray(response.data)) {
          setRankingsData(response.data);
        } else {
          throw new Error("Fetched data is not an array");
        }
      } catch (error) {
        console.error('Failed to fetch or parse rankings data:', error);
      }
    };
    fetchRankingsData();
  }, []);

  // function to convert zipcode to lat and lng
  const getCoordinatesByZipcode = async (zipcode: string) => {
    try {
      const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${zipcode}.json?access_token=${mapboxgl.accessToken}`);
      const coordinates = response.data.features[0].center;
      return coordinates;
    } catch (error) {
      console.error(`Error fetching coordinates for zipcode ${zipcode}:`, error);
      return null;
    }
  };

  const handleLearnMore = async (location: Location) => {

    setSelectedLocation(location);
    setIsClosing(false);
    // function for zoom in when clicked learn more
    const coordinates = await getCoordinatesByZipcode(location.zipcode);
    if (coordinates && mapInstance) {
      mapInstance.flyTo({ center: coordinates, zoom: 12 });
    }
  };

  const handleGetLocation = (name: string): Location | undefined => {
    console.log(locations)
    return locations.find(location => location.name === name)
  }

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => setSelectedLocation(null), 500);
  };

  const filteredListings = selectedLocation
    ? listings.filter(listing => listing.neighbourhoodId === selectedLocation.neighbourhood_id)
    : [];

  const filteredRankings = selectedLocation
  ? rankingsData.find(ranking => ranking.neighbourhood_id === selectedLocation.neighbourhood_id)
  : undefined;

    // Not signed in and no questionnaire completed yet
  // if (!isSignedIn && !isQuestionnaireCompleted()) {
  //   return (
  //     <>
  //       <Navigate to="/" replace={true} />
  //     </> 
  //   )
  // }

  // // Continue as guest
  // if (!isSignedIn && isQuestionnaireCompleted()) {
  //   return (
  //   <>
  //   <Navigate to="/" replace={true}/>
  //   </>
  //   );
  // }

  // // Signed in and completed questionnaire
  // if (isSignedIn && isQuestionnaireCompleted()) {
  //   return (
  //     <div>
  //       <h1>Welcome {user.fullName}</h1>
  //     </div>
  //   )
  // }

  // Signed in and not completed questionnaire
  // if (isSignedIn && !isQuestionnaireCompleted()) {
  //   return (
  //     <>
  //       <Navigate to="/welcome" replace={true} />
  //     </>
  //   )
  // }

  if (!isPageLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }


  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 mt-20">
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
            className="hidden md:block w-1/2 overflow-y-auto"
          >
            <div className="w-full" style={{ backgroundColor: '#E8EAF6', margin: 0, padding: 0 }}>
              <div className="flex justify-between items-center text-2xl py-2 px-4" style={{ backgroundColor: '#E8EAF6' }}>
                <span>Your Results</span>
                <Button variant="outlined">Filters</Button>
              </div>
            </div>
            <Box p={2}>
              <Grid container spacing={2}>
                {locations.map((location, index) => (
                  <LocationCard key={index} location={location} onLearnMore={handleLearnMore} />
                ))}
              </Grid>
            </Box>
          </motion.div>
        )}
        {/* Map for desktop on the right one-third */}
        {!isMobile && (
          <div className="w-full md:w-1/2 h-full absolute top-0 right-0">
            <Map 
              selectedBoroughs={selectedBoroughs} 
              handleSelectNeighbourhood={handleLearnMore}
              handleGetLocation={handleGetLocation}
              predictions={predictions} 
              listings={filteredListings} 
              // onMapLoad={setMapInstance}
            />
          </div>
        )}
      </div>
      {isMobile && (
        <div className="block md:hidden flex-1">
          {/* Map for mobile display on the top half */}
          <div className="w-full h-80 z-10">
            <Map 
              selectedBoroughs={selectedBoroughs} 
              predictions={predictions} 
              listings={filteredListings} 
              // onMapLoad={setMapInstance}
            />
          </div>
          {/* Location on the bottom */}
          <div className="text-center text-2xl py-2 bg-gray-100">
            Your Results
          </div>
          <div className="w-full h-1/2 p-4 bg-gray-100 overflow-y-auto">
            <Box p={2}>
              <Grid container spacing={2}>
                {locations.map((location, index) => (
                  <LocationCard key={index} location={location} onLearnMore={handleLearnMore} />
                ))}
              </Grid>
            </Box>
          </div>
        </div>
      )}
      {/* Detail column when clicked learn more */}
      {selectedLocation && (
        <LocationDetails 
          location={selectedLocation} 
          listings={filteredListings} // pass filteredListings
          rankings={filteredRankings}
          isMobile={isMobile} 
          isClosing={isClosing} 
          onClose={handleClose} 
        />
      )}
    </div>
  );
};

export default MapPage;
