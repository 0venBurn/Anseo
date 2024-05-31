import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
  return (
    <div className="relative h-screen flex flex-col items-center justify-center text-white">
      <img 
        src="../public/img/landing.png" 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-4xl font-bold">ANSEO</div>
      <div className="absolute top-4 right-4 flex space-x-4">
        <button className="text-2xl font-bold">ABOUT</button>
        <button className="text-2xl font-bold">SIGN IN</button>
      </div>
      <div className="relative z-10 flex flex-col items-center text-center mt-12">
        <h1 className="text-5xl font-bold mb-6">WE'LL TAKE IT FROM HERE</h1>
        <p className="text-2xl mb-8">All-in-one source for business real estate prospects</p>
      </div>
      <div className="absolute bottom-20 flex justify-center w-full">
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ fontSize: '1.5rem', padding: '0.75rem 1.5rem' }}
          onClick={() => navigate('/questions')}
        >
          START PROSPECTING
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
