import { motion } from "framer-motion";
import Header from "../components/General/Header";

type QuestionnaireLayoutProps = {
  children?: React.ReactNode;
};

const QuestionnaireLayout: React.FC<QuestionnaireLayoutProps> = ({ children }) => {

    return (
      <>
          <Header />
        <div className="flex flex-col text-center text-primary-text-dark font-alegreya bg-bk-grey 
        min-h-screen px-8">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
            className="px-4 md:px-10 flex-grow flex flex-col items-center justify-center mt-16 lg:gap-4"
          >
            {children}
          </motion.div>
        </div>
      </>
  )
};

export default QuestionnaireLayout;
