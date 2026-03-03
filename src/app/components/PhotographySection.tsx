"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Category = "all" | "portrait" | "automotive";

interface Photo {
  id: number;
  src: string;
  alt: string;
  category: "portrait" | "automotive";
}

// Add your actual photos to /public/images/photo/
// Naming: portrait-1.jpg, portrait-2.jpg ... auto-1.jpg, auto-2.jpg ...
const photos: Photo[] = [
  { id: 1, src: "/images/photo/portrait-1.jpg", alt: "Portrait", category: "portrait" },
  { id: 2, src: "/images/photo/auto-1.jpg", alt: "Automotive", category: "automotive" },
  { id: 3, src: "/images/photo/portrait-2.jpg", alt: "Portrait", category: "portrait" },
  { id: 4, src: "/images/photo/auto-2.jpg", alt: "Automotive", category: "automotive" },
  { id: 5, src: "/images/photo/portrait-3.jpg", alt: "Portrait", category: "portrait" },
  { id: 6, src: "/images/photo/auto-3.jpg", alt: "Automotive", category: "automotive" },
  { id: 7, src: "/images/photo/portrait-4.jpg", alt: "Portrait", category: "portrait" },
  { id: 8, src: "/images/photo/auto-4.jpg", alt: "Automotive", category: "automotive" },
];

const tabs: { label: string; value: Category }[] = [
  { label: "All", value: "all" },
  { label: "Portrait", value: "portrait" },
  { label: "Automotive", value: "automotive" },
];

export default function PhotographySection() {
  const [active, setActive] = useState<Category>("all");
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  const filtered = active === "all" ? photos : photos.filter((p) => p.category === active);

  return (
    <section id="photography" className="py-20 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-2">Lens Work</p>
            <h2 className="text-3xl md:text-4xl font-bold">Photography</h2>
          </div>

          {/* Filter */}
          <div className="flex gap-1 bg-white/5 p-1 rounded w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActive(tab.value)}
                className={`px-4 py-1.5 text-xs tracking-widest uppercase rounded transition-all duration-200 ${
                  active === tab.value
                    ? "bg-white text-black font-medium"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
          <AnimatePresence>
            {filtered.map((photo) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded"
                onClick={() => setLightbox(photo)}
              >
                <div
                  className={`relative w-full bg-white/5 overflow-hidden ${
                    photo.id % 3 === 0 ? "aspect-[3/4]" : photo.id % 2 === 0 ? "aspect-[4/3]" : "aspect-square"
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    onError={(e) => {
                      (e.currentTarget.parentElement as HTMLElement).style.background = "#111";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-white/70 text-xs tracking-widest uppercase">{photo.category}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state hint */}
        <p className="text-white/15 text-xs text-center mt-8">
          Drop your photos into <code className="text-white/25">public/images/photo/</code>
        </p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-5xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox.src}
                alt={lightbox.alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors text-sm"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
