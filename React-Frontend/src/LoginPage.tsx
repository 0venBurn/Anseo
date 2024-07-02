import React, { useState } from 'react';
import { Button, TextField, Divider, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import { useMediaQuery, useTheme } from '@mui/material';
import Header from './Header';
import '@fontsource/alegreya/400.css';
import '@fontsource/alegreya/700.css';
import './index.css';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <Header />
      <div
        className="flex flex-col items-center justify-center h-screen text-black"
        style={{ 
          background: 'linear-gradient(135deg, #63A2BA, #929FE9, #D1CB14)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center'
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mt-32 bg-white bg-opacity-70 p-6 rounded-lg"
          style={{ maxWidth: '400px' }}
        >
          <h1 className="text-3xl font-bold mb-4">Create an account</h1>
          <p className="text-lg mb-6">Enter your email to sign up for this app</p>
          <TextField
            label="email@domain.com"
            variant="outlined"
            fullWidth
            sx={{ mb: 3 }}
          />
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ backgroundColor: 'black', color: 'white', borderRadius: '5px', padding: '0.75rem 3rem', mb: 2 }}
            onClick={() => console.log("Sign up with email")}
          >
            Sign up with email
          </Button>
          <Divider sx={{ mb: 2 }}>or continue with</Divider>
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
        </motion.div>
      </div>
    </>
  );
};

export default LoginPage;