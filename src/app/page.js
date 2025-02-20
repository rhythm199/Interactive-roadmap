'use client';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { FaCheck } from "react-icons/fa";

const lessons = [
  { name: "Intro", path: "/courses/intro" },
  { name: "HTML", path: "/courses/html" },
  { name: "CSS", path: "/courses/css" },
  { name: "JavaScript", path: "/courses/javascript" },
  { name: "React", path: "/courses/react" },
  { name: "Next.js", path: "/courses/nextjs" }
];

export default function Roadmap() {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    setIsMounted(true);
    const savedProgress = localStorage.getItem("roadmapProgress");
    if (savedProgress !== null) setActiveStep(Number(savedProgress));

    const savedCompletedSteps = JSON.parse(localStorage.getItem("completedSteps")) || [];
    setCompletedSteps(savedCompletedSteps);
  }, []);

  const handleStepClick = (index) => {
    if (index > Math.max(...completedSteps, 0) + 1) return;
    setActiveStep(index);
    localStorage.setItem("roadmapProgress", index);

    if (!completedSteps.includes(index)) {
      const updatedCompleted = [...completedSteps, index];
      setTimeout(() => {
        setCompletedSteps(updatedCompleted);
      }, 3000);
      localStorage.setItem("completedSteps", JSON.stringify(updatedCompleted));
    }

    const message = `Navigating to ${lessons[index].name} course!`;
    setToastMessage(message);
    toast.success(message);
    setTimeout(() => router.push(lessons[index].path), 1000);
  };

  if (!isMounted) return null;

  return (
    <div className="flex flex-col items-center p-4 w-full max-w-4xl mx-auto bg-black text-white min-h-screen">
      <div className="text-xl font-bold">Interactive Roadmap in Next.js</div>
      <div className="relative flex flex-wrap md:flex-nowrap items-center w-full justify-center mt-10">
        {lessons.map((lesson, index) => {
          const isCompleted = completedSteps.includes(index);
          const isActive = index === activeStep;
          const isClickable = isCompleted || isActive || index === Math.max(...completedSteps, -1) + 1;
          return (
            <div key={index} className="flex items-center">
              {index !== 0 && (
                <div className={`w-10 h-1 md:w-16 ${isCompleted ? "bg-purple-700" : "bg-gray-400"}`} />
              )}

              <motion.div
                className={`relative flex items-center justify-center w-12 h-12 md:w-20 md:h-20 rounded-full transition-all duration-300 ease-in-out shadow-lg ${isClickable ? "bg-purple-500 cursor-pointer" : "bg-gray-700 cursor-not-allowed opacity-50"
                  }`}
                whileHover={isClickable ? { scale: 1.1 } : {}}
                whileTap={isClickable ? { scale: 0.9 } : {}}
                onClick={() => isClickable && handleStepClick(index)}
              >
                {isCompleted && <FaCheck className="text-white text-lg" />}
                <span className="text-xs md:text-sm font-semibold text-center">{lesson.name}</span>
              </motion.div>
            </div>
          )
        })}
      </div>
      {toastMessage && <div className="mt-4 p-2 bg-blue-100 text-blue-800 rounded-md text-sm">{toastMessage}</div>}
    </div>
  );
}
