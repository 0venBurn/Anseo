// WelcomePage.tsx
import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './Header';
import '@fontsource/alegreya/400.css';
import '@fontsource/alegreya/700.css';
import './index.css';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      {/* Animated Main Content */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
        className="relative h-screen flex items-start justify-between text-black bg-gray-100"
      >
        <div className="flex flex-col items-start text-left mt-40 ml-20 w-full max-w-full">
          <h1
            className="text-indigo-900 text-7xl font-bold font-['Alegreya'] mb-4 whitespace-nowrap"
          >
            Welcome to Anseo, the place to be.
          </h1>
          <p className="text-2xl mb-6">
            Discover your ideal business location in New York
            <br />
            with tailored solutions for your unique business needs.
          </p>
          <p className="text-lg mb-6 max-w-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Dictumst
            quisque sagittis purus sit amet volutpat consequat mauris. Orci eu
            lobortis elementum nibh tellus molestie nunc non blandit.
          </p>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#DEDA6D',
              color: 'black',
              borderRadius: '5px',
              padding: '0.75rem 3rem',
              boxShadow: 'none',
            }}
            onClick={() => navigate('/questions')}
          >
            Next
          </Button>
        </div>
        <div className="flex items-end justify-end w-1/3 h-full pr-20 pb-20">
          <div
            className="w-64 h-64 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #FF7E5F, #FFD194, #FFE29A, #B8CBB8, #6BC3B1)',
            }}
          ></div>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-10 flex space-x-2 left-1/2 transform -translate-x-1/2">
          <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
        </div>
      </motion.div>
    </>
  );
};

export default WelcomePage;
