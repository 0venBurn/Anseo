import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconButton, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Bar, Radar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler 
} from 'chart.js';
import { Listing as ListingType, Rankings, Indexes, Neighbourhood } from '../../utils/types';
import Listing from './Listing';
import NeighbourhoodRating from './NeighbourhoodRating';

// Register all necessary Chart.js components at once
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler
);

interface NeighbourhoodDetailsProps {
  neighbourhood: Neighbourhood
  listings: ListingType[];
  rankings: Rankings | undefined;
  indexes: Indexes | undefined;
  isClosing: boolean;
  onClose: () => void;
  onListingClick: (listing: ListingType) => void;
}

const NeighbourhoodDetails: React.FC<NeighbourhoodDetailsProps> = ({ neighbourhood, listings, rankings, indexes, isClosing, onClose, onListingClick }) => {
  const demographicData = {
    labels: [
      'Population Density', 
      'Young People', 'Middle Aged People', 'Older People', 
      'Male Index', 'Female Index', 
      'Age Diversity', 'Gender Diversity'
    ],
    datasets: [{
      label: 'Demographic Rankings',
      data: rankings ? [
        rankings.population_density,
        rankings.index_percPop_0_5,
        rankings.index_percPop_6_11,
        rankings.index_percPop_12_17,
        rankings.male_index,
        rankings.female_index,
        rankings.age_evenness_index,
        rankings.gender_diversity_index,
        
      ] : [],
      backgroundColor: 'rgb(255, 201, 14, 0.7)',
    }]
  };

  const economicData = {
    labels: ['Employment Health', 'Annual Earnings', 'Housing Affordability', 'Safety', 'Business Index'],
    datasets: [{
      label: 'Economic and Social Rankings',
      data: rankings ? [
        rankings.Normalized_Employment_Health_Index,
        rankings.Annual_Earnings_Index,
        rankings.Housing_Affordability_Index,
        rankings.Safety_Index,
        rankings.business_index
      ] : [],
      backgroundColor: 'rgba(125, 218, 255, 0.8)',
    }]
  };

  const demographicRadarData = {
    labels: ['Population Density', 'Young People', 'Middle Aged People', 'Older People', 
             'Male Index', 'Female Index', 'Age Diversity', 'Gender Diversity'],
    datasets: [{
      label: 'Demographic Indexes',
      data: indexes ? [
        indexes.population_density, indexes.index_percPop_0_5, indexes.index_percPop_6_11, indexes.index_percPop_12_17,
        indexes.male_index, indexes.female_index, indexes.age_evenness_index, indexes.gender_diversity_index
      ] : [],
      backgroundColor: 'rgba(255, 201, 14, 0.2)',
      borderColor: 'rgba(255, 201, 14, 1)',
      borderWidth: 2,
      fill: true
    }]
  };
  
  const economicRadarData = {
    labels: ['Employment Health', 'Annual Earnings', 'Housing Affordability', 'Safety', 'Business Index'],
    datasets: [{
      label: 'Economic and Social Indexes',
      data: indexes ? [
        indexes.Normalized_Employment_Health_Index, indexes.Annual_Earnings_Index,
        indexes.Housing_Affordability_Index, indexes.Safety_Index, indexes.business_index
      ] : [],
      backgroundColor: 'rgba(125, 218, 255, 0.3)',
      borderColor: 'rgba(125, 218, 255, 1)',
      borderWidth: 2,
      fill: true
    }]
  };

  return (
    <AnimatePresence>
      {!isClosing && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="p-6 font-commissioner"
        >
          <div className="flex justify-end">
            <IconButton 
            onClick={onClose}
             sx={{
              fontSize: '2rem',
              color: '#3B447A',
              "&:hover": {
                backgroundColor: "#D1D6F5",
              }
          }}>
              <CloseIcon />
            </IconButton>
          </div>
          <Typography variant="h4" component="h2" gutterBottom style={{ fontWeight: 'bold', color: '#3B447A', fontFamily: 'Alegreya' }}>
            {neighbourhood.name}
          </Typography>
          <Typography variant="h6" component="h6" style={{fontFamily: 'Commissioner', fontWeight: 400}} gutterBottom>
            {neighbourhood.borough}
          </Typography>
            <NeighbourhoodRating rating={neighbourhood.rating} primary/>
          <Typography variant="body1" paragraph
          style={{
            fontFamily: 'Commissioner',
            color: '#2D345D',
          }}>
            {neighbourhood.description}
          </Typography>
          <Typography variant="h5" component="h3" style={{ fontWeight: 'bold', color: '#3B447A', fontFamily: 'Alegreya' }} gutterBottom>
            Why this neighbourhood?
          </Typography>
          <Typography variant="h5" component="h3" style={{ fontWeight: 'bold', color: '#3B447A', fontFamily: 'Alegreya' }} gutterBottom>Demographic Rankings</Typography>
          <Box sx={{ 
            minHeight: 300, 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            gap: 2
          }}>
            <Box sx={{ width: { xs: '100%', md: '45%' }, maxWidth: { xs: 500, md: 'none' } }}>
              <Bar data={demographicData} options={{ maintainAspectRatio: false }} />
            </Box>
            <Box sx={{ width: { xs: '100%', md: '45%' }, maxWidth: { xs: 500, md: 'none' } }}>
              <Radar data={demographicRadarData} options={{
                maintainAspectRatio: false,
                scales: {
                  r: {
                    min: 0,
                    max: 100,
                    ticks: {
                      display: false,
                      stepSize: 15,
                    }
                  }
                },
              }} />
            </Box>
          </Box>

          {/* Economic and Social Rankings with Radar Chart */}
          <Typography variant="h5" component="h3" style={{ fontWeight: 'bold', color: '#3B447A', fontFamily: 'Alegreya' }} gutterBottom>Economic and Social Rankings</Typography>
          <Box sx={{ 
            minHeight: 300, 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            gap: 2
          }}>
            <Box sx={{ width: { xs: '100%', md: '45%' }, maxWidth: { xs: 500, md: 'none' } }}>
              <Bar data={economicData} options={{ maintainAspectRatio: false }} />
            </Box>
            <Box sx={{ width: { xs: '100%', md: '45%' }, maxWidth: { xs: 500, md: 'none' } }}>
              <Radar data={economicRadarData} options={{
                maintainAspectRatio: false,
                scales: {
                  r: {
                    min: 0,
                    max: 100,
                    ticks: {
                      display: false,
                      stepSize: 15,
                    }
                  }
                },
              }} />
            </Box>
          </Box>

          <Typography variant="h5" component="h3" style={{ fontWeight: 'bold', color: '#3B447A', fontFamily: 'Alegreya', padding: 0, marginBottom: 0 }} gutterBottom>
            Available listings
          </Typography>
          {listings.length > 0 ? (
            <div className="flex gap-2 p-2 pb-4 overflow-x-scroll scrollbar">              
                {listings.map((listing) => (
                  <Listing key={listing.id} listing={listing} onListingClick={onListingClick} />
                ))}
              </div>
          ) : (
            <Typography variant="body2" style={{
              fontFamily: 'Commissioner',
              color: '#2D345D',
            }}>
              {" "}
              Currently no listings available
            </Typography>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NeighbourhoodDetails;