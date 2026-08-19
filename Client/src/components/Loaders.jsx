import { BiLoaderAlt } from "react-icons/bi";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
export const GlobalLoader = () => {
  return (
    <div className="fixed inset-0 bg-linear-90 from-forest-green-900 via-forest-green-400 to-forest-green-700  backdrop-blur-3xl flex justify-center items-center z-999">
      <div className="animate-spin text-white font-bold">
        <BiLoaderAlt size={40} />
      </div>
    </div>
  );
};

export const ResearchLoader = () => {
  const messages = [
    "Understanding your research question...",
    "Breaking the topic into key research areas...",
    "Planning the research strategy...",
    "Searching trusted sources...",
    "Gathering relevant information...",
    "Comparing findings from different sources...",
    "Cross-checking important claims...",
    "Analyzing the collected evidence...",
    "Identifying key insights and patterns...",
    "Filtering out redundant information...",
    "Evaluating source credibility...",
    "Reviewing conflicting information...",
    "Structuring the research findings...",
    "Writing the research report...",
    "Running a final quality check...",
    "Almost there — polishing your report...",
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => {
        if (prev === messages.length - 1) {
          return 0;
        }

        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-linear-90 from-forest-green-900/70 via-forest-green-400/50 to-forest-green-700/60 backdrop-blur-3xl px-6">
      <div className="flex flex-col items-center text-center">
        <div className="mt-4 h-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-sm sm:text-base text-forest-green-100"
            >
              {messages[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress dots */}

        <div className="mt-6 flex gap-2">
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: dot * 0.2,
              }}
              className="h-2 w-2 rounded-full bg-forest-green-100"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
