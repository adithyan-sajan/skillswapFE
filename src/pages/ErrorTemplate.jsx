import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FuzzyText from "../component/FuzzyText"; 

export default function ErrorTemplate({ code, title, message }) {
  const [timer, setTimer] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Redirect immediately if the timer hits 0
    if (timer === 0) {
      navigate("/");
      return;
    }

    // 2. Setup interval to tick every 1000ms (1 second)
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    // 3. Clean up the interval on unmount or when timer changes
    return () => clearInterval(interval);
  }, [timer, navigate]);

  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#111] text-black dark:text-white font-mono antialiased flex flex-col items-center justify-center p-6 relative z-10 select-none">
      
      {/* ERROR CARD CONTAINER */}
      <div className="max-w-xl w-full border-4 border-black dark:border-white bg-white dark:bg-[#111] rounded-xl p-8 md:p-12 text-center shadow-[8px_8px_0px_0px_#4f46e5] dark:shadow-[8px_8px_0px_0px_#f97316] transition-all">
        
        {/* GLITCH CODE WRAPPER */}
        <div className="w-full h-32 md:h-40 flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-neutral-900 border-2 border-black dark:border-white rounded-lg mb-8 relative">
          <div className="absolute inset-0 flex items-center justify-center font-sans text-7xl md:text-8xl font-black tracking-widest scale-110">
            <FuzzyText baseIntensity={0.15} hoverIntensity={0.4} enableHover>
              {code}
            </FuzzyText>
          </div>
        </div>

        {/* STATUS TITLE */}
        <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tighter block mb-3 text-black dark:text-white">
          ⚡ {title}
        </h1>

        {/* DETAILS DESCRIPTON */}
        <p className="text-xs md:text-sm font-bold uppercase leading-relaxed text-black/60 dark:text-white/60 border-t-2 border-dashed border-black/20 dark:border-white/20 pt-4 px-2 mb-8">
          {message}
        </p>

        {/* CTAs */}
        <button 
          onClick={() => navigate("/")}
          className="w-full py-3.5 border-2 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black font-black uppercase text-xs tracking-wider rounded-lg hover:opacity-90 active:translate-y-1 active:shadow-none transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]"
        >
          Return to Home ({timer}s)
        </button>
      </div>
    </div>
  );
}