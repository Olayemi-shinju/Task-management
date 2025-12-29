import React, { useContext, useEffect, useState } from "react";
import { IoMdCheckmarkCircle, IoMdTrash, IoMdCalendar } from "react-icons/io";
import { AuthContext } from '../../Context/AuthContext';
import ConfirmDeleteModal from "../Modal/ConfirmDeleteModal";
const Completed = () => {
  const { getTask, loader } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]); // Use plural 'tasks' for arrays
  const [open, setOpen] = useState(false)
  const [id, setId] = useState('')
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

  const filterTask = tasks?.filter((prev) => prev.status === 'completed')
  return (
    <div className="min-h-screen bg-slate-950 pb-20 px-4">
      <div className="w-full max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 pt-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Completed
            </h1>
            <p className="text-slate-400 text-sm mt-2 flex items-center gap-2 font-medium">
              <IoMdCheckmarkCircle className="text-green-500 text-lg" />
              Your list of achieved milestones
            </p>
          </div>

          <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-2xl">
            <span className="text-green-400 text-xs font-bold uppercase tracking-widest">{filterTask.length} task done</span>
          </div>
        </div>

        {/* Task Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterTask.map((task) => (
            <div
              key={task.id || task._id}
              className="group bg-slate-900/20 border border-slate-800/40 rounded-[2.5rem] p-7 transition-all duration-300 opacity-80 hover:opacity-100 hover:border-green-500/30"
            >
              {/* Card Top: Done Badge & Delete */}
              <div className="flex justify-between items-center mb-6">
                <span className="px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-green-500/10 text-green-500 border border-green-500/20">
                  Done
                </span>
                <button onClick={()=>{setOpen(true), setId(task.id || task._id)}} className="text-slate-700 cursor-pointer cursor-pointer hover:text-red-400 transition-colors">
                  <IoMdTrash className="text-xl" />
                </button>
              </div>

              {/* Card Body */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-500 mb-3 leading-tight line-through group-hover:text-green-400 transition-colors">
                  {task.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  {task.description}
                </p>
              </div>

              {/* Card Footer: Completion Date */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-800/30">
                <div className="flex items-center gap-2 text-slate-600">
                  <div className="p-2 bg-slate-800/30 rounded-lg">
                    <IoMdCalendar className="text-green-600" />
                  </div>
                  <span className="text-xs font-bold">{new Date(task.dueDate).toDateString()}</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-black text-green-500/50">
                  <IoMdCheckmarkCircle className="text-lg" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!loader && tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-slate-900 p-6 rounded-full mb-4">
              <IoMdCheckmarkCircle className="text-5xl text-slate-700" />
            </div>
            <h2 className="text-xl font-bold text-white">All caught up!</h2>
            <p className="text-slate-500">You don't have any tasks for today.</p>
          </div>
        )}
      </div>
      {
        open && <ConfirmDeleteModal id={id} close={()=>setOpen(false)} setTasks={setTasks} />
      }
    </div>
  );
};

export default Completed;
