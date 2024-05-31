import React, { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircle from '@mui/icons-material/AccountCircle';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import { useNavigate, Link } from 'react-router-dom';

const BoroughPage: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSelect = (option: string) => {
    setSelected(option);
  };

  return (
    <div className="relative h-screen bg-blue-400 text-white flex flex-col items-center justify-between">
      <div className="w-full flex justify-between items-center py-4 border-b border-white">
      <Link to="/" className="text-4xl font-bold ml-10">ANSEO</Link>
        <div className="flex space-x-4 items-center mr-10">
          <button className="text-2xl font-bold">ABOUT</button>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </div>
      </div>
      <div className="flex flex-col items-center text-center mt-12">
        <h1 className="text-5xl font-bold mb-10">What borough are you interested in?</h1>
        <div className="grid grid-cols-2 gap-4">
          {['Brooklyn', 'Manhatten', 'Queens', 'Bronx', 'Yonkers', 'New Jersey', 'Long Island', 'Midtown', 'Uptown', 'Jersey City'].map(option => (
            <button
              key={option}
              className={`w-48 h-16 py-4 px-8 rounded-full text-xl font-bold flex items-center justify-center ${
                selected === option ? 'bg-purple-600' : 'bg-gray-400'
              }`}
              onClick={() => handleSelect(option)}
            >
              {selected === option && <FavoriteIcon className="mr-2" />}
              <span>{option}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="w-full flex justify-center items-center py-4 border-t border-white mt-10 space-x-10">
        <Button 
          variant="contained" 
          sx={{
            fontSize: '1.25rem',
            padding: '0.75rem 2rem',
            backgroundColor: 'white',
            color: 'blue',
            borderRadius: '50px',
            '&:hover': {
              backgroundColor: '#e0e0e0',
            },
          }}
          onClick={() => navigate(-1)}
        >
          BACK
        </Button>
        <Button 
          variant="contained" 
          sx={{
            fontSize: '1.25rem',
            padding: '0.75rem 2rem',
            backgroundColor: 'white',
            color: 'blue',
            borderRadius: '50px',
            '&:hover': {
              backgroundColor: '#e0e0e0',
            },
          }}
          onClick={() => console.log('Button')}
        >
          NEXT
        </Button>
      </div>
    </div>
  );
};

export default BoroughPage;
