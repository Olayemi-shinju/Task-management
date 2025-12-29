import { NavLink } from "react-router-dom";
import {
  IoMdToday,
  IoMdCalendar,
  IoMdSettings,
  IoMdCheckmarkCircle,
} from "react-icons/io";
import { GoDiscussionOutdated } from "react-icons/go";

const MobileNav = () => {
  const linkStyle = ({ isActive }) =>
    `flex flex-col items-center justify-center gap-1 flex-1 py-2 transition
     ${
       isActive
         ? "text-blue-400"
         : "text-slate-400 hover:text-slate-200"
     }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="mx-4 mb-4 rounded-2xl bg-slate-900/90 backdrop-blur border border-slate-800 shadow-lg">
        <div className="flex items-center justify-between px-2">
          
          <NavLink to="/Dashboard" className={linkStyle}>
            <IoMdToday className="text-xl" />
            <span className="text-[11px] font-medium">Today</span>
          </NavLink>

          <NavLink to="/Upcoming" className={linkStyle}>
            <IoMdCalendar className="text-xl" />
            <span className="text-[11px] font-medium">Upcoming</span>
          </NavLink>

          <NavLink to="/Overdue" className={linkStyle}>
            <GoDiscussionOutdated className="text-xl" />
            <span className="text-[11px] font-medium">Overdue</span>
          </NavLink>

           <NavLink to="/Completed" className={linkStyle}>
            <IoMdCheckmarkCircle className="text-xl" />
            <span className="text-[11px] font-medium">Completed</span>
          </NavLink>

          <NavLink to="/Settings" className={linkStyle}>
            <IoMdSettings className="text-xl" />
            <span className="text-[11px] font-medium">Settings</span>
          </NavLink>

        </div>
      </div>
    </nav>
  );
};

export default MobileNav;
