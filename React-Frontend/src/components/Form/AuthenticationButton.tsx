import { Button } from '@mui/material';
import React from 'react';

interface AuthenticationButtonProps {
    text: string
}

const AuthenticationButton: React.FC<AuthenticationButtonProps> = ({ text }) => {
    return (
        <Button
            variant="contained"
            color="primary"
            sx={{
                backgroundColor: '#D1CB14',
                color: 'black',
                borderRadius: '5px',
                padding: '0.75rem 3rem',
                mb: 2,
                width: '100%',
            }}
            type='submit'
        >
            {text}
        </Button>
    )
}

export default AuthenticationButton