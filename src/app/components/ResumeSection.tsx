"use client";

import { motion } from "framer-motion";

const experience = [
  {
    company: "PT Kape Cipta Solusi",
    role: "Odoo Functional Consultant",
    type: "Contract",
    period: "May 2025 – Present",
    location: "Jakarta",
    bullets: [
      "Software documentation and business process optimization",
      "Odoo ERP implementation and functional consulting",
    ],
    color: "cyan",
  },
  {
    company: "Codenito",
    role: "IT Business Consultant & UI/UX Lead",
    type: "Full-time",
    period: "Aug 2023 – Present",
    location: "Jakarta",
    bullets: [
      "Lead IT consulting projects across diverse industry clients",
      "Developed comprehensive DBMS for hospital management",
      "Translated client requirements into scalable technical solutions",
      "Built website for Dulux Design Competition",
    ],
    color: "blue",
  },
  {
    company: "RHP (PT. RHP Cipta Digital)",
    role: "Frontend Engineer",
    type: "Contract",
    period: "May 2025 – Mar 2026",
    location: "Jakarta",
    bullets: [
      "Develop international WordPress websites for US, Singapore, and China markets",
      "Create responsive, cross-cultural web experiences for regional requirements",
      "Implement frontend solutions optimized for international audiences",
    ],
    color: "violet",
  },
  {
    company: "BKI (Biro Klasifikasi Indonesia)",
    role: "Full Stack Engineer",
    type: "Internship",
    period: "Aug 2024 – Nov 2024",
    location: "Jakarta",
    bullets: [
      "Built centralized fullstack app for financial and operational reporting",
      "Designed financial dashboard improving organizational decision-making",
      "Optimized business processes through system integration and automation",
      "Applied DevOps best practices for deployment efficiency",
    ],
    color: "pink",
  },
];

const education = [
  {
    institution: "Asia E University",
    degree: "B.S. Information Technology",
    period: "2021 – 2025",
    gpa: "3.56",
  },
  {
    institution: "Universitas Indonesia",
    degree: "S1 Computer Science (CCIT-FTUI)",
    period: "2021 – 2023",
    gpa: "3.00",
  },
];

const colorMap: Record<string, string> = {
  violet: "border-violet-500/30 bg-violet-500/5 text-violet-400",
  cyan:   "border-cyan-500/30 bg-cyan-500/5 text-cyan-400",
  blue:   "border-blue-500/30 bg-blue-500/5 text-blue-400",
  pink:   "border-pink-500/30 bg-pink-500/5 text-pink-400",
};

const dotMap: Record<string, string> = {
  violet: "bg-violet-500 shadow-[0_0_8px_2px_rgba(139,92,246,0.5)]",
  cyan:   "bg-cyan-500 shadow-[0_0_8px_2px_rgba(6,182,212,0.5)]",
  blue:   "bg-blue-500 shadow-[0_0_8px_2px_rgba(59,130,246,0.5)]",
  pink:   "bg-pink-500 shadow-[0_0_8px_2px_rgba(236,72,153,0.5)]",
};

export default function ResumeSection() {
  return (
    <section id="resume" className="py-20 relative overflow-hidden bg-[#0a0a0a]">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-cyan-600/8 blur-[120px] animate-[drift2_20s_ease-in-out_infinite_alternate]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-violet-600/8 blur-[100px] animate-[drift1_16s_ease-in-out_infinite_alternate]" />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top fade — blends from About */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      {/* Bottom fade — blends into Projects */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#0a0a0a] z-10 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <p className="text-cyan-400/60 text-xs tracking-[0.3em] uppercase mb-2">Experience &amp; Education</p>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-white to-cyan-300 bg-clip-text text-transparent">
              Resume
            </h2>
          </div>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all duration-200 w-fit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download CV
          </a>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-12 lg:gap-16">
          {/* Experience timeline */}
          <div>
            <p className="text-white/30 text-xs tracking-[0.25em] uppercase mb-8">Work Experience</p>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/5" />

              <div className="space-y-10">
                {experience.map((job, i) => (
                  <motion.div
                    key={job.company}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="relative pl-8"
                  >
                    {/* Dot */}
                    <div className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full ${dotMap[job.color]}`} />

                    <div className={`p-5 rounded-xl border ${colorMap[job.color]} group hover:bg-white/[0.03] transition-colors duration-200`}>
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <div>
                          <h3 className="text-white font-semibold text-base leading-tight">{job.role}</h3>
                          <p className="text-white/50 text-sm mt-0.5">{job.company} · {job.location}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <span className="text-white/35 text-xs">{job.period}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${colorMap[job.color]}`}>{job.type}</span>
                        </div>
                      </div>
                      <ul className="mt-3 space-y-1.5">
                        {job.bullets.map((b) => (
                          <li key={b} className="text-white/50 text-sm flex gap-2">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-white/20 shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: Education + Skills */}
          <div className="space-y-10">
            {/* Education */}
            <div>
              <p className="text-white/30 text-xs tracking-[0.25em] uppercase mb-6">Education</p>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <motion.div
                    key={edu.institution}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="p-4 rounded-xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-200"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-white font-medium text-sm">{edu.institution}</p>
                        <p className="text-white/45 text-xs mt-0.5">{edu.degree}</p>
                      </div>
                      <span className="text-white/30 text-xs shrink-0">{edu.period}</span>
                    </div>
                    <p className="text-violet-400/70 text-xs mt-2">GPA {edu.gpa}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-white/30 text-xs tracking-[0.25em] uppercase mb-4">Languages</p>
              <div className="space-y-3">
                {[
                  { lang: "Bahasa Indonesia", level: "Native", pct: 100 },
                  { lang: "English", level: "Advanced", pct: 85 },
                ].map((l) => (
                  <div key={l.lang}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-white/60">{l.lang}</span>
                      <span className="text-white/30">{l.level}</span>
                    </div>
                    <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${l.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tech stack */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-white/30 text-xs tracking-[0.25em] uppercase mb-4">Core Stack</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "React", "Next.js", "TypeScript", "Node.js",
                  "Tailwind CSS", "Laravel", "PHP", "Python",
                  "MySQL", "MongoDB", "WordPress", "Odoo",
                ].map((s, i) => (
                  <span
                    key={s}
                    className={`text-xs px-2.5 py-1 rounded-full border ${
                      i % 4 === 0 ? "bg-violet-500/10 border-violet-500/25 text-violet-300" :
                      i % 4 === 1 ? "bg-cyan-500/10 border-cyan-500/25 text-cyan-300" :
                      i % 4 === 2 ? "bg-blue-500/10 border-blue-500/25 text-blue-300" :
                      "bg-pink-500/10 border-pink-500/25 text-pink-300"
                    }`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
