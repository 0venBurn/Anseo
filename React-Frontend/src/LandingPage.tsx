import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '@fontsource/alegreya/400.css';
import '@fontsource/alegreya/700.css';
import '@fontsource/fredoka-one';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="relative h-screen flex flex-col items-center justify-center text-black"
    >
      <img 
        src="../public/img/landing.png" 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-5xl font-bold text-orange-600" style={{ fontFamily: 'Fredoka-One' }}>ANSEO</div>
      <div className="absolute top-4 right-10 flex space-x-4">
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
      <div className="relative z-10 flex flex-col items-center text-center mt-20">
        <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Alegreya' }}>The place to be.</h1>
        <p className="text-2xl mb-6">Discover your ideal business location in New York<br />with tailored solutions for your unique business needs.</p>
      </div>
      <div className="relative z-10 flex space-x-4 mt-10">
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
  );
};

export default LandingPage;
