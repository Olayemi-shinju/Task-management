import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import Modal from "./Modal/Modal";

const MobileAddTask = ({ setTasks }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {/* Floating button (mobile only) */}
      <div className="fixed z-40 bottom-25 right-5 lg:hidden">
        <button
          onClick={() => setOpenModal(true)}
          className="flex h-12 w-12 bg-blue-600 rounded-full justify-center items-center shadow-lg"
        >
          <IoMdAdd className="text-xl text-white" />
        </button>
      </div>

      {openModal && (
        <Modal close={() => setOpenModal(false)} setTask={setTasks} />
      )}
    </>
  );
};

export default MobileAddTask;
