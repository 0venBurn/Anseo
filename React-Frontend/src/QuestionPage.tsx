import React, { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery, useTheme } from '@mui/material';
import '@fontsource/alegreya/400.css';
import '@fontsource/alegreya/700.css';
import './index.css'; 

const QuestionPage: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // If the option is already in the selected array, remove it from the array;
  //  If there are fewer than two selected options, add options; Otherwise, no action will be taken
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

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="relative h-screen bg-gray-100 text-black flex flex-col"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 w-full bg-blue-900 text-white flex justify-between items-center py-4 px-4 md:px-20">
        <div 
          className="text-3xl md:text-5xl font-bold text-orange-600 cursor-pointer" 
          style={{ fontFamily: 'Fredoka One' }}
          onClick={() => navigate('/')}
        >
          ANSEO
        </div>
        <div className="flex space-x-4 items-center">
          <Button 
            variant="outlined" 
            sx={{ 
              borderColor: 'white', 
              color: 'white', 
              borderRadius: '20px', 
              padding: isMobile ? '0.15rem 0.75rem' : '0.25rem 1rem',
              boxShadow: 'none',
              fontSize: isMobile ? '0.75rem' : '1rem' 
            }}
            onClick={() => navigate('/login')}
          >
            Log In
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            sx={{ 
              backgroundColor: 'red', 
              color: 'white', 
              borderRadius: isMobile ? '20px' : '5px',
              boxShadow: 'none',
              fontSize: isMobile ? '0.75rem' : '1rem'
            }}
            onClick={() => navigate('/signin')}
          >
            Sign Up
          </Button>
          {isMobile && (
            <IconButton color="inherit" onClick={handleMenuToggle}>
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          )}
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 w-full bg-blue-900 text-white flex flex-col items-center py-4"
          >
            <Button 
              variant="text" 
              sx={{ color: 'white', fontSize: '1rem' }}
              onClick={() => {
                navigate('/about');
                setMenuOpen(false);
              }}
            >
              About
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex flex-col items-center text-center mt-24 px-4 md:px-10 flex-grow md:mt-32">
        <h1 className="text-3xl font-bold mb-10" style={{ fontFamily: 'Alegreya' }}>
          1. What factors are most important to you when choosing the perfect location for your business? <span className="text-red-500">*</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 w-full max-w-md md:mb-12">
          {[
            { label: 'Affordability', icon: <span>&#36;</span> },
            { label: 'Footfall', icon: <span>&#128101;</span> },
            { label: 'Connectivity', icon: <span>&#128652;</span> },
            { label: 'Public safety', icon: <span>&#128110;</span> },
            { label: 'Option W', icon: <span>&#127979;</span> },
            { label: 'Option X', icon: <FavoriteIcon /> },
            { label: 'Option Y', icon: <FavoriteIcon /> },
            { label: 'Option Z', icon: <span>&#127794;</span> }
          ].map(option => (
            <button
              key={option.label}
              className={`w-full h-16 py-4 px-8 rounded-lg text-xl font-bold flex items-center justify-center border-2 ${
                selected.includes(option.label) ? 'bg-purple-900 text-white' : 'bg-transparent text-purple-900'
              }`}
              onClick={() => handleSelect(option.label)}
            >
              {option.icon}
              <span className="ml-2">{option.label}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-col items-center w-full mt-6 md:mb-12">
          <div className="flex justify-between w-full max-w-md px-4">
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
              onClick={() => navigate('/welcome')}
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
              onClick={() => navigate('/borough')}
              endIcon={<ArrowForwardIcon />}
            >
              Next
            </Button>
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
            <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
            <div className="w-3 h-3 border-2 border-purple-900 rounded-full"></div>
            <div className="w-3 h-3 border-2 border-purple-900 rounded-full"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionPage;
