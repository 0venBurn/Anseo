import React, { useState } from 'react';
import { Button} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion} from 'framer-motion';
import Header from './Header';
import '@fontsource/alegreya/400.css';
import '@fontsource/alegreya/700.css';
import './index.css';

const SubmitPage: React.FC = () => {
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
      <div className="flex flex-col items-center justify-center h-screen text-black bg-gray-100">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mt-32"
        >
          <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Alegreya' }}>
            Are you satisfied with your selections and ready to submit your preferences?
          </h1>
          <p className="text-2xl mb-6">
            Discover your ideal business location in New York
            <br />
            with tailored solutions for your unique business needs.
          </p>
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
              sx={{ backgroundColor: '#DEDA6D', color: 'white', borderRadius: '5px', padding: '0.75rem 3rem' }}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
          <div className="flex flex-col items-center w-full mt-6 md:mt-24">
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
                onClick={() => navigate('/borough')}
                startIcon={<ArrowBackIcon />}
              >
                Back
              </Button>
            </div>
            <div className="flex justify-center mt-4 space-x-2">
              <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
              <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
              <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
              <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
              <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
              <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SubmitPage;
