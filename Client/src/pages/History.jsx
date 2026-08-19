import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { axiosInstance } from "../utils/axiosInstance";
import { GlobalLoader } from "../components/Loaders";
import { FaChevronRight } from "react-icons/fa";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import ErrorState from "../components/ErrorHandler";
const History = () => {
  const { user, token } = useAuth();
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [researchReports, setResearchReports] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const getAllReports = async () => {
    console.log(user, token);
    try {
      setIsLoading(true);

      console.log("Reached");
      const res = await axiosInstance.get("/api/research/all-reports", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setResearchReports(res.data.reports);
      } else {
        setError(res.data.message);
        setShowError(true);
      }
    } catch (error) {
      setError(error.message || "Something went wrong");
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };
  console.log("researchReports", researchReports);
  useEffect(() => {
    if (token) getAllReports();
  }, [token]);
  if (isLoading) return <GlobalLoader />;
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
          },
        }}
        className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center gap-10 my-10"
      >
        {researchReports && researchReports.length > 0 ? (
          researchReports.map((report) => (
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative transition-all duration-200 max-w-3xl w-full mx-auto flex flex-col items-center justify-center gap-10 cursor-pointer"
              onClick={() => navigate(`/research/${report._id}`)}
              key={report._id}
            >
              <div className="border border-forest-green-700/50 shadow-lg shadow-forest-green-300/20 bg-forest-green-700/50 rounded-2xl w-full px-8 py-3">
                <div className=" text-lg font-semibold italic text-forest-green-100  ">
                  @ {report.report.topic}
                </div>
                <p className="text-sm italic sm:px-7 px-3 text-forest-green-100">
                  {report?.report?.introduction.length > 200
                    ? report?.report?.introduction?.slice(0, 200) + "..."
                    : report?.report?.introduction}
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-xl text-forest-green-100">
            No research done yet!!
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="px-3 py-1 my-2 rounded-full bg-forest-green-700/50 hover:bg-forest-green-700 text-center shadow-lg shadow-forest-green-100/10 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Get started
            </motion.div>
          </div>
        )}
      </motion.div>
      {showError && (
        <ErrorState
          message={error}
          onClose={() => {
            setError("");
            setShowError(false);
          }}
        />
      )}
    </>
  );
};

export default History;
