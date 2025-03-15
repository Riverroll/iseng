'use client';

import { useEffect, useState } from 'react';
import styles from './SpaceCertificateCarousel.module.css'; // Import the shared styles

interface Star {
  id: number;
  size: number;
  left: number;
  top: number;
  delay: number;
}

interface ShootingStar {
  id: number;
  top: number;
  delay: number;
  duration: number;
  angle: number;
}

export default function ContactSection() {
  // Use the same star structures as in the certificate component
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  
  useEffect(() => {
    // Generate stars
    const newStars: Star[] = [];
    for (let i = 0; i < 50; i++) {
      const size = Math.random() * 3 + 1;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 2;
      
      newStars.push({
        id: i,
        size,
        left,
        top,
        delay
      });
    }
    setStars(newStars);
    
    // Generate shooting stars
    const newShootingStars: ShootingStar[] = [];
    for (let i = 0; i < 3; i++) {
      const top = Math.random() * 80 + 10;
      const delay = Math.random() * 5 + i * 3;
      const duration = Math.random() * 2 + 2;
      const angle = Math.random() * 20 - 10;
      
      newShootingStars.push({
        id: i,
        top,
        delay,
        duration,
        angle
      });
    }
    setShootingStars(newShootingStars);
  }, []);

  return (
    <div id="contact" className="py-20 relative overflow-hidden min-h-[500px]">
      {/* Space background with stars */}
      <div className={styles.starsBackground}>
        {/* Render stars from state */}
        {stars.map(star => (
          <div 
            key={star.id}
            className={styles.star}
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`
            }}
          />
        ))}
        
        {/* Render shooting stars from state */}
        {shootingStars.map(star => (
          <div 
            key={star.id}
            className={styles.shootingStar}
            style={{
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
              transform: `rotate(${star.angle}deg)`
            }}
          />
        ))}
      </div>
      
      {/* Deep space background - keep this for additional depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-black z-0">
        {/* Nebula effect */}
        <div className="absolute inset-0 bg-blue-500/5 mix-blend-screen backdrop-blur-3xl"></div>
        <div className="absolute left-1/4 top-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 w-1/3 h-1/3 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-white">
            <span className="relative inline-block">
              Transmit a Signal
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-purple-500 rounded-full animate-pulse"></span>
            </span>
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Ready to launch your next project into orbit? Send a transmission and let&apos;s explore new possibilities together.
          </p>
          
          {/* Communication form styled as a space terminal */}
          <div className="bg-black/60 backdrop-blur-md p-8 rounded-lg border border-purple-500/30 shadow-lg shadow-purple-500/20 mb-8">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              {/* COMMUNICATION_CONSOLE */}
              <div className="text-sm text-gray-400 ml-2">COMMUNICATION_CONSOLE</div>
            </div>
            
            <form className="space-y-4">
              <div className="terminal-input">
                <label className="block text-purple-300 text-sm mb-1">
                  <span className="text-green-400">&gt;</span> NAME
                </label>
                <input 
                  type="text" 
                  className="w-full bg-gray-900/80 text-green-400 border border-purple-500/40 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder-green-700/50"
                  placeholder="Enter your identifier"
                />
              </div>
              
              <div className="terminal-input">
                <label className="block text-purple-300 text-sm mb-1">
                  <span className="text-green-400">&gt;</span> TRANSMISSION_CODE
                </label>
                <input 
                  type="email" 
                  className="w-full bg-gray-900/80 text-green-400 border border-purple-500/40 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder-green-700/50"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div className="terminal-input">
                <label className="block text-purple-300 text-sm mb-1">
                  <span className="text-green-400">&gt;</span> MESSAGE_CONTENT
                </label>
                <textarea 
                  className="w-full bg-gray-900/80 text-green-400 border border-purple-500/40 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder-green-700/50 h-32"
                  placeholder="Type your message here..."
                ></textarea>
              </div>
            </form>
          </div>
          
          <button 
            className="inline-flex items-center px-8 py-3 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-500 transition-colors border border-purple-400/30 shadow-lg shadow-purple-500/20 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:animate-pulse" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
            Transmit Signal
          </button>
          
          <div className="mt-8 text-sm text-blue-200/70 flex items-center justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping mr-2"></div>
            Communication channel open and secure
          </div>
        </div>
      </div>
    </div>
  );
}