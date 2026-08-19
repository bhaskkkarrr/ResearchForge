import React, { useState } from "react";
import { SiMistralai } from "react-icons/si";
import { IoSend } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { BiLoaderAlt } from "react-icons/bi";
import ErrorState from "./ErrorHandler";
import { ResearchLoader } from "./Loaders";

const ChatBox = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [research, setResearch] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [topic, setTopic] = useState(null);
  const [error, setError] = useState("");
  const [temp, setTemp] = useState(null);
  const [showError, setShowError] = useState(false);
  const submitTopic = async (topic) => {
    console.log("Report generation started", topic);
    try {
      if (!topic) {
        return null;
      }
      const res = await axiosInstance.post("/api/research/report", topic, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setResearch(res.data.report);
        console.log(res.data);
        navigate(`/research/${res.data.report._id}`);
      } else {
        setError(
          res.data.message || "Something went wrong while generating report",
        );
        setShowError(true);
      }

      console.log(res.data);
    } catch (error) {
      console.log(error);
      setError(error.message || "Server error ");
      setShowError(true);
    }
  };
  return (
    <div className="w-full text-forest-green-100">
      <div className="bg-forest-green-100 rounded-2xl sm:mx-5 px-4 py-5">
        <div className="text-forest-green-900/50">
          <div className="flex flex-col justify-end items-start">
            <h1 className="text-lg">Try asking...</h1>
            <div className="text-xs flex flex-col">
              <span>
                "Compare React Server Components and Next.js App Router."
              </span>
              <span>
                "Analyze the impact of AI on software engineering jobs."
              </span>
              <span>"Explain quantum computing for beginners."</span>
              <span>
                "Compare PostgreSQL and MongoDB for scalable applications."
              </span>
              <span>"Latest advancements in autonomous vehicles."</span>
            </div>
          </div>
        </div>
        <form
          action={handleSubmit(submitTopic)}
          className="flex w-full gap-4 mt-4 justify-between items-center"
        >
          <div className="text-forest-green-900">
            <SiMistralai size={20} />
          </div>
          <input
            type="text"
            name=""
            id=""
            onChange={(e) => {
              console.log(e);
            }}
            disabled={isSubmitting}
            className="outline-none w-full placeholder:text-forest-green-900/50 text-forest-green-900"
            placeholder="Get started with a topic"
            {...register("topic", { required: true })}
          />

          {isSubmitting ? (
            <div
              className={`animate-spin text-forest-green-900 ${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              <BiLoaderAlt size={25} />
            </div>
          ) : (
            <button
              type="submit"
              className={`text-forest-green-900  disabled:cursor-not-allowed ${isSubmitting ? "cursor-progress" : "cursor-pointer"}`}
              disabled={!user || isSubmitting}
            >
              <IoSend size={20} />
            </button>
          )}
        </form>
      </div>
      {user && (
        <div className="w-full flex justify-center items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            onClick={() => navigate("/history")}
            className="px-10 py-2 rounded-3xl shadow-lg text-lg text-forest-green-900 shadow-forest-green-900 font-semibold mt-5 bg-forest-green-100 "
          >
            History
          </motion.button>
        </div>
      )}

      {showError && (
        <ErrorState
          message={error}
          onClose={() => {
            setError("");
            setShowError(false);
          }}
        />
      )}
      {isSubmitting && <ResearchLoader />}
    </div>
  );
};

export default ChatBox;
