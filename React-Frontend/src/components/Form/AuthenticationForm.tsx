import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthentication } from '../AuthenticationProvider'
import AuthenticationInput from './AuthenticationInput'
import AuthenticationButton from './AuthenticationButton'
import React from 'react'
interface AuthenticationFormProps {
    action: string
}

const AuthenticationForm: React.FC<AuthenticationFormProps> = ({ action }) => {
    const { register, login } = useAuthentication()
    const navigate = useNavigate()

    const initInput = action === 'login' ? {
        email: '',
        password: ''
    } : {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    }
    
    const [input, setInput] = useState(initInput)

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target
            setInput(prev => ({
                ...prev,
                [name]: value
            }))
        }

        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            await action === 'login' ? login(input) : register(input)
            navigate('/map')
        }

        return (
            <form className='w-full' action={`http://localhost:8080/api/auth/${action}`} method='post' onSubmit={handleSubmit}>
                {action === 'register' && (
                <>
                <AuthenticationInput id='firstName' label='First Name' handleChange={handleChange} />
                <AuthenticationInput id='lastName' label='Last Name' handleChange={handleChange} />
                </>
            )}   
                <AuthenticationInput id='email' label='Email' handleChange={handleChange} />
                <AuthenticationInput id='password' label='Password' handleChange={handleChange} />
                <AuthenticationButton text={action === 'login' ? 'Log in' : 'Sign Up'} />
            </form>
            )
}

export default AuthenticationForm