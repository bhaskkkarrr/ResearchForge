// components/ErrorState.jsx
import { MdOutlineClose } from "react-icons/md";
import { IoWarning } from "react-icons/io5";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
const ErrorState = ({ message = "Something", onClose }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`fixed backdrop-blur-2xl inset-0 flex min-h-screen items-center justify-center px-4`}
    >
      <div className="relative z-10 w-full max-w-sm sm:max-w-md rounded-2xl border border-forest-green-100/60 bg-forest-green-900/50 backdrop-blur-xl shadow-2xl shadow-forest-green-900/40 px-6 py-8 sm:px-8 sm:py-10 text-center">
        {/* Icon with its own soft glow */}
        <div className="relative mx-auto mb-5 h-14 w-14 sm:h-16 sm:w-16">
          <div className="absolute inset-0 rounded-full bg-forest-green-200/20 blur-xl" />
          <div className="relative flex h-full w-full items-center justify-center rounded-full bg-red-700 ring-1 ring-red-700/20">
            <IoWarning size={30} />
          </div>
        </div>

        <h2 className="text-lg sm:text-xl font-semibold text-forest-green-100">
          An error occurred
        </h2>
        <p className="mt-2 text-sm sm:text-base text-forest-green-100/70 leading-relaxed">
          {message}
        </p>
        <motion.button
          whileHover={{ rotate: 90 }}
          type="button"
          className="mt-6 absolute right-3 -top-3 items-center gap-2 rounded-full bg-forest-green-100/50 cursor-pointer hover:bg-forest-green-100/20 ring-1 ring-forest-green-100/20 p-2 text-sm font-medium text-forest-green-100 transition-colors duration-200"
          onClick={onClose}
        >
          <MdOutlineClose size={20} />
        </motion.button>
      </div>
    </div>
  );
};

export default ErrorState;
