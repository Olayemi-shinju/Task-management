import { Input } from '../Input/Input'
import { MdOutlineMail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { FiLoader } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
const Login = () => {
    const { Login, loader } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [show, setShow] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        await Login(formData)
    }
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 flex items-center justify-center p-4">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] right-[-10%] h-[70%] w-[80%] rounded-full bg-slate-800/40 blur-[120px]" />
                <div className="absolute bottom-[10%] left-[-10%] h-[60%] w-[70%] rounded-full bg-slate-900/30 blur-[100px]" />
            </div>
            <div className='relative z-10 w-full max-w-md'>
                <form className='border border-slate-800 shadow-2xl bg-sky-950/50 backdrop-blur-sm rounded-2xl p-6 sm:p-10'>
                    <h1 className='text-white text-xl text-center mb-6 font-semibold font-stretch-ultra-condensed -tracking-tight decoration-wavy'>Login</h1>
                    <div className="space-y-4">
                        <Input icon={MdOutlineMail} placeholder='Email' name='email' value={formData.email} onChange={handleChange} />
                        <div className="relative">
                            <Input type={show ? "text" : "password"} icon={TbLockPassword} placeholder='Password' name='password' value={formData.password} onChange={handleChange} />
                            <button
                                type='button'
                                onClick={() => setShow(!show)}
                                className="absolute right-3 top-1/3 -translate-y-1/2 text-slate-400"
                            >
                                {show ? <IoEyeOutline /> : <FaRegEyeSlash />}
                            </button>
                        </div>
                    </div>
                    <div className='flex justify-end'>
                        <Link to='/register' className='text-white cursor-pointer'>!dont have an account</Link>
                    </div>
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        disabled={loader} // prevent multiple clicks while loading
                        className="cursor-pointer flex items-center justify-center mt-8 w-full rounded-full bg-sky-950 px-8 py-3 font-medium text-white transition-all border border-slate-700 hover:bg-sky-900 active:scale-95 gap-2"
                    >
                        {loader ? (
                            <>
                                <FiLoader className="animate-spin text-xl" />
                                Loading...
                            </>
                        ) : (
                            "Submit"
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
