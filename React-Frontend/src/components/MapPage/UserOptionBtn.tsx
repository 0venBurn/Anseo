import { Button } from '@mui/material';
import { motion } from 'framer-motion';

interface UserOptionBtnProps {
    title: string;
    isActive?: boolean;
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const UserOptionBtn: React.FC<UserOptionBtnProps> = ({ title, isActive, handleClick }) => {
    return (
        <>
        <Button 
        component={motion.button}
        whileHover={{ 
            scale: 1.05 ,
        }}
        animate={{
            backgroundColor: isActive ? '#D1D6F5' : 'inherit',
            color: isActive ? '#3B447A' : '#ABB0B4',
            transition: { duration: 0.1, ease: "easeInOut" },
        }}
        sx={{
            fontFamily: 'Commissioner',
            borderRadius: 4,
            // fontSize: '1rem',
            textTransform: 'none',
            fontWeight: isActive ? 600 : 500,
        }}
        className={`${isActive ? 'active' : ''} text-base md:text-2xl`}
        onClick={handleClick}>
            {title}
        </Button>
        </>
    )
}
export default UserOptionBtn;