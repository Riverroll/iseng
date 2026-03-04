"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: string;
  title: string;
  description: string;
  url?: string;
  tags?: string[];
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: "dulux",
    title: "Dulux Design Competition",
    description: "Official website built for the Dulux Design Competition — showcasing competition details, categories, and participant submissions.",
    tags: ["Web", "Design"],
  },
  {
    id: "restaurant",
    title: "Restaurant Management System",
    description: "Full-stack web app for managing orders, inventory, and staff operations.",
    tags: ["Full Stack", "Web App"],
  },
  {
    id: "corporate-legal",
    title: "Corporate Legal Associate",
    description: "Document management, client portal, and case tracking dashboard for a legal services firm.",
    tags: ["Web App", "Dashboard"],
  },
  {
    id: "skincare",
    title: "Skincare Ecommerce",
    description: "End-to-end ecommerce platform with product catalog, cart, and integrated payment gateway.",
    tags: ["Ecommerce", "Full Stack"],
  },
  {
    id: "ptsms",
    title: "Internal Management System (PTSMS)",
    description: "Enterprise internal tool for PT SMS — employee management, task tracking, and reporting.",
    tags: ["ERP", "Enterprise"],
  },
  {
    id: "marketing-dash",
    title: "Marketing Dashboard",
    description: "Real-time analytics dashboard visualizing campaign performance and conversion data.",
    tags: ["Dashboard", "Analytics"],
  },
  {
    id: "dsm-erp",
    title: "DSM Compro & ERP System",
    description: "Company profile website and Enterprise Resource Planning system for DSM — covering procurement, finance, HR, operations, and brand identity in one platform.",
    url: "https://stagingweborder.dharmesta.com/",
    tags: ["ERP", "Enterprise", "Web"],
    featured: true,
  },
  {
    id: "dec-erp",
    title: "DEC ERP System",
    description: "Custom ERP solution for DEC — streamlining business processes with real-time reporting.",
    url: "https://dec.codenito.id/dashboard",
    tags: ["ERP", "Enterprise"],
    featured: true,
  },
  {
    id: "codenito",
    title: "Codenito Financial System",
    description: "Financial management platform — budgeting, expense tracking, invoicing, and reporting.",
    tags: ["Fintech", "Dashboard"],
    featured: true,
  },
  {
    id: "fcf-spencer",
    title: "FCF / Spencer",
    description: "Tourism and community website for Spencer — built on WordPress with modern design.",
    url: "https://odwk27dwsj-staging.wpdns.site/",
    tags: ["WordPress", "Tourism"],
  },
  {
    id: "visit-waverly",
    title: "Visit Waverly",
    description: "Destination website for Waverly — showcasing local attractions, events, and travel info.",
    url: "https://vj3dnnv2sx-staging.wpdns.site/",
    tags: ["WordPress", "Tourism"],
  },
  {
    id: "cg-museum",
    title: "C&G Museum",
    description: "Museum website with exhibit listings, visitor info, and event calendar.",
    url: "https://sviaq50h9r-staging.wpdns.site",
    tags: ["WordPress", "Museum"],
  },
  {
    id: "nwtn",
    title: "NWTN",
    description: "Regional web platform — community-focused design built for Northwest Tennessee.",
    tags: ["WordPress", "Regional"],
  },
  {
    id: "tfrp",
    title: "TFRP",
    description: "Tennessee Fats Recreation web presence — community park and recreation information portal.",
    tags: ["WordPress", "Recreation"],
  },
  {
    id: "best-ed",
    title: "Best Ed",
    description: "Education-focused platform — connecting students and educators with resources and programs.",
    tags: ["WordPress", "Education"],
  },
  {
    id: "bison-works",
    title: "Bison Works",
    description: "Brand website for Bison Works — showcasing services, portfolio, and team.",
    tags: ["WordPress", "Business"],
  },
  {
    id: "visit-spring-city",
    title: "Visit Spring City",
    description: "Tourism website for Spring City, TN — local attractions, events, and visitor guide.",
    url: "https://ngk91i15go-staging.wpdns.site/",
    tags: ["WordPress", "Tourism"],
  },
  {
    id: "west-tn",
    title: "West TN",
    description: "Regional destination site for West Tennessee — travel, culture, and community highlights.",
    url: "https://qkjloaba2o-staging.wpdns.site/",
    tags: ["WordPress", "Tourism"],
  },
  {
    id: "reelfoot-lake",
    title: "Reelfoot Lake, TN",
    description: "Nature and tourism site for Reelfoot Lake — wildlife, fishing, and outdoor recreation.",
    url: "https://hivfh8zy1f-staging.wpdns.site",
    tags: ["WordPress", "Tourism"],
  },
  {
    id: "center-hill-lake",
    title: "Center Hill Lake",
    description: "Destination website for Center Hill Lake — boating, recreation, and visitor information.",
    url: "https://ncvmxwweei-staging.wpdns.site",
    tags: ["WordPress", "Tourism"],
  },
  {
    id: "clay-county",
    title: "Clay County",
    description: "County website for Clay County, TN — government services, news, and community resources.",
    url: "https://phnmrag6y2-staging.wpdns.site",
    tags: ["WordPress", "Government"],
  },
  {
    id: "lauderdale-county",
    title: "Lauderdale County",
    description: "Official web presence for Lauderdale County — public services and county information.",
    url: "https://uzcnfjia2a-staging.wpdns.site/",
    tags: ["WordPress", "Government"],
  },
  {
    id: "columbia-main-street",
    title: "Columbia Main Street",
    description: "Downtown revitalization website for Columbia Main Street — events, businesses, and history.",
    url: "https://jr4mmf5wru-staging.wpdns.site/",
    tags: ["WordPress", "Community"],
  },
  {
    id: "p3",
    title: "P3",
    description: "Web platform for P3 — clean, modern design tailored to business goals and user flow.",
    url: "https://bhhl4cy98o-staging.wpdns.site/",
    tags: ["WordPress", "Business"],
  },
  {
    id: "lead-navigators",
    title: "Lead Navigators",
    description: "Lead generation and business development platform — connecting clients with opportunities.",
    url: "https://waovz5i00b-staging.wpdns.site/",
    tags: ["WordPress", "Business"],
  },
  {
    id: "explore-crossville",
    title: "Explore Crossville",
    description: "Tourism and travel site for Crossville, TN — exploring local culture, golf, and the outdoors.",
    url: "https://kdd4on7a3l-staging.wpdns.site/",
    tags: ["WordPress", "Tourism"],
  },
  {
    id: "visit-mcminnville",
    title: "Visit McMinnville",
    description: "Destination website for McMinnville, TN — caves, nurseries, outdoor adventures, and events.",
    url: "https://b96cwd8em5-staging.wpdns.site/",
    tags: ["WordPress", "Tourism"],
  },
  {
    id: "decatur-county",
    title: "Decatur County",
    description: "County platform for Decatur County, TN — community services, news, and local government.",
    url: "https://f82jo15o0k-staging.wpdns.site/",
    tags: ["WordPress", "Government"],
  },
  {
    id: "meraki",
    title: "Meraki",
    description: "Brand-forward web experience for Meraki — combining strong visual design with seamless UX.",
    tags: ["WordPress", "Brand"],
  },
  {
    id: "franklin",
    title: "Franklin",
    description: "Web application for Franklin — built with a focus on clean architecture and intuitive UX.",
    tags: ["WordPress", "Community"],
  },
  {
    id: "warren",
    title: "Warren / McMinnville",
    description: "Regional web presence for Warren County — tourism, community, and local government.",
    tags: ["WordPress", "Regional"],
  },
  {
    id: "obion-county",
    title: "Obion County",
    description: "Digital platform for Obion County — public portal with information management features.",
    tags: ["WordPress", "Government"],
  },
];

type Tag = "All" | "Tourism" | "Government" | "ERP" | "WordPress" | "Community";

const filterTags: Tag[] = ["All", "Tourism", "Government", "ERP", "WordPress", "Community"];

function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <div className={`bg-white/[0.03] border border-white/10 rounded-lg flex flex-col gap-3 hover:border-cyan-500/30 hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(6,182,212,0.07)] transition-all duration-300 ${large ? "p-7" : "p-5"}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {large && <span className="text-[10px] px-2 py-0.5 bg-white text-black rounded-full font-semibold tracking-widest uppercase">Featured</span>}
          <h4 className={`font-semibold leading-snug ${large ? "text-base" : "text-sm"}`}>{project.title}</h4>
        </div>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 text-white/30 hover:text-white transition-colors"
            title="View site"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        )}
      </div>
      <p className={`text-white/50 leading-relaxed flex-1 ${large ? "text-sm" : "text-xs"}`}>{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tags?.map((tag, i) => (
          <span key={tag} className={`text-[10px] px-2 py-0.5 rounded-full border ${
            i % 3 === 0 ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400/70" :
            i % 3 === 1 ? "bg-violet-500/10 border-violet-500/20 text-violet-400/70" :
            "bg-blue-500/10 border-blue-500/20 text-blue-400/70"
          }`}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [activeTag, setActiveTag] = useState<Tag>("All");

  const featuredProjects = projects.filter((p) => p.featured);
  const regularProjects = projects.filter((p) => !p.featured);

  const filteredRegular = activeTag === "All"
    ? regularProjects
    : regularProjects.filter((p) => p.tags?.includes(activeTag));

  const filteredFeatured = activeTag === "All"
    ? featuredProjects
    : featuredProjects.filter((p) => p.tags?.includes(activeTag));

  return (
    <section id="projects" className="py-20 bg-[#0a0a0a] relative overflow-hidden">
      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-[450px] h-[450px] rounded-full bg-blue-600/8 blur-[130px] animate-[drift2_20s_ease-in-out_infinite_alternate]" />
        <div className="absolute bottom-0 left-10 w-[350px] h-[350px] rounded-full bg-violet-600/8 blur-[100px] animate-[drift1_16s_ease-in-out_infinite_alternate]" />
      </div>

      {/* Top fade — blends from Resume */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      {/* Bottom fade — blends into Certificates */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#0a0a0a] z-10 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-cyan-400/60 text-xs tracking-[0.3em] uppercase mb-2">Work</p>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-white to-cyan-300 bg-clip-text text-transparent">Projects</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {filterTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-3 py-1.5 text-xs tracking-widest uppercase rounded transition-all duration-200 ${
                  activeTag === tag
                    ? "bg-white text-black font-medium"
                    : "bg-white/5 text-white/40 hover:text-white border border-white/10 hover:border-white/20"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Featured */}
        <AnimatePresence>
          {filteredFeatured.length > 0 && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-8"
            >
              <p className="text-white/30 text-xs tracking-[0.2em] uppercase mb-4">Featured</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredFeatured.map((project) => (
                  <motion.div key={project.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                    <ProjectCard project={project} large />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Divider */}
        {filteredFeatured.length > 0 && filteredRegular.length > 0 && (
          <div className="border-t border-white/5 mb-8" />
        )}

        {/* All other projects */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredRegular.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <p className="text-center text-white/15 text-xs mt-6">
          {filteredFeatured.length + filteredRegular.length} project{filteredFeatured.length + filteredRegular.length !== 1 ? "s" : ""}
        </p>
      </div>
    </section>
  );
}
