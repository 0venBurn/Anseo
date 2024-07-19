import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Button } from '@mui/material';
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
  // Calculate star rating
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
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          cursor: 'pointer',
          backgroundColor: '#F5F5F5',
          borderRadius: '12px', // Increased border radius for rounded corners
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Added box shadow for a subtle shadow effect
          transition: 'transform 0.2s', // Added transition for hover effect
        }}
        onClick={() => onLearnMore(location)}
        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <img 
          src={location.photoPath} 
          alt={location.name} 
          style={{ 
            height: 160, 
            objectFit: 'cover', 
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
          }} 
        />
        <CardContent 
          style={{ 
            flex: '1 0 auto',
            padding: '16px 24px', // Adjusted padding
            borderBottomLeftRadius: '12px',
            borderBottomRightRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>{location.name}</Typography>
              <Box display="flex" alignItems="center">
                {/* Render star */}
                {renderStars(location.rating)}
                <Typography variant="body2" style={{ marginLeft: 4, fontWeight: 'bold' }}>{location.rating.toFixed(2)}</Typography>
              </Box>
            </Box>
            <Typography variant="body2" color="textSecondary" mb={1}>{location.borough}</Typography>
            <Typography variant="body2" color="textSecondary" mb={2}>{location.description}</Typography>
          </div>
          <Button variant="contained" color="primary" onClick={() => onLearnMore(location)} style={{ marginTop: '16px' }}>Learn More</Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default LocationCard;
