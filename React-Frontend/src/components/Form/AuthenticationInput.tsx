import { TextField } from '@mui/material';

interface AuthenticationInputProps {
    id: string
    label: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const AuthenticationInput: React.FC<AuthenticationInputProps> = ({ id, label, handleChange }) => {
    return (
        <div className='w-full mb-3'>
           <TextField
              required
              id={id}
              name={id}
              label={label}
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
        </div>
    )
}

export default AuthenticationInput