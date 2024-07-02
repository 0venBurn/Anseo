import React, { useState } from 'react';
import { Button, Slider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './Header';
import '@fontsource/alegreya/400.css';
import '@fontsource/alegreya/700.css';
import './index.css';

const ExtraPage: React.FC = () => {
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
    rentBudget
  } = location.state || {};
  const [genderRatio, setGenderRatio] = useState<number>(0.5);
  const [employmentStatus, setEmploymentStatus] = useState<string | null>(null);
  const [homeValue, setHomeValue] = useState<number>(3000); // Default home value
  const [populationDensity, setPopulationDensity] = useState<number>(0.5); // Default population density
  const navigate = useNavigate();

  const handleNext = () => {
    // Navigate to the next page with state
    navigate('/borough', {
      state: {
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
        populationDensity
      }
    });
  };

  return (
    <>
      <Header />
      <div className="relative h-full flex flex-col items-center justify-center text-black bg-gray-100">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mt-24 px-4 md:px-10 flex-grow md:mt-32"
        >
          {/* Question 1: Gender Ratio */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Alegreya' }}>
              1. What is the gender ratio? <span className="text-red-500">*</span>
            </h1>
            <Slider
              value={genderRatio}
              onChange={(e, newValue) => setGenderRatio(newValue as number)}
              valueLabelDisplay="off"
              min={0}
              max={1}
              step={0.01}
              marks={[
                { value: 0, label: 'All Men' },
                { value: 1, label: 'All Women' }
              ]}
              className="w-full max-w-md"
            />
          </div>
          
          {/* Question 2: Employment Status */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Alegreya' }}>
              2. What is the employment status? <span className="text-red-500">*</span>
            </h1>
            <div className="grid grid-cols-3 gap-4">
              {['Full Time', 'Part Time', 'No Earnings'].map(option => (
                <button
                  key={option}
                  className={`w-full h-16 py-4 px-8 rounded-lg text-xl font-bold flex items-center justify-center border-2 ${
                    employmentStatus === option ? 'bg-purple-900 text-white' : 'bg-transparent text-purple-900'
                  }`}
                  onClick={() => setEmploymentStatus(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: Home Value */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Alegreya' }}>
              3. What is the home value? <span className="text-red-500">*</span>
            </h1>
            <Slider
              value={homeValue}
              onChange={(e, newValue) => setHomeValue(newValue as number)}
              valueLabelDisplay="off"
              min={1000}
              max={5000}
              step={100}
              marks={[
                { value: 1000, label: '< $1000' },
                { value: 5000, label: '$5000' }
              ]}
              className="w-full max-w-md"
            />
          </div>

          {/* Question 4: Population Density */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Alegreya' }}>
              4. What is the population density? <span className="text-red-500">*</span>
            </h1>
            <Slider
              value={populationDensity}
              onChange={(e, newValue) => setPopulationDensity(newValue as number)}
              valueLabelDisplay="off"
              min={0}
              max={1}
              step={0.01}
              marks={[
                { value: 0, label: 'Low Density' },
                { value: 1, label: 'High Density' }
              ]}
              className="w-full max-w-md"
            />
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex flex-col items-center w-full mt-6 md:mb-12">
            <div className="flex justify-between w-full max-w-md px-4">
              <Button 
                variant="contained" 
                sx={{
                  fontSize: '1.25rem',
                  padding: '0.75rem 2rem',
                  backgroundColor: '#D1D6F5',
                  color: 'black',
                  borderRadius: '50px',
                  '&:hover': {
                    backgroundColor: '#f89a93',
                  },
                }}
                onClick={() => navigate('/area', {
                  state: {
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
                    rentBudget
                  }
                })}
                startIcon={<ArrowBackIcon />}
              >
                Back
              </Button>
              <Button 
                variant="contained" 
                sx={{
                  fontSize: '1.25rem',
                  padding: '0.75rem 2rem',
                  backgroundColor: '#DEDA6D',
                  color: 'white',
                  borderRadius: '50px',
                  '&:hover': {
                    backgroundColor: '#f14624',
                  },
                }}
                onClick={handleNext}
                endIcon={<ArrowForwardIcon />}
              >
                Next
              </Button>
            </div>
            <div className="flex justify-center mt-4 space-x-2">
              <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
              <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
              <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
              <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
              <div className="w-3 h-3 border-2 border-purple-900 rounded-full"></div>
              <div className="w-3 h-3 border-2 border-purple-900 rounded-full"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ExtraPage;
