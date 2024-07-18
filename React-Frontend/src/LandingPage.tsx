import Chat from "./components/Chatbox/Chat";

// import necessary components
import LandingPageHeroSection from "./components/LandingPageHeroSection";
import "./index.css";

import LandingPageActionButtons from "./components/LandingPageActionButtons";
import { SignedIn, SignOutButton } from "@clerk/clerk-react";
import LandingPageHeader from "./components/LandingPageHeader";

//Main component for the landing page
const LandingPage: React.FC = () => {
  return (
    <>
      <div className="min-h-full flex flex-col bg-landingPageBackground object-contain img-fit ">
        
        {/*Header for medium to large viewports (e.g., tablets and desktops) */}
        <LandingPageHeader />
        {/*Hero section*/}  

        <div className="flex-1 flex flex-col items-center justify-center gap-8 mb-32">
        <LandingPageHeroSection />
        <SignedIn>
          <SignOutButton redirectUrl="http://localhost:3000" />
        </SignedIn>
        {/*Call to action (CTA) buttons*/}
        <LandingPageActionButtons />
        </div>
        </div>
    </>
  );
};

export default LandingPage;
