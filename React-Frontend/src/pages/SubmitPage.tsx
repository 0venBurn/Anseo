import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import AuthenticationButton from '../components/Questionnaire/AuthenticationButton';
import { motion } from 'framer-motion';
import Header from '../components/General/Header';
import '../index.css';
import LinearGradientCircle from '../components/Questionnaire/LinearGradientCircle';
import NavigationButtons from '../components/Questionnaire/NavigationButtons';
import { useQuestionnaire } from '../context/QuestionnaireProvider';
import Chat from "../components/Chatbox/Chat";

const SubmitPage: React.FC = () => {
  const { isQuestionnaireCompleted } = useQuestionnaire();
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (e.currentTarget.textContent === 'Continue as Guest') {
      isQuestionnaireCompleted() && navigate('/map');
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
        className="relative min-h-[calc(100vh-5rem)] flex items-center lg:items-start justify-between text-primary-text-dark bg-bk-grey"
      >
        <div className='flex flex-col items-center justify-between lg:items-start text-center lg:text-left min-h-[calc(100vh-5rem)]'>
        <div className="flex flex-col gap-4 md:gap-8 mt-16 lg:ml-20 max-w-[80%]">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold font-alegreya">
            Ready to view your results?
          </h1>
          <p className="text-2xl lg:text-3xl font-commissioner">
            Create an account to save your results and access additional features or continue as a guest.
          </p>
          <div>
          <div className="flex flex-col items-center md:flex-row md:gap-8 max-w-2xl">
            <AuthenticationButton text='Continue as Guest' handleSubmit={handleSubmit} />
            <AuthenticationButton text='Create an Account' handleSubmit={handleSubmit} />
          </div>
            <p className="font-inter text-sm">
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
      <Chat />
    </>
  );
};

export default SubmitPage;
