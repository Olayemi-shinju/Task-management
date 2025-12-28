import { createContext, useState, useEffect } from "react";
import { authService } from "./AuthService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const User = JSON.parse(localStorage.getItem('todo-user'))

    // Login
    const Login = async (credential) => {
        setLoader(true);
        try {
            const data = await authService.login(credential);
            if (data && data.success === true) {
                setUser(data.data.user || data.data); // store user details
                const storeData = {
                    token: data.data.token,
                    user: data.data.user?.id,
                    name: data.data.user?.name,
                    email: data.data.user?.email,
                    phone: data.data.user?.phone,
                };
                localStorage.setItem("todo-user", JSON.stringify(storeData));
                toast.success(data.data.msg || "Login successful");
                setLoader(false);
                navigate("/Dashboard");
                return data;
            }
            setLoader(false);
            return data;
        } catch (error) {
            setLoader(false);
            toast.error(error?.response?.data?.msg || "An error occurred");
            throw error;
        }
    };

    // Register
    const Register = async (userData) => {
        setLoader(true);
        try {
            const data = await authService.register(userData);
            if (data && data.success === true) {
                toast.success(data.data.msg || "User successfully registered");
                setLoader(false);
                navigate("/login");
                return data;
            }
            setLoader(false);
            return data;
        } catch (error) {
            setLoader(false);
            toast.error(error?.response?.data?.msg || "An error occurred");
            throw error;
        }
    };

    // Logout
    const LogOut = () => {
        localStorage.removeItem("todo-user");
        setUser(null);
        navigate("/");
    };

    const createTask = async (userData) => {
        setLoader(true);
        try {
            const data = await authService.task(userData);
            if (data && data.success === true) {
                toast.success(data.data.msg || "Task successfully created");
                setLoader(false);
                return data;
            }
            setLoader(false);
            return data;
        } catch (error) {
            setLoader(false);
            toast.error(error?.response?.data?.msg || "An error occurred");
            throw error;
        }
    }

    const getTask = async () => {
        setLoader(true)
        try {
            const data = await authService.getTask();
            if (data && data.success === true) {
                setLoader(false);
                return data;
            }
            setLoader(false);
            return data;
        } catch (error) {
            setLoader(false);
            toast.error(error?.response?.data?.msg || "An error occurred");
            throw error;
        }
    }

    const data = JSON.parse(localStorage.getItem('todo-user'))
    const id = data?.user
    useEffect(() => {
        const fecthData = async () => {
            try {
                const resp = await authService.getSingleUser(id)
                setUser(resp.data)
            } catch (error) {

            }
        }
        fecthData()

    }, [id])

    const updateProfile = async (userData) => {
        setLoader(true);
        try {
            const data = await authService.updateUser(userData, id);
            if (data && data.success === true) {
                toast.success(data.data.msg || "User profile updated successfully");
                setLoader(false);
                return data;
            }
            setLoader(false);
            return data;
        } catch (error) {
            setLoader(false);
            toast.error(error?.response?.data?.msg || "An error occurred");
            throw error;
        }
    }

    const getSingleTask = async (id) => {
        setLoader(true);
        try {
            const data = await authService.getSingleTask(id);
            if (data && data.success === true) {
                setLoader(false);
                return data;
            }
        } catch (error) {
            setLoader(false);
            toast.error(error?.response?.data?.msg || "An error occurred");
            throw error;
        }
    }

    const updateTask = async (taskData, id) => {
        setLoader(true);
        try {
            const data = await authService.updateTask(taskData, id);
            if (data && data.success === true) {
                toast.success(data.data.msg || "Task updated successfully");
                setLoader(false);
                return data;
            }
            setLoader(false);
            return data;
        } catch (error) {
            setLoader(false);
            toast.error(error?.response?.data?.msg || "An error occurred");
            throw error;
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                User,
                loader,
                Login,
                Register,
                LogOut,
                createTask,
                getTask,
                updateProfile,
                setUser,
                getSingleTask,
                updateTask
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
