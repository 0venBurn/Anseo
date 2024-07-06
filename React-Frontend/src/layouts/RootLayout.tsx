import { Outlet, useNavigate } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const SIGN_IN_URL = import.meta.env.VITE_CLERK_SIGN_IN_URL;
const SIGN_UP_URL = import.meta.env.VITE_CLERK_SIGN_UP_URL;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

export default function RootLayout() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
        routerPush={(to) => navigate(to)}
        routerReplace={(to) => navigate(to, { replace: true })}
        publishableKey={PUBLISHABLE_KEY}
        signInUrl={SIGN_IN_URL}
        signUpUrl={SIGN_UP_URL}
    >
      <main>
        <Outlet />
      </main>
    </ClerkProvider>
  )
}