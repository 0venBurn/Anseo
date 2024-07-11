import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';

interface LocationCardProps {
  location: {
    name: string;
    borough: string;
    description: string;
    rating: number;
    photoPath: string;
    zipcode: string;
  };
  onLearnMore: (location: any) => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, onLearnMore }) => {
  // calculate star
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
    <Grid item xs={12} sm={6}>
      <Card
        style={{ display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer' }}
        onClick={() => onLearnMore(location)}
      >
        <img src={location.photoPath} alt={location.name} style={{ height: 200, objectFit: 'cover' }} />
        <CardContent style={{ backgroundColor: '#F5F5F5', flex: '1 0 auto' }}>
          <Typography variant="h6">{location.name}</Typography>
          <Typography variant="body2" color="textSecondary">{location.borough}</Typography>
          <Typography variant="body2">{location.description}</Typography>
          <Box display="flex" alignItems="center" mt={1}>
            <Typography variant="body2" style={{ marginRight: 4 }}>{location.rating.toFixed(2)}</Typography>
            {/* render star */}
            {renderStars(location.rating)}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default LocationCard;
