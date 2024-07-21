import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Rating } from '@mui/material';
import { Neighbourhood } from '../../utils/types';

interface NeighbourhoodCardProps {
  neighbourhood: Neighbourhood;
  onLearnMore: (neighbourhood: Neighbourhood) => void;
  isBestMatch: boolean;
}

const NeighbourhoodCard: React.FC<NeighbourhoodCardProps> = ({ neighbourhood, onLearnMore, isBestMatch }) => {
  return (
    <Grid item style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '25px' }}>
        <Card
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '410px',
            maxWidth: '250px',
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
          {isBestMatch && (
          <div style={{
            position: 'absolute',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            fontFamily: 'Commissioner',
            padding: '5px 10px',
            overflow: 'hidden',
            top: 0,
            left: 0,
            zIndex: 10, // Ensure this is above the card
            fontWeight: 'bold'
          }}>
            Best Match
          </div>
        )}
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
                <Typography variant="body2" color="textSecondary" style={{ fontFamily: 'Commissioner', fontSize: '16px' }}>{neighbourhood.borough}</Typography>
                <Box display="flex" alignItems="center">
                <Typography variant="body2" style={{ 
                  fontWeight: 500,  
                  color: '#2D345D',
                  fontFamily: 'Commissioner', }}>{neighbourhood.rating.toFixed(2)}
                  </Typography>
                  <Rating 
                    name="Neighbourhood Rating" 
                    value={neighbourhood.rating} 
                    precision={0.1} 
                    readOnly
                    sx={{
                      fontFamily: 'Commissioner',
                      color: '#2D345D',
                    }}
                  />
              </Box>
              <Typography variant="h6" style={{ fontWeight: 'bold', color: '#3B447A', fontFamily: 'Alegreya' }}>{neighbourhood.name}</Typography>
              <Typography variant="body2" style={{ color: '#3B447A', fontFamily: 'Alegreya', fontSize: '16px' }} mb={2}>{neighbourhood.description}</Typography>
            </div>
          </CardContent>
        </Card>
    </Grid>
  );
};

export default NeighbourhoodCard;
