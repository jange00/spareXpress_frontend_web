import { createContext, useState, useEffect, Children, use } from "react";

export const AuthContext = createContext()
const AuthContextProvider = ({ Children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const login = (userData, token) => {
        setLoading(true)
        localStorage.setItem("user", JSON.stringify(userData))
        localStorage.setItem("token", token)
        setUser(userData)
        setLoading(false)
    }
    const logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setUser(null)
        setLoading(false)
    }
    useEffect(() => {
        setLoading(true)
        const token = localStorage.getItem("token")
        const storedUser = localStorage.getItem("user")
        if(token && storedUser) {
            setUser(JSON.parse(storedUser))
        }else {
            logout()
        }
        setLoading(false)
    }, [])
    return (
        <AuthContext.Provider
        value={{user, loading, login, logout, isAuthenticated: user !== null}}
        >
            {Children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider