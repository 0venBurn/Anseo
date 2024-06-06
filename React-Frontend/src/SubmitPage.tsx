import React from 'react';
import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '@fontsource/alegreya/400.css';
import '@fontsource/alegreya/700.css';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="relative h-screen flex flex-col items-center justify-center text-black bg-gray-100"
    >
      <div className="absolute top-0 left-0 w-full bg-purple-900 text-white flex justify-between items-center py-4 px-10">
        <div 
          className="text-5xl font-bold text-orange-600 cursor-pointer"
          onClick={() => navigate('/')}
        >
          ANSEO
        </div>
        <div className="flex space-x-4">
          <button className="text-2xl font-bold" onClick={() => navigate('/about')}>ABOUT</button>
          <IconButton color="inherit" onClick={() => navigate('/login')}>
            <AccountCircle />
          </IconButton>
        </div>
      </div>
      <div className="flex flex-col items-center text-center mt-32">
        <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Alegreya' }}>Are you satisfied with your selections and ready to submit your preferences?</h1>
        <p className="text-2xl mb-6">Discover your ideal business location in New York<br />with tailored solutions for your unique business needs.</p>
        <div className="w-full flex justify-center items-center py-4">
          <Button 
            variant="contained" 
            color="error" 
            sx={{ backgroundColor: '#F15C50', color: 'white', borderRadius: '5px', padding: '0.75rem 3rem' }}
            onClick={() => navigate('/map')}
          >
            Submit
          </Button>
        </div>
      </div>
      <div className="absolute bottom-10 flex space-x-2 items-center ">
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
            marginRight: '20px'
          }}
          onClick={() => navigate('/borough')}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
        <div className="flex space-x-2 ml-4">
          <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
          <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
          <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
          <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomePage;
