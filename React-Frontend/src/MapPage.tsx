import { useRef, useEffect, useState } from 'react';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion } from 'framer-motion';
import { IconButton, Card, CardContent, Button, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeMap = () => {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-73.935242, 40.73061] as LngLatLike, 
        zoom: 10,
      });

      map.on('load', () => {
        locations.forEach(location => {
          new mapboxgl.Marker()
            .setLngLat(location.coordinates as LngLatLike)
            .addTo(map);
        });

        setMap(map);
      });
    };

    if (!map) initializeMap();
  }, [map]);

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
          {locations.map((location, index) => (
            <Card key={index} className="mb-4">
              <CardContent>
                <Typography variant="h5" component="h2">
                  {location.name}
                </Typography>
                <Typography color="textSecondary">
                  {location.borough}
                </Typography>
                <Typography variant="body2" component="p">
                  {location.description}
                </Typography>
                <Typography variant="body2" component="p">
                  Rating: {location.rating}
                </Typography>
                <Button variant="contained" color="primary" className="mt-2">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </motion.div>
        <div ref={mapContainerRef} className="w-1/2 h-full" />
      </div>
    </div>
  );
};

export default MapPage;
