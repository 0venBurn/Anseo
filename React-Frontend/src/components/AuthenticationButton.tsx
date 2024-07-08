import { Button } from '@mui/material';

interface AuthenticationButtonProps {
    text: string
    handleSubmit: () => void
}

const AuthenticationButton: React.FC<AuthenticationButtonProps> = ({ text, handleSubmit }) => {
    return (
        <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#DEDA6D',
                color: 'black',
                fontWeight: 'regular',
                borderRadius: '5px',
                padding: '10px',
                fontFamily: 'Inter',
                mb: 2,
                width: '100%',
                textTransform: 'none',  
              }}
              onClick={handleSubmit}
            >
              {text}
            </Button>
    )
}

export default AuthenticationButton