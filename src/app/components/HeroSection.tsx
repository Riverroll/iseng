// src/app/components/HeroSection.tsx (updated with full hero stars)
"use client"
import { useEffect, useRef } from 'react';
import SpaceAnimation from './SpaceAnimation';
import styles from './SpaceHero.module.css';

interface HeroSectionProps {
  backgroundUrl: string;
}

export default function HeroSection({ backgroundUrl }: HeroSectionProps) {
  const starsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (starsRef.current) {
      // Clear existing stars first
      starsRef.current.innerHTML = '';
      
      // Create more stars for the whole hero section
      for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = styles.star;
        
        // Random position across entire hero
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random size
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random delay for animation
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        starsRef.current.appendChild(star);
      }
      
      // Add a few shooting stars
      for (let i = 0; i < 3; i++) {
        const shootingStar = document.createElement('div');
        shootingStar.className = styles.shootingStar;
        
        // Random position and delay
        shootingStar.style.left = `${Math.random() * 80}%`;
        shootingStar.style.top = `${Math.random() * 60}%`;
        shootingStar.style.animationDelay = `${Math.random() * 15}s`;
        
        starsRef.current.appendChild(shootingStar);
      }
    }
    
    // Cleanup function
    return () => {
      if (starsRef.current) {
        starsRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div 
      className={styles.heroContainer}
      style={{ 
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#030d1f', // Fallback dark blue
      }}
    >
      {/* Stars across the entire hero */}
      <div ref={starsRef} className={styles.starsBackground}></div>
      
      {/* Darkening overlay */}
      <div className="absolute inset-0 bg-black/40 z-1"></div>
      
      <div className={styles.content}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-16">
            {/* Space-themed Animated Profile */}
            <div className="flex justify-center mb-8 md:mb-0">
              <SpaceAnimation />
            </div>
            
            {/* Text content */}
            <div className="md:max-w-lg text-white text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">My Portfolio</h1>
              <p className="text-xl max-w-xl mb-8 text-white/80">
                Discover my creative work and projects that showcase my skills in design and development.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a 
                  href="#projects" 
                  className="px-8 py-3 bg-white text-black font-medium rounded-md hover:bg-opacity-90 transition-all hover:shadow-lg"
                >
                  View My Work
                </a>
                <a 
                  href="#contact" 
                  className="px-8 py-3 border border-white text-white font-medium rounded-md hover:bg-white/10 transition-all hover:shadow-lg"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}