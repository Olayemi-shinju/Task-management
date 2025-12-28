import { IoMdClose, IoMdPerson, IoMdMail, IoMdCall, IoMdCamera } from "react-icons/io";
import { Input } from '../Input/Input';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../../Context/AuthContext';
import { FiLoader } from "react-icons/fi";
const EditProfile = ({ close, user, User }) => {
    const { updateProfile, loader } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    })


    useEffect(() => {
        setFormData({
            name: user?.name || User?.name || '',
            email: user?.email || User?.email || '',
            phone: user?.phone || User?.phone || ''
        })
    }, [])



    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await updateProfile(formData)
            if (res) return close()
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={close}
            />

            {/* Modal Container - Reduced max-w to sm (smaller than md) and padding to p-6 */}
            <div className="relative w-full max-w-sm bg-slate-950 border border-slate-800 rounded-[2rem] p-6 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header - Reduced margin bottom */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white tracking-tight">Edit Profile</h2>
                    <button
                        onClick={close}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-all"
                    >
                        <IoMdClose className="text-xl" />
                    </button>
                </div>

                {/* Profile Picture Section - Reduced avatar size from 24 to 20 */}
                <div className="flex flex-col items-center mb-6 group">
                    <div className="relative">
                        <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-500/10 border-4 border-slate-900">
                            {user?.name?.charAt(0).toUpperCase() || User?.name?.charAt(0).toUpperCase()}
                        </div>
                        {/* <button className="absolute bottom-0 right-0 p-1.5 bg-blue-600 text-white rounded-full border-[3px] border-slate-950 hover:bg-blue-500 transition-colors">
              <IoMdCamera className="text-xs" />
            </button> */}
                    </div>
                    {/* <p className="text-slate-500 text-[10px] mt-2 font-bold uppercase tracking-widest">Change Photo</p> */}
                </div>

                {/* Form Fields - Reduced space-y from 5 to 3 */}
                <div className="space-y-3">
                    <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-1 block">Full Name</label>
                        <Input
                            placeholder="Your Name"
                            value={formData.name}
                            icon={IoMdPerson}
                            name='name'
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-1 block">Email Address</label>
                        <Input
                            placeholder="email@example.com"
                            value={user.email || User.email}
                            name='email'
                            icon={IoMdMail}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 mb-1 block">Phone Number</label>
                        <Input
                            placeholder="09135622021"
                            value={formData.phone}
                            name='phone'
                            icon={IoMdCall}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex gap-3 mt-8">
                    <button
                        onClick={close}
                        className="flex-1 py-2.5 rounded-xl border border-slate-800 text-slate-400 font-bold text-xs hover:bg-slate-900 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={loader}
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-700 to-sky-500 py-3 text-white font-medium hover:from-sky-600 hover:to-sky-400 active:scale-95 transition-all"
                    >
                        {loader ? <FiLoader className="animate-spin text-xl" /> : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
