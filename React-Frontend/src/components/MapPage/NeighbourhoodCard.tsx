import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { Neighbourhood } from '../../types';

interface NeighbourhoodCardProps {
  neighbourhood: Neighbourhood;
  onLearnMore: (neighbourhood: Neighbourhood) => void;
  isBestMatch: boolean;
}

const NeighbourhoodCard: React.FC<NeighbourhoodCardProps> = ({ neighbourhood, onLearnMore, isBestMatch }) => {
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
    <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center', padding: '25px' }}>
      <div style={{ position: 'relative', width: '300px' }}>
        {isBestMatch && (
          <div style={{
            position: 'absolute',
            backgroundColor: 'black',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            top: '10px',
            left: '10px',
            zIndex: 10, // Ensure this is above the card
            fontWeight: 'bold'
          }}>
            Best Match
          </div>
        )}
        <Card
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '400px',
            width: '300px',
            cursor: 'pointer',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s',
            position: 'relative', // Ensure card is positioned relative to its container
            overflow: 'hidden', // Ensure content does not overflow
          }}
          onClick={() => onLearnMore(neighbourhood)}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <img
            src={neighbourhood.photoPath}
            alt={neighbourhood.name}
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
              padding: '16px 24px',
              borderBottomLeftRadius: '12px',
              borderBottomRightRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: '#F5F5F5',
            }}
          >
            <div>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="body2" color="textSecondary" style={{ fontFamily: 'Commissioner', fontSize: '16px' }}>{neighbourhood.borough}</Typography>
                <Box display="flex" alignItems="center">
                  {renderStars(neighbourhood.rating)}
                  <Typography variant="body2" style={{ marginLeft: 4, fontWeight: 'bold' }}>{neighbourhood.rating.toFixed(2)}</Typography>
                </Box>
              </Box>
              <Typography variant="h6" style={{ fontWeight: 'bold', color: '#3B447A', fontFamily: 'Alegreya' }}>{neighbourhood.name}</Typography>
              <Typography variant="body2" style={{ color: '#3B447A', fontFamily: 'Alegreya', fontSize: '16px' }} mb={2}>{neighbourhood.description}</Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    </Grid>
  );
};

export default NeighbourhoodCard;
