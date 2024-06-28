import React, { useState, useEffect } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion, AnimatePresence } from 'framer-motion';
import { IconButton, Card, CardContent, Button, Typography, Grid, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
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
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
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

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full bg-blue-900 text-white flex justify-between items-center py-4 px-4 md:px-20">
        <div 
          className="text-3xl md:text-5xl font-bold text-orange-600 cursor-pointer" 
          style={{ fontFamily: 'Fredoka One' }}
          onClick={() => navigate('/')}
        >
          ANSEO
        </div>
        <div className="flex space-x-4 md:space-x-4 items-center">
          <Button 
            variant="outlined" 
            sx={{ 
              borderColor: 'white', 
              color: 'white', 
              borderRadius: '20px', 
              padding: isMobile ? '0.15rem 0.75rem' : '0.25rem 1rem',
              boxShadow: 'none',
              fontSize: isMobile ? '0.75rem' : '1rem'
            }}
            onClick={() => navigate('/login')}
          >
            Log In
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            sx={{ 
              backgroundColor: 'red', 
              color: 'white', 
              borderRadius: isMobile ? '20px' : '5px',
              boxShadow: 'none',
              fontSize: isMobile ? '0.75rem' : '1rem'
            }}
            onClick={() => navigate('/signin')}
          >
            Sign Up
          </Button>
          {isMobile && (
            <IconButton color="inherit" onClick={handleMenuToggle}>
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          )}
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 w-full bg-blue-900 text-white flex flex-col items-center py-4 z-50"
          >
            <Button 
              variant="text" 
              sx={{ color: 'white', fontSize: '1rem' }}
              onClick={() => {
                navigate('/about');
                setMenuOpen(false);
              }}
            >
              About
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Desktop display location introduction on the left half */}
      <div className="flex flex-1 mt-20">
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:block w-1/2 p-4 bg-gray-100 overflow-y-auto"
        >
          <Box p={2}> 
            <Grid container spacing={2}>
              {locations.map((location, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card>
                    <img src={location.photoPath} alt={location.name} style={{ height: 200, objectFit: 'cover' }} />
                    <CardContent>
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
        {/* Map for desktop on the right half*/}
        <div className="w-full md:w-1/2 h-full z-10">
          <Map selectedBoroughs={selectedBoroughs} predictions={predictions} />
        </div>
      </div>
      <div className="block md:hidden flex-1">
        {/* Map for mobile display on the top half */}
        <div className="w-full h-1/6 z-10">
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
                  <Card>
                    <img src={location.photoPath} alt={location.name} style={{ height: 200, objectFit: 'cover' }} />
                    <CardContent>
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
      {/* Detial column when clicked learn more */}
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
