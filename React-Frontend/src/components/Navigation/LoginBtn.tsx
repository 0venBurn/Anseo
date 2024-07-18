import { Button } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LoginBtn = () => {
    const navigate = useNavigate();
    return (
        <motion.button
            initial={{borderRadius: "20px"}}
            whileHover={{
                scale: 1.1,
                boxShadow: "0px 0px 12px #fff",
                textShadow: "0px 0px 12px #fff",
                borderRadius: "20px",   
        }}>
            <Button
            variant="outlined"
            sx={{
                borderColor: "white", 
                color: "white", 
                borderRadius: "20px", 
                padding: "0.33rem 1.25rem", 
                textTransform: "none", 
            }}
            onClick={() => navigate("/sign-in")} 
            >
            Login
            </Button>   
        </motion.button>
        );
}

export default LoginBtn