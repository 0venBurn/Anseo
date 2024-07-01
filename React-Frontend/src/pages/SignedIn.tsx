import { Navigate } from "react-router-dom"
import { useAuthentication } from "../components/AuthenticationProvider"
import Logout from "../components/Logout"

export const signedInLoader = () => {
}

const SignedIn = () => {
    const { user, isUserAuthenticated } = useAuthentication()
    console.log(isUserAuthenticated())
    if (isUserAuthenticated()) {
        return (
            <div>
                <h1>Hi, {user.firstName} {user.lastName}!</h1>
                <h2>You are signed in with the email {user.email}</h2>
                <Logout />
            </div>
        )
    } else {
        <Navigate to='/' replace={true} />
    }
}

export default SignedIn