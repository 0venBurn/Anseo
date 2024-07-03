import React, { useState } from 'react';
import { Button, TextField, Typography, IconButton, InputAdornment, LinearProgress } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Header from './Header';
import '@fontsource/alegreya/400.css';
import '@fontsource/alegreya/700.css';
import './index.css';

const PasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fullname, email } = location.state || {};
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordStrengthLabel, setPasswordStrengthLabel] = useState('Weak');

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    updatePasswordStrength(newPassword);
  };

  const updatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    setPasswordStrength(strength);
    switch (strength) {
      case 3:
        setPasswordStrengthLabel('Strong');
        break;
      case 2:
        setPasswordStrengthLabel('Fair');
        break;
      default:
        setPasswordStrengthLabel('Weak');
        break;
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
          <h1 className="text-3xl font-bold mb-4">Create a secure password</h1>
          <div className="w-full mb-3 text-left">
            <Typography variant="subtitle1" component="label" htmlFor="password">
              Password<span className="text-red-500">*</span>
            </Typography>
            <TextField
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={handlePasswordChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="w-full mb-3 text-left">
            <Typography variant="body2" className="flex items-center">
              Password
              <span style={{ margin: '0 5px' }}>•</span>
              <LinearProgress
                variant="determinate"
                value={(passwordStrength / 3) * 100}
                sx={{ width: '100%', mx: 2 }}
              />
              <span>{passwordStrengthLabel}</span>
            </Typography>
          </div>
          <div className="w-full mb-3 text-left">
            <Typography variant="body2" className="text-left mb-3">
              Must contain at least
            </Typography>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li>8 characters</li>
              <li>1 upper case character</li>
              <li>1 special character</li>
            </ul>
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
            onClick={() => console.log('Create Account')}
          >
            Create Account
          </Button>
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

export default PasswordPage;
