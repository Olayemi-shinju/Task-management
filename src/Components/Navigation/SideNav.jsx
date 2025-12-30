import { NavLink } from "react-router-dom";
import {
    IoIosCheckbox,
    IoMdToday,
    IoMdCalendar,
    IoMdCheckmarkCircle,
    IoMdSettings,
} from "react-icons/io";
import { GoDiscussionOutdated } from "react-icons/go";
import MobileNav from "./MobileNav";
import { AuthContext } from '../../Context/AuthContext';
import { useContext } from "react";
import MobileAddTask from "../MobileAddTask";
const navItems = [
    {
        label: "Today",
        path: "/Dashboard",
        icon: IoMdToday,
    },
    {
        label: "Upcoming",
        path: "/Upcoming",
        icon: IoMdCalendar,
    },
    {
        label: "Completed",
        path: "/Completed",
        icon: IoMdCheckmarkCircle,
    },
    {
        label: "Overdue",
        path: "/Overdue",
        icon: GoDiscussionOutdated,
    },
];

const SideNav = () => {
    const { user, User } = useContext(AuthContext)

    const getInitial = (name) => {
        if (!name) return "?"; // Fallback if name is missing
        return name.charAt(0).toUpperCase()
    };
    const linkStyles = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
     ${isActive
            ? "bg-blue-600/10 text-blue-400 shadow-[inset_0_0_10px_rgba(37,99,235,0.12)]"
            : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
        }`;

    return (
        <div>
            <aside className="hidden md:flex h-screen w-72 bg-slate-950 border-r border-slate-800 flex-col justify-between p-6">
                {/* Top */}
                <div>
                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-10 px-2">
                        <IoIosCheckbox className="text-blue-600 text-3xl" />
                        <span className="text-2xl font-bold text-white tracking-tight">
                            ToDo
                        </span>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-col gap-2">
                        {navItems.map(({ label, path, icon: Icon }) => (
                            <NavLink key={path} to={path} className={linkStyles}>
                                <Icon className="text-xl shrink-0" />
                                <span className="font-medium">{label}</span>
                            </NavLink>
                        ))}

                        <div className="my-4 border-t border-slate-800/50" />

                        <NavLink to="/Settings" className={linkStyles}>
                            <IoMdSettings className="text-xl shrink-0" />
                            <span className="font-medium">Profile</span>
                        </NavLink>
                    </nav>
                </div>

                {/* User Profile */}
                <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center text-white font-bold">
                            {getInitial(user.name || User.name)}
                        </div>

                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-white truncate">
                                {user.name || User.name}
                            </p>
                            <p className="text-xs text-slate-500 truncate">
                                {user.email || User.email}
                            </p>
                        </div>
                    </div>
                </div>
            </aside>
            <MobileNav />
              <MobileAddTask/>

        </div>
    );
};

export default SideNav;
