import { useContext, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { AuthContext } from '../../Context/AuthContext';
import { FiLoader } from "react-icons/fi";
const EditModal = ({ close, id, setTasks }) => {
  const { updateTask, getSingleTask, loader } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: ''
  })



  useEffect(() => {
    const fetchTask = async () => {
      try {
        if (!id) return
        const resp = await getSingleTask(id)
        if (resp) return setFormData({ title: resp.data.title || '', description: resp.data.description || '', dueDate: new Date(resp.data.dueDate).toISOString().split('T')[0] || '' })
      } catch (error) {
        console.log(error)
      }
    }
    fetchTask()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const resp = await updateTask(formData, id)
      if (resp) {
        setTasks((prev) =>
          prev.map((task) => (task._id || task.id === resp.data._id ? resp.data : task))
        );
        close()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="fixed animate-in fade-in zoom-in duration-200 inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div onClick={close} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* EditModal */}
      <div className="relative w-full sm:max-w-md bg-slate-950 border border-slate-800 rounded-t-3xl sm:rounded-3xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-white">
            Edit Task
          </h2>
          <button onClick={close} className="text-slate-400 hover:text-white transition">
            <IoMdClose className="text-xl" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="text-sm text-slate-400">
              Task title
            </label>
            <input
              type="text"
              name='title'
              value={formData.title}
              onChange={handleChange}
              placeholder="What do you need to do?"
              className="mt-1 w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-slate-400">
              Description (optional)
            </label>
            <textarea
              rows="3"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="More details..."
              className="mt-1 w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 text-white placeholder:text-slate-500 resize-none focus:outline-none"
            />
          </div>

          {/* Date */}
          <div>
            <label className="text-sm text-slate-400">
              Due date
            </label>
            <input
              type="date"
              name='dueDate'
              value={formData.dueDate}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 text-white focus:outline-none"
            />
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
    </div>
  );
};

export default EditModal;
