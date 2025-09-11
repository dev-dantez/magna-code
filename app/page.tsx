'use client';

import { useState, useEffect } from "react";
import PWAInstaller from "./components/PWAInstaller";

// Custom Typewriter component for one-by-one letter effect
const TypewriterTitle = ({ text, speed = 100 }: { text: string; speed?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setDisplayText('');
    let currentIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        // Blink cursor for 3 seconds then hide
        setTimeout(() => setShowCursor(false), 3000);
      }
    }, speed);

    return () => {
      clearInterval(typeInterval);
      setShowCursor(true);
    };
  }, [text, speed]);

  return (
    <h1 className="text-6xl md:text-7xl font-bold text-[#F9E4AD] mb-8">
      <span className="font-mono">{displayText}</span>
      {showCursor && <span className="animate-pulse">|</span>}
    </h1>
  );
};

export default function Home() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const titles = [
    "Magna Coders",
    "Build. Collaborate. Solve.",
    "Code the Future",
    "Join the Revolution"
  ];
  
  // Available tech icons: 1-30 (some missing like 22, 25)
  const availableIcons = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,23,24,26,27,28,29,30];
  const techIcons = Array.from({ length: 60 }, (_, i) => {
    const iconIndex = i % availableIcons.length;
    return availableIcons[iconIndex];
  });

  useEffect(() => {
    // Cycle through different titles every 6 seconds
    const titleInterval = setInterval(() => {
      setCurrentTitleIndex(prev => (prev + 1) % titles.length);
    }, 6000);

    return () => clearInterval(titleInterval);
  }, [titles.length]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Animated background tech icons */}
      <div className="falling-symbols absolute w-full h-full pointer-events-none">
        {techIcons.map((num, index) => (
          <div key={`${num}-${index}`} className="symbol">
            <img 
              src={`/tech icons/${num}.svg`} 
              alt={`Tech icon ${num}`}
              className="w-8 h-8 opacity-30 hover:opacity-60 transition-opacity"
            />
          </div>
        ))}
      </div>
      
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <div className="text-center max-w-4xl">
          <TypewriterTitle 
            key={currentTitleIndex} 
            text={titles[currentTitleIndex]} 
            speed={80} 
          />
          
          <p className="text-2xl text-[#FF9940] mb-12 animate-fade-in font-sans">
            Where developers, designers, and problem-solvers unite to create tech solutions for real-world challenges.
          </p>
          
          <div className="flex gap-6 justify-center">
            <button className="px-8 py-3 bg-[#E70008] text-white font-semibold rounded-full hover:bg-[#D60007] transform hover:scale-105 transition-all duration-200 shadow-lg font-sans">
              Start Building
            </button>
            <button className="px-8 py-3 border-2 border-[#E70008] text-[#E70008] font-semibold rounded-full hover:bg-[#E70008] hover:text-white transform hover:scale-105 transition-all duration-200 font-sans">
              Join Community
            </button>
          </div>
        </div>
      </main>
      
      <PWAInstaller />
    </div>
  );
}
