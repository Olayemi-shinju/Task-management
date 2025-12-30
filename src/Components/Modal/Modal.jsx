import { IoMdClose } from "react-icons/io";
import { AuthContext } from '../../Context/AuthContext';
import { useContext, useState } from "react";
import { Input } from "../Input/Input";
import { MdTitle, MdOutlineDateRange } from "react-icons/md";
import { FiLoader } from "react-icons/fi";

const Modal = ({ close, setTask }) => {
  const { createTask, loader } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await createTask(formData);
    const data = {
      completed: resp.data.completed,
      title: resp.data.title,
      description: resp.data.description,
      dueDate: resp.data.dueDate,
      user: resp.data.user,
      _id: resp.data._id
    }
    setTask((prev)=>[...prev, data])
    if (resp) close();
  };

  return (
    <div className="fixed animate-in fade-in zoom-in duration-200 inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={close}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-3">
          <h2 className="text-2xl font-semibold text-white tracking-wide">
            Add New Task
          </h2>
          <button
            onClick={close}
            className="text-slate-400 hover:text-white transition"
          >
            <IoMdClose className="text-2xl" />
          </button>
        </div>

        {/* Form */}
        <form className="space-y-5">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="text-md font-medium text-slate-200">
              Task Title
            </label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              icon={MdTitle}
              placeholder="What do you need to do?"

            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-md font-medium text-slate-200">
              Description
            </label>
            <textarea
              rows="3"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="More details..."
              className="mt-1 w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 text-white placeholder:text-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-sky-600 transition"
            />
          </div>

          {/* Due Date */}
          <div className="flex flex-col gap-2">
            <label className="text-md font-medium text-slate-200">
              Due Date
            </label>
            <Input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              icon={MdOutlineDateRange}

            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={close}
              className="flex-1 rounded-xl border border-slate-700 py-3 text-slate-400 hover:text-white hover:border-slate-600 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loader}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-700 to-sky-500 py-3 text-white font-medium hover:from-sky-600 hover:to-sky-400 active:scale-95 transition-all"
            >
              {loader ? <FiLoader className="animate-spin text-xl" /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
