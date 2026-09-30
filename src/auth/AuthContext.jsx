import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => window.getCurrentUser ? window.getCurrentUser() : null);
    const refresh = () => setUser(window.getCurrentUser ? window.getCurrentUser() : null);
    useEffect(() => {
        window.addEventListener("storage", refresh);
        return () => window.removeEventListener("storage", refresh);
    }, []);
    const login = async (email, password) => {
        const result = await window.loginUser(email, password);
        if (result.ok) setUser(result.user);
        return result;
    };
    const logout = () => {
        if (window.logout) window.logout();
        setUser(null);
    };
    return <AuthContext.Provider value={{ user, login, logout, refresh }}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
