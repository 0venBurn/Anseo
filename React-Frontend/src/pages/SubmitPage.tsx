import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import AuthenticationButton from '../components/AuthenticationButton';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import '../index.css';
import LinearGradientCircle from '../components/LinearGradientCircle';
import NavigationButtons from '../components/Questionnaire/NavigationButtons';

const SubmitPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (e.currentTarget.textContent === 'Continue as Guest') {
      navigate('/map');
    } else {
      navigate('/sign-up');
    } 
  }

  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}      
        className="relative min-h-screen flex items-center lg:items-start justify-between text-primary-text-dark bg-bk-grey"
      >
        <div className='flex flex-col items-center lg:items-start text-center lg:text-left min-h-screen'>
        <div className="flex flex-col flex-1 mt-28 lg:mt-32 lg:ml-20 max-w-[80%]">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold font-alegreya mb-4">
            Ready to view your results?
          </h1>
          <p className="text-2xl lg:text-3xl font-commissioner mb-12">
            Create an account to save your results and access additional features or continue as a guest.
          </p>
          <div>
          <div className="flex gap-8 max-w-2xl">
            <AuthenticationButton text='Continue as Guest' handleSubmit={handleSubmit} />
            <AuthenticationButton text='Create an Account' handleSubmit={handleSubmit} />
          </div>
            <p className="font-inter text-sm mt-2">
              By continuing, you agree to our{' '}
              <a href="/terms" className="text-blue-500">Terms of Service</a> and{' '}
              <a href="/privacy" className="text-blue-500">Privacy Policy</a>
            </p>
          </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <NavigationButtons 
              currentStep={5} 
              totalSteps={5} 
              handlePrev={() => navigate("/target-audience")}
            />
          </div>
        </div>
        <LinearGradientCircle />
      </motion.div>
    </>
  );
};

export default SubmitPage;
