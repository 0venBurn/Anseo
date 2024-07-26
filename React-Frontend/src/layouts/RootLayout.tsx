import { Outlet, useNavigate } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import QuestionnaireProvider from "../context/QuestionnaireProvider";
import ScrollToTop from "../utils/ScrollToTop";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const SIGN_IN_URL = import.meta.env.VITE_CLERK_SIGN_IN_URL;
const SIGN_UP_URL = import.meta.env.VITE_CLERK_SIGN_UP_URL;
const SIGN_IN_REDIRECT_URL = import.meta.env
  .VITE_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL;
const SIGN_UP_REDIRECT_URL = import.meta.env
  .VITE_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL;
const SIGN_OUT_URL = import.meta.env.VITE_CLERK_SIGN_OUT_URL;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
    routerPush={(to) => navigate(to)}
    routerReplace={(to) => navigate(to, { replace: true })}
    publishableKey={PUBLISHABLE_KEY}
    signInUrl={SIGN_IN_URL}
    signUpUrl={SIGN_UP_URL}
    signInFallbackRedirectUrl={SIGN_IN_REDIRECT_URL}
    signUpFallbackRedirectUrl={SIGN_UP_REDIRECT_URL}
    afterSignOutUrl={SIGN_OUT_URL}
    >
      <QuestionnaireProvider>
        <ScrollToTop />
        <Outlet />
      </QuestionnaireProvider>
    </ClerkProvider>
  );
}

