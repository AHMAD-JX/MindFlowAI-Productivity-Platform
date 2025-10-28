"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import AdvancedHero from "@/components/advanced-hero";
import { 
  Brain, 
  Zap, 
  Cpu, 
  Rocket, 
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  Code2,
  FileText,
  Sparkles,
  Image,
  Palette,
  Wand2,
  Lightbulb,
  Target,
  Users,
  Check,
  Star,
  TrendingUp,
  Award,
  Globe,
  Shield
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Intelligence",
    description: "Advanced AI models to boost your productivity and creativity",
    color: "from-teal-500 to-teal-600",
    bgColor: "from-teal-50 to-teal-100 dark:from-teal-950/20 dark:to-teal-900/20",
    iconColor: "text-teal-600 dark:text-teal-400",
    borderColor: "border-teal-200 dark:border-teal-800"
  },
  {
    icon: Image,
    title: "AI Image Generation",
    description: "Create stunning images from text descriptions with advanced AI",
    color: "from-cyan-500 to-cyan-600",
    bgColor: "from-cyan-50 to-cyan-100 dark:from-cyan-950/20 dark:to-cyan-900/20",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    borderColor: "border-cyan-200 dark:border-cyan-800"
  },
  {
    icon: Code2,
    title: "Code Assistant",
    description: "Write, debug, and optimize code with AI assistance",
    color: "from-blue-500 to-blue-600",
    bgColor: "from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    borderColor: "border-blue-200 dark:border-blue-800"
  },
  {
    icon: FileText,
    title: "Content Creation",
    description: "Generate high-quality content for any purpose",
    color: "from-sky-500 to-sky-600",
    bgColor: "from-sky-50 to-sky-100 dark:from-sky-950/20 dark:to-sky-900/20",
    iconColor: "text-sky-600 dark:text-sky-400",
    borderColor: "border-sky-200 dark:border-sky-800"
  },
  {
    icon: MessageSquare,
    title: "Natural Conversations",
    description: "Engage in human-like dialogue with context awareness",
    color: "from-indigo-500 to-indigo-600",
    bgColor: "from-indigo-50 to-indigo-100 dark:from-indigo-950/20 dark:to-indigo-900/20",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    borderColor: "border-indigo-200 dark:border-indigo-800"
  },
  {
    icon: Wand2,
    title: "Creative Tools",
    description: "Unleash your creativity with AI-powered design tools",
    color: "from-violet-500 to-violet-600",
    bgColor: "from-violet-50 to-violet-100 dark:from-violet-950/20 dark:to-violet-900/20",
    iconColor: "text-violet-600 dark:text-violet-400",
    borderColor: "border-violet-200 dark:border-violet-800"
  }
];

const pricing = [
  {
    name: "Starter",
    price: "Free",
    period: "forever",
    description: "Perfect for trying out MindFlow AI",
    features: [
      "100 AI requests per month",
      "Basic image generation",
      "Standard support",
      "Community access"
    ],
    popular: false
  },
  {
    name: "Pro",
    price: "$20",
    period: "per month",
    description: "For professionals and creators",
    features: [
      "5,000 AI requests per month",
      "Advanced image generation",
      "Priority support",
      "All AI models access",
      "API access",
      "Advanced analytics"
    ],
    popular: true
  },
  {
    name: "Pro Plus",
    price: "$30",
    period: "per month",
    description: "For teams and power users",
    features: [
      "Unlimited AI requests",
      "Premium image generation",
      "24/7 Priority support",
      "All AI models access",
      "Full API access",
      "Advanced analytics",
      "Team collaboration",
      "Custom training"
    ],
    popular: false
  }
];

const stats = [
  { value: "10M+", label: "Active Users" },
  { value: "99.9%", label: "Uptime" },
  { value: "500K+", label: "Daily Tasks" },
  { value: "50+", label: "Languages" }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-secondary/20">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <motion.div 
                className="relative w-12 h-12 bg-linear-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Brain className="w-7 h-7 text-white" />
                <motion.div
                  className="absolute inset-0 bg-linear-to-br from-teal-500 to-cyan-600 rounded-2xl opacity-0"
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <span className="text-2xl font-bold bg-linear-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                MindFlow AI
              </span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <ThemeToggle />
              <Link href="/signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" className="bg-linear-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 shadow-lg">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Advanced Hero Section with Three.js & GSAP */}
      <AdvancedHero />

      {/* Features Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-background via-background to-secondary/10 dark:from-background dark:via-slate-900/50 dark:to-slate-800/30 overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-96 h-96 bg-linear-to-br from-teal-500/10 to-cyan-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-linear-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-linear-to-r from-teal-100 to-cyan-100 dark:from-teal-950/30 dark:to-cyan-950/30 text-teal-700 dark:text-teal-300 text-sm font-semibold mb-6 border border-teal-200/50 dark:border-teal-800/50 backdrop-blur-sm cursor-pointer"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Target className="w-5 h-5" />
              </motion.div>
              <span>Powerful AI Features</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            >
              Everything you need to
              <motion.span 
                className="block bg-linear-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                create & innovate
              </motion.span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              From AI image generation to code assistance, our platform provides all the tools you need to bring your ideas to life
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.03,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className={`group relative bg-card border-2 ${feature.borderColor} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden backdrop-blur-sm`}
              >
                {/* Animated Background */}
                <motion.div
                  className={`absolute inset-0 bg-linear-to-br ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                
                {/* Floating Particles */}
                <motion.div
                  className="absolute inset-0 overflow-hidden"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-2 h-2 ${feature.iconColor} rounded-full opacity-60`}
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + i * 10}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        x: [0, 10, 0],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </motion.div>
                
                {/* Icon with Advanced Animation */}
                <motion.div
                  whileHover={{ 
                    scale: 1.15, 
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.6 }
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`relative w-20 h-20 bg-linear-to-br ${feature.color} rounded-3xl flex items-center justify-center mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-500`}
                >
                  <feature.icon className={`w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300`} />
                  
                  {/* Pulsing Ring */}
                  <motion.div
                    className={`absolute inset-0 bg-linear-to-br ${feature.color} rounded-3xl`}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.8, 0.3]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Rotating Ring */}
                  <motion.div
                    className="absolute -inset-2 border-2 border-white/20 rounded-3xl"
                    animate={{ rotate: 360 }}
                    transition={{ 
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </motion.div>

                

                {/* Content */}
                <div className="relative z-10">
                  <motion.h3 
                    className={`text-xl font-bold mb-3 ${feature.iconColor} group-hover:scale-105 transition-all duration-300`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {feature.title}
                  </motion.h3>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Animated Bottom Border */}
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                />
                
                {/* Corner Accent */}
                <motion.div
                  className={`absolute top-4 right-4 w-3 h-3 bg-linear-to-br ${feature.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                />
              </motion.div>
            ))}
          </div>
          

          {/* Enhanced Special Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 relative"
          >
            <motion.div
              className="bg-linear-to-r from-teal-500 to-cyan-600 dark:from-teal-600 dark:to-cyan-700 rounded-3xl p-12 text-white text-center shadow-2xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <motion.div
                  className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"
                  animate={{ x: [0, 60, 0] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </div>
              
              <div className="relative z-10 max-w-4xl mx-auto">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-24 h-24 mx-auto bg-white/20 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/30"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <Image className="w-12 h-12 text-white" />
                  </motion.div>
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold mb-6"
                >
                  🎨 AI Image Generation
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-xl opacity-90 mb-8 max-w-2xl mx-auto"
                >
                  Transform your ideas into stunning visuals with our advanced AI image generation. 
                  From concept to creation in seconds.
                </motion.p>
                {/* more anime with le Advanced Hero Section with Three.js & GSAP */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Button size="lg" variant="secondary" className="text-lg shadow-xl hover:shadow-2xl">
                    <Palette className="w-5 h-5 mr-2" />
                    Try Image Generator
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg border-white/30 text-white hover:bg-white/10">
                    View Gallery
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-background to-secondary/10 overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-96 h-96 bg-linear-to-br from-violet-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-linear-to-br from-teal-500/10 to-cyan-500/10 rounded-full blur-3xl"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-linear-to-r from-teal-100 to-cyan-100 dark:from-teal-950/30 dark:to-cyan-950/30 text-teal-700 dark:text-teal-300 text-sm font-semibold mb-6 border border-teal-200/50 dark:border-teal-800/50 cursor-pointer"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-5 h-5" />
              </motion.div>
              <span>Simple, Transparent Pricing</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <TrendingUp className="w-4 h-4" />
              </motion.div>
            </motion.div>

            <motion.h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Choose Your
              <motion.span 
                className="block bg-linear-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                Perfect Plan
              </motion.span>
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Start for free, upgrade when you need more power
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricing.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className={`relative group bg-card border-2 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden ${
                  plan.popular
                    ? "border-teal-500 dark:border-teal-600"
                    : "border-border"
                }`}
              >
                {/* Hover Gradient Background */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-br from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />

                {/* Corner Accent */}
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-teal-500/20 to-cyan-500/20 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                {plan.popular && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.1 }}
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-linear-to-r from-teal-500 to-cyan-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg border-2 border-white dark:border-gray-900"
                    >
                      <motion.span
                        animate={{ opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ⭐ Most Popular
                      </motion.span>
                    </motion.div>
                    
                    {/* Pulsing Ring Effect */}
                    <motion.div
                      className="absolute inset-0 border-2 border-teal-500 rounded-3xl"
                      animate={{
                        scale: [1, 1.02, 1],
                        opacity: [0.5, 0.2, 0.5]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-5xl font-bold bg-linear-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Check className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                      </motion.div>
                      <span className="text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative z-10">
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-linear-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white shadow-lg"
                        : "border-2"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    {plan.price === "Free" ? "Start Free" : "Get Started"}
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </motion.div>
                  </Button>
                </motion.div>

                {plan.popular && (
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-teal-500/10 to-cyan-600/10 rounded-3xl -z-10"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-secondary/20 to-background overflow-hidden">
        {/* Animated Background */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-linear-to-r from-teal-500/5 to-cyan-500/5 rounded-full blur-3xl"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.01 }}
            className="relative bg-linear-to-r from-teal-500 to-cyan-600 rounded-3xl p-12 lg:p-16 text-center text-white shadow-2xl overflow-hidden border-2 border-teal-400/50"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <motion.div 
                className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"
                animate={{ x: [0, 60, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Floating Elements */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-white/30 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${20 + i * 10}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, 15, 0],
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}

            <div className="relative z-10 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold mb-6 border border-white/30 cursor-pointer"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Users className="w-5 h-5" />
                </motion.div>
                <span>Join 10M+ Creators Worldwide</span>
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Rocket className="w-4 h-4" />
                </motion.div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
              >
                Ready to unleash your
                <span className="block text-yellow-300">creative potential?</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed"
              >
                Start creating amazing content, generating stunning images, and boosting your productivity with AI. 
                The future of creativity is here.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Link href="/signup">
                  <Button size="xl" variant="secondary" className="text-lg shadow-xl hover:shadow-2xl">
                    <Rocket className="w-5 h-5 mr-2" />
                    Start Creating Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button size="xl" variant="outline" className="text-lg border-white/30 text-white hover:bg-white/10">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  View Examples
                </Button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="space-y-2">
                    <div className="text-2xl sm:text-3xl font-bold text-yellow-300">
                      {stat.value}
                    </div>
                    <div className="text-sm opacity-80">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <motion.div 
                className="w-8 h-8 bg-linear-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-lg font-bold">MindFlow AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 MindFlow AI. All rights reserved. ©
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
