import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar.jsx";
import { motion, useScroll } from "motion/react";
import { FaTrophy } from "react-icons/fa6";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { IoWarningOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance.js";
import { useAuth } from "../context/AuthContext.jsx";
import { GlobalLoader } from "../components/Loaders.jsx";
import ErrorState from "../components/ErrorHandler.jsx";

const Report = () => {
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [report, setReport] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, getUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  async function getReport() {
    if (!id) return;

    try {
      setIsLoading(true);
      const res = await axiosInstance.get(`/api/research/get-report/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setReport(res.data.report);
      } else {
        setShowError(true);
        setError(res.data.message || "Error while getting report");
      }
    } catch (error) {
      setShowError(true);
      setError(error.message || "Something went wrong, please retry");
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    if (token) getReport();
  }, [token]);
  if (isLoading) return <GlobalLoader />;
  return (
    <>
      {report ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="max-w-4xl mx-auto w-full mt-5 flex flex-col justify-center"
        >
          <div className="w-full px-2 sm:px-3 lg:px-4 py-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                },
              }}
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-3xl border-2 border-forest-green-300 backdrop-blur-xl shadow-2xl"
            >
              {/* Background Blur */}
              <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-green-400/20 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-emerald-500/20 blur-3xl" />

              <div className="relative z-10 p-4 md:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                  {/* Left Side */}
                  <div className="space-y-5">
                    <span className="inline-flex items-center rounded-full bg-emerald-500/20 border border-emerald-400/30 px-4 py-1 text-sm font-medium text-emerald-200">
                      AI Generated Research Report
                    </span>

                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
                      {report.report.topic.length > 60
                        ? report.report.topic.slice(0, 60) + "..."
                        : report.report.topic}
                    </h1>

                    <p className="max-w-3xl text-green-100/80 text-md">
                      Comprehensive AI-generated research report with evidence,
                      strengths, limitations and trusted references.
                    </p>
                  </div>

                  {/* Right Side */}
                  <div className="flex flex-col gap-4">
                    <div className="rounded-2xl bg-black/20 border border-white/10 backdrop-blur-lg px-6 py-5 min-w-35">
                      <p className="text-sm text-green-200">Critic Score</p>

                      <h2 className="text-4xl font-bold text-white">
                        {report.report.critic_score}/10
                      </h2>
                    </div>

                    <div className="rounded-2xl bg-black/20 border border-white/10 backdrop-blur-lg px-6 py-5 min-w-35">
                      <p className="text-sm text-green-200">Sources</p>

                      <h2 className="text-4xl font-bold text-white">
                        {report.report.sources.length}
                      </h2>
                    </div>

                    <div className="rounded-2xl bg-black/20 border border-white/10 backdrop-blur-lg px-6 py-5 min-w-35">
                      <p className="text-sm text-green-200">Findings</p>

                      <h2 className="text-4xl font-bold text-white">
                        {report.report.key_findings.length}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ================= Introduction ================= */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
              },
            }}
            whileHover={{ scale: 1.02 }}
            className="w-full px-4 sm:px-6 lg:px-8 mt-10"
          >
            <div className="rounded-3xl border-2 border-forest-green-300 backdrop-blur-xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-green-400 to-emerald-600 shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h8l8 8v8a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Introduction
                  </h2>
                  <p className="text-green-200 text-sm">
                    Overview of the research topic
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-8">
                <p className="text-lg leading-9 text-green-50 tracking-wide">
                  {report.report.introduction}
                </p>
              </div>
            </div>
          </motion.section>

          {/* ================= Key Findings ================= */}
          <section className="w-full px-4 sm:px-6 lg:px-8 mt-12">
            {/* Heading */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                },
              }}
              className="mb-8"
            >
              <span className="inline-flex rounded-full border border-green-400/30 bg-green-500/20 px-4 py-1 text-sm font-medium text-green-200">
                Research Insights
              </span>

              <h2 className="mt-3 text-4xl font-bold text-white">
                Key Findings
              </h2>

              <p className="mt-2 text-green-100/80">
                The most important observations discovered during the research.
              </p>
            </motion.div>

            {/* Cards */}

            <div className="space-y-8">
              {report.report.key_findings.map((finding, index) => (
                <motion.div
                  key={index}
                  className="group relative overflow-hidden rounded-3xl border-2 border-forest-green-300 backdrop-blur-xl shadow-xl hover:border-forest-green-100/40 hover:shadow-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                    },
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Decorative Glow */}
                  <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-green-400/10 blur-3xl transition-all duration-300 group-hover:bg-forest-green-300/20" />

                  {/* Card */}
                  <div className="relative z-10 p-8">
                    {/* Top */}
                    <div className="flex flex-col gap-6 md:flex-row md:items-start">
                      {/* Number */}
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-forest-green-300 to-forest-green-400/60 text-2xl font-bold text-white shadow-lg">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-forest-green-100/90 transition-colors duration-300 group-hover:text-white">
                          {finding.title}
                        </h3>

                        <div className="mt-4 h-1 w-20 rounded-full bg-linear-to-r bg-forest-green-100 " />

                        <p className="mt-6 text-[17px] leading-9 tracking-wide text-green-50">
                          {finding.detailed_explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ================= Critic Analysis ================= */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
              },
            }}
            className="w-full cursor-default px-4 sm:px-6 lg:px-8 mt-14"
          >
            {/* Heading */}

            <div className="mb-8">
              <span className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-500/20 px-4 py-1 text-sm font-medium text-emerald-200">
                AI Evaluation
              </span>

              <h2 className="mt-3 text-4xl font-bold text-white">
                Critic Analysis
              </h2>

              <p className="mt-2 text-green-100/80">
                Overall quality assessment generated by the AI critic.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                },
              }}
              whileHover={{ scale: 1.02 }}
              className="rounded-3xl border-2 border-forest-green-300/10 backdrop-blur-xl shadow-xl p-8"
            >
              <div className="flex flex-col lg:flex-row gap-10 items-center">
                {/* Left Side */}
                <div className="cursor-default flex flex-col items-center">
                  <motion.div whileHover={{ scale: 1.1 }} className="relative">
                    {/* Glow */}
                    <div className=" absolute inset-0 rounded-full bg-green-500/20 blur-xl scale-125" />

                    {/* Circle */}

                    <div className="relative h-44 w-44 rounded-full bg-linear-to-br from-forest-green-300  to-forest-green-600/80 flex items-center justify-center shadow-2xl border border-white">
                      <div className="text-center">
                        <p className="text-6xl font-black text-white">
                          {report.report.critic_score}
                        </p>

                        <p className="text-green-100 font-medium">/10</p>
                      </div>
                    </div>
                  </motion.div>

                  <p className="mt-6 text-xl font-semibold text-forest-green-100">
                    Overall Quality Score
                  </p>
                </div>

                {/* Right Side */}

                <div className="flex-1 w-full">
                  <div className="flex justify-between mb-3">
                    <span className="text-white font-semibold">
                      Report Quality
                    </span>

                    <span className="text-green-200">
                      {report.report.critic_score * 10}%
                    </span>
                  </div>

                  {/* Progress */}

                  <div className="h-4 rounded-full bg-white/40 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-forest-green-100 via-forest-green-300 to-forest-green-400 transition-all duration-1000"
                      style={{
                        width: `${report.report.critic_score * 10}%`,
                      }}
                    />
                  </div>

                  {/* Labels */}
                  <div className="flex justify-between text-xs text-green-200 mt-2">
                    <span>Poor</span>
                    <span>Average</span>
                    <span>Excellent</span>
                  </div>

                  {/* Description */}

                  <div className="mt-8 rounded-2xl border border-green-400/20 bg-green-500/10 p-4">
                    <h3 className="text-xl font-bold text-white mb-3">
                      AI Summary
                    </h3>

                    <p className="text-green-50 leading-8">
                      This score reflects the overall quality of the report
                      based on structure, evidence, clarity, completeness,
                      writing quality, source reliability, and practical
                      usefulness.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.section>

          {/* ================= Strengths & Improvements ================= */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
              },
            }}
            className="w-full px-4 sm:px-6 lg:px-8 mt-14"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* ================= Strengths ================= */}

              <div className="rounded-3xl border border-forest-green-300 bg-white/10 backdrop-blur-xl shadow-xl overflow-hidden">
                {/* Header */}

                <div className="bg-linear-to-r from-green-600/30 to-emerald-500/20 border-b border-white/10 px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-forest-green-100 flex items-center justify-center text-2xl shadow-lg">
                      <TiTick />
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        Strengths
                      </h2>

                      <p className="text-green-200 text-sm">
                        What the report does well
                      </p>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="p-6 space-y-5">
                  {report.report.strengths.slice(0, 3).map((item, index) => (
                    <motion.div
                      key={index}
                      className="group flex gap-4 rounded-2xl border-2 border-forest-green-300/20 p-5 duration-300 hover:-translate-y-1 hover:bg-forest-green-600/60 hover:border-forest-green-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.6,
                        },
                      }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-green-100 text-sm font-bold text-forest-green-700">
                        {index + 1}
                      </div>

                      <p className="leading-7 text-green-50">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* ================= Improvements ================= */}

              <div className="rounded-3xl border border-amber-400/20 bg-white/10 backdrop-blur-xl shadow-xl overflow-hidden">
                {/* Header */}

                <div className="bg-linear-to-r from-red-600 to-red-700 border-b border-white/10 px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-red-500 flex items-center justify-center text-2xl shadow-xl">
                      <IoWarningOutline size={20} />
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        Areas to Improve
                      </h2>

                      <p className="text-yellow-100 text-sm">
                        Suggestions from the AI critic
                      </p>
                    </div>
                  </div>
                </div>

                {/* Items */}

                <div className="p-6 space-y-5">
                  {report.report.areaToImprove
                    .slice(0, 3)
                    .map((item, index) => (
                      <motion.div
                        key={index}
                        className="group flex gap-4 rounded-2xl border-2 border-forest-green-300/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-forest-green-600/40 hover:border-forest-green-300"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.6,
                          },
                        }}
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-200 text-sm font-bold text-red-700">
                          {index + 1}
                        </div>

                        <p className="leading-7 text-green-50">{item}</p>
                      </motion.div>
                    ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* ================= Sources ================= */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
              },
            }}
            className="w-full px-4 sm:px-6 lg:px-8 mt-14 mb-16"
          >
            <div className="mb-8">
              <span className="inline-flex rounded-full border border-green-400/30 bg-green-500/20 px-4 py-1 text-sm font-medium text-green-200">
                References
              </span>

              <h2 className="mt-3 text-4xl font-bold text-white">Sources</h2>

              <p className="mt-2 text-green-100/80">
                Trusted references used during research.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {report.report.sources.map((source, index) => (
                <motion.a
                  key={index}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                    },
                  }}
                  className="group rounded-3xl border-2 border-forest-green-300 backdrop-blur-xl p-6  duration-300 hover:-translate-y-2 hover:border-forest-green-400/40 hover:bg-forest-green-400"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm uppercase tracking-widest text-forest-green-300">
                        Source {index + 1}
                      </span>

                      <h3 className="mt-2 text-2xl font-bold text-white">
                        {source.title}
                      </h3>
                    </div>

                    <div className="rounded-full bg-green-500/20 p-2 transition group-hover:bg-forest-green-300 -rotate-45">
                      <MdOutlineArrowRightAlt size={20} />
                    </div>
                  </div>

                  <p className="mt-5 text-sm break-all text-green-100/70">
                    {source.url}
                  </p>
                </motion.a>
              ))}
            </div>
          </motion.section>
        </motion.div>
      ) : showError ? (
        <ErrorState
          message={error}
          onClose={() => {
            setError("");
            setShowError(false);
          }}
        />
      ) : (
        <div className="text-xl text-forest-green-100 flex flex-col justify-center items-center mx-auto">
          Error while generating research restart it!!
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="px-3 py-1 my-2 rounded-full bg-forest-green-700/50 hover:bg-forest-green-700 text-center shadow-lg shadow-forest-green-100/10 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Tap here
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Report;
