import { useContext, createContext, useState } from "react";

interface AuthenticationContext {
    user: any;
    register: (input: any) => Promise<void>
    login: (data: any) => Promise<void>;
    logout: () => void;
    accessToken: string;
    refreshToken: string;
    isUserAuthenticated: () => boolean;
}

interface User {
    firstName: string;
    lastName: string;
    email: string;
}

interface AuthenticationProviderProps {
    children: React.ReactNode;
}

const AuthenticationContext = createContext<AuthenticationContext>(
    {
        user: null,
        register: async (input) => {},
        login: async (data) => {},
        logout: () => {},
        accessToken: "",
        refreshToken: "",
        isUserAuthenticated: () => false,
    }
);

const AuthenticationProvider: React.FC<AuthenticationProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userAuthenticated, setUserAuthenticated] = useState<boolean>(false);
    const [accessToken, setAccessToken] = useState<string>(localStorage.getItem("accessToken") || "");
    const [refreshToken, setRefreshToken] = useState<string>(localStorage.getItem("refreshToken") || "");

    const register = async (input: any) => {
      try {
        const response = await fetch("http://localhost:8080/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(input)
        })

        if (!response.ok) {
          throw new Error('Registration failed.')
        }
        
        const data = await response.json()
        if (data) {
          setUser({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email
          })  
          localStorage.setItem('accessToken', data.accessToken)
          setAccessToken(data.accessToken)
          localStorage.setItem('refreshToken', data.refreshToken)
          setRefreshToken(data.refreshToken)
          setUserAuthenticated(true)
        }
      } catch(error) {
        console.error(error)
      }
    }
    
    const login = async (input: any) => {
        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(input),
            });

            if (!response.ok) {
                throw new Error('Login failed.')
            }

            const data = await response.json();
            console.log(data)
            if (data) {
                setUser({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email
                });
                setUserAuthenticated(true)
                setAccessToken(data.accessToken);
                localStorage.setItem('accessToken', data.accessToken);
                setRefreshToken(data.refreshToken);
                localStorage.setItem('refreshToken', data.refreshToken);
            } 
        } catch (err) {
            console.error(err);
        }
    };

    const logout = () => {
        setUser(null);
        setAccessToken("");
        setRefreshToken("");
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUserAuthenticated(false);
    };

    const isUserAuthenticated = () => {
        return userAuthenticated;
    }

    return (
        <AuthenticationContext.Provider value={{ accessToken, isUserAuthenticated, user, login, logout, register, refreshToken }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationProvider;

export const useAuthentication = () => {
    return useContext(AuthenticationContext);
};
