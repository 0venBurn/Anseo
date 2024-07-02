import React, { useState } from 'react';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion} from 'framer-motion';
import Header from './Header';
import '@fontsource/alegreya/400.css';
import '@fontsource/alegreya/700.css';
import './index.css';

const BoroughPage: React.FC = () => {
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
    populationDensity
  } = location.state || {};
  
  const [selectedBoroughs, setSelectedBoroughs] = useState<string[]>([]);
  const [areaType, setAreaType] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();



  const handleSelectBorough = (option: string) => {
    setSelectedBoroughs(prevSelected => {
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

  const handleSelectAreaType = (option: string) => {
    setAreaType(option);
    setError(null);
  };

  const handleSubmit = () => {
    if (selectedBoroughs.length > 0 && areaType) {
      navigate('/submit', {
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
          populationDensity,
          selectedBoroughs,
          areaType
        }
      });
    } else {
      setError('You need to select at least one borough and an area type');
    }
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
          <h1 className="text-3xl font-bold mb-6 md:mb-12" style={{ fontFamily: 'Alegreya' }}>
            1. Which boroughs are you most interested in for your business location? <span className="text-red-500">*</span>
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
                  selectedBoroughs.includes(option.label) ? 'bg-purple-900 text-white' : 'bg-transparent text-purple-900'
                }`}
                onClick={() => handleSelectBorough(option.label)}
              >
                <span className="ml-2">{option.label}</span>
              </button>
            ))}
          </div>
          <h1 className="text-3xl font-bold mb-6 md:mb-12" style={{ fontFamily: 'Alegreya' }}>
            2. What type of area would you like to set up in? <span className="text-red-500">*</span>
          </h1>
          <div className="grid grid-cols-2 gap-4 mb-6 w-full max-w-md md:mb-12">
            {[
              { label: 'Residential'},
              { label: 'Business oriented' },
            ].map(option => (
              <button
                key={option.label}
                className={`w-full h-16 py-4 px-8 rounded-lg text-xl font-bold flex items-center justify-center border-2 ${
                  areaType === option.label ? 'bg-purple-900 text-white' : 'bg-transparent text-purple-900'
                }`}
                onClick={() => handleSelectAreaType(option.label)}
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
              <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
              <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
              <div className="w-3 h-3 border-2 border-purple-900 rounded-full"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default BoroughPage;
