"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import NowPlaying from "./NowPlaying";

const skills = [
  "Next.js", "React", "TypeScript", "Tailwind CSS",
  "UI/UX Design", "Photography", "GSAP", "Figma",
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 relative overflow-hidden bg-[#0a0a0a]">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px] animate-[drift1_18s_ease-in-out_infinite_alternate]" />
        <div className="absolute -bottom-40 -right-20 w-[400px] h-[400px] rounded-full bg-cyan-500/8 blur-[100px] animate-[drift2_22s_ease-in-out_infinite_alternate]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-blue-600/6 blur-[80px] animate-[drift3_14s_ease-in-out_infinite_alternate]" />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top fade — blends from Hero */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      {/* Bottom fade — blends into Resume */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#0a0a0a] z-10 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-violet-400/60 text-xs tracking-[0.3em] uppercase mb-2">About</p>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-white to-violet-300 bg-clip-text text-transparent">Who I am</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] max-w-sm mx-auto overflow-hidden rounded-lg border border-white/10">
              <Image
                src="/images/profilephoto.JPG"
                alt="Val"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 md:right-0 bg-[#111] border border-white/10 rounded-lg px-4 py-3 shadow-xl">
              <NowPlaying />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6 pt-8 md:pt-0"
          >
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                I&apos;m Val — a developer and self-taught photographer based in Indonesia.
                I build clean, functional web products and capture the world through a lens
                when I&apos;m not at a keyboard.
              </p>
              <p>
                My photography focuses on portrait and automotive work — finding the balance
                between raw human expression and the mechanical precision of machines.
                Music is always in the background, shaping the mood.
              </p>
            </div>

            {/* Skills */}
            <div>
              <p className="text-violet-400/60 text-xs tracking-[0.2em] uppercase mb-3">Stack &amp; Tools</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span
                    key={skill}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-300 hover:scale-105 ${
                      i % 4 === 0 ? "bg-violet-500/10 border-violet-500/30 text-violet-300 hover:bg-violet-500/20 hover:border-violet-400/50" :
                      i % 4 === 1 ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400/50" :
                      i % 4 === 2 ? "bg-blue-500/10 border-blue-500/30 text-blue-300 hover:bg-blue-500/20 hover:border-blue-400/50" :
                      "bg-pink-500/10 border-pink-500/30 text-pink-300 hover:bg-pink-500/20 hover:border-pink-400/50"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://github.com/Riverroll"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors text-sm"
              >
                GitHub →
              </a>
              <a
                href="https://www.linkedin.com/in/nauvaluzlah"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors text-sm"
              >
                LinkedIn →
              </a>
              <a
                href="https://www.instagram.com/riverwrks/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors text-sm"
              >
                Instagram →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
