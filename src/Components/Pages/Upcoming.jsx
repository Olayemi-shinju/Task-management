import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { IoMdCalendar, IoMdRadioButtonOff, IoMdTime, IoMdTrash } from "react-icons/io";

const Upcoming = () => {
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
     const filterTask = tasks.filter((task)=>
         new Date(task.dueDate).toDateString() > today
     )

  return (
    <div className="min-h-screen bg-slate-950 pb-20 px-4">
      <div className="w-full max-w-6xl mx-auto">
        
        {/* Header Section */}
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


        {/* Task Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterTask.map((task) => (
            <div 
              key={task._id} 
              className="group bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] p-7 hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5"
            >
              {/* Card Top: Relative Time Badge & Delete */}
              <div className="flex justify-between items-center mb-6">
                <span className="px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {task.status}
                </span>
                <button className="text-slate-600 hover:text-red-400 transition-colors">
                  <IoMdTrash className="text-xl" />
                </button>
              </div>

              {/* Card Body */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-blue-400 transition-colors">
                  {task.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  {task.description}
                </p>
              </div>

              {/* Card Footer: Specific Date & Action */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-800/50">
                <div className="flex items-center gap-2 text-slate-400">
                  <div className="p-2 bg-slate-800/50 rounded-lg">
                    <IoMdCalendar className="text-blue-500" />
                  </div>
                  <span className="text-xs font-bold">{new Date(task.dueDate).toDateString()}</span>
                </div>

                <button className="flex border rounded-xl p-1.5 cursor-pointer items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-all">
                  <IoMdRadioButtonOff className="text-lg text-blue-600" />
                  <span>Confirm</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
