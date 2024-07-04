import Header from "../Header"
import { motion } from 'framer-motion';

type AuthenticationLayoutProps = {
    children?: React.ReactNode
}

const AuthenticationLayout: React.FC<AuthenticationLayoutProps> = ({ children }) => {
    return (
        <>
        <Header />
        <div
        className="flex flex-col items-center justify-center min-h-screen text-black"
        style={{
            background: 'linear-gradient(135deg, #63A2BA, #929FE9, #D1CB14)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
        >
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mt-32 bg-white p-12 rounded-lg mb-12 max-w-lg"
          >
            {children}
        </motion.div>
      </div>
              </>
    )
}

export default AuthenticationLayout