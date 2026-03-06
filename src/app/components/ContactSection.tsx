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
      
      {/* Top fade — blends from Certificates */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0d0d1a] to-transparent z-[5] pointer-events-none" />

      {/* Deep space background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d1a] via-indigo-900/80 to-black z-0">
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
          
          {/* WhatsApp CTA */}
          <div className="bg-black/60 backdrop-blur-md p-8 rounded-lg border border-purple-500/30 shadow-lg shadow-purple-500/20 mb-8">
            <div className="flex items-center mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <div className="text-sm text-gray-400 ml-2">COMMUNICATION_CONSOLE</div>
            </div>

            <div className="text-left space-y-1 font-mono text-sm mb-6">
              <p className="text-green-400"><span className="text-purple-400">$</span> init contact --channel whatsapp</p>
              <p className="text-green-400"><span className="text-purple-400">$</span> target <span className="text-white">+62 813-1576-4554</span></p>
              <p className="text-green-400 flex items-center gap-2">
                <span className="text-purple-400">$</span> status
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
                  <span className="text-green-400">ONLINE</span>
                </span>
              </p>
            </div>

            <a
              href="https://wa.me/6281315764554"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 w-full justify-center px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-lg transition-colors shadow-lg shadow-green-500/20 group"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          <div className="mt-4 text-sm text-blue-200/70 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            Communication channel open and secure
          </div>
        </div>
      </div>
    </div>
  );
}