'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

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
  }, []);

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
            <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg font-sans">
              Start Building
            </button>
            <button className="px-8 py-3 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400 hover:text-slate-900 transform hover:scale-105 transition-all duration-200 font-sans">
              Join Community
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

<div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
  <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
    <Image
      className="dark:invert"
      src="/next.svg"
      alt="Next.js logo"
      width={180}
      height={38}
      priority
    />
    <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
      <li className="mb-2 tracking-[-.01em]">
        Get started by editing{" "}
        <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
          app/page.tsx
        </code>
        .
      </li>
      <li className="tracking-[-.01em]">
        Save and see your changes instantly.
      </li>
    </ol>

    <div className="flex gap-4 items-center flex-col sm:flex-row">
      <a
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
        href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          className="dark:invert"
          src="/vercel.svg"
          alt="Vercel logomark"
          width={20}
          height={20}
        />
        Deploy now
      </a>
      <a
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
        href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Read our docs
      </a>
    </div>
  </main>
  <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
    <a
      className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        aria-hidden
        src="/file.svg"
        alt="File icon"
        width={16}
        height={16}
      />
      Learn
    </a>
    <a
      className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        aria-hidden
        src="/window.svg"
        alt="Window icon"
        width={16}
        height={16}
      />
      Examples
    </a>
    <a
      className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        aria-hidden
        src="/globe.svg"
        alt="Globe icon"
        width={16}
        height={16}
      />
      Go to nextjs.org →
    </a>
  </footer>
</div>
