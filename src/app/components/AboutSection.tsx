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
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-2">About</p>
          <h2 className="text-3xl md:text-4xl font-bold">Who I am</h2>
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
              <p className="text-white/30 text-xs tracking-[0.2em] uppercase mb-3">Stack &amp; Tools</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/70 hover:border-white/30 hover:text-white transition-colors"
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
