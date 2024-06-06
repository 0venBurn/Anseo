import React from 'react';
import { Button, TextField, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '@fontsource/alegreya/400.css';
import '@fontsource/alegreya/700.css';

const SignInPage: React.FC = () => {
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
          <Button 
            variant="outlined" 
            sx={{ borderColor: 'white', color: 'white', borderRadius: '20px', padding: '0.25rem 1rem' }}
            onClick={() => navigate('/login')}
          >
            Log In
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            sx={{ backgroundColor: 'red', color: 'white', borderRadius: '5px' }}
            onClick={() => navigate('/signin')}
          >
            Sign Up
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center text-center mt-32">
        <h1 className="text-3xl font-bold mb-4">Sign up to your account</h1>
        <p className="text-lg mb-6">Enter your email and password to sign up</p>
        <TextField
          label="email@domain.com"
          variant="outlined"
          fullWidth
          sx={{ mb: 3, maxWidth: '400px' }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          sx={{ mb: 3, maxWidth: '400px' }}
        />
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ backgroundColor: 'black', color: 'white', borderRadius: '5px', padding: '0.75rem 3rem', mb: 2 }}
          onClick={() => console.log("Sign in with email")}
        >
          CREATE AN ACCOUNT
        </Button>
        <Divider sx={{ width: '400px', mb: 2 }}>or continue with</Divider>
        <Button 
          variant="outlined" 
          fullWidth
          sx={{ borderColor: 'black', color: 'black', borderRadius: '5px', padding: '0.75rem 3rem', mb: 2, maxWidth: '400px' }}
          onClick={() => console.log("Continue with Google")}
        >
          <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" style={{ marginRight: '10px' }} />
          Google
        </Button>
        <p className="text-sm mt-2">
          By clicking continue, you agree to our <a href="/terms" className="text-blue-500">Terms of Service</a> and <a href="/privacy" className="text-blue-500">Privacy Policy</a>
        </p>
      </div>
    </motion.div>
  );
};

export default SignInPage;
