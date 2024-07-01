import { useState } from "react"
import { FormElementContainer } from "./FormElementContainer"
import { useAuthentication } from "./AuthenticationProvider"
import { useNavigate } from "react-router-dom"

export const Login: React.FC = () => {
    const { login } = useAuthentication()
    const navigate = useNavigate()

    const divStyle = {
        backgroundColor: 'lightblue',
        padding: '20px',
        border: '1px solid blue', 
    }

    const [input, setInput] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e: any) => {
        const { name, value } = e.target

        setInput(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        await login(input)
        navigate('/signedin')
    }

    return (
        <form style={divStyle} action='http://localhost:8080/api/auth/authenticate' method='post' onSubmit={handleSubmit}>
            <FormElementContainer id='loginEmail' label='Email' name='email' type='email' handleChange={handleChange} />
            <FormElementContainer id='loginPassword' label='Password' name='password' type='password' handleChange={handleChange} />
            <button type='submit' >Submit</button>
        </form>
    )
}