import React, { useState, useEffect } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion, AnimatePresence } from 'framer-motion';
import { IconButton, Card, CardContent, Button, Typography, Grid, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useLocation } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import Header from './Header';
import './index.css';
import { environment } from '../mapbox.config';
import Map from './components/Map';

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
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const location = useLocation();
  const { selectedBoroughs, predictions } = location.state as { selectedBoroughs: string[], predictions: PredictionResponse };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/neighbourhoods');
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
