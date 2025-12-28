import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-slate-950">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] right-[-10%] h-[70%] w-[80%] rounded-full bg-slate-800/40 blur-[120px]" />
                <div className="absolute bottom-[10%] left-[-10%] h-[60%] w-[70%] rounded-full bg-slate-900/30 blur-[100px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 py-12">
                <nav className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/20 text-2xl">
                            ✅
                        </div>
                        <p className="text-xl font-semibold text-slate-100">
                            To Do <span className="font-normal text-slate-400">| Application</span>
                        </p>
                    </div>
                    
                    <Link to='/register' className="hidden lg:flex cursor-pointer rounded-full bg-violet-600 px-8 py-3 font-medium text-white transition-all hover:bg-violet-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] active:scale-95">
                        Get Started
                    </Link>
                </nav>

                <main className="mt-40 flex flex-col items-center text-center">
                    <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-white md:text-7xl">
                        Stay Organised, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">Effortlessly.</span>
                    </h1>
                    <p className="mt-6 max-w-xl text-lg text-slate-400">
                        The minimalist to-do list for high achievers. pure productivity.
                    </p>
                     <Link to='/register' className="xl:hidden cursor-pointer mt-5 lg:hidden rounded-full bg-violet-600 px-8 py-3 font-medium text-white transition-all hover:bg-violet-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] active:scale-95">
                        Get Started
                    </Link>
                </main>
            </div>
        </div>
    )
}

export default Landing;
