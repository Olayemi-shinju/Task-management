import React, { useContext } from "react";
import { IoMdClose } from "react-icons/io";
import { IoMdTrash } from "react-icons/io";
import { AuthContext } from '../../Context/AuthContext';
const ConfirmDeleteModal = ({ close, id, setTasks }) => {
    const { deleteTask, loader } = useContext(AuthContext)

    const Delete = async () => {
        try {
            const rep = await deleteTask(id)
            console.log(rep)
            if(rep){
                setTasks(rep.data)

                close()
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <div
                onClick={close}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <div className="relative w-full max-w-sm bg-slate-950 border border-slate-800 rounded-2xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-white">
                        Delete Task
                    </h2>
                    <button
                        onClick={close}
                        className="text-slate-400 hover:text-white transition"
                    >
                        <IoMdClose className="text-xl" />
                    </button>
                </div>

                {/* Body */}
                <div className="text-center mb-6">
                    <div className="flex justify-center mb-4">
                        <div className="bg-red-500/10 p-3 rounded-full">
                            <IoMdTrash className="text-3xl text-red-400" />
                        </div>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Are you sure you want to delete this task?
                        <br />
                        <span className="text-red-400 font-medium">
                            This action cannot be undone.
                        </span>
                    </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={close}
                        disabled={loader}
                        className="flex-1 py-2.5 rounded-xl border border-slate-800 text-slate-400 text-sm font-bold hover:bg-slate-900 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={Delete}
                        disabled={loader}
                        className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-bold transition active:scale-95"
                    >
                        {loader ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;
