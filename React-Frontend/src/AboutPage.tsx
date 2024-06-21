import React, { useState } from 'react';
import { Button, Divider, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import { useMediaQuery, useTheme } from '@mui/material';
import '@fontsource/alegreya/400.css';
import '@fontsource/alegreya/700.css';
import './index.css';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative min-h-screen bg-gray-100 text-black">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full bg-blue-900 text-white flex justify-between items-center py-4 px-4 md:px-20 z-50">
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
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 w-full bg-blue-900 text-white flex flex-col items-center py-4 z-50"
          >
            <Button 
              variant="text" 
              sx={{ color: 'white', fontSize: '1rem' }}
              onClick={() => {
                navigate('/about');
                setMenuOpen(false);
              }}
            >
              About
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center mt-24"
        style={{ marginTop: '0px' }}  
      >
        <h1 className="text-4xl font-bold mb-10 mt-20" style={{ fontFamily: 'Alegreya' }}>Our Mission</h1>
        <p className="text-lg mb-10 mt-0">Subheading for description or instructions</p>
        <div className="w-4/5 h-64 bg-gray-300 mb-6"></div>
        <p className="w-4/5 mb-6 mt-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam pellentesque nec nam aliquam sem et. Risus ultricies tristique nulla aliquet. Ullamcorper malesuada proin libero nunc consequat interdum varius sit amet. Nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae. Id leo vel nunc mi ipsum faucibus. Congue mauris rhoncus aenean vel elit scelerisque mauris. Id interdum velit laoreet id donec. Magna fermentum iaculis eu non diam phasellus. Pellentesque habitant morbi tristique senectus. Scelerisque felis imperdiet proin fermentum. Arcu ac tortor dignissim convallis aenean et tortor. Nisl suscipit adipiscing bibendum est. Ipsum nunc aliquet bibendum enim facilisis gravida neque. Dictum non consectetur a erat nam at. Consectetur adipiscing elit pellentesque habitant morbi. Leo duis ut diam quam. Lacus sed turpis tincidunt id aliquet.
        </p>
        <p className="w-4/5 mb-6 mt-0">
          A scelerisque purus semper eget duis at tellus. Euismod elementum nisi quis eleifend quam. Imperdiet proin fermentum leo vel orci porta. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa. Imperdiet massa tincidunt nunc pulvinar sapien et ligula. Ipsum nunc aliquet bibendum enim. Metus dictum at tempor commodo ullamcorper a. Odio morbi quis commodo odio aenean sed adipiscing diam. Viverra aliquet eget sit amet tellus. Vel risus commodo viverra maecenas accumsan lacus vel.
        </p>
        <Divider className="w-4/5 my-6" />
        <h2 className="text-3xl font-bold mt-10 mb-10">Data Driven Solutions</h2>
        <p className="w-4/5 mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed ullamcorper morbi tincidunt ornare. Est placerat in egestas erat imperdiet sed. In arcu cursus euismod quis viverra nibh. Scelerisque viverra mauris in aliquam. Sodales neque sodales ut etiam sit. Sed augue lacus viverra vitae congue. Consectetur lorem donec massa sapien. Nisl purus in mollis nunc sed id semper. Semper feugiat nibh sed pulvinar. Sem viverra aliquet eget sit amet tellus. Nulla at volutpat diam ut.
        </p>
        <Divider className="w-4/5 my-6" />
        <h2 className="text-3xl font-bold mt-10 mb-10">Algorithmic Results</h2>
        <p className="w-4/5 mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed ullamcorper morbi tincidunt ornare. Est placerat in egestas erat imperdiet sed. In arcu cursus euismod quis viverra nibh. Scelerisque viverra mauris in aliquam. Sodales neque sodales ut etiam sit. Sed augue lacus viverra vitae congue. Consectetur lorem donec massa sapien. Nisl purus in mollis nunc sed id semper. Semper feugiat nibh sed pulvinar. Sem viverra aliquet eget sit amet tellus. Nulla at volutpat diam ut.
        </p>
        <Divider className="w-4/5 my-6" />
        <h2 className="text-3xl font-bold mt-10 mb-10">Streamlined User Experience</h2>
        <p className="w-4/5 mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed ullamcorper morbi tincidunt ornare. Est placerat in egestas erat imperdiet sed. In arcu cursus euismod quis viverra nibh. Scelerisque viverra mauris in aliquam. Sodales neque sodales ut etiam sit. Sed augue lacus viverra vitae congue. Consectetur lorem donec massa sapien. Nisl purus in mollis nunc sed id semper. Semper feugiat nibh sed pulvinar. Sem viverra aliquet eget sit amet tellus. Nulla at volutpat diam ut.
        </p>
      </motion.div>
      <div className="w-full bg-gray-200 py-4 mt-12">
        <div className="container mx-auto flex justify-between items-center px-10">
          <div className="text-3xl font-bold text-orange-600">ANSEO</div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600">Customer Support</a>
            <a href="#" className="text-gray-600">About Anseo</a>
            <a href="#" className="text-gray-600">Contact Us</a>
            <a href="#" className="text-gray-600">FAQ</a>
            <a href="#" className="text-gray-600">Terms & Conditions</a>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-100 py-4 text-center text-gray-600">
        © 2024, Anseo.
      </div>
    </div>
  );
};

export default AboutPage;
