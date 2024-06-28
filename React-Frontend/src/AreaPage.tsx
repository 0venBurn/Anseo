import React, { useState } from 'react';
import { Button, IconButton, Slider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMediaQuery, useTheme } from '@mui/material';
import '@fontsource/alegreya/400.css';
import '@fontsource/alegreya/700.css';
import './index.css';

const AreaPage: React.FC = () => {
  const location = useLocation();
  const {
    businessType,
    openHour,
    closeHour,
    budget,
    selectedAgeGroups,
    ageImportance,
    selectedIncomeLevels,
    incomeImportance,
    targetGroup
  } = location.state || {};
  const [proximityImportance, setProximityImportance] = useState<number>(0.5);
  const [footfallImportance, setFootfallImportance] = useState<number>(0.5);
  const [surroundingBusinessesImportance, setSurroundingBusinessesImportance] = useState<number>(0.5);
  const [rentBudget, setRentBudget] = useState<number>(2500); // Default budget value
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNext = () => {
    // Navigate to the next page with state
    navigate('/borough', {
      state: {
        businessType,
        openHour,
        closeHour,
        budget,
        selectedAgeGroups,
        ageImportance,
        selectedIncomeLevels,
        incomeImportance,
        targetGroup,
        proximityImportance,
        footfallImportance,
        surroundingBusinessesImportance,
        rentBudget
      }
    });
  };

  return (
    <>
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
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center mt-24 px-4 md:px-10 flex-grow md:mt-32"
      >
        {/* Question 1: Proximity to Public Transportation */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Alegreya' }}>
            How important is proximity to public transportation for your business? <span className="text-red-500">*</span>
          </h1>
          <Slider
            value={proximityImportance}
            onChange={(e, newValue) => setProximityImportance(newValue as number)}
            valueLabelDisplay="off"
            min={0}
            max={1}
            step={0.01}
            marks={[
              { value: 0, label: 'Not important' },
              { value: 1, label: 'Important' }
            ]}
            className="w-full max-w-md"
          />
        </div>
        
        {/* Question 2: High Footfall */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Alegreya' }}>
            How important is high footfall? <span className="text-red-500">*</span>
          </h1>
          <Slider
            value={footfallImportance}
            onChange={(e, newValue) => setFootfallImportance(newValue as number)}
            valueLabelDisplay="off"
            min={0}
            max={1}
            step={0.01}
            marks={[
              { value: 0, label: 'Not important' },
              { value: 1, label: 'Important' }
            ]}
            className="w-full max-w-md"
          />
        </div>
        
        {/* Question 3: Surrounding Businesses */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Alegreya' }}>
            How important is being surrounded by similar businesses? <span className="text-red-500">*</span>
          </h1>
          <Slider
            value={surroundingBusinessesImportance}
            onChange={(e, newValue) => setSurroundingBusinessesImportance(newValue as number)}
            valueLabelDisplay="off"
            min={0}
            max={1}
            step={0.01}
            marks={[
              { value: 0, label: 'Not important' },
              { value: 1, label: 'Important' }
            ]}
            className="w-full max-w-md"
          />
        </div>

        {/* Question 4: Budget for Monthly Rent */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Alegreya' }}>
            What is your budget for monthly rent (including utilities) for your business location? <span className="text-red-500">*</span>
          </h1>
          <Slider
            value={rentBudget}
            onChange={(e, newValue) => setRentBudget(newValue as number)}
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
        
        {/* Navigation Buttons */}
        <div className="flex flex-col items-center w-full mt-6 md:mb-12">
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
              onClick={() => navigate('/target', {
                state: {
                  businessType,
                  openHour,
                  closeHour,
                  budget,
                  selectedAgeGroups,
                  ageImportance,
                  selectedIncomeLevels,
                  incomeImportance,
                  targetGroup
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
                backgroundColor: '#f16449',
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
    </>
  );
};

export default AreaPage;
