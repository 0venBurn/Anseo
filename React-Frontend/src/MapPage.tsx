import React, { useState, useEffect } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion, AnimatePresence } from 'framer-motion';
import { IconButton, Card, CardContent, Button, Typography, Grid, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Navigate, useNavigate } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import Header from './Header';
import './index.css';
import { environment } from '../mapbox.config';
import Map from './components/Map';
import { useUser } from "@clerk/clerk-react";
import { useQuestionnaire } from './context/QuestionnaireProvider';

const ngrokForwardingAddress = import.meta.env.VITE_NGROK_FORWARDING_ADDRESS

mapboxgl.accessToken = environment.mapbox.accessToken;

interface Location {
  name: string;
  borough: string;
  description: string;
  rating: number;
  coordinates: [number, number];
  photoPath: string;
}

interface PredictionResponse {
  predictions: { [zipcode: string]: number };
}

const MapPage: React.FC = () => {
  const { isSignedIn, user } = useUser();
  const { data, isQuestionnaireCompleted, setQuestionnaireDefault } = useQuestionnaire()
  const [selectedBoroughs, setSelectedBoroughs] = useState<string[]>([]);
  const [predictions, setPredictions] = useState<PredictionResponse | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isClosing, setIsClosing] = useState(false);


  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchPredictions = async () => {

      try {
          let payload
          
          if (isQuestionnaireCompleted()){
            setSelectedBoroughs(data.selectedBoroughs)
            payload = { data }
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
          
          
          const dbResponse = await fetch(`http://localhost:8080/api/user-results/${user.id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(
              { 
                clerkUserId: user.id, 
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
          console.log(ngrokForwardingAddress)
          const dbResponse = await fetch(`http://localhost:8080/api/user-results/${user.id}`)

          console.log(dbResponse)
          console.log(dbResponse.headers.get('Content-Type'))
          
          const data = await dbResponse.json()
          
          console.log(data)
          console.log(data.results[0].results)
          // if no predictions redirect to questions
          if (!dbResponse.ok) {
            navigate('/welcome')
            throw new Error(`Couldn't find user results in database: ${user}`)
          }

          // console.log(data)
          // setSelectedBoroughs(data.selectedBoroughs)


          // make machine learning calls with prediction[0]
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
          return
        }

        // not signed in and questionnaire completed
      }  catch (error) {
        console.error('Error fetching predictions:', error);
      }      
    }
    fetchPredictions();
  }, []);


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/neighbourhoods`);
        console.log('Response data:', response.data);
        const embedded = response.data._embedded;
        if (embedded && Array.isArray(embedded.neighbourhoods)) {
          const locations = embedded.neighbourhoods.map((location: any) => ({
            ...location,
            rating: Math.random() * 5, // use random for now, can change later
            coordinates: [-73.936, 40.686] as [number, number], // use fixed for now, can change later
            photoPath: `/img/${location.name}.jpg`
          }));
          setLocations(locations);
        } else {
          console.error('Unexpected data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  const handleLearnMore = (location: Location) => {
    setSelectedLocation(location);
    setIsClosing(false);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => setSelectedLocation(null), 500);
  };


  // if (!isLoaded) {
  //   return (
  //     <div>
  //       Loading....
  //     </div>
  //   )
  // }
  
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
            className="hidden md:block w-2/3 overflow-y-auto"
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
                  <Grid item xs={12} sm={4} key={index}>
                    <Card style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <img src={location.photoPath} alt={location.name} style={{ height: 200, objectFit: 'cover' }} />
                      <CardContent style={{ backgroundColor: '#F5F5F5', flex: '1 0 auto' }}>
                        <Typography variant="h6">{location.name}</Typography>
                        <Typography variant="body2" color="textSecondary">{location.borough}</Typography>
                        <Typography variant="body2">{location.description}</Typography>
                        <Box display="flex" alignItems="center" mt={1}>
                          <Typography variant="body2" style={{ marginRight: 4 }}>{location.rating.toFixed(2)}</Typography>
                          <div>
                            {Array.from({ length: 5 }).map((_, starIndex) => (
                              <span key={starIndex} style={{ color: starIndex < Math.round(location.rating) ? '#FFD700' : '#CCC' }}>★</span>
                            ))}
                          </div>
                        </Box>
                        <Button variant="contained" style={{ backgroundColor: '#FF6347', color: '#FFF', marginTop: 16 }} onClick={() => handleLearnMore(location)}>Learn More</Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </motion.div>
        )}
        {/* Map for desktop on the right one-third */}
        {!isMobile && (
          <div className="w-full md:w-1/3 h-full absolute top-0 right-0">
            <Map selectedBoroughs={selectedBoroughs} predictions={predictions} />
          </div>
        )}
      </div>
      {isMobile && (
        <div className="block md:hidden flex-1">
          {/* Map for mobile display on the top half */}
          <div className="w-full h-80 z-10">
            <Map selectedBoroughs={selectedBoroughs} predictions={predictions} />
          </div>
          {/* Location on the bottom */}
          <div className="text-center text-2xl py-2 bg-gray-100">
            Your Results
          </div>
          <div className="w-full h-1/2 p-4 bg-gray-100 overflow-y-auto">
            <Box p={2}>
              <Grid container spacing={2}>
                {locations.map((location, index) => (
                  <Grid item xs={12} key={index}>
                    <Card style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <img src={location.photoPath} alt={location.name} style={{ height: 200, objectFit: 'cover' }} />
                      <CardContent style={{ flex: '1 0 auto' }}>
                        <Typography variant="h6">{location.name}</Typography>
                        <Typography variant="body2" color="textSecondary">{location.borough}</Typography>
                        <Typography variant="body2">{location.description}</Typography>
                        <Box display="flex" alignItems="center" mt={1}>
                          <Typography variant="body2" style={{ marginRight: 4 }}>{location.rating.toFixed(2)}</Typography>
                          <div>
                            {Array.from({ length: 5 }).map((_, starIndex) => (
                              <span key={starIndex} style={{ color: starIndex < Math.round(location.rating) ? '#FFD700' : '#CCC' }}>★</span>
                            ))}
                          </div>
                        </Box>
                        <Button variant="contained" style={{ backgroundColor: '#FF6347', color: '#FFF', marginTop: 16 }} onClick={() => handleLearnMore(location)}>Learn More</Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </div>
        </div>
      )}
      {/* Detail column when clicked learn more */}
      <AnimatePresence>
        {selectedLocation && !isClosing && (
          <motion.div
            initial={isMobile ? { y: '100%' } : { x: '-100%' }}
            animate={isMobile ? { y: 0 } : { x: 0 }}
            exit={isMobile ? { y: '100%' } : { x: '-100%' }}
            transition={{ duration: 0.5 }}
            className={`fixed bottom-0 ${isMobile ? 'left-0 w-full h-1/2' : 'left-0 w-1/2 h-full'} bg-white shadow-lg p-6 z-50 overflow-y-auto`}
          >
            <div className="flex justify-end">
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
            <Typography variant="h4" component="h2" gutterBottom>
              {selectedLocation.name}
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              {selectedLocation.borough}
            </Typography>
            <Box display="flex" alignItems="center" mt={1} mb={2}>
              <Typography variant="body2" style={{ marginRight: 4 }}>{selectedLocation.rating.toFixed(2)}</Typography>
              <div>
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <span key={starIndex} style={{ color: starIndex < Math.round(selectedLocation.rating) ? '#FFD700' : '#CCC' }}>★</span>
                ))}
              </div>
            </Box>
            <Typography variant="body1" paragraph>
              {selectedLocation.description}
            </Typography>
            <Typography variant="body2" paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed ullamcorper morbi tincidunt ornare. Est placerat in egestas erat imperdiet sed. In arcu cursus euismod quis viverra nibh. Scelerisque viverra mauris in aliquam. Sodales neque sodales ut etiam sit. Sed augue lacus viverra vitae congue. Consectetur lorem donec massa sapien. Nisl purus in mollis nunc sed id semper. Semper feugiat nibh sed pulvinar. Sem viverra aliquet eget sit amet tellus. Nulla at volutpat diam ut.
            </Typography>
            <Typography variant="h5" component="h3" gutterBottom>
              Why this location?
            </Typography>
            <ul className="list-disc pl-6">
              <li><strong>Affordability:</strong> Price Range $$ - $$$</li>
              <li><strong>Safety Score:</strong> lorem ipsum...</li>
              <li><strong>ML Metric 1:</strong> lorem ipsum...</li>
              <li><strong>ML Metric 2:</strong> lorem ipsum...</li>
              <li><strong>ML Metric 3:</strong> lorem ipsum...</li>
              <li>...</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapPage;


