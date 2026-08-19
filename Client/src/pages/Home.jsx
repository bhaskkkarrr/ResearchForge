import React, { useEffect } from "react";
import ChatBox from "../components/ChatBox";
import { useAuth } from "../context/AuthContext";
import { GlobalLoader, ResearchLoader } from "../components/Loaders";
import NavBar from "../components/NavBar";
import { motion } from "motion/react";
const Home = () => {
  const { user, token, isAuthLoading } = useAuth();
  if (isAuthLoading) {
    return <GlobalLoader />;
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
        },
      }}
      className="max-w-4xl min-w-65 mx-auto w-full flex justify-center mb-6"
    >
      <ChatBox />
    </motion.div>
  );
};

export default Home;
