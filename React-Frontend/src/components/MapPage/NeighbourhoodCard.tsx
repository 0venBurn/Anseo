import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import { useUser } from '@clerk/clerk-react';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Neighbourhood } from '../../utils/types';
import { saveUserFavouriteToDB, deleteUserFavouriteFromDB } from '../../utils/apiFunctions';
import NeighbourhoodRating from './NeighbourhoodRating';
import InfoTool from './Infotool';

interface NeighbourhoodCardProps {
  neighbourhood: Neighbourhood;
  onLearnMore: (neighbourhood: Neighbourhood) => void;
  isBestMatch: boolean;
  userFavourites: Neighbourhood[]
  setUserFavourites: React.Dispatch<React.SetStateAction<Neighbourhood[]>>
}

const NeighbourhoodCard: React.FC<NeighbourhoodCardProps> = ({ neighbourhood, onLearnMore, isBestMatch, userFavourites, setUserFavourites }) => {
  const { user } = useUser()
  let isBookmarked = userFavourites?.includes(neighbourhood) ? true : false;

  const handleClickBookmark = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (isBookmarked) {
      await deleteUserFavouriteFromDB(`${user && user.id}`, neighbourhood.neighbourhood_id)
      setUserFavourites((prev) => prev.filter( prev => prev !== neighbourhood))
      isBookmarked = false;
    } else {
      await saveUserFavouriteToDB(`${user && user.id}`, neighbourhood.neighbourhood_id)
      setUserFavourites((prev) => [...prev, neighbourhood])
      isBookmarked = true;
    }

  }
  return (
        <Card
          style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '350px',
            cursor: 'pointer',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s',
            position: 'relative', 
            zIndex: 1,
            overflow: 'hidden', 
            border: '1px solid #D1D6F5',
          }}
          onClick={() => onLearnMore(neighbourhood)}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          className="max-w-[85%] sm:max-w-[48%]"
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
        <div className='w-full'>
          <img
            src={neighbourhood.photoPath}
            alt={neighbourhood.name}
            style={{
              height: 160,
              width: '100%',
              objectFit: 'cover',
              overflow: 'hidden',
              borderBottom: '1px solid #D1D6F5',
            }}
            className='shadow-md'
            />
          </div>
          <CardContent
          className='flex flex-col justify-between'
          >
            <div>
                <Typography variant="body2" color="textSecondary" style={{ fontFamily: 'Commissioner', fontSize: '16px' }}>{neighbourhood.borough}</Typography>
                <NeighbourhoodRating rating={neighbourhood.rating} primary />
              <Typography variant="h6" style={{ 
                fontWeight: 'bold', 
                color: '#3B447A', 
                fontFamily: 'Alegreya',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '200px',
                whiteSpace: 'nowrap' }}>{neighbourhood.name}</Typography>
              <Typography className="cardEllipsis" variant="body2" style={{ 
                color: '#3B447A', 
                fontFamily: 'Commissioner', 
                fontSize: '16px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                flex: 'none'
               }} mb={2}>{neighbourhood.description}</Typography>
            </div>
          </CardContent>
            <div className='flex items-center justify-end'>
              <InfoTool
              title={isBookmarked ? 'Remove from your favourites' : 'Add to your favourites'}
              >
            <IconButton 
              onClick={handleClickBookmark} 
                sx={{
                        fontSize: '2rem',
                        margin: '0.5rem 1rem',
                        color: `${isBookmarked ? '#3B447A' : '#ABB0B4'}`,
                        "&:hover": {
                                backgroundColor: "#E8EAF6",
                        }
                }}>            
              <BookmarkIcon fontSize="inherit" />
              </IconButton>
              </InfoTool>
              </div>
        </Card>
  );
};

export default NeighbourhoodCard;
