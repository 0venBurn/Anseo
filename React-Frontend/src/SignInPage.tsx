import React, { useState } from 'react';
import { Button, TextField, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './Header';
import '@fontsource/alegreya/400.css';
import '@fontsource/alegreya/700.css';
import './index.css';

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');

  return (
    <>
      <Header />
      <div
        className="flex flex-col items-center justify-center h-screen text-black"
        style={{
          background: 'linear-gradient(135deg, #63A2BA, #929FE9, #D1CB14)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mt-32 bg-white p-6 rounded-lg"
          style={{ maxWidth: '400px' }}
        >
          <h1 className="text-3xl font-bold mb-4">Create Your Account</h1>
          <p className="text-lg mb-6">Enter your details to get started with Anseo</p>
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#E0E0E0',
              color: 'black',
              borderRadius: '5px',
              padding: '0.75rem 3rem',
              mb: 2,
              maxWidth: '400px',
              width: '100%',
            }}
            onClick={() => console.log('Continue with Google')}
          >
            <img
              src="https://img.icons8.com/color/16/000000/google-logo.png"
              alt="Google"
              style={{ marginRight: '10px' }}
            />
            Continue with Google
          </Button>
          <Divider sx={{ mb: 2, width: '100%' }}>or</Divider>
          <div className="w-full mb-3 text-left">
            <Typography variant="subtitle1" component="label" htmlFor="fullName">
              Full Name<span className="text-red-500">*</span>
            </Typography>
            <TextField
              id="fullName"
              label=""
              placeholder="Full Name"
              variant="outlined"
              fullWidth
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div className="w-full mb-3 text-left">
            <Typography variant="subtitle1" component="label" htmlFor="email">
              Email Address<span className="text-red-500">*</span>
            </Typography>
            <TextField
              id="email"
              label=""
              placeholder="email@domain.com"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: '#D1CB14',
              color: 'black',
              borderRadius: '5px',
              padding: '0.75rem 3rem',
              mb: 2,
              width: '100%',
            }}
            onClick={() => navigate('/password', { state: { fullname, email } })}
          >
            Continue
          </Button>
          <p className="text-sm mb-4">
            Already have an account? <a href="/login" className="text-blue-500">Log In</a>
          </p>
          <p className="text-sm mt-2">
            By clicking continue, you agree to our{' '}
            <a href="/terms" className="text-blue-500">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-blue-500">
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default SignInPage;
