import { Button } from '@mui/material';

interface AuthenticationButtonProps {
    text: string
    handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const AuthenticationButton: React.FC<AuthenticationButtonProps> = ({ text, handleSubmit }) => {
    return (
        <Button
              variant="contained"
              sx={{
                backgroundColor: '#DEDA6D',
                color: 'black',
                fontWeight: 'regular',
                borderRadius: '5px',
                padding: '10px',
                fontFamily: 'Inter',
                mb: 2,
                width: '75%',
                textTransform: 'none', 
                '&:hover': {
                  backgroundColor: '#3B447A',
                  color: 'white',
                } 
              }}
              onClick={handleSubmit}
            >
              {text}
            </Button>
    )
}

export default AuthenticationButton