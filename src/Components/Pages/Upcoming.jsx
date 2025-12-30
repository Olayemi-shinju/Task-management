import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import {
  IoMdCalendar,
  IoMdTime,
  IoMdTrash
} from "react-icons/io";
import EditModal from "../Modal/EditModal";
import ConfirmDeleteModal from "../Modal/ConfirmDeleteModal";
import MobileAddTask from "../MobileAddTask";

const Upcoming = () => {
  const { getTask, loader, updateStatus } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [id, setId] = useState("");
  const [open, setOpen] = useState('')

  /* ---------------- FETCH TASKS ---------------- */
  const fetchTasks = async () => {
    try {
      const resp = await getTask();
      setTasks(resp?.data || resp || []);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  /* ---------------- UPCOMING FILTER ---------------- */
  const today = new Date();

  const filteredTasks = tasks.filter((task) => {
    const dueDate = new Date(task.dueDate);
    return (
      dueDate > today &&
    task.status === 'pending'    
    );
  });

  /* ---------------- COMPLETE TASK ---------------- */
  const completeTask = async (taskId) => {
    try {
      const resp = await updateStatus(taskId, { completed: true });

      if (resp) {
        setTasks((prev) =>
          prev.map((task) =>
            task._id === taskId || task.id === taskId
              ? {
                  ...task,
                  completed: true,
                  status: "completed",
                }
              : task
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-slate-950 pb-20 px-4">
      <div className="w-full max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 pt-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Upcoming
            </h1>
            <p className="text-slate-400 text-sm mt-2 flex items-center gap-2 font-medium">
              <IoMdTime className="text-blue-500 text-lg" />
              Your schedule for the next few days
            </p>
          </div>
        </div>

        {/* Loader */}
        {loader && (
          <div className="flex justify-center py-20 text-slate-400">
            Loading tasks...
          </div>
        )}

        {/* Task Grid */}
        {!loader && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <div
                key={task._id || task.id}
                className="group bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] p-7 hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5"
              >
                {/* Card Top */}
                <div className="flex justify-between items-center mb-6">
                  <span className="px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {task.status || "pending"}
                  </span>
                  <button onClick={()=>{setOpen(true), setId(task.id || task._id)}} className="text-slate-600 cursor-pointer hover:text-red-400 transition-colors">
                    <IoMdTrash className="text-xl" />
                  </button>
                </div>

                {/* Body */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-blue-400 transition-colors">
                    {task.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    {task.description || "No description"}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-800/50">
                  <div className="flex items-center gap-2 text-slate-400">
                    <div className="p-2 bg-slate-800/50 rounded-lg">
                      <IoMdCalendar className="text-blue-500" />
                    </div>
                    <span className="text-xs font-bold">
                      {new Date(task.dueDate).toDateString()}
                    </span>
                  </div>

                  <button
                    onClick={() => completeTask(task._id || task.id)}
                    className="flex border-white border p-1.5 rounded-xl cursor-pointer items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
                  >
                    Confirm
                  </button>
                </div>

                {/* Edit */}
                <div className="mt-4">
                  <button
                    onClick={() => {
                      setOpenEdit(true);
                      setId(task._id || task.id);
                    }}
                    className="border rounded-xl px-4 py-1.5 text-xs font-bold text-slate-400 hover:text-white transition-all"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loader && filteredTasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center text-slate-500">
            <IoMdTime className="text-5xl mb-4" />
            <p>No upcoming tasks</p>
          </div>
        )}
      </div>

      {openEdit && (
        <EditModal
          close={() => setOpenEdit(false)}
          id={id}
          setTasks={setTasks}
        />
      )}
      {
        open && <ConfirmDeleteModal id={id} setTasks={setTasks} close={()=>setOpen(false)}/>
      }
      <MobileAddTask setTasks={setTasks}/>
    </div>
  );
};

export default Upcoming;
