import { motion } from "framer-motion";
import errorImg from '/img/errorImg.svg';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const error: any = useRouteError();
  const navigate = useNavigate();
  return (
    <>
      <div className="sticky z-40 flex-shrink-0 top-0 min-h-20 left-0 w-full bg-primary-dark text-white flex justify-between flex-none items-center py-4 px-4 md:px-20 shadow-md">
      <div className="flex">
        <motion.div
          whileHover={{
            color: "#fef840"
          }}
          className="text-3xl md:text-5xl font-bold cursor-pointer"
          style={{ fontFamily: "Fredoka One", color: "#DEDA6D" }}
          onClick={() => navigate("/")}
        >
          ANSEO
        </motion.div>
        </div>
      </div>
      <div className="relative flex flex-col min-h-[calc(100vh-5rem)]
      bg-bk-grey flex-grow justify-between items-start p-4 md:p-16 overflow-hidden">
        <div className="flex flex-col justify-start gap-6">
          <h1 className="font-bold font-alegreya text-3xl md:text-7xl text-primary-text-dark max-w-6xl">
            Ooops! 404 Error
          </h1>
          <p className="italic font-commissioner text-xl md:text-3xl text-shaded-grey">
            It  seems we've lost our way...
          </p>
          <i>{error.statusText || error.message}</i>
          <p className="italic font-commissioner md:text-2xl text-primary-text-dark max-w-xl">
            Just like businesses searching for the perfect location, 
            we seem to have wandered off the map! Don't worry, 
            our top-notch data analytics are much better at finding business locations 
            than they are at finding missing web pages. Let's get back on track!          
            </p>
        </div>
          <img src={errorImg} alt="Loading" className="absolute bottom-8 md:bottom-12 right-4 md:right-12 block max-w-48 md:max-w-screen-sm h-auto" />
      </div>
    </>
  );
};

export default ErrorPage;
