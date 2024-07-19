import { SignIn } from "@clerk/clerk-react"

const AuthenticationForm = () => <SignIn appearance={{
    elements: {
        card: "gap-0",
        headerTitle: "font-alegreya text-primary-text-dark text-5xl font-medium mb-4",
        headerSubtitle: "font-commissioner text-shaded-grey text-lg mb-6",
        socialButtonsBlockButton: "bg-form-button-grey text-black rounded-md px-12 py-3 mb-4 w-full",
        formButtonPrimary: "bg-yellow text-primary-text-dark rounded-md px-12 py-3 mb-4 w-full",
    }
}}/>

export default AuthenticationForm