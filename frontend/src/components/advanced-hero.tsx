"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Sparkles, 
  Zap, 
  Target, 
  TrendingUp, 
  Users, 
  Globe, 
  Award,
  ArrowRight,
  Code2,
  Image as ImageIcon,
  FileText,
  MessageSquare,
  Lightbulb,
  Rocket,
  Shield,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  { icon: Brain, label: "AI Intelligence", color: "text-teal-500", desc: "Advanced ML Models" },
  { icon: ImageIcon, label: "Image Generation", color: "text-cyan-500", desc: "Create Stunning Art" },
  { icon: Code2, label: "Code Assistant", color: "text-blue-500", desc: "Smart Coding Help" },
  { icon: FileText, label: "Content Writing", color: "text-sky-500", desc: "Perfect Copy" },
  { icon: MessageSquare, label: "Chat AI", color: "text-indigo-500", desc: "Natural Conversations" },
  { icon: Lightbulb, label: "Creative Tools", color: "text-violet-500", desc: "Innovation Hub" }
];

const stats = [
  { icon: Users, value: "10M+", label: "Active Users", gradient: "from-teal-500 to-cyan-600" },
  { icon: Zap, value: "99.9%", label: "Uptime SLA", gradient: "from-cyan-500 to-blue-600" },
  { icon: Globe, value: "150+", label: "Countries", gradient: "from-blue-500 to-indigo-600" },
  { icon: Target, value: "500K+", label: "Daily Tasks", gradient: "from-indigo-500 to-violet-600" }
];

const achievements = [
  { icon: Award, text: "Best AI Tool 2024" },
  { icon: Shield, text: "Enterprise Grade Security" },
  { icon: TrendingUp, text: "Fastest Growing Platform" },
  { icon: CheckCircle2, text: "ISO 27001 Certified" }
];

export default function AdvancedHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 20,
          y: (e.clientY - rect.top - rect.height / 2) / 20
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Animate feature cards on scroll
      gsap.fromTo(
        ".feature-card",
        { y: 100, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".features-grid",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate stats
      gsap.fromTo(
        ".stat-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".stats-container",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      <motion.section
        ref={heroRef}
        style={{ y: smoothY, opacity: smoothOpacity, scale: smoothScale }}
        className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8"
      >
        {/* Gradient Overlays with Mouse Parallax */}
        <motion.div
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-linear-to-br from-teal-500/20 to-cyan-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: -mousePosition.x,
            y: -mousePosition.y,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-linear-to-br from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-linear-to-r from-teal-100 to-cyan-100 dark:from-teal-950/30 dark:to-cyan-950/30 border border-teal-200/50 dark:border-teal-800/50 backdrop-blur-sm cursor-pointer"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5 text-teal-600" />
                </motion.div>
                <span className="text-sm font-semibold bg-linear-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Next-Generation AI Platform
                </span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4 text-teal-600" />
                </motion.div>
              </motion.div>

              {/* Main Heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-4"
              >
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                  <motion.span
                    className="block"
                    whileHover={{ scale: 1.02 }}
                  >
                    Transform Your
                  </motion.span>
                  <motion.span
                    className="block bg-linear-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ["0%", "100%", "0%"],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    Creative Workflow
                  </motion.span>
                  <motion.span className="block">with AI Power</motion.span>
                </h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-muted-foreground max-w-2xl leading-relaxed"
                >
                  Experience the future of productivity with our advanced AI platform. 
                  Create stunning content, generate code, design images, and automate 
                  workflows—all in one place.
                </motion.p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/signup">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="w-full sm:w-auto h-14 px-8 text-lg bg-linear-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 shadow-2xl shadow-teal-500/50"
                    >
                      <Rocket className="w-5 h-5 mr-2" />
                      Start Free Trial
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </Link>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto h-14 px-8 text-lg border-2 border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-950/50"
                  >
                    <Lightbulb className="w-5 h-5 mr-2" />
                    Watch Demo
                  </Button>
                </motion.div>
              </motion.div>

              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-teal-200/30 dark:border-teal-800/30 cursor-pointer"
                  >
                    <achievement.icon className="w-4 h-4 text-teal-600" />
                    <span className="text-xs font-medium">{achievement.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 stats-container"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="stat-card text-center p-4 rounded-2xl bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm border border-white/20 dark:border-gray-800/20 cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`w-10 h-10 mx-auto mb-2 rounded-xl bg-linear-to-br ${stat.gradient} flex items-center justify-center`}
                    >
                      <stat.icon className="w-5 h-5 text-white" />
                    </motion.div>
                    <div className={`text-2xl font-bold bg-linear-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right Content - Interactive Features Grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="features-grid grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{
                      scale: 1.08,
                      rotate: index % 2 === 0 ? 2 : -2,
                      zIndex: 10
                    }}
                    className="feature-card relative group p-6 rounded-3xl bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/20 dark:border-gray-800/20 cursor-pointer overflow-hidden"
                  >
                    {/* Hover Gradient */}
                    <motion.div
                      className="absolute inset-0 bg-linear-to-br from-teal-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />

                    {/* Animated Border */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl"
                      animate={{
                        boxShadow: [
                          "0 0 0 0px rgba(20, 184, 166, 0)",
                          "0 0 0 4px rgba(20, 184, 166, 0.2)",
                          "0 0 0 0px rgba(20, 184, 166, 0)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    />

                    <div className="relative z-10">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                        className={`w-12 h-12 mb-4 rounded-2xl bg-linear-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg`}
                      >
                        <feature.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <h3 className={`text-sm font-bold mb-1 ${feature.color}`}>
                        {feature.label}
                      </h3>
                      <p className="text-xs text-muted-foreground">{feature.desc}</p>
                    </div>

                    {/* Particle Effect on Hover */}
                    <motion.div
                      className="absolute top-2 right-2 w-2 h-2 bg-teal-400 rounded-full opacity-0 group-hover:opacity-100"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0, 1, 0]
                      }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-8 -right-8 w-24 h-24 bg-linear-to-br from-teal-500/30 to-cyan-500/30 rounded-full blur-2xl"
              />
              <motion.div
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -10, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-8 -left-8 w-32 h-32 bg-linear-to-br from-blue-500/30 to-indigo-500/30 rounded-full blur-2xl"
              />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 cursor-pointer"
          >
            <span className="text-sm text-muted-foreground">Scroll to explore</span>
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="w-6 h-10 border-2 border-teal-500 rounded-full flex items-start justify-center p-2"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-teal-500 rounded-full"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}

