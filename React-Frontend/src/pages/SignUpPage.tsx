import '../index.css';
import AuthenticationLayout from '../layouts/AuthenticationLayout';
import { SignUp } from "@clerk/clerk-react";

const SignInPage: React.FC = () => {
  return (
    <AuthenticationLayout>
      <SignUp
        appearance={{
          elements: {
            cardBox: "mt-32 mb-12",
            card: "gap-0",
            headerTitle:
              "font-alegreya text-primary-text-dark text-5xl font-medium mb-4",
            headerSubtitle: "font-commissioner text-shaded-grey text-lg mb-6",
            formFieldLabel: "font-inter text-primary-text-dark",
            dividerText: "font-inter",
            socialButtonsBlockButton:
              "bg-form-button-grey text-black font-inter rounded-lg px-12 py-3 mb24 w-full shadow-md hover:bg-primary-text-dark hover:text-white",
            formButtonPrimary:
              "bg-yellow text-primary-text-dark font-inter rounded-lg px-12 py-3 mb-2 w-full shadow-none hover:bg-primary-text-dark hover:text-white",
            footerActionText: "font-inter",
            footerActionLink: "font-inter hover:text-primary-text-dark",
          },
        }}
      />
    </AuthenticationLayout>
  );
};

export default SignInPage;
