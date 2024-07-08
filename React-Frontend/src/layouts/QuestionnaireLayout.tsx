import { motion } from "framer-motion";

type QuestionnaireLayoutProps = {
    children?: React.ReactNode;
};

const QuestionnaireLayout: React.FC<QuestionnaireLayoutProps> = ({ children }) => {

    return (
        <div className="flex flex-col items-center justify-between text-primary-text-dark font-commissioner bg-gray-100 min-h-screen 
        content-container">
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
