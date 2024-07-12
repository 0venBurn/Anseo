import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconButton, Typography, Box, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';

interface Listing {
  id: number;
  listingDetails: string;
  link: string;
  imageUrl: string;
  lat: string;
  lng: string;
  neighbourhoodId: number;
}

interface Rankings {
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

interface LocationDetailsProps {
  location: {
    name: string;
    borough: string;
    description: string;
    rating: number;
  };
  listings: Listing[];
  rankings: Rankings | undefined; 
  isMobile: boolean;
  isClosing: boolean;
  onClose: () => void;
}


const LocationDetails: React.FC<LocationDetailsProps> = ({ location, listings, rankings, isMobile, isClosing, onClose }) => {
  // 计算星级显示
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={i} style={{ color: '#FFD700' }} />);
    }

    // Half star
    if (hasHalfStar) {
      stars.push(<StarHalfIcon key="half" style={{ color: '#FFD700' }} />);
    }

    // Empty stars
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarBorderIcon key={`empty-${i}`} style={{ color: '#FFD700' }} />);
    }

    return stars;
  };

  return (
    <AnimatePresence>
      {!isClosing && (
        <motion.div
          initial={isMobile ? { y: '100%' } : { x: '-100%' }}
          animate={isMobile ? { y: 0 } : { x: 0 }}
          exit={isMobile ? { y: '100%' } : { x: '-100%' }}
          transition={{ duration: 0.5 }}
          className={`fixed bottom-0 ${isMobile ? 'left-0 w-full h-1/2' : 'left-0 w-2/3 h-full'} bg-white shadow-lg p-6 z-50 overflow-y-auto`}
        >
          <div className="flex justify-end">
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <Typography variant="h4" component="h2" gutterBottom>
            {location.name}
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            {location.borough}
          </Typography>
          <Box display="flex" alignItems="center" mt={1} mb={2}>
            <Typography variant="body2" style={{ marginRight: 4 }}>{location.rating.toFixed(2)}</Typography>
            {/* 星级评分 */}
            {renderStars(location.rating)}
          </Box>
          <Typography variant="body1" paragraph>
            {location.description}
          </Typography>
          <Typography variant="body2" paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed ullamcorper morbi tincidunt ornare. Est placerat in egestas erat imperdiet sed. In arcu cursus euismod quis viverra nibh. Scelerisque viverra mauris in aliquam. Sodales neque sodales ut etiam sit. Sed augue lacus viverra vitae congue. Consectetur lorem donec massa sapien. Nisl purus in mollis nunc sed id semper. Semper feugiat nibh sed pulvinar. Sem viverra aliquet eget sit amet tellus. Nulla at volutpat diam ut.
          </Typography>
          <Typography variant="h5" component="h3" gutterBottom>
            Why this location?
          </Typography>
          <ul className="list-disc pl-6">
            {Object.entries(rankings)
              .filter(([key]) => key !== 'neighbourhood_id')  // Exclude the neighborhood ID from display
              .map(([key, value]) => (
                <li key={key}>
                  <strong>{key.replace(/_/g, ' ').replace('Rank', ' Rank')}:</strong> {value}
                </li>
              ))}
          </ul>

          <Typography variant="h5" component="h3" gutterBottom>
            Available listings
          </Typography>
          {listings.length > 0 ? (
            <Box display="flex" overflow="auto">
              <Grid container spacing={2} style={{ flexWrap: 'nowrap', overflowX: 'auto' }}>
                {listings.map((listing) => (
                  <Grid item key={listing.id} style={{ minWidth: '200px' }}>
                    <a href={listing.link} target="_blank" rel="noopener noreferrer">
                      <img src={listing.imageUrl} alt={listing.listingDetails} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                      <Typography variant="body2" align="center">{listing.listingDetails}</Typography>
                    </a>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
            <Typography variant="body2"> Currently no listings available</Typography>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LocationDetails;
