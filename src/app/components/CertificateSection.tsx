'use client';

import { useState, useEffect } from 'react';
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
    title: "Advanced Web Development",
    issuer: "Tech Academy",
    date: "2023",
    imageUrl: "/images/c1.png",
    description: "Comprehensive course covering modern frontend frameworks."
  },
  {
    id: 2,
    title: "Next.js Mastery",
    issuer: "Frontend Masters",
    date: "2024",
    imageUrl: "/images/c2.png",
    description: "Building performant applications with React and Next.js."
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    issuer: "Design Institute",
    date: "2024",
    imageUrl: "/images/c3.png",
    description: "Creating intuitive and accessible user interfaces."
  },
  {
    id: 4,
    title: "UI/UX Design Principles",
    issuer: "Design Institute",
    date: "2024",
    imageUrl: "/images/c4.png",
    description: "Creating intuitive and accessible user interfaces."
  },
  {
    id: 5,
    title: "UI/UX Design Principles",
    issuer: "Design Institute",
    date: "2024",
    imageUrl: "/images/c5.png",
    description: "Creating intuitive and accessible user interfaces."
  },
  {
    id: 6,
    title: "UI/UX Design Principles",
    issuer: "Design Institute",
    date: "2024",
    imageUrl: "/images/c6.png",
    description: "Creating intuitive and accessible user interfaces."
  },
  // Add your remaining certificates here
];

export default function SpaceCertificateCarousel() {
  const [selectedCertificate, setSelectedCertificate] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // State for stars and shooting stars - typed properly
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  
  // Generate stars and shooting stars only on client-side
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
  
  // Auto-rotate every 5 seconds if not paused
  useEffect(() => {
    if (!isPaused) {
      const timer = setTimeout(() => {
        goToNext();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [selectedCertificate, isPaused]);
  
  // Update progress bar based on selected certificate
  useEffect(() => {
    const currentIndex = certificates.findIndex(cert => cert.id === selectedCertificate);
    const newProgress = ((currentIndex + 1) / certificates.length) * 100;
    setProgress(newProgress);
  }, [selectedCertificate]);
  
  // Calculate visible certificates in the carousel
  const getVisibleCertificates = () => {
    const currentIndex = certificates.findIndex(cert => cert.id === selectedCertificate);
    
    // Get indices for all visible certificates (previous 2, current, next 2)
    const numCerts = certificates.length;
    const visibleCerts = [];
    
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + numCerts) % numCerts;
      visibleCerts.push(certificates[index]);
    }
    
    return visibleCerts;
  };
  
  const visibleCertificates = getVisibleCertificates();
  const currentCert = certificates.find(cert => cert.id === selectedCertificate)!;
  
  // Navigation handlers
  const goToNext = () => {
    const currentIndex = certificates.findIndex(cert => cert.id === selectedCertificate);
    const nextIndex = (currentIndex + 1) % certificates.length;
    setSelectedCertificate(certificates[nextIndex].id);
  };
  
  const goToPrev = () => {
    const currentIndex = certificates.findIndex(cert => cert.id === selectedCertificate);
    const prevIndex = (currentIndex - 1 + certificates.length) % certificates.length;
    setSelectedCertificate(certificates[prevIndex].id);
  };
  
  // Direct navigation function
  const goToIndex = (id: number) => {
    setSelectedCertificate(id);
  };

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
              {visibleCertificates.map((cert, index) => (
                <div 
                  key={cert.id}
                  className={`${styles.certCard} ${cert.id === selectedCertificate ? styles.active : ''}`}
                  onClick={() => goToIndex(cert.id)}
                >
                  <div className={styles.imageContainer}>
                    <Image 
                      src={cert.imageUrl} 
                      alt={cert.title}
                      fill
                      style={{ objectFit: "cover" }}
                      className={cert.id === selectedCertificate ? '' : styles.dimmedImage}
                    />
                  </div>
                  {cert.id === selectedCertificate && (
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
              
              <div className={styles.timeDisplay}>
                4:05
              </div>
            </div>
            
            <div className={styles.progressBarContainer}>
              <div className={styles.progressBar}>
                {certificates.map((cert, index) => (
                  <div 
                    key={cert.id}
                    className={`${styles.progressSegment} ${cert.id <= selectedCertificate ? styles.completed : ''}`}
                    style={{ width: `${100 / certificates.length}%` }}
                    onClick={() => goToIndex(cert.id)}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}