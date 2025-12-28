import { Navigate, Outlet } from "react-router-dom";
import SideNav from "../Navigation/SideNav";


const Layout = () => {
    const stored = localStorage.getItem('todo-user');
    const token = stored ? JSON.parse(stored)?.token : null;
    if (!token) {
        return <Navigate to="/" replace />;
    }
    return (
        <div className="flex h-screen bg-slate-950">
            <SideNav />
            <main className="flex-1 overflow-y-auto p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
