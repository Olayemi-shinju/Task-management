import { useContext, useEffect, useState } from "react";
import {
    IoMdAdd,
    IoMdCalendar,
    IoMdCheckmarkCircle,
    IoMdTrash,
} from "react-icons/io";
import Modal from "../Modal/Modal";
import { AuthContext } from "../../Context/AuthContext";
import EditModal from "../Modal/EditModal";
import ConfirmDeleteModal from "../Modal/ConfirmDeleteModal";
import MobileAddTask from "../MobileAddTask";

export const Dashboard = () => {
    const { getTask, updateStatus, loader } = useContext(AuthContext);

    const [openModal, setOpenModal] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false);
    const [id, setId] = useState("");

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

    /* ------------------ TODAY FILTER ------------------ */
    const today = new Date().toDateString();

    const filterTask = tasks.filter(
        (task) =>
            new Date(task.dueDate).toDateString() === today &&
            task.status !== "completed"
    );

    /* ------------------ COMPLETE TASK ------------------ */
    const completeTask = async (id) => {
        try {
            const resp = await updateStatus(
                id,
                { completed: true }
            );

            if (resp) {
                setTasks((prev) =>
                    prev.map((task) =>
                        task.id === id ? resp.data : task
                    )
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="overflow-y-auto bg-slate-950 pb-20">
            <div className="w-full max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="flex items-end justify-between mb-8 pt-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white">
                            My Tasks
                        </h1>
                        <p className="text-slate-400 text-sm mt-2">
                            {filterTask.length} tasks remaining for today
                        </p>
                    </div>

                    <button
                        onClick={() => setOpenModal(true)}
                        className="lg:flex hidden items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-2xl"
                    >
                        <IoMdAdd className="text-xl" />
                        <span className="font-semibold text-sm">New Task</span>
                    </button>
                </div>

                {/* Tasks */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filterTask.map((item) => (
                        <div
                            key={item._id || item.id}
                            className="bg-slate-900/40 border border-slate-800 rounded-3xl p-5"
                        >
                            <div className="flex justify-between mb-4">
                                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400">
                                    Pending
                                </span>
                                <IoMdTrash onClick={()=>{setOpen(true), setId(item.id || item._id)}} className="text-slate-600 cursor-pointer" />
                            </div>

                            <h3 className="text-lg font-bold text-white mb-1">
                                {item.title}
                            </h3>

                            <p className="text-slate-400 text-sm">
                                {item.description || "No description provided."}
                            </p>

                            <div className="flex justify-between mt-6 pt-4 border-t border-slate-800">
                                <div className="flex items-center gap-2 text-slate-500">
                                    <IoMdCalendar className="text-blue-500" />
                                    <span className="text-xs">
                                        {new Date(item.dueDate).toLocaleDateString()}
                                    </span>
                                </div>

                                <button
                                    onClick={() => completeTask(item.id || item._id)}
                                    className="flex border-white border rounded-xl p-1.5 cursor-pointer items-center gap-2 text-xs font-bold text-slate-400 hover:text-white"
                                >
                                   confirm
                                </button>
                            </div>

                            <button
                                onClick={() => {
                                    setOpenEdit(true);
                                    setId(item.id || item._id);
                                }}
                                className="mt-3 border border-white cursor-pointer w-1/3 text-white rounded-xl px-3 py-1 text-xs"
                            >
                                Edit
                            </button>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {!loader && filterTask.length === 0 && (
                    <div className="flex flex-col items-center py-20">
                        <IoMdCheckmarkCircle className="text-5xl text-slate-700" />
                        <h2 className="text-xl font-bold text-white mt-4">
                            All caught up!
                        </h2>
                    </div>
                )}
            </div>

            {openModal && (
                <Modal close={() => setOpenModal(false)} setTask={setTasks} />
            )}

            {openEdit && (
                <EditModal
                    close={() => setOpenEdit(false)}
                    id={id}
                    setTasks={setTasks}
                />
            )}
            {
                open && <ConfirmDeleteModal id={id} close={()=>setOpen(false)} setTasks={setTasks} />
            }

          <MobileAddTask setTasks={setTasks} />

        </div>
    );
};
