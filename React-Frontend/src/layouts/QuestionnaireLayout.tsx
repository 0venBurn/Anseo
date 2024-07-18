import { motion } from "framer-motion";
import Header from '../Header';


type QuestionnaireLayoutProps = {
  children?: React.ReactNode;
};

const QuestionnaireLayout: React.FC<QuestionnaireLayoutProps> = ({ children }) => {

    return (
        <div className="flex flex-col items-center justify-between text-primary-text-dark font-alegreya bg-bk-grey min-h-screen 
        content-container">
        <Header />
  <motion.div
    initial={{ opacity: 0, x: -100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 100 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col items-center text-center px-4 md:px-10 flex-grow mt-12 md:mt-32"
  >
    {children}
  </motion.div>
</div>
)
};

export default QuestionnaireLayout;
