import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { motion } from "motion/react";
const UserModal = ({ onClose, action }) => {
  // if (onClose) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.3,
        },
      }}
      className="absolute gap-3 items-center bg-linear-60 px-5 rounded-2xl  from-forest-green-600 to-forest-green-400 border border-forest-green-300/50 shadow-lg shadow-forest-green-300/30 "
    >
      <motion.div
        className="w-25 cursor-pointer flex justify-center items-center gap-3 py-2"
        whileHover={{ x: 5, scale: 1.05 }}
        onClick={() => {
          action();
          onClose();
        }}
      >
        <div className="text">Sign Out</div>
        <div className="">
          <FaSignOutAlt />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserModal;
