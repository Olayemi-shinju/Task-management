import { useContext, useEffect, useState } from "react";
import { IoMdAdd, IoMdCalendar, IoMdCheckmarkCircle, IoMdRadioButtonOff, IoMdTrash } from "react-icons/io";
import Modal from "../Modal/Modal";
import { AuthContext } from '../../Context/AuthContext';

export const Dashboard = () => {
    const { getTask, loader } = useContext(AuthContext);
    const [openModal, setOpenModal] = useState(false);
    const [tasks, setTasks] = useState([]); // Use plural 'tasks' for arrays

    const fetchTasks = async () => {
        try {
            const resp = await getTask();
            setTasks(resp.data || resp || []);
        } catch (err) {
            console.error("Error fetching tasks:", err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const today = new Date().toDateString()
    const filterTask = tasks?.filter((task) =>
        new Date(task.dueDate).toDateString() === today
    )

    return (
        <div className="overflow-y-auto bg-slate-950 pb-20">
            <div className="w-full max-w-6xl mx-auto px-4">
                {/* Header Section */}
                <div className="flex items-end justify-between mb-8 pt-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                            My Tasks
                        </h1>
                        <p className="text-slate-400 text-sm mt-2 flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                            {tasks.length} tasks remaining for today
                        </p>
                    </div>

                    <button
                        onClick={() => setOpenModal(true)}
                        className="flex cursor-pointer items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-2xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                    >
                        <IoMdAdd className="text-xl" />
                        <span className="font-semibold text-sm">New Task</span>
                    </button>
                </div>

                {/* Main Content Grid */}
                {
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filterTask?.map((item) => (
                            <div
                                key={item._id}
                                className="group relative bg-slate-900/40 border border-slate-800/60 rounded-3xl p-5 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/5"
                            >
                                {/* Status Badge & Action */}
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.status === 'completed' ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'
                                        }`}>
                                        {item.status || 'Pending'}
                                    </span>
                                    <button className="text-slate-600 cursor-pointer hover:text-red-400 transition-colors">
                                        <IoMdTrash className="text-lg" />
                                    </button>
                                </div>

                                {/* Title & Description */}
                                <div className="mb-4">
                                    <h3 className={`text-lg font-bold text-white mb-1 transition-all ${item.status === 'completed' ? 'line-through text-slate-500' : ''}`}>
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm line-clamp-2 font-light leading-relaxed">
                                        {item.description || "No description provided."}
                                    </p>
                                </div>

                                {/* Footer: Date and Completion Toggle */}
                                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-800/50">
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <IoMdCalendar className="text-blue-500" />
                                        <span className="text-xs font-medium">
                                            {item.dueDate ? new Date(item.dueDate).toLocaleDateString() : 'No date'}
                                        </span>
                                    </div>

                                    <button className="flex border rounded-xl p-1.5 cursor-pointer items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-all">
                                        <IoMdRadioButtonOff className="text-lg text-blue-600" />
                                        <span>Confirm</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                }

                {/* Empty State */}
                {!loader && filterTask.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="bg-slate-900 p-6 rounded-full mb-4">
                            <IoMdCheckmarkCircle className="text-5xl text-slate-700" />
                        </div>
                        <h2 className="text-xl font-bold text-white">All caught up!</h2>
                        <p className="text-slate-500">You don't have any tasks for today.</p>
                    </div>
                )}
            </div>

            {openModal && <Modal close={() => setOpenModal(!openModal)} setTask={setTasks} />}
        </div>
    );
};
