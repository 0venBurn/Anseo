import React, { useState } from 'react';
import { Button, TextField, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './Header';
import '@fontsource/alegreya/400.css';
import '@fontsource/alegreya/700.css';
import './index.css';

const TestPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();


  const {
    businessType,
    openHour,
    closeHour,
    budget,
    selectedAgeGroup,
    ageImportance,
    selectedIncomeLevel,
    incomeImportance,
    targetGroup,
    proximityImportance,
    footfallImportance,
    surroundingBusinessesImportance,
    rentBudget,
    genderRatio,
    employmentStatus,
    homeValue,
    populationDensity,
    selectedBoroughs,
    areaType
  } = location.state || {};

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      'data': {
        businessType,
        openHour,
        closeHour,
        budget,
        selectedAgeGroup,
        ageImportance,
        selectedIncomeLevel,
        incomeImportance,
        targetGroup,
        proximityImportance,
        footfallImportance,
        surroundingBusinessesImportance,
        rentBudget,
        genderRatio,
        employmentStatus,
        homeValue,
        populationDensity,
        selectedBoroughs,
        areaType
      }
    };

    try {
      const response = await fetch('http://localhost:8000/api/v1/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      console.log(payload)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      navigate('/map', { state: { selectedBoroughs, predictions: data } });

    } catch (error) {
      console.error('There was an error!', error);
      
    } finally {
      setIsLoading(false);
    }
  };

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
        <div className="flex flex-col items-start text-left mt-40 ml-20 w-full max-w-full">
          <h1 className="text-indigo-900 text-6xl font-bold font-['Alegreya'] mb-4 whitespace-nowrap">
            Ready to view your results?
          </h1>
          <p className="text-[20px] mb-6 text-indigo-900">
            Discover your ideal business location in New York
            with tailored solutions for your unique business needs.
          </p>
          <div className="w-full max-w-xs">
            <TextField
              label="email@domain.com"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              inputProps={{ style: { padding: '10px' } }} 
            />
            <TextField
              label="email@domain.com"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              inputProps={{ style: { padding: '10px' } }} 
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#DEDA6D',
                color: 'black',
                borderRadius: '5px',
                padding: '10px', 
                mb: 2,
                width: '100%'
              }}
              onClick={() => console.log('Login with Email')}
            >
              Login with Email
            </Button>
            <Divider sx={{ mb: 2 }}>or</Divider>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                borderColor: 'black',
                color: 'black',
                borderRadius: '5px',
                padding: '10px', 
                mb: 2,
                width: '100%'
              }}
              onClick={() => console.log('Continue with Google')}
            >
              <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" style={{ marginRight: '10px' }} />
              Google
            </Button>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#DEDA6D',
                color: 'black',
                borderRadius: '5px',
                padding: '10px',
                mb: 2,
                width: '100%'
              }}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Continue as Guest'}
            </Button>
            <p className="text-sm mt-2">
              By clicking continue, you agree to our{' '}
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
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 right-10">
          <div
            className="w-64 h-64 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #FF7E5F, #FFD194, #FFE29A, #B8CBB8, #6BC3B1)',
            }}
          ></div>
        </div>
      </motion.div>
    </>
  );
};

export default TestPage;
