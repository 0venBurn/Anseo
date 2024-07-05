import "./index.css";
import { Divider } from "@mui/material";
import AuthenticationHeader from "./components/Form/AuthenticationHeader";
import GoogleAuthenticationButton from "./components/Form/GoogleAuthenticationButton";
import TermsOfService from "./components/Form/TermsOfService";
import AuthenticationLayout from "./layouts/AuthenticationLayout";
import AuthenticationForm from "./components/Form/AuthenticationForm";

const LoginPage: React.FC = () => {
  return (
    <AuthenticationLayout>
      <AuthenticationHeader
        title="Welcome Back"
        subtitle="Enter your details to continue"
      />
      <AuthenticationForm action="login" />
      <Divider sx={{ mb: 2, width: "100%" }}>or</Divider>
      <GoogleAuthenticationButton />
      <a
        href="/forgot-password"
        className="text-sm text-blue-500 mb-4 self-end"
      >
        Forgot Password?
      </a>
      <TermsOfService />
    </AuthenticationLayout>
  );
};

export default LoginPage;
