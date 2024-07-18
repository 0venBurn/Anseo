import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import AuthenticationButton from './components/AuthenticationButton';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from 'framer-motion';
import Header from './Header';
import './index.css';
import LinearGradientCircle from './components/LinearGradientCircle';

const SubmitPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (e.currentTarget.textContent === 'Continue as Guest') {
      navigate('/map');
    } else {
      navigate('/sign-up');
    } 
  }

  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
        className="relative h-screen flex items-start justify-between text-black bg-gray-100"
      >
        <div className="flex flex-col text-left mt-40 ml-20 w-full max-w-full">
          <h1 className="text-primary-text-dark text-6xl font-bold font-alegreya mb-4 whitespace-nowrap">
            Ready to view your results?
          </h1>
          <p className="text-xl font-commissioner mb-6 text-primary-text-dark">
            Discover your ideal business location in New York
            with tailored solutions for your unique business needs.
          </p>
          <p className="text-xl font-commissioner mb-12 text-primary-text-dark">
            Create an account to save your results and access additional features or continue as a guest.
          </p>
          <div>
          <div className="flex gap-8 max-w-2xl">
            <AuthenticationButton text='Continue as Guest' handleSubmit={handleSubmit} />
            <AuthenticationButton text='Create an Account' handleSubmit={handleSubmit} />
          </div>
            <p className="font-inter text-sm mt-2">
              By continuing, you agree to our{' '}
              <a href="/terms" className="text-blue-500">Terms of Service</a> and{' '}
              <a href="/privacy" className="text-blue-500">Privacy Policy</a>
            </p>
          </div>
        </div>
        <div className="absolute bottom-10 flex flex-col items-center w-full">
          <div className="flex justify-center mb-4">
            <Button 
              variant="contained" 
              sx={{
                fontSize: '1.25rem',
                fontFamily: 'Commissioner',  
                fontWeight: 'regular',
                textTransform: 'none',
                padding: '0.5rem 1rem',
                backgroundColor: '#D1D6F5',
                color: 'black',
                borderRadius: '50px',
                '&:hover': {
                  backgroundColor: '#f89a93',
                },
                mr: 2
              }}
              onClick={() => navigate('/borough')}
              startIcon={<ArrowBackIcon />}
            >
              Back
            </Button>
          </div>
        </div>
        <LinearGradientCircle />
      </motion.div>
    </>
  );
};

export default SubmitPage;
