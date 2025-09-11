'use client';

import { useState, useEffect, useRef } from 'react';

export default function AboutUs() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 });
  const [isBouncing, setIsBouncing] = useState(false);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % 12);
      setIsBouncing(true);
      
      setTimeout(() => setIsBouncing(false), 150);
    }, 300);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (letterRefs.current[currentIndex]) {
      const letter = letterRefs.current[currentIndex];
      if (letter) {
        const rect = letter.getBoundingClientRect();
        const containerRect = letter.parentElement?.getBoundingClientRect();
        if (containerRect) {
          setBallPosition({
            x: rect.left - containerRect.left + rect.width / 2,
            y: rect.top - containerRect.top - 12
          });
        }
      }
    }
  }, [currentIndex]);

  const title = "Magna Coders";
  const letters = title.split('');

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="relative inline-block mb-6 sm:mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-mono flex justify-center items-center relative flex-wrap">
              {letters.map((letter, index) => (
                <span
                  key={index}
                  ref={el => letterRefs.current[index] = el}
                  className={`transition-colors duration-200 px-0.5 sm:px-1 ${
                    index === currentIndex 
                      ? 'text-[#E70008]' 
                      : 'text-[#F9E4AD]'
                  }`}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))}
              
              {/* Bouncing red ball - responsive sizing */}
              <div 
                className={`absolute w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-[#E70008] rounded-full transition-all duration-200 ease-in-out ${
                  isBouncing ? 'scale-150 translate-y-[-3px] sm:translate-y-[-4px] md:translate-y-[-5px]' : 'scale-100 translate-y-0'
                }`}
                style={{
                  left: `${ballPosition.x}px`,
                  top: `${ballPosition.y}px`,
                  transform: 'translate(-50%, -100%)'
                }}
              />
            </h1>
          </div>
          
          <div className="text-center max-w-3xl mx-auto px-2">
            <p className="text-lg sm:text-xl md:text-2xl text-[#F9E4AD] font-mono leading-relaxed px-4 mb-6 sm:mb-8">
              Magna Coders is more than just a platform — it's a community of builders.
            </p>
            
            <div className="text-left max-w-2xl mx-auto px-4">
              <p className="text-base sm:text-lg text-[#F9E4AD] font-mono leading-relaxed mb-4 sm:mb-6">
                Here, developers, designers, and problem-solvers come together to:
              </p>
              
              <ul className="text-base sm:text-lg text-[#F9E4AD] font-mono leading-relaxed space-y-2 sm:space-y-3">
                <li className="flex items-start">
                  <span className="text-[#E70008] mr-2 sm:mr-3">•</span>
                  <span>Showcase their skills.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#E70008] mr-2 sm:mr-3">•</span>
                  <span>Form dynamic teams.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#E70008] mr-2 sm:mr-3">•</span>
                  <span>Build real solutions for real problems.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}