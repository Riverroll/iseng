'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import styles from './SpaceCertificateCarousel.module.css';

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
  description: string;
}

// Define interfaces for star types
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

// Sample certificates - replace with your actual certificates
const certificates: Certificate[] = [
  {
    id: 1,
    title: "Data Science Bootcamp",
    issuer: "Purwadhika",
    date: "2024",
    imageUrl: "/images/c1.png",
    description: "Comprehensive course covering modern frontend frameworks."
  },
  {
    id: 2,
    title: "Magenta Certificate",
    issuer: "Biro Klasifikasi Indonesia",
    date: "2024",
    imageUrl: "/images/c2.png",
    description: "Building performant applications with React and Next.js."
  },
  {
    id: 3,
    title: "Data Science Bootcamp Mini Course",
    issuer: "RevoU",
    date: "2024",
    imageUrl: "/images/c3.png",
    description: "Creating intuitive and accessible user interfaces."
  },
  {
    id: 4,
    title: "Project Management",
    issuer: "Dicoding",
    date: "2024",
    imageUrl: "/images/c4.png",
    description: "Creating intuitive and accessible user interfaces."
  },
  {
    id: 5,
    title: "Basic Coding",
    issuer: "Dicoding",
    date: "2024",
    imageUrl: "/images/c5.png",
    description: "Creating intuitive and accessible user interfaces."
  },
  {
    id: 6,
    title: "Data Science Bootcamp",
    issuer: "Udemy",
    date: "2024",
    imageUrl: "/images/c6.png",
    description: "Creating intuitive and accessible user interfaces."
  },
  // Add your remaining certificates here
];

const TOTAL_MS = 90000; // 1:30 total
const CERT_MS = TOTAL_MS / certificates.length; // ms per certificate

function formatTime(ms: number) {
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function SpaceCertificateCarousel() {
  const [activeCertIndex, setActiveCertIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

  // Refs for direct DOM updates — no re-render on every frame
  const elapsedRef = useRef(0);
  const lastTickRef = useRef(Date.now());
  const rafRef = useRef(0);
  const isPausedRef = useRef(false);
  const fillRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const currentCert = certificates[activeCertIndex];

  useEffect(() => {
    setStars(Array.from({ length: 50 }, (_, i) => ({
      id: i, size: Math.random() * 3 + 1,
      left: Math.random() * 100, top: Math.random() * 100, delay: Math.random() * 2,
    })));
    setShootingStars(Array.from({ length: 3 }, (_, i) => ({
      id: i, top: Math.random() * 80 + 10,
      delay: Math.random() * 5 + i * 3, duration: Math.random() * 2 + 2, angle: Math.random() * 20 - 10,
    })));
  }, []);

  // rAF loop — drives DOM directly, only sets React state when cert changes
  useEffect(() => {
    const tick = () => {
      if (!isPausedRef.current) {
        const now = Date.now();
        const delta = now - lastTickRef.current;
        lastTickRef.current = now;

        elapsedRef.current = (elapsedRef.current + delta) % TOTAL_MS;
        const elapsed = elapsedRef.current;

        // Update fill width directly on DOM
        if (fillRef.current) {
          fillRef.current.style.width = `${(elapsed / TOTAL_MS) * 100}%`;
        }

        // Update time text directly on DOM
        if (timeRef.current) {
          timeRef.current.textContent = `${formatTime(elapsed)} / 1:30`;
        }

        // Only trigger React re-render when cert actually changes
        const newIndex = Math.floor(elapsed / CERT_MS) % certificates.length;
        setActiveCertIndex(prev => prev !== newIndex ? newIndex : prev);
      } else {
        lastTickRef.current = Date.now();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    lastTickRef.current = Date.now();
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Sync isPaused to ref so the loop can read it without re-subscribing
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  const seekTo = useCallback((ms: number) => {
    elapsedRef.current = Math.max(0, Math.min(TOTAL_MS - 1, ms));
    setActiveCertIndex(Math.floor(elapsedRef.current / CERT_MS) % certificates.length);
  }, []);

  const goToPrev = useCallback(() => {
    seekTo(((activeCertIndex - 1 + certificates.length) % certificates.length) * CERT_MS);
  }, [activeCertIndex, seekTo]);

  const goToNext = useCallback(() => {
    seekTo(((activeCertIndex + 1) % certificates.length) * CERT_MS);
  }, [activeCertIndex, seekTo]);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    seekTo(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) * TOTAL_MS);
  }, [seekTo]);

  const getVisibleCertificates = () =>
    Array.from({ length: 5 }, (_, i) =>
      certificates[(activeCertIndex + i - 2 + certificates.length) % certificates.length]
    );

  const visibleCertificates = getVisibleCertificates();

  return (
    <section id="certificates" className={styles.heroContainer}>
      {/* Space background with stars */}
      <div className={styles.starsBackground}>
        {/* Render stars from state (client-side only) */}
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
        
        {/* Render shooting stars from state (client-side only) */}
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
      
      <div className="container mx-auto">
        {/* Certifications Title Section */}
        <div className="w-full text-white text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 md:mb-4">Certifications</h1>
          <p className="text-lg md:text-xl mx-auto max-w-xl mb-6 md:mb-8 text-white/80">
            Professional achievements and educational milestones that highlight my expertise and continuous learning.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {/* <a 
              href="#all-certificates" 
              className="px-6 py-2 md:px-8 md:py-3 bg-white text-black font-medium rounded-md hover:bg-opacity-90 transition-all hover:shadow-lg"
            >
              View All Certificates
            </a>
            <a 
              href="#credentials" 
              className="px-6 py-2 md:px-8 md:py-3 border border-white text-white font-medium rounded-md hover:bg-white/10 transition-all hover:shadow-lg"
            >
              Verify Credentials
            </a> */}
          </div>
        </div>
        
        {/* Certificate Carousel - Updated for square design */}
        <div className={styles.container}>
          {/* Cards container with updated layout */}
          <div className={styles.cardsContainer}>
            {/* Navigation arrow - previous */}
            <button
              className={styles.navArrow}
              onClick={goToPrev}
              aria-label="Previous certificate"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>
            
            {/* Visible certificates */}
            <div className={styles.certificatesRow}>
              {visibleCertificates.map((cert) => (
                <div
                  key={cert.id}
                  className={`${styles.certCard} ${cert.id === currentCert.id ? styles.active : ''}`}
                  onClick={() => seekToIndex(certificates.findIndex(c => c.id === cert.id))}
                >
                  <div className={styles.imageContainer}>
                    <Image 
                      src={cert.imageUrl} 
                      alt={cert.title}
                      fill
                      style={{ objectFit: "cover" }}
                      className={cert.id === currentCert.id ? '' : styles.dimmedImage}
                    />
                  </div>
                  {cert.id === currentCert.id && (
                    <div className={styles.neonBorder}></div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Navigation arrow - next */}
            <button
              className={styles.navArrow}
              onClick={goToNext}
              aria-label="Next certificate"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </div>
          
          {/* Player interface */}
          <div className={styles.player}>
            <div className={styles.playControls}>
              <button 
                className={styles.playIcon}
                onClick={() => setIsPaused(!isPaused)}
                aria-label={isPaused ? "Play" : "Pause"}
              >
                {isPaused ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                )}
              </button>
              
              <div className={styles.certInfo}>
                <div className={styles.title}>{currentCert.title}</div>
                <div className={styles.subtitle}>
                  {currentCert.issuer}
                </div>
              </div>
              
              <div ref={timeRef} className={styles.timeDisplay}>
                0:00 / 1:30
              </div>
            </div>
            
            <div className={styles.progressBarContainer}>
              {/* Seekable track */}
              <div
                ref={trackRef}
                className={styles.progressBarTrack}
                onClick={handleSeek}
                style={{ cursor: 'pointer' }}
              >
                {/* Segment markers */}
                {certificates.map((_, i) => i > 0 && (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      left: `${(i / certificates.length) * 100}%`,
                      top: 0,
                      width: '1px',
                      height: '100%',
                      background: 'rgba(255,255,255,0.15)',
                    }}
                  />
                ))}
                <div
                  ref={fillRef}
                  className={styles.progressBarFill}
                  style={{ width: '0%' }}
                />
              </div>
              {/* Dot indicators */}
              <div className={styles.dotIndicators}>
                {certificates.map((cert, i) => (
                  <div
                    key={cert.id}
                    className={`${styles.dot} ${cert.id === currentCert.id ? styles.activeDot : ''}`}
                    onClick={() => seekToIndex(i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}