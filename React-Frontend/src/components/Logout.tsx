import { useNavigate } from "react-router-dom"
import { useAuthentication } from "./AuthenticationProvider"

const Logout = () => {
    const { logout } = useAuthentication()
    const navigate = useNavigate()

    const handleClick = async () => {
        
        await logout()
        navigate("/")
    }
    return (
        <>
        <button onClick={handleClick}>Logout</button>
        </>
    )
}

export default Logout