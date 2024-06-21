import React, { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '@fontsource/alegreya/400.css';
import '@fontsource/alegreya/700.css';
import '@fontsource/fredoka-one';
import './index.css';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  // Control open and close of the menu
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };
//If menuOpen is currently false (menu closed), when called, menuOpen will become true (menu open).
  return (
    <>
      <img 
        src="../public/img/landing.png" 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />
      {/* Blue navigation bar, used in Mobile  */}
      <div className="md:hidden absolute top-0 left-0 w-full bg-blue-900 text-white flex justify-between items-center py-4 px-4 md:px-20 z-50">
        <div 
          className="text-3xl md:text-5xl font-bold text-orange-600 cursor-pointer" style={{ fontFamily: 'Fredoka One' }}
          onClick={() => navigate('/')}
        >
          ANSEO
        </div>
        {/* Mobile buttons and menu icons */}
        <div className="flex md:hidden space-x-4 items-center">
          <Button 
            variant="outlined" 
            sx={{ 
              borderColor: 'white', 
              color: 'white', 
              borderRadius: '20px', 
              padding: '0.15rem 0.75rem',
              boxShadow: 'none',
              fontSize: '0.75rem'
            }}
            onClick={() => navigate('/login')}
          >
            Log In
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ 
              backgroundColor: 'red', 
              color: 'white', 
              borderRadius: '20px',
              boxShadow: 'none',
              fontSize: '0.75rem'
            }}
            onClick={() => navigate('/signin')}
          >
            Sign Up
          </Button>
          <IconButton color="inherit" onClick={handleMenuToggle}>
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </div>
      </div>
      {/* Use AnimaePresence and motion. div to achieve animated effects of menu opening and closing, 
      with an "About" button included in the menu. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 w-full bg-blue-900 text-white flex flex-col items-center py-4 z-50"
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
      {/* Desktop header */}
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="relative h-screen flex flex-col items-center justify-center text-black"
    >  
      <div className="hidden md:block absolute top-10 left-1/2 transform -translate-x-1/2 text-5xl font-bold text-orange-600" style={{ fontFamily: 'Fredoka One' }}>ANSEO</div>
      <div className="hidden md:flex absolute top-4 right-10 flex space-x-4">
        <Button 
          variant="outlined" 
          sx={{ borderColor: 'white', color: 'white', borderRadius: '20px', padding: '0.25rem 1rem' }}
          onClick={() => navigate('/login')}
        >
          Log In
        </Button>
        <Button 
          variant="contained" 
          color="error" 
          sx={{ backgroundColor: 'red', color: 'white', borderRadius: '5px' }}
          onClick={() => navigate('/signin')}
        >
          Sign Up
        </Button>
      </div>
      {/* Main contents */}
      <div className="relative z-10 flex flex-col items-center text-center mt-20">
        <h1 className="text-5xl font-bold mb-20 " style={{ fontFamily: 'Alegreya' }}>The place to be.</h1>
        <p className="text-2xl mb-6 ">Discover your ideal business location in New York<br />with tailored solutions for your unique business needs.</p>
      </div>
      <div className="relative z-10 flex space-x-4 mt-32 ">
        <Button 
          variant="contained" 
          color="error" 
          sx={{ fontFamily:'DM Mono', backgroundColor: 'red', color: 'white', borderRadius: '50px', padding: '0.5rem 2rem' }}
          onClick={() => navigate('/welcome')}
        >
          Start Now
        </Button>
        <Button 
          variant="outlined" 
          sx={{ fontFamily:'DM Mono', borderColor: 'rgba(255, 255, 255, 0.7)', color: 'black', backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '0.5rem 2rem', backdropFilter: 'blur(5px)' }}
          onClick={() => navigate('/about')}
        >
          About
        </Button>
      </div>
    </motion.div>
  </>
  );
};

export default LandingPage;
