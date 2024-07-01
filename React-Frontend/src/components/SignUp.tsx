import { useState } from "react";
import { FormElementContainer } from "./FormElementContainer"
import { useAuthentication } from "./AuthenticationProvider";
import { useNavigate } from "react-router-dom";

export const SignUp: React.FC = () => {
    const { register } = useAuthentication()
    const navigate = useNavigate()

    const divStyle = {
        backgroundColor: 'lightblue',
        padding: '20px',
        border: '1px solid blue', 
    }

    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput(prev => ({
          ...prev,
          [name]: value,
        }));
      };
    
      const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        await register(input);
        navigate('/signedin')
      };

    return (
        <form style={divStyle} action='http://localhost:8080/api/auth/register' method='post' onSubmit={handleSubmit}>
            <FormElementContainer id='firstName' label='First Name' name='firstName' type='text' handleChange={handleChange} />
            <FormElementContainer id='lastName' label='Last Name' name='lastName' type='text' handleChange={handleChange} />
            <FormElementContainer id='signUpEmail' label='Email' name='email' type='email' handleChange={handleChange} />
            <FormElementContainer id='signUpPassword' label='Password' name='password' type='password' handleChange={handleChange} />
            <button type='submit' >Submit</button>
        </form>
    )
}