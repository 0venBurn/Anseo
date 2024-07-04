import './index.css';
import { Divider } from '@mui/material';
import AuthenticationHeader from './components/Form/AuthenticationHeader';
import GoogleAuthenticationButton from './components/Form/GoogleAuthenticationButton';
import TermsOfService from './components/Form/TermsOfService';
import AuthenticationLayout from './layouts/AuthenticationLayout';
import AuthenticationForm from './components/Form/AuthenticationForm';

const SignInPage: React.FC = () => {
  return (
    <AuthenticationLayout>
        <AuthenticationHeader title='Create Your Account' subtitle='Enter your details to get started with Anseo' />
        <AuthenticationForm action='register' />
          <Divider sx={{ mb: 2, width: '100%' }}>or</Divider>
            <GoogleAuthenticationButton />
          <p className="text-sm mb-4">
            Already have an account? <a href="/login" className="text-blue-500">Log In</a>
          </p>
          <TermsOfService />
    </AuthenticationLayout>
  );
};

export default SignInPage;
