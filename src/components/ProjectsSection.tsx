"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "Platform e-commerce modern dengan fitur lengkap termasuk payment gateway, inventory management, dan analytics dashboard.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    image: "🛒",
    color: "from-blue-500/20 to-cyan-500/20",
    github: "#",
    demo: "#",
  },
  {
    title: "Learning Management System",
    description:
      "Platform pembelajaran online dengan video streaming, quiz interaktif, dan progress tracking.",
    tags: ["Next.js", "TypeScript", "MongoDB", "WebRTC"],
    image: "📚",
    color: "from-purple-500/20 to-pink-500/20",
    github: "#",
    demo: "#",
  },
  {
    title: "Social Media Dashboard",
    description:
      "Dashboard analytics untuk social media dengan real-time data visualization dan reporting.",
    tags: ["React", "D3.js", "Firebase", "Tailwind"],
    image: "📊",
    color: "from-orange-500/20 to-red-500/20",
    github: "#",
    demo: "#",
  },
];

export default function ProjectsSection() {
  const [index, setIndex] = useState(1);
  const startX = useRef(0);
  const autoRef = useRef(null);

  // clone slides untuk infinite loop
  const slides = [
    projects[projects.length - 1],
    ...projects,
    projects[0],
  ];

  /* AUTO PLAY */
  useEffect(() => {
    autoRef.current = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(autoRef.current);
  }, []);

  const resetAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000);
  };

  /* LOOP FIX */
  useEffect(() => {
    if (index === slides.length - 1) {
      setTimeout(() => setIndex(1), 500);
    }
    if (index === 0) {
      setTimeout(() => setIndex(slides.length - 2), 500);
    }
  }, [index]);

  /* DRAG */
  const handleStart = (e) => {
    startX.current = e.touches ? e.touches[0].clientX : e.clientX;
    clearInterval(autoRef.current);
  };

  const handleEnd = (e) => {
    const endX = e.changedTouches
      ? e.changedTouches[0].clientX
      : e.clientX;

    const diff = startX.current - endX;

    if (diff > 50) setIndex((prev) => prev + 1);
    else if (diff < -50) setIndex((prev) => prev - 1);

    resetAuto();
  };

  return (
    <section className="py-20 md:py-32 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* TITLE */}
        <div className="text-center mb-10">
          <span className="text-primary font-medium block">Portfolio</span>
          <h2 className="text-3xl md:text-5xl font-bold">
            Projects & Karya
          </h2>
        </div>

        {/* CAROUSEL */}
        <div className="relative overflow-hidden rounded-2xl">

          {/* TRACK */}
          <div
            className="flex transition-transform duration-500 ease"
            style={{
              transform: `translateX(-${index * 100}%)`,
            }}
            onMouseDown={handleStart}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchEnd={handleEnd}
          >
            {slides.map((project, i) => (
              <div key={i} className="min-w-full p-2">
                <motion.div className="p-6 glass rounded-2xl shadow-card">

                  <div
                    className={`aspect-video rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br ${project.color}`}
                  >
                    <span className="text-6xl">{project.image}</span>
                  </div>

                  <h3 className="text-lg font-bold mb-2">
                    {project.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-secondary rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Github className="w-4 h-4 mr-1" /> Code
                    </Button>
                    <Button size="sm">
                      <ExternalLink className="w-4 h-4 mr-1" /> Demo
                    </Button>
                  </div>

                </motion.div>
              </div>
            ))}
          </div>

          {/* NAV */}
          <button
            onClick={() => { setIndex((prev) => prev - 1); resetAuto(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={() => { setIndex((prev) => prev + 1); resetAuto(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full"
          >
            <ChevronRight />
          </button>

          {/* DOT */}
          <div className="absolute bottom-4 w-full flex justify-center gap-2">
            {projects.map((_, i) => (
              <div
                key={i}
                onClick={() => { setIndex(i + 1); resetAuto(); }}
                className={`w-2 h-2 rounded-full cursor-pointer ${
                  index === i + 1 ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}