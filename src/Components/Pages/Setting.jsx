import { useContext, useState } from "react";
import { IoMdLogOut, IoMdCreate } from "react-icons/io";
import { AuthContext } from "../../Context/AuthContext";
import EditProfile from "../Modal/EditProfile";

const Setting = () => {
  const { LogOut, user, User } = useContext(AuthContext);
  const [open, setOpen] = useState(false)

  const openModal = ()=>{
    setOpen(true)
  }
  const closeModal = ()=>{
    setOpen(false)
  }

  return (
    <div className="min-h-screen w-full flex justify-center px-4 pt-8 bg-slate-950">
      <div className="w-full max-w-md">
        {/* Profile Card */}
        <div className="bg-sky-950/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl">

          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {user?.name?.[0] || User?.name?.[0]}
            </div>

            <h2 className="text-white text-lg font-semibold">
              {user?.name || User?.name}
            </h2>

            <p className="text-slate-400 text-sm">
              {user?.email || User.name}
            </p>

            {/* Edit Button */}
            <button onClick={openModal}
              className="mt-2 flex items-center gap-2 px-4 py-2 rounded-full
              bg-sky-900 hover:bg-sky-800 text-white text-sm font-medium
              transition border border-slate-700"
            >
              <IoMdCreate />
              Edit Profile
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-slate-800" />

          {/* Info Section */}
          <div className="space-y-3">
            <InfoRow label="Email" value={user.email || User.email} />
            <InfoRow label="Phone" value={user.phone || User.phone} />
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-slate-800" />

          {/* Logout */}
          <button
            onClick={LogOut}
            className="w-full cursor-pointer flex items-center justify-center gap-2
            py-3 rounded-xl bg-red-600/90 hover:bg-red-500
            text-white font-medium transition"
          >
            <IoMdLogOut className="text-lg" />
            Log Out
          </button>
        </div>
      </div>
      {
        open && <EditProfile close={closeModal} user={user} User={User}/>
      }
    </div>
  );
};

export default Setting;

/* Small reusable row */
const InfoRow = ({ label, value }) => (
  <div className="flex items-center justify-between bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3">
    <span className="text-slate-400 text-xs uppercase tracking-wide">
      {label}
    </span>
    <span className="text-white text-sm font-medium truncate">
      {value}
    </span>
  </div>
);
