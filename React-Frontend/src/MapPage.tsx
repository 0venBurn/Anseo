import { useRef, useEffect, useState } from 'react';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion, AnimatePresence } from 'framer-motion';
import { IconButton, Card, CardContent, Button, Typography, Grid, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import './index.css'; 

mapboxgl.accessToken = 'pk.eyJ1IjoiemlrYW5nd2FuZyIsImEiOiJjbHgzYW9kdjQwdXQ3MnFxeDJyMHViMHpsIn0.6gvXZTqFPhuWhb0YZVc1PQ';

interface Location {
  name: string;
  borough: string;
  description: string;
  rating: number;
  coordinates: [number, number];
}

const locations: Location[] = [
  {
    name: 'Bedford-Stuyvesant',
    borough: 'Brooklyn',
    description: "Bed-Stuy, a vibrant neighborhood full of historical importance, has kept its character even with waves of visitors and new residents. It's a place where block parties, murals and the stomping grounds of Notorious B.I.G. and Jay-Z are still celebrated.",
    rating: 4.12,
    coordinates: [-73.936, 40.686],
  },
  {
    name: 'Greenwich Village',
    borough: 'Manhattan',
    description: "The epicenter of the city's 1960s counterculture movement, the tree-lined streets of Greenwich Village are now a hub of popular cafes, bars and restaurants. Jazz clubs and Off-Broadway Theaters can also be found amid the brownstones.",
    rating: 4.03,
    coordinates: [-74.000, 40.733],
  },
  {
    name: 'Morris Park',
    borough: 'The Bronx',
    description: "Morris Park, located in the Bronx, is a lively neighborhood with a strong sense of community. Named after John Albert Morris, an early settler who purchased land in the area during the 19th century, Morris Park has a rich history and a distinct identity.",
    rating: 3.78,
    coordinates: [-73.856, 40.854],
  },
  {
    name: 'Brighton Heights',
    borough: 'Staten Island',
    description: "Brighton Heights, Staten Island, is a neighborhood nestled in New York City's borough of Staten Island. It's positioned in the northeastern section of the island, offering its residents a tranquil suburban environment. To the south, Silver Lake borders the neighborhood.",
    rating: 3.27,
    coordinates: [-74.100, 40.627],
  },
];

const MapPage = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);  // Referencing the div element of a map container
  const [map, setMap] = useState<mapboxgl.Map | null>(null); // The initial value is null, indicating that the map has not been initialized yet.
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null); // If there is no selected location, the value is null.
  const [isClosing, setIsClosing] = useState(false); // The initial value is false, indicating that the details column is not closed.
  const navigate = useNavigate();

  useEffect(() => {
    const initializeMap = () => {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-73.935242, 40.73061] as LngLatLike, 
        zoom: 10,
      });

      map.on('load', () => {  //  When the map loading is complete
        locations.forEach(location => {
          new mapboxgl.Marker()
            .setLngLat(location.coordinates as LngLatLike)
            .addTo(map);
        });

        setMap(map);
      });
    };

    if (!map) initializeMap(); // If the map has not been initialized yet, call the initializeMap function.
  }, [map]);

  const handleLearnMore = (location: Location) => {  // Indicates the location where the user clicked.
    setSelectedLocation(location); // Set the selected location as the current location.
    setIsClosing(false); // Reset the isClosing status to false to ensure that the details bar can be opened correctly.
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => setSelectedLocation(null), 500); //Use the setTimeout function to delay the execution of setSelectedLocation (null) by 500 milliseconds,
                                                      // and wait for the animation to complete before clearing the selected location.
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="absolute top-0 left-0 w-full bg-purple-900 text-white flex justify-between items-center py-4 px-10">
        <div 
          className="text-5xl font-bold text-orange-600 cursor-pointer"
          onClick={() => navigate('/')}
        >
          ANSEO
        </div>
        <div className="flex space-x-4">
          <button className="text-2xl font-bold" onClick={() => navigate('/about')}>ABOUT</button>
          <IconButton color="inherit" onClick={() => navigate('/login')}>
            <AccountCircleIcon />
          </IconButton>
        </div>
      </div>
      <div className="flex flex-1 mt-20">
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-1/2 p-4 bg-gray-100 overflow-y-auto"
        >
          <Box p={2}> 
            {/* Padding is 2 units  */}
            <Grid container spacing={2}>
              {/* The spacing between grid items is 2 units */}
              {locations.map((location, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  {/* xs={12} indicates that on a super small screen (phone), each grid item occupies 12 columns (an entire row). 
                  sm={6} indicates that on a small screen (tablet), each grid item occupies 6 columns (half of the rows). */}
                  <Card>
                    <img src={`/img/${location.name.toLowerCase().replace(/ /g, '-')}.png`} alt={location.name} style={{ height: 200, objectFit: 'cover' }} />
                    {/* Replace spaces with - */}
                    <CardContent>
                      <Typography variant="h6">{location.name}</Typography>
                      <Typography variant="body2" color="textSecondary">{location.borough}</Typography>
                      <Typography variant="body2">{location.description}</Typography>
                      <Box display="flex" alignItems="center" mt={1}>
                        <Typography variant="body2" style={{ marginRight: 4 }}>{location.rating.toFixed(2)}</Typography>
                        <div>
                          {Array.from({ length: 5 }).map((_, starIndex) => (
                            // Create an array of length 5 and traverse to generate stars.
                            <span key={starIndex} style={{ color: starIndex < Math.round(location.rating) ? '#FFD700' : '#CCC' }}>★</span>
                            // Display golden or gray stars based on rating values.
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
        <div ref={mapContainerRef} className="w-1/2 h-full" />
      </div>
      
{/* detail column here */}
      <AnimatePresence>
        {/* <AnimatePresence>is used to control the entry and exit of components in animations */}
        {selectedLocation && !isClosing && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 w-1/2 h-full bg-white shadow-lg p-6 z-50 overflow-y-auto"
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
