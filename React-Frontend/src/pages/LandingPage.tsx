// import necessary components
import React, { useEffect } from "react";

import LandingPageActionButtons from "../components/LandingPage/LandingPageActionButtons";
import LandingPageHeader from "../components/LandingPage/LandingPageHeader";
import LandingPageHeroSection from "../components/LandingPage/LandingPageHeroSection";
import Chat from "../components/Chatbox/Chat";
import "../index.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Main component for the landing page
const LandingPage: React.FC = () => {
  useEffect(() => {
    toast("Welcome to Anseo! We're glad to have you here.", {
      toastId: "welcome-toast",
    });

    setTimeout(() => {
      toast("Get started by clicking the 'Start Now' button!", {
        toastId: "start-now-toast",
      });
    }, 2000);

    setTimeout(() => {
      toast(
        "To check out our AI chat assistant click the expandable widget on the bottom right of the screen.",
        {
          toastId: "chat-assistant-toast",
        }
      );
    }, 4000);
  }, []);

  return (
    <>
      <div className="min-h-full flex flex-col bg-landingPageBackground object-contain img-fit ">
        {/*Header for medium to large viewports (e.g., tablets and desktops) */}
        <LandingPageHeader />
        {/*Hero section*/}

        <div className="flex-1 flex flex-col items-center justify-center gap-8 mb-32">
          <LandingPageHeroSection />
          {/*Call to action (CTA) buttons*/}
          <LandingPageActionButtons />
        </div>
      </div>
      <Chat />
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
};

export default LandingPage;
