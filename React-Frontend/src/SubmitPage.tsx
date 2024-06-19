import React, { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import { useMediaQuery, useTheme } from '@mui/material';
import '@fontsource/alegreya/400.css';
import '@fontsource/alegreya/700.css';
import './index.css';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedBoroughs } = location.state || { selectedBoroughs: [] };
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="relative h-screen flex flex-col items-center justify-center text-black bg-gray-100"
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
      <div className="flex flex-col items-center text-center mt-32">
        <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Alegreya' }}>Are you satisfied with your selections and ready to submit your preferences?</h1>
        <p className="text-2xl mb-6">Discover your ideal business location in New York<br />with tailored solutions for your unique business needs.</p>
        {/* dot line */}
        <div className="w-full flex justify-center items-center py-4 mb-10">
          <div className="relative flex items-center w-full max-w-4xl">
            <div className="absolute left-0 transform rotate-45 w-4 h-4 bg-black"></div>
            <div className="flex-grow border-t-2 border-dotted border-black"></div>
            <div className="absolute right-0 transform rotate-45 w-4 h-4 bg-black"></div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center py-4">
          <Button 
            variant="contained" 
            color="error" 
            sx={{ backgroundColor: '#F15C50', color: 'white', borderRadius: '5px', padding: '0.75rem 3rem' }}
            onClick={() => navigate('/map', { state: { selectedBoroughs } })}
          >
            Submit
          </Button>
        </div>
      </div>
      <div className="absolute bottom-10 flex space-x-2 items-center ">
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
            marginRight: '20px'
          }}
          onClick={() => navigate('/borough')}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
        <div className="flex space-x-2 ml-4">
          <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
          <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
          <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
          <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomePage;
