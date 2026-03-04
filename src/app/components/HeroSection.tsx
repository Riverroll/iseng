"use client"
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SpaceAnimation from './SpaceAnimation';
import styles from './SpaceHero.module.css';

interface HeroSectionProps {
  backgroundUrl: string;
}

export default function HeroSection({ backgroundUrl }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax layers — each moves at a different speed
  const bgY        = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const nebulaY    = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const starsY     = useTransform(scrollYProgress, [0, 1], ['0%', '45%']);
  const contentY   = useTransform(scrollYProgress, [0, 1], ['0%', '65%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    if (!starsRef.current) return;
    const starsContainer = starsRef.current;
    starsContainer.innerHTML = '';

    for (let i = 0; i < 160; i++) {
      const star = document.createElement('div');
      star.className = styles.star;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top  = `${Math.random() * 100}%`;
      const size = Math.random() * 3 + 1;
      star.style.width  = `${size}px`;
      star.style.height = `${size}px`;
      star.style.animationDelay    = `${Math.random() * 5}s`;
      star.style.animationDuration = `${Math.random() * 3 + 2}s`;
      starsContainer.appendChild(star);
    }

    for (let i = 0; i < 5; i++) createShootingStar(starsContainer);

    const interval = setInterval(() => {
      if (starsContainer) createShootingStar(starsContainer);
    }, 2000);

    return () => {
      clearInterval(interval);
      if (starsContainer) starsContainer.innerHTML = '';
    };
  }, []);

  const createShootingStar = (container: HTMLDivElement) => {
    const el = document.createElement('div');
    el.className = styles.shootingStar;
    el.style.top    = `${Math.random() * 100}%`;
    el.style.left   = '0';
    const width     = Math.random() * 120 + 80;
    el.style.width  = `${width}px`;
    el.style.height = `${Math.random() * 1.5 + 1}px`;
    el.style.transform = 'rotate(0deg)';
    const duration  = Math.random() * 3 + 2;
    el.style.animationDuration = `${duration}s`;
    el.style.animationDelay   = `${Math.random() * 5}s`;
    container.appendChild(el);
    setTimeout(() => {
      if (container.contains(el)) container.removeChild(el);
    }, (duration + 5) * 1000);
  };

  // Stagger variants for text entrance
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div ref={containerRef} className={styles.heroContainer}>

      {/* Background image — slowest layer */}
      <motion.div
        className={styles.bgLayer}
        style={{ backgroundImage: `url(${backgroundUrl})`, y: bgY }}
      />

      {/* Nebula glow — mid layer */}
      <motion.div className={styles.nebula} style={{ y: nebulaY }} />

      {/* Stars — slightly faster */}
      <motion.div ref={starsRef} className={styles.starsBackground} style={{ y: starsY }} />

      {/* Darkening overlay */}
      <div className="absolute inset-0 bg-black/45 z-[2]" />

      {/* Content — fastest layer */}
      <motion.div
        className={styles.content}
        style={{ y: contentY, opacity: heroOpacity }}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center">

            {/* Profile animation entrance */}
            <motion.div
              className="flex justify-center mb-2"
              variants={itemVariants}
            >
              <SpaceAnimation />
            </motion.div>

            <div className="w-full text-white text-center">
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-2 md:mb-4"
                variants={itemVariants}
              >
                Val
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl mx-auto max-w-xl mb-6 md:mb-8 text-white/80"
                variants={itemVariants}
              >
                Developer &amp; Photographer — building digital products and capturing moments.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4 justify-center"
                variants={itemVariants}
              >
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
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        style={{ opacity: heroOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel} />
        </div>
        <span className={styles.scrollLabel}>Scroll</span>
      </motion.div>

    </div>
  );
}
