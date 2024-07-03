import React from 'react';
import { Button, TextField, Divider, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Header from './Header';
import '@fontsource/alegreya/400.css';
import '@fontsource/alegreya/700.css';
import './index.css';

const LoginPage: React.FC = () => {
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
          <h1 className="text-3xl font-bold mb-4">Welcome Back.</h1>
          <p className="text-lg mb-6">Enter your details to continue</p>
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
          <div className="w-full mb-3">
            <Typography variant="subtitle1" component="label" htmlFor="email" className="block text-left mb-1">
              Email Address<span className="text-red-500">*</span>
            </Typography>
            <TextField
              id="email"
              label=""
              placeholder="email@domain.com"
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="w-full mb-3">
            <Typography variant="subtitle1" component="label" htmlFor="password" className="block text-left mb-1">
              Password<span className="text-red-500">*</span>
            </Typography>
            <TextField
              id="password"
              label=""
              type="password"
              variant="outlined"
              fullWidth
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
            onClick={() => console.log('Log In')}
          >
            Log In
          </Button>
          <a href="/forgot-password" className="text-sm text-blue-500 mb-4 self-end">
            Forgot Password?
          </a>
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

export default LoginPage;
