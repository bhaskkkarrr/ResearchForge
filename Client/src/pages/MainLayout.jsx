import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import image1 from "/img1.svg";
import { motion } from "motion/react";
const MainLayout = () => {
  return (
    <div className="bg-linear-90 from-forest-green-900 via-forest-green-400 to-forest-green-700 items-center flex flex-col justify-center min-h-screen relative overflow-hidden ">
      {/* Ambient light glows */}
      <div className="pointer-events-none absolute -top-24 -left-20 h-64 w-64 sm:h-96 sm:w-96 rounded-full bg-forest-green-200/30 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-24 h-72 w-72 sm:h-112 sm:w-md rounded-full bg-forest-green-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-56 w-56 sm:h-80 sm:w-80 rounded-full bg-forest-green-900/30 blur-3xl" />

      {/* Canopy silhouette — top edge */}
      <svg
        className="pointer-events-none absolute top-0 left-0 w-full h-20 sm:h-32 text-forest-green-900/40"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M0,40 C60,10 120,60 180,35 C240,10 300,55 360,30 C420,5 480,50 540,25
                 C600,0 660,45 720,20 C780,-5 840,40 900,15 C960,-10 1020,35 1080,10
                 C1140,-15 1170,20 1200,5 L1200,0 L0,0 Z"
        />
      </svg>
      <motion.div
        transition={{ duration: 3 }}
        className="h-100 w-50 rounded-full absolute -left-10 bottom-0 bg-forest-green-100/30 animate-pulse duration-1000 blur-3xl border "
      ></motion.div>

      {/* Leaf motif — bottom right, decorative only */}
      <svg
        className="pointer-events-none absolute bottom-6 right-4 sm:right-10 h-16 w-16 sm:h-24 sm:w-24 text-forest-green-100/20 rotate-12"
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M32 4C16 12 8 28 8 40c0 12 10 20 24 20s24-8 24-20c0-12-8-28-24-36Z" />
        <path d="M32 4v56" />
      </svg>

      {/* Radial glow behind logo/illustration, if used elsewhere */}
      <img
        src={image1}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] max-w-3xl opacity-[0.04] select-none"
      />

      {/* Navbar */}
      <div className="max-w-4xl mt-3 h-fit absolute top-0 mx-auto w-full flex justify-center px-4 z-10">
        <NavBar />
      </div>

      {/* Content */}
      <div className="relative flex mt-20 sm:mt-15 w-full px-4 sm:px-6">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
