import React, { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '@fontsource/alegreya/400.css';
import '@fontsource/alegreya/700.css';

const BoroughPage: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSelect = (option: string) => {
    setSelected(prevSelected => {
      if (prevSelected.includes(option)) {
        return prevSelected.filter(item => item !== option);
      } else if (prevSelected.length < 2) {
        return [...prevSelected, option];
      } else {
        return prevSelected;
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="relative h-screen bg-gray-100 text-black flex flex-col items-center justify-between"
    >
      <div className="w-full flex justify-between items-center py-4 px-10 bg-purple-900 text-white">
        <div 
          className="text-5xl font-bold text-orange-600 cursor-pointer"
          onClick={() => navigate('/')}
        >
          ANSEO
        </div>
        <div className="flex space-x-4">
          <button className="text-2xl font-bold" onClick={() => navigate('/about')}>ABOUT</button>
          <IconButton color="inherit" onClick={() => navigate('/login')}>
            <AccountCircle />
          </IconButton>
        </div>
      </div>
      <div className="flex flex-col items-center text-center mt-20 px-10">
        <h1 className="text-3xl font-bold mb-20" style={{ fontFamily: 'Alegreya' }}>
        2. Which boroughs are you most interested in for your business location? <span className="text-red-500">*</span>
        </h1>
        <div className="grid grid-cols-2 gap-4 mb-10">
          {[
            { label: 'Manhattan'},
            { label: 'Brooklyn'},
            { label: 'Queens' },
            { label: 'The Bronx' },
            { label: 'Staten Island' },
            { label: 'No preference' },
          ].map(option => (
            <button
              key={option.label}
              className={`w-48 h-16 py-4 px-8 rounded-lg text-xl font-bold flex items-center justify-center border-2 ${
                selected.includes(option.label) ? 'bg-purple-900 text-white' : 'bg-transparent text-purple-900'
              }`}
              onClick={() => handleSelect(option.label)}
            >
              <span className="ml-2">{option.label}</span>
            </button>
          ))}
        </div>
        <div className="flex justify-between w-full px-40 mt-10">
          <Button 
            variant="contained" 
            sx={{
              fontSize: '1.25rem',
              padding: '0.75rem 2rem',
              backgroundColor: '#f8b0a9',
              color: 'black',
              borderRadius: '50px',
              '&:hover': {
                backgroundColor: '#f89a93',
              },
            }}
            onClick={() => navigate('/questions')}
            startIcon={<ArrowBackIcon />}
          >
            Back
          </Button>
          <Button 
            variant="contained" 
            sx={{
              fontSize: '1.25rem',
              padding: '0.75rem 2rem',
              backgroundColor: '#f16449',
              color: 'white',
              borderRadius: '50px',
              '&:hover': {
                backgroundColor: '#f14624',
              },
            }}
            onClick={() => navigate('/submit')}
            endIcon={<ArrowForwardIcon />}
          >
            Next
          </Button>
        </div>
      </div>
      <div className="absolute bottom-10 w-full flex justify-center space-x-2">
        <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
        <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
        <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
        <div className="w-3 h-3 border-2 border-purple-900 rounded-full"></div>
      </div>
    </motion.div>
  );
};

export default BoroughPage;
