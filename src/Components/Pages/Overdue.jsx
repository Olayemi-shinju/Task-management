import { useContext, useEffect, useState } from "react";
import {
  IoMdCalendar,
  IoMdTrash,
  IoMdAlert,
  IoMdRefresh,
  IoMdCheckmarkCircle,
} from "react-icons/io";
import { AuthContext } from "../../Context/AuthContext";
import EditModal from "../Modal/EditModal";
import ConfirmDeleteModal from "../Modal/ConfirmDeleteModal";

const Overdue = () => {
  const { getTask, loader } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState('')
  const [id, setId] = useState(null)
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

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filterTask = tasks?.filter((task) => {
    if (!task.dueDate) return false;
    const taskDate = new Date(task.dueDate);
    taskDate.setHours(0, 0, 0, 0);
    return (
      taskDate.getTime() < today.getTime() &&
      task.status !== "completed"
    );
  });


  return (
    <div className="min-h-screen bg-slate-950 pb-20 px-5 sm:px-6">
      <div className="w-full max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 pt-10 gap-4 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start">
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Overdue
            </h1>
            <p className="text-slate-400 text-sm mt-2 flex items-center gap-2 font-medium justify-center sm:justify-start">
              <IoMdAlert className="text-red-500 text-lg" />
              Tasks past their due date
            </p>
          </div>
        </div>

        {/* Task Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center md:justify-items-stretch">
          {filterTask.map((task) => (
            <div
              key={task.id}
              className="
                group
                bg-slate-900/40
                border border-slate-800/60
                rounded-[2.5rem]
                p-6 sm:p-7
                hover:border-red-500/30
                transition-all duration-500
                hover:shadow-2xl hover:shadow-red-500/5
                mx-auto
                w-full
                max-w-[360px]
                sm:max-w-none
              "
            >
              {/* Card Top */}
              <div className="flex justify-between items-center mb-6">
                <span className="px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-red-500/10 text-red-500 border border-red-500/20">
                  {task.status}
                </span>
                <button onClick={()=>{setOpen(true), setId(task.id || task._id)}} className="text-slate-600 cursor-pointer hover:text-red-400 transition-colors">
                  <IoMdTrash className="text-xl" />
                </button>
              </div>

              {/* Card Body */}
              <div className="mb-8 text-center sm:text-left">
                <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-red-400 transition-colors">
                  {task.title}
                </h3>
                <abbr className="text-white m-4">
                  {task.description}
                </abbr>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-500">
                  <IoMdCalendar className="text-red-500/50" />
                  <span className="text-xs font-bold">
                    Due {new Date(task.dueDate).toDateString()}
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-6 border-t border-slate-800/50">
                <button
                  onClick={()=>{setOpenModal(true), setId(task.id)}}
                  className="
                    cursor-pointer
                    w-full
                    flex items-center justify-center gap-2
                    py-3
                    rounded-2xl
                    bg-slate-800/50
                    hover:bg-red-600
                    text-white
                    transition-all
                    text-xs
                    font-bold
                    uppercase
                    tracking-widest
                    active:scale-95
                  "
                >
                  <IoMdRefresh className="text-lg" />
                  Reschedule
                </button>
              </div>
            </div>
          ))}
        </div>
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

      {/* Edit Modal */}
      {openModal && <EditModal close={() => setOpenModal(false)} id={id} setTasks={setTasks}/>}
        {open && <ConfirmDeleteModal id={id} close={()=>setOpen(false)} setTasks={setTasks}/>}
    </div>
  );
};

export default Overdue;
