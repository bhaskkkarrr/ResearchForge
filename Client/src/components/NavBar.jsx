import React, { useState } from "react";
import { FaUserLarge } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import UserModal from "./UserModal";
const NavBar = () => {
  const { login, user, token, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="text-white min-w-65 flex h-15 justify-between w-full py-2 px-3 sm:mx-3 items-center relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}
        className="sm:text-xl text-md shadow cursor-pointer"
        onClick={() => navigate("/")}
      >
        Research Forge
      </motion.button>
      {user ? (
        <div className="flex gap-3 justify-center items-center ">
          <div className="border-2 rounded-2xl px-3 py-0.5 border-forest-green-100 bg-forest-green-300/60 hover:bg-forest-green-300 cursor-default hover:text-forest-green-900 transition-all duration-300">
            {user?.credits}
          </div>
          {user?.profileURL ? (
            <motion.img
              whileHover={{ scale: 1.09 }}
              src={user?.profileURL}
              alt="dp"
              className="h-8 rounded-xl cursor-pointer shadow-lg shadow-forest-green-100/30"
              onClick={() => {
                if (showProfile) {
                  setShowProfile(false);
                } else {
                  setShowProfile(true);
                }
              }}
            />
          ) : (
            <div
              className="flex border h-8 w-8 border-forest-green-100 rounded-full  justify-center items-center shadow-lg shadow-forest-green-100/30 cursor-pointer"
              onClick={() => {
                if (showProfile) {
                  setShowProfile(false);
                } else {
                  setShowProfile(true);
                }
              }}
            >
              <FaUserLarge size={16} />
            </div>
          )}
        </div>
      ) : (
        <motion.div
          whileHover={{ scale: 1.09 }}
          whileTap={{ scale: 0.99 }}
          className=" bg-forest-green-100 shadow-lg shadow-forest-green-300/40 rounded-4xl px-3 py-1 text-forest-green-900 text-md cursor-pointer"
          onClick={() => login()}
        >
          Get Started
        </motion.div>
      )}

      {showProfile && (
        <div className="absolute z-999 top-15 right-40">
          <UserModal
            // open={() => setShowProfile(true)}
            onClose={() => setShowProfile(false)}
            action={() => logout()}
          />
        </div>
      )}
    </div>
  );
};

export default NavBar;
