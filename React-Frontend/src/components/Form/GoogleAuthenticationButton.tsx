import { Button } from '@mui/material';

const GoogleAuthenticationButton = () => {
    return (
        <>
        <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#E0E0E0',
                color: 'black',
                borderRadius: '5px',
                padding: '0.75rem 3rem',
                mb: 2,
                maxWidth: '400px',
                width: '100%',
              }}
              onClick={() => console.log('Continue with Google')}
            >
              <img
                src="https://img.icons8.com/color/16/000000/google-logo.png"
                alt="Google"
                style={{ marginRight: '10px' }}
              />
              Continue with Google
            </Button>
            </>
    )
}

export default GoogleAuthenticationButton