// src/app/components/ProductReveal.tsx
"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProductReveal({ 
  productImage, 
  title, 
  description 
}: { 
  productImage: string, 
  title: string, 
  description: string 
}) {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "center center",
        scrub: 1,
      }
    });
    
    tl.fromTo(image, 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1 }
    ).fromTo(content, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.7 }, 
      "-=0.5"
    );
    
    return () => {
      tl.kill();
    };
  }, []);
  
  return (
    <div ref={sectionRef} className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div ref={imageRef} className="w-full">
          <img src={productImage} alt={title} className="w-full h-auto" />
        </div>
        <div ref={contentRef} className="space-y-6">
          <h2 className="text-4xl font-bold">{title}</h2>
          <p className="text-xl">{description}</p>
        </div>
      </div>
    </div>
  );
}