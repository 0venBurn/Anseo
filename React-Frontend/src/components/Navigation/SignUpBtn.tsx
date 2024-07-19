import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SignUpBtn = () => {
    const navigate = useNavigate();
    return (
        <motion.div
            whileHover={{
                scale: 1.1,
            }}>
        <Button
          variant="contained"
          sx={{ 
              backgroundColor: "#DEDA6D", 
            color: "#3B447A", 
            textTransform: "none",
            fontFamily: "Inter",
            '&:hover': {
                backgroundColor: '#fef840',
                },
          }}
          onClick={() => navigate("/sign-up")} 
          >
          Sign Up
        </Button>    
              </motion.div>
        );
}

export default SignUpBtn