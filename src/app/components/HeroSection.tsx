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
    if (!starsRef.current) return;
    
    // Store the ref value in a variable for cleanup function
    const starsContainer = starsRef.current;
    
    // Clear existing stars first
    starsContainer.innerHTML = '';
    
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
      
      starsContainer.appendChild(star);
    }
    
    // Add more shooting stars with better visibility
    for (let i = 0; i < 5; i++) {
      createShootingStar(starsContainer);
    }
    
    // Add a new shooting star every few seconds
    const shootingStarInterval = setInterval(() => {
      if (starsContainer) {
        createShootingStar(starsContainer);
      }
    }, 2000);
    
    // Cleanup function uses starsContainer instead of starsRef.current
    return () => {
      clearInterval(shootingStarInterval);
      if (starsContainer) {
        starsContainer.innerHTML = '';
      }
    };
  }, []);
  
  // Function to create and add a shooting star
  const createShootingStar = (container: HTMLDivElement) => {
    const shootingStar = document.createElement('div');
    shootingStar.className = styles.shootingStar;
    
    // Random vertical position across the entire hero height
    shootingStar.style.top = `${Math.random() * 100}%`;
    shootingStar.style.left = '0';
    
    // Random size (make some shooting stars larger)
    const width = Math.random() * 120 + 80;
    shootingStar.style.width = `${width}px`;
    shootingStar.style.height = `${Math.random() * 1.5 + 1}px`;
    
    // No rotation needed for straight left-to-right movement
    shootingStar.style.transform = 'rotate(0deg)';

    // Alternative approach to ensure some stars appear at the bottom
    const bottomBias = Math.random() > 0.5;
    if (bottomBias) {
    // Place in bottom half (50%-100%)
    shootingStar.style.top = `${50 + Math.random() * 50}%`;
    } else {
    // Place anywhere (0%-100%)
    shootingStar.style.top = `${Math.random() * 100}%`;
    }
    
    // Random duration and delay
    const duration = Math.random() * 3 + 2;
    shootingStar.style.animationDuration = `${duration}s`;
    shootingStar.style.animationDelay = `${Math.random() * 5}s`;
    
    container.appendChild(shootingStar);
    
    // Remove the shooting star after animation completes
    setTimeout(() => {
      if (container.contains(shootingStar)) {
        container.removeChild(shootingStar);
      }
    }, (duration + 5) * 1000);
  };

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
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center">
            {/* Space-themed Animated Profile */}
            <div className="flex justify-center mb-2">
              <SpaceAnimation />
            </div>
            
            {/* Text content */}
            <div className="w-full text-white text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 md:mb-4">Val&apos;s Portfolio</h1>
              <p className="text-lg md:text-xl mx-auto max-w-xl mb-6 md:mb-8 text-white/80">
                Discover my creative work and projects that showcase my skills in design and development.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a 
                  href="#projects" 
                  className="px-6 py-2 md:px-8 md:py-3 bg-white text-black font-medium rounded-md hover:bg-opacity-90 transition-all hover:shadow-lg"
                >
                  View My Work
                </a>
                <a 
                  href="#contact" 
                  className="px-6 py-2 md:px-8 md:py-3 border border-white text-white font-medium rounded-md hover:bg-white/10 transition-all hover:shadow-lg"
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