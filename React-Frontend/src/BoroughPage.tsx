import React, { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import { useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '@fontsource/alegreya/400.css';
import '@fontsource/alegreya/700.css';
import './index.css';

const BoroughPage: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
    setError(null);
  };

  // If at least one administrative region is selected, navigate to the/submit page and 
  // pass the selected administrative region as the status; Otherwise, set the error message.
  const handleSubmit = () => {
    if (selected.length > 0) {
      navigate('/submit', { state: { selectedBoroughs: selected } });
    } else {
      setError('You need to select at least one borough');
    }
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
        <h1 className="text-3xl font-bold mb-6 md:mb-12" style={{ fontFamily: 'Alegreya' }}>
          2. Which boroughs are you most interested in for your business location? <span className="text-red-500">*</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 w-full max-w-md md:mb-12">
          {[
            { label: 'Manhattan'},
            { label: 'Brooklyn'},
            { label: 'Queens' },
            { label: 'Bronx' },
            { label: 'Staten Island' },
            { label: 'No preference' },
          ].map(option => (
            <button
              key={option.label}
              className={`w-full h-16 py-4 px-8 rounded-lg text-xl font-bold flex items-center justify-center border-2 ${
                selected.includes(option.label) ? 'bg-purple-900 text-white' : 'bg-transparent text-purple-900'
              }`}
              onClick={() => handleSelect(option.label)}
            >
              <span className="ml-2">{option.label}</span>
            </button>
          ))}
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex flex-col items-center w-full mt-6 md:mt-12">
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
              onClick={handleSubmit}
              endIcon={<ArrowForwardIcon />}
            >
              Next
            </Button>
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
            <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
            <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
            <div className="w-3 h-3 border-2 border-purple-900 rounded-full"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BoroughPage;
