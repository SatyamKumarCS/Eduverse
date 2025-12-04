import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(true);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // Check if user is authenticated on mount
    useEffect(() => {
        const checkAuth = async () => {
            if (token) {
                try {
                    const { data } = await axios.get(`${backendUrl}/api/auth/me`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (data.success) {
                        setUser(data.user);
                    } else {
                        // Token invalid, clear it
                        localStorage.removeItem("token");
                        setToken(null);
                        setUser(null);
                    }
                } catch (error) {
                    localStorage.removeItem("token");
                    setToken(null);
                    setUser(null);
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const register = async (name, email, password) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
                name,
                email,
                password
            });

            if (data.success) {
                localStorage.setItem("token", data.token);
                setToken(data.token);
                setUser(data.user);
                toast.success(data.message);
                return { success: true };
            } else {
                toast.error(data.message);
                return { success: false, message: data.message };
            }
        } catch (error) {
            toast.error(error.message);
            return { success: false, message: error.message };
        }
    };

    const login = async (email, password) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
                email,
                password
            });

            if (data.success) {
                localStorage.setItem("token", data.token);
                setToken(data.token);
                setUser(data.user);
                toast.success(data.message);
                return { success: true };
            } else {
                toast.error(data.message);
                return { success: false, message: data.message };
            }
        } catch (error) {
            toast.error(error.message);
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        toast.success("Logged out successfully");
    };

    const getToken = () => {
        return token;
    };

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
    };

    const value = {
        user,
        token,
        loading,
        register,
        login,
        logout,
        getToken,
        updateUser,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
