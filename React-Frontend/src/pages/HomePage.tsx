import { SignUp } from "../components/SignUp"
import { Login } from "../components/Login"

const HomePage = () => {
    return (
        <div>
            <h1>Home Page!</h1>
            <h2>Sign up:</h2>
            <SignUp />   
            <h2>Login:</h2>
            <Login />
        </div>
    )
}

export default HomePage