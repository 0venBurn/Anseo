import React, { useState } from 'react';
import { Button, Slider, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMediaQuery, useTheme } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import Header from './Header';
import '@fontsource/alegreya/400.css';
import '@fontsource/alegreya/700.css';
import './index.css';

const TargetPage: React.FC = () => {
  const location = useLocation();
  const { businessType, openHour, closeHour, budget } = location.state || {};
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('');
  const [ageImportance, setAgeImportance] = useState<number>(0.5);
  const [selectedIncomeLevel, setSelectedIncomeLevel] = useState<string>('');
  const [incomeImportance, setIncomeImportance] = useState<number>(0.5);
  const [targetGroup, setTargetGroup] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNext = () => {
    // Navigate to the next page with state
    navigate('/area', {
      state: {
        businessType,
        openHour,
        closeHour,
        budget,
        selectedAgeGroup,
        ageImportance,
        selectedIncomeLevel,
        incomeImportance,
        targetGroup
      }
    });
  };

  const handleIncomeLevelSelect = (event: SelectChangeEvent<string>) => {
    setSelectedIncomeLevel(event.target.value as string);
  };

  const handleAgeGroupSelect = (event: SelectChangeEvent<string>) => {
    setSelectedAgeGroup(event.target.value as string);
  };

  // 可选择的年龄范围选项
  const ageOptions = [
    'Under 5 years',
    '5 to 9 years',
    '10 to 14 years',
    '15 to 19 years',
    '20 to 24 years',
    '25 to 29 years',
    '30 to 34 years',
    '35 to 39 years',
    '40 to 44 years',
    '45 to 49 years',
    '50 to 54 years',
    '55 to 59 years',
    '60 to 64 years',
    '65 to 69 years',
    '70 to 74 years',
    '75 to 79 years',
    '80 to 84 years',
    '85 years and over'
  ];

  // 可选择的收入水平选项
  const incomeOptions = [
    'annual_individual_earnings_Data_< $10,000',
    'annual_individual_earnings_Data_$10,000-$19,999',
    'annual_individual_earnings_Data_$20,000-$29,999',
    'annual_individual_earnings_Data_$30,000-$39,999',
    'annual_individual_earnings_Data_$40,000-$49,999',
    'annual_individual_earnings_Data_$50,000-$64,999',
    'annual_individual_earnings_Data_$65,000-$74,999',
    'annual_individual_earnings_Data_$75,000-$99,999',
    'annual_individual_earnings_Data_$100,000+'
  ];

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
          {/* Question 1: Target Customer Age Group */}
          <div className="mb-10 w-full max-w-md">
            <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Alegreya' }}>
              1. What is your target customer age group? <span className="text-red-500">*</span>
            </h1>
            <FormControl fullWidth>
              <InputLabel>Age Group</InputLabel>
              <Select
                value={selectedAgeGroup}
                onChange={handleAgeGroupSelect}
                label="Age Group"
              >
                {ageOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Alegreya' }}>
              How important is the age of your target customers? <span className="text-red-500">*</span>
            </h1>
            <Slider
              value={ageImportance}
              onChange={(e, newValue) => setAgeImportance(newValue as number)}
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
          
          {/* Question 2: Target Customer Income Level */}
          <div className="mb-10 w-full max-w-md">
            <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Alegreya' }}>
              2. What is your target customer income level? <span className="text-red-500">*</span>
            </h1>
            <FormControl fullWidth>
              <InputLabel>Income Level</InputLabel>
              <Select
                value={selectedIncomeLevel}
                onChange={handleIncomeLevelSelect}
                label="Income Level"
              >
                {incomeOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option.split('_').slice(-1)[0]} {/* 只显示数字部分 */}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Alegreya' }}>
              How important is the income of your target customers? <span className="text-red-500">*</span>
            </h1>
            <Slider
              value={incomeImportance}
              onChange={(e, newValue) => setIncomeImportance(newValue as number)}
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

          {/* Question 3: Targeting Families or Singles */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Alegreya' }}>
              3. Is your business targeting families or singles? <span className="text-red-500">*</span>
            </h1>
            <div className="grid grid-cols-2 gap-4">
              {['Families', 'Singles'].map(option => (
                <button
                  key={option}
                  className={`w-full h-16 py-4 px-8 rounded-lg text-xl font-bold flex items-center justify-center border-2 ${
                    targetGroup === option ? 'bg-purple-900 text-white' : 'bg-transparent text-purple-900'
                  }`}
                  onClick={() => setTargetGroup(option)}
                >
                  {option}
                </button>
              ))}
            </div>
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
                onClick={() => navigate('/questions')}
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
              <div className="w-3 h-3 border-2 border-purple-900 rounded-full"></div>
              <div className="w-3 h-3 border-2 border-purple-900 rounded-full"></div>
              <div className="w-3 h-3 border-2 border-purple-900 rounded-full"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default TargetPage;
