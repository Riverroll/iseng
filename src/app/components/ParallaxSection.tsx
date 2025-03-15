// src/app/components/ParallaxSection.tsx
"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ParallaxSection({ 
  children, 
  backgroundUrl 
}: { 
  children: React.ReactNode, 
  backgroundUrl: string 
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div 
        className="absolute inset-0 z-0" 
        style={{ 
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: backgroundY 
        }}
      />
      <div className="relative z-10 h-full flex items-center justify-center">
        {children}
      </div>
    </section>
  );
}