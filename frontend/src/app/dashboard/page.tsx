"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { api, UserData } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Brain, 
  LogOut, 
  User, 
  Mail, 
  MessageSquare,
  Image as ImageIcon,
  Code2,
  FileText,
  Settings,
  Menu,
  X,
  Send,
  Sparkles,
  Wand2,
  Calendar,
  Activity,
  ChevronLeft,
  ChevronRight,
  Home,
  Bell,
  Search,
  Plus,
  MoreVertical,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Download,
  Share,
  Star,
  Trash2,
  Edit3,
  Mic,
  MicOff,
  Paperclip,
  Smile,
  Zap,
  Target,
  Lightbulb,
  Clock,
  CheckCircle,
  Palette,
  Shield,
  CreditCard
} from "lucide-react";
import Link from "next/link";

type Section = 'chat' | 'image' | 'code' | 'content' | 'profile';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>('chat');
  
  // Chat state
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{role: 'user' | 'ai', content: string, timestamp: Date}>>([]);
  const [conversations, setConversations] = useState<Array<{
    id: string;
    title: string;
    messages: Array<{role: 'user' | 'ai', content: string, timestamp: Date}>;
    createdAt: Date;
  }>>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [chatMode, setChatMode] = useState<'creative' | 'balanced' | 'precise'>('balanced');
  const [conversationsOpen, setConversationsOpen] = useState(true);
  const [conversationsCollapsed, setConversationsCollapsed] = useState(false);
  
  // Image generation state
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageStyle, setImageStyle] = useState<'realistic' | 'artistic' | 'anime' | 'cartoon' | 'abstract'>('realistic');
  const [imageSize, setImageSize] = useState<'square' | 'landscape' | 'portrait'>('square');
  const [imageQuality, setImageQuality] = useState<'standard' | 'hd' | 'ultra'>('hd');
  const [generatedImages, setGeneratedImages] = useState<Array<{
    id: string;
    url: string;
    prompt: string;
    style: string;
    createdAt: Date;
  }>>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showGallery, setShowGallery] = useState(true);
  
  // Code Assistant state
  const [codePrompt, setCodePrompt] = useState("");
  const [codeLanguage, setCodeLanguage] = useState<'javascript' | 'python' | 'typescript' | 'react' | 'nodejs' | 'html' | 'css'>('javascript');
  const [codeTask, setCodeTask] = useState<'generate' | 'debug' | 'optimize' | 'explain' | 'refactor'>('generate');
  const [codeComplexity, setCodeComplexity] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [generatedCode, setGeneratedCode] = useState<Array<{
    id: string;
    code: string;
    language: string;
    task: string;
    prompt: string;
    createdAt: Date;
  }>>([]);
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [showCodeHistory, setShowCodeHistory] = useState(true);
  
  // Profile state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    website: '',
    phone: '',
    avatar: ''
  });
  const [profileStats, setProfileStats] = useState({
    totalChats: 0,
    totalImages: 0,
    totalCode: 0,
    memberSince: '',
    lastActive: ''
  });
  const [activeTab, setActiveTab] = useState<'overview' | 'settings' | 'security' | 'billing'>('overview');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.getCurrentUser();
        
        if (response.success && response.data) {
          setUser(response.data.user);
        } else {
          router.push('/signin');
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        router.push('/signin');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await api.logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoggingOut(false);
    }
  };

  const createNewConversation = () => {
    const newConversation = {
      id: Date.now().toString(),
      title: 'New Conversation',
      messages: [],
      createdAt: new Date()
    };
    setConversations([newConversation, ...conversations]);
    setActiveConversation(newConversation.id);
    setChatHistory([]);
  };

  const switchConversation = (conversationId: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
      setActiveConversation(conversationId);
      setChatHistory(conversation.messages);
    }
  };

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;
    
    const userMessage = { role: 'user' as const, content: chatMessage, timestamp: new Date() };
    const newHistory = [...chatHistory, userMessage];
    setChatHistory(newHistory);
    setChatMessage("");
    setIsTyping(true);

    try {
      // الاتصال بـ Gemini API
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt: chatMessage,
          chatHistory: chatHistory 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to call Gemini API');
      }

      const data = await response.json();
      
      if (data.success) {
        const aiMessage = { 
          role: 'ai' as const, 
          content: data.text, 
          timestamp: new Date() 
        };
        setChatHistory([...newHistory, aiMessage]);
        
        // Update conversation
        if (activeConversation) {
          setConversations(conversations.map(conv => 
            conv.id === activeConversation 
              ? { ...conv, messages: [...newHistory, aiMessage] }
              : conv
          ));
        }
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = { 
        role: 'ai' as const, 
        content: `Sorry, there was an error connecting to the AI. Please try again.`, 
        timestamp: new Date() 
      };
      setChatHistory([...newHistory, errorMessage]);
      
      // Update conversation with error
      if (activeConversation) {
        setConversations(conversations.map(conv => 
          conv.id === activeConversation 
            ? { ...conv, messages: [...newHistory, errorMessage] }
            : conv
        ));
      }
    } finally {
      setIsTyping(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const regenerateResponse = async () => {
    if (chatHistory.length > 0) {
      const lastUserMessage = chatHistory[chatHistory.length - 2];
      if (lastUserMessage && lastUserMessage.role === 'user') {
        setChatHistory(chatHistory.slice(0, -1));
        setIsTyping(true);

        try {
          // الاتصال بـ Gemini API لإعادة توليد الاستجابة
          const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              prompt: lastUserMessage.content,
              chatHistory: chatHistory.slice(0, -1) // استبعاد الرسالة الأخيرة
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to call Gemini API');
          }

          const data = await response.json();
          
          if (data.success) {
            const newAiMessage = { 
              role: 'ai' as const, 
              content: data.text, 
              timestamp: new Date() 
            };
            setChatHistory([...chatHistory.slice(0, -1), newAiMessage]);
            
            // Update conversation
            if (activeConversation) {
              setConversations(conversations.map(conv => 
                conv.id === activeConversation 
                  ? { ...conv, messages: [...chatHistory.slice(0, -1), newAiMessage] }
                  : conv
              ));
            }
          } else {
            throw new Error(data.error || 'Unknown error');
          }
        } catch (error) {
          console.error('Error regenerating response:', error);
          const errorMessage = { 
            role: 'ai' as const, 
            content: `Sorry, there was an error regenerating the response. Please try again.`, 
            timestamp: new Date() 
          };
          setChatHistory([...chatHistory.slice(0, -1), errorMessage]);
          
          // Update conversation with error
          if (activeConversation) {
            setConversations(conversations.map(conv => 
              conv.id === activeConversation 
                ? { ...conv, messages: [...chatHistory.slice(0, -1), errorMessage] }
                : conv
            ));
          }
        } finally {
          setIsTyping(false);
        }
      }
    }
  };

  const deleteConversation = (conversationId: string) => {
    setConversations(conversations.filter(conv => conv.id !== conversationId));
    if (activeConversation === conversationId) {
      setActiveConversation(null);
      setChatHistory([]);
    }
  };

  const toggleConversations = () => {
    setConversationsOpen(!conversationsOpen);
  };

  const toggleConversationsCollapse = () => {
    setConversationsCollapsed(!conversationsCollapsed);
  };

  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate image generation
    setTimeout(() => {
      const newImage = {
        id: Date.now().toString(),
        url: `https://picsum.photos/512/512?random=${Date.now()}`,
        prompt: imagePrompt,
        style: imageStyle,
        createdAt: new Date()
      };
      
      setGeneratedImages([newImage, ...generatedImages]);
      setIsGenerating(false);
    }, 3000);
  };

  const downloadImage = (imageUrl: string, prompt: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `mindflow-${prompt.slice(0, 20).replace(/\s+/g, '-')}.jpg`;
    link.click();
  };

  const shareImage = (imageUrl: string, prompt: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'Generated Image',
        text: `Check out this AI-generated image: ${prompt}`,
        url: imageUrl
      });
    } else {
      navigator.clipboard.writeText(imageUrl);
      alert('Image URL copied to clipboard!');
    }
  };

  const handleGenerateCode = async () => {
    if (!codePrompt.trim()) return;
    
    setIsGeneratingCode(true);
    
    // Simulate code generation
    setTimeout(() => {
      const sampleCode = getSampleCode(codeLanguage, codeTask, codePrompt);
      const newCode = {
        id: Date.now().toString(),
        code: sampleCode,
        language: codeLanguage,
        task: codeTask,
        prompt: codePrompt,
        createdAt: new Date()
      };
      
      setGeneratedCode([newCode, ...generatedCode]);
      setIsGeneratingCode(false);
    }, 2000);
  };

  const getSampleCode = (language: string, task: string, prompt: string) => {
    const codeSamples = {
      javascript: {
        generate: `// ${prompt}
function ${prompt.toLowerCase().replace(/\s+/g, '_')}() {
  // Implementation here
  console.log('Hello from generated function!');
  return 'Success';
}

// Usage example
const result = ${prompt.toLowerCase().replace(/\s+/g, '_')}();
console.log(result);`,
        debug: `// Debug this code
function debugFunction() {
  let x = 10;
  let y = 0;
  
  // Potential division by zero
  const result = x / y;
  console.log(result);
  
  return result;
}

// Fixed version
function debugFunctionFixed() {
  let x = 10;
  let y = 0;
  
  if (y === 0) {
    throw new Error('Division by zero is not allowed');
  }
  
  const result = x / y;
  console.log(result);
  
  return result;
}`,
        optimize: `// Optimized version of: ${prompt}
const optimizedFunction = (() => {
  const cache = new Map();
  
  return function memoizedFunction(param) {
    if (cache.has(param)) {
      return cache.get(param);
    }
    
    const result = expensiveOperation(param);
    cache.set(param, result);
    return result;
  };
})();

function expensiveOperation(param) {
  // Simulate expensive operation
  return param * param;
}`
      },
      python: {
        generate: `# ${prompt}
def ${prompt.toLowerCase().replace(/\s+/g, '_')}():
    """
    ${prompt} implementation
    """
    print("Hello from Python function!")
    return "Success"

# Usage example
if __name__ == "__main__":
    result = ${prompt.toLowerCase().replace(/\s+/g, '_')}()
    print(result)`,
        debug: `# Debug this Python code
def debug_function():
    x = 10
    y = 0
    
    # Potential division by zero
    result = x / y
    print(result)
    
    return result

# Fixed version
def debug_function_fixed():
    x = 10
    y = 0
    
    if y == 0:
        raise ValueError("Division by zero is not allowed")
    
    result = x / y
    print(result)
    
    return result`,
        optimize: `# Optimized version of: ${prompt}
from functools import lru_cache

@lru_cache(maxsize=128)
def optimized_function(param):
    """
    Optimized function with caching
    """
    return param ** 2

# Usage
result = optimized_function(5)
print(result)`
      },
      react: {
        generate: `// React Component: ${prompt}
import React, { useState, useEffect } from 'react';

const ${prompt.replace(/\s+/g, '')} = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Component logic here
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setData('Component data loaded');
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="${prompt.toLowerCase().replace(/\s+/g, '-')}">
      <h2>${prompt}</h2>
      <p>{data}</p>
    </div>
  );
};

export default ${prompt.replace(/\s+/g, '')};`,
        debug: `// Debug React Component
import React, { useState, useEffect } from 'react';

const DebugComponent = () => {
  const [count, setCount] = useState(0);
  
  // Potential infinite loop
  useEffect(() => {
    setCount(count + 1);
  }, [count]); // This will cause infinite re-renders
  
  return <div>Count: {count}</div>;
};

// Fixed version
const FixedComponent = () => {
  const [count, setCount] = useState(0);
  
  const handleIncrement = () => {
    setCount(prev => prev + 1);
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
};`
      }
    };
    
    const languageSamples = codeSamples[language as keyof typeof codeSamples];
    if (languageSamples && task in languageSamples) {
      return languageSamples[task as keyof typeof languageSamples];
    }
    return `// ${prompt}\n// Code will be generated here...`;
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const downloadCode = (code: string, language: string, prompt: string) => {
    const extension = getFileExtension(language);
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${prompt.slice(0, 20).replace(/\s+/g, '-')}.${extension}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getFileExtension = (language: string) => {
    const extensions = {
      javascript: 'js',
      typescript: 'ts',
      python: 'py',
      react: 'jsx',
      nodejs: 'js',
      html: 'html',
      css: 'css'
    };
    return extensions[language as keyof typeof extensions] || 'txt';
  };

  // Profile functions
  const handleEditProfile = () => {
    setIsEditingProfile(true);
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      bio: 'AI enthusiast and developer',
      location: 'San Francisco, CA',
      website: 'https://example.com',
      phone: '+1 (555) 123-4567',
      avatar: ''
    });
  };

  const handleSaveProfile = () => {
    // Simulate saving profile
    setIsEditingProfile(false);
    // Here you would typically make an API call to save the profile
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-teal-950 dark:to-cyan-950">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!user) return null;

  const menuItems = [
    { id: 'chat' as Section, icon: MessageSquare, label: 'AI Chat', gradient: 'from-teal-500 to-cyan-600' },
    { id: 'image' as Section, icon: ImageIcon, label: 'Image Generation', gradient: 'from-purple-500 to-pink-600' },
    { id: 'code' as Section, icon: Code2, label: 'Code Assistant', gradient: 'from-blue-500 to-indigo-600' },
    { id: 'content' as Section, icon: FileText, label: 'Content Writer', gradient: 'from-orange-500 to-red-600' },
    { id: 'profile' as Section, icon: User, label: 'Profile', gradient: 'from-green-500 to-emerald-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Modern Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm">
        <div className="flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            
            {/* Desktop Sidebar Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </Button>
            
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-linear-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent hidden sm:block">
                MindFlow AI
              </span>
            </motion.div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search anything..."
                className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative hover:bg-gray-100 dark:hover:bg-gray-800">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </Button>
            
            {/* User Profile */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-linear-to-r from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 border border-teal-200/50 dark:border-teal-800/50 cursor-pointer"
            >
              <div className="w-8 h-8 bg-linear-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-teal-700 dark:text-teal-300">{user.name}</p>
                <p className="text-xs text-teal-600 dark:text-teal-400">Online</p>
              </div>
            </motion.div>
            
            {/* Logout Button */}
            <Button
              onClick={handleLogout}
              disabled={loggingOut}
              variant="outline"
              size="sm"
              className="gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 dark:hover:bg-red-950/20"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">{loggingOut ? "Logging out..." : "Logout"}</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Modern Sidebar */}
        <motion.aside
          initial={false}
          animate={{
            width: sidebarOpen ? (sidebarCollapsed ? 80 : 280) : 0,
            opacity: sidebarOpen ? 1 : 0
          }}
          className="fixed left-0 top-16 bottom-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-800/50 shadow-lg z-40 overflow-hidden"
        >
          <div className="h-full flex flex-col">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-200/50 dark:border-gray-800/50">
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 bg-linear-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center">
                    <Home className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Dashboard</span>
                </motion.div>
              )}
            </div>

            {/* Navigation Items */}
            <div className="flex-1 p-4 space-y-2">
              {menuItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                    activeSection === item.id
                      ? `bg-linear-to-r ${item.gradient} text-white shadow-lg`
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {!sidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Sidebar Footer */}
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 border-t border-gray-200/50 dark:border-gray-800/50"
              >
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-linear-to-r from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30">
                  <div className="w-10 h-10 bg-linear-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-teal-700 dark:text-teal-300">Pro Plan</p>
                    <p className="text-xs text-teal-600 dark:text-teal-400">Upgrade for more features</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? (sidebarCollapsed ? 'lg:ml-[80px]' : 'lg:ml-[280px]') : 'ml-0'}`}>
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            
            {/* AI Chat Section */}
            {activeSection === 'chat' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-[calc(100vh-8rem)] flex flex-col"
              >
                {/* Chat Header - c */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-linear-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-sm">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">AI Assistant</h1>
                      <p className="text-sm text-gray-500">Powered by advanced AI models</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleConversations}
                      className="gap-2 text-gray-600 hover:text-gray-800"
                    >
                      <MessageSquare className="w-4 h-4" />
                      {conversationsOpen ? 'Hide' : 'Show'} Chats
                    </Button>
                    
                    <Button
                      onClick={createNewConversation}
                      className="bg-teal-600 hover:bg-teal-700 text-white shadow-sm"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      New Chat
                    </Button>
                  </div>
                </div>

                <div className="flex-1 flex gap-4 min-h-0">
                  {/* Conversations Sidebar - c */}
                  {conversationsOpen && (
                    <motion.div
                      initial={false}
                      animate={{
                        width: conversationsCollapsed ? 60 : 280,
                        opacity: 1
                      }}
                      className="shrink-0"
                    >
                      <div className="h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
                        <div className="h-full flex flex-col">
                          {/* Conversations Header */}
                          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                            <div className="flex items-center justify-between">
                              {!conversationsCollapsed && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="flex items-center gap-2"
                                >
                                  <h3 className="font-medium text-gray-700 dark:text-gray-300">Recent Chats</h3>
                                  <span className="text-xs bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 px-2 py-1 rounded-full">
                                    {conversations.length}
                                  </span>
                                </motion.div>
                              )}
                              
                              <div className="flex items-center gap-1">
                                {!conversationsCollapsed && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={createNewConversation}
                                    className="text-teal-600 hover:text-teal-700 h-8 w-8 p-0"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </Button>
                                )}
                                
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={toggleConversationsCollapse}
                                  className="text-gray-500 hover:text-gray-700 h-8 w-8 p-0"
                                >
                                  {conversationsCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                                </Button>
                                
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={toggleConversations}
                                  className="text-gray-500 hover:text-gray-700 h-8 w-8 p-0"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          {/* Conversations List */}
                          <div className="flex-1 overflow-y-auto p-2">
                            {conversations.length === 0 ? (
                              !conversationsCollapsed && (
                                <div className="text-center py-8">
                                  <MessageSquare className="w-8 h-8 mx-auto mb-3 text-gray-400" />
                                  <p className="text-sm text-gray-500 mb-3">No conversations yet</p>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={createNewConversation}
                                    className="text-teal-600 border-teal-200 hover:bg-teal-50"
                                  >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Start New Chat
                                  </Button>
                                </div>
                              )
                            ) : (
                              <div className="space-y-1">
                                {conversations.map((conversation) => (
                                  <motion.div
                                    key={conversation.id}
                                    whileHover={{ scale: 1.01 }}
                                    className={`group relative p-3 rounded-lg cursor-pointer transition-all ${
                                      activeConversation === conversation.id
                                        ? 'bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800'
                                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                    }`}
                                  >
                                    <div 
                                      className="flex items-center gap-3"
                                      onClick={() => switchConversation(conversation.id)}
                                    >
                                      {conversationsCollapsed ? (
                                        <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                                          <MessageSquare className="w-4 h-4 text-white" />
                                        </div>
                                      ) : (
                                        <>
                                          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                                            <MessageSquare className="w-4 h-4 text-white" />
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <p className="font-medium text-sm truncate text-gray-700 dark:text-gray-300">{conversation.title}</p>
                                            <p className="text-xs text-gray-500">
                                              {conversation.createdAt.toLocaleDateString()}
                                            </p>
                                          </div>
                                        </>
                                      )}
                                    </div>
                                    
                                    {/* Delete Button */}
                                    {!conversationsCollapsed && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          deleteConversation(conversation.id);
                                        }}
                                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </Button>
                                    )}
                                  </motion.div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Conversations Toggle Button (when hidden) */}
                  {!conversationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="shrink-0"
                    >
                      <Button
                        onClick={toggleConversations}
                        className="h-full w-12 bg-teal-600 hover:bg-teal-700 rounded-l-lg rounded-r-none"
                        variant="ghost"
                      >
                        <ChevronRight className="w-5 h-5 text-white" />
                      </Button>
                    </motion.div>
                  )}

                  {/* Main Chat Area - c */}
                  <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                    {/* Chat Messages - c */}
                    <div className="flex-1 overflow-y-auto">
                      {chatHistory.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-center p-8">
                          <div className="max-w-2xl">
                            <div className="w-16 h-16 bg-linear-to-br from-teal-100 to-cyan-100 dark:from-teal-950/20 dark:to-cyan-950/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                              <Brain className="w-8 h-8 text-teal-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Welcome to AI Assistant</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-8">I'm here to help you with coding, writing, analysis, and more. What would you like to work on today?</p>
                            
                            {/* Quick Start Suggestions - c */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {[
                                { title: "Explain quantum computing", desc: "Learn about quantum principles" },
                                { title: "Write a Python function", desc: "Generate code for your project" },
                                { title: "Help me plan a project", desc: "Get structured project guidance" },
                                { title: "Analyze this data", desc: "Get insights from your data" }
                              ].map((suggestion) => (
                                <motion.button
                                  key={suggestion.title}
                                  whileHover={{ scale: 1.02, y: -2 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => setChatMessage(suggestion.title)}
                                  className="text-left p-4 bg-gray-50 dark:bg-gray-800 hover:bg-teal-50 dark:hover:bg-teal-950/20 border border-gray-200 dark:border-gray-700 hover:border-teal-200 dark:hover:border-teal-800 rounded-lg transition-all"
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center shrink-0">
                                      <MessageSquare className="w-4 h-4 text-teal-600" />
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">{suggestion.title}</h4>
                                      <p className="text-sm text-gray-600 dark:text-gray-400">{suggestion.desc}</p>
                                    </div>
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-6 space-y-6">
                          {chatHistory.map((msg, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                {/* Avatar */}
                                <div className="shrink-0">
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                    msg.role === 'user' 
                                      ? 'bg-teal-600' 
                                      : 'bg-gray-100 dark:bg-gray-800'
                                  }`}>
                                    {msg.role === 'user' ? (
                                      <User className="w-4 h-4 text-white" />
                                    ) : (
                                      <Brain className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                    )}
                                  </div>
                                </div>
                                
                                {/* Message Content */}
                                <div className={`flex-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                                  <div className={`inline-block p-4 rounded-lg ${
                                    msg.role === 'user'
                                      ? 'bg-teal-600 text-white'
                                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                                  }`}>
                                    <div className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</div>
                                  </div>
                                  
                                  {/* Message Actions */}
                                  <div className={`flex items-center gap-2 mt-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <span className="text-xs text-gray-500">
                                      {msg.timestamp.toLocaleTimeString()}
                                    </span>
                                    
                                    {msg.role === 'ai' && (
                                      <div className="flex items-center gap-1">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => copyToClipboard(msg.content)}
                                          className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700"
                                        >
                                          <Copy className="w-3 h-3" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700"
                                        >
                                          <ThumbsUp className="w-3 h-3" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700"
                                        >
                                          <ThumbsDown className="w-3 h-3" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={regenerateResponse}
                                          className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700"
                                        >
                                          <RotateCcw className="w-3 h-3" />
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                          
                          {/* Typing Indicator */}
                          {isTyping && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex gap-4"
                            >
                              <div className="shrink-0">
                                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                                  <Brain className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                                  <div className="flex items-center gap-2">
                                    <div className="flex gap-1">
                                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                    <span className="text-sm text-gray-500">AI is thinking...</span>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Chat Input - c */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                      <div className="flex items-end gap-3">
                        <div className="flex-1">
                          <div className="relative">
                            <textarea
                              value={chatMessage}
                              onChange={(e) => setChatMessage(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault();
                                  handleSendMessage();
                                }
                              }}
                              placeholder="Ask me anything... (Shift+Enter for new line)"
                              className="w-full p-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                              rows={1}
                              style={{ minHeight: '44px', maxHeight: '120px' }}
                              disabled={isTyping}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700">
                                <Paperclip className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span>Press Enter to send, Shift+Enter for new line</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700">
                                <Mic className="w-4 h-4" />
                              </Button>
                              <Button
                                onClick={handleSendMessage}
                                disabled={!chatMessage.trim() || isTyping}
                                className="bg-teal-600 hover:bg-teal-700 text-white disabled:opacity-50 h-8 px-4"
                              >
                                <Send className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Image Generation Section */}
            {activeSection === 'image' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-[calc(100vh-8rem)] flex flex-col"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg"
                      whileHover={{ rotate: 5, scale: 1.05 }}
                    >
                    <ImageIcon className="w-6 h-6 text-white" />
                    </motion.div>
                  <div>
                      <h1 className="text-3xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        AI Image Studio
                      </h1>
                      <p className="text-muted-foreground">Create stunning images with advanced AI</p>
                  </div>
                </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowGallery(!showGallery)}
                      className="gap-2"
                    >
                      <ImageIcon className="w-4 h-4" />
                      {showGallery ? 'Hide' : 'Show'} Gallery
                    </Button>
                  </div>
                </div>

                <div className="flex-1 flex gap-6 min-h-0">
                  {/* Generation Panel */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-96 shrink-0"
                  >
                    <Card className="h-full p-6">
                      <div className="h-full flex flex-col">
                        {/* Prompt Input */}
                        <div className="mb-6">
                          <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                            Describe your image
                          </label>
                          <div className="relative">
                      <Input
                        value={imagePrompt}
                        onChange={(e) => setImagePrompt(e.target.value)}
                              placeholder="A majestic mountain landscape at sunset..."
                              className="pr-12 h-12 text-base"
                              disabled={isGenerating}
                            />
                            <motion.div
                              className="absolute right-3 top-1/2 transform -translate-y-1/2"
                              whileHover={{ scale: 1.1 }}
                            >
                              <Wand2 className="w-5 h-5 text-purple-500" />
                            </motion.div>
                          </div>
                        </div>

                        {/* Style Selection */}
                        <div className="mb-6">
                          <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                            Art Style
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { id: 'realistic', label: 'Realistic', icon: Target, color: 'from-blue-500 to-cyan-600' },
                              { id: 'artistic', label: 'Artistic', icon: Palette, color: 'from-purple-500 to-pink-600' },
                              { id: 'anime', label: 'Anime', icon: Sparkles, color: 'from-pink-500 to-rose-600' },
                              { id: 'cartoon', label: 'Cartoon', icon: Smile, color: 'from-yellow-500 to-orange-600' },
                              { id: 'abstract', label: 'Abstract', icon: Zap, color: 'from-indigo-500 to-purple-600' }
                            ].map((style) => (
                              <motion.button
                                key={style.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setImageStyle(style.id as any)}
                                className={`p-3 rounded-xl border-2 transition-all ${
                                  imageStyle === style.id
                                    ? `border-transparent bg-linear-to-r ${style.color} text-white shadow-lg`
                                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
                                }`}
                              >
                                <style.icon className="w-4 h-4 mx-auto mb-1" />
                                <span className="text-xs font-medium">{style.label}</span>
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        {/* Size Selection */}
                        <div className="mb-6">
                          <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                            Image Size
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { id: 'square', label: 'Square', ratio: '1:1' },
                              { id: 'landscape', label: 'Landscape', ratio: '16:9' },
                              { id: 'portrait', label: 'Portrait', ratio: '9:16' }
                            ].map((size) => (
                              <motion.button
                                key={size.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setImageSize(size.id as any)}
                                className={`p-3 rounded-xl border-2 transition-all ${
                                  imageSize === size.id
                                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
                                }`}
                              >
                                <div className="text-xs font-medium">{size.label}</div>
                                <div className="text-xs text-gray-500">{size.ratio}</div>
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        {/* Quality Selection */}
                        <div className="mb-6">
                          <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                            Quality
                          </label>
                          <div className="space-y-2">
                            {[
                              { id: 'standard', label: 'Standard', desc: 'Fast generation' },
                              { id: 'hd', label: 'HD', desc: 'High quality' },
                              { id: 'ultra', label: 'Ultra', desc: 'Maximum quality' }
                            ].map((quality) => (
                              <motion.button
                                key={quality.id}
                                whileHover={{ scale: 1.01, x: 5 }}
                                onClick={() => setImageQuality(quality.id as any)}
                                className={`w-full p-3 rounded-xl border-2 transition-all text-left ${
                                  imageQuality === quality.id
                                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="font-medium">{quality.label}</div>
                                    <div className="text-xs text-gray-500">{quality.desc}</div>
                                  </div>
                                  {imageQuality === quality.id && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="w-2 h-2 bg-purple-500 rounded-full"
                                    />
                                  )}
                                </div>
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        {/* Generate Button */}
                        <motion.div
                          className="mt-auto"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                      <Button
                        onClick={handleGenerateImage}
                            disabled={!imagePrompt.trim() || isGenerating}
                            className="w-full h-12 bg-linear-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:opacity-50"
                          >
                            {isGenerating ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                              />
                            ) : (
                        <Wand2 className="w-5 h-5 mr-2" />
                            )}
                            {isGenerating ? 'Generating...' : 'Generate Image'}
                      </Button>
                        </motion.div>
                    </div>
                    </Card>
                  </motion.div>

                  {/* Gallery */}
                        <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex-1"
                  >
                    <Card className="h-full p-6">
                      <div className="h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                            Generated Images
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">{generatedImages.length} images</span>
                            {generatedImages.length > 0 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setGeneratedImages([])}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                          {generatedImages.length === 0 ? (
                            <div className="h-full flex items-center justify-center text-center">
                              <div>
                                <motion.div
                                  animate={{ 
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0]
                                  }}
                                  transition={{ 
                                    duration: 2, 
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                  }}
                                  className="w-20 h-20 bg-linear-to-br from-purple-100 to-pink-100 dark:from-purple-950/20 dark:to-pink-950/20 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                >
                                  <ImageIcon className="w-10 h-10 text-purple-400" />
                                </motion.div>
                                <h3 className="text-xl font-semibold mb-2">No images yet</h3>
                                <p className="text-gray-500 mb-4">Generate your first AI image to get started</p>
                                <div className="flex flex-wrap gap-2 justify-center">
                                  {[
                                    "A futuristic city at night",
                                    "A serene mountain lake",
                                    "A cute robot playing with cats",
                                    "Abstract digital art"
                                  ].map((suggestion) => (
                                    <motion.button
                                      key={suggestion}
                          whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={() => setImagePrompt(suggestion)}
                                      className="px-3 py-1 text-sm bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300 rounded-full border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30"
                                    >
                                      {suggestion}
                                    </motion.button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                              {generatedImages.map((image) => (
                                <motion.div
                                  key={image.id}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  whileHover={{ scale: 1.05, y: -5 }}
                                  className="group relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden cursor-pointer"
                                  onClick={() => setSelectedImage(image.id)}
                                >
                                  <img
                                    src={image.url}
                                    alt={image.prompt}
                                    className="w-full h-full object-cover"
                                  />
                                  
                                  {/* Overlay */}
                                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="flex gap-2">
                                      <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          downloadImage(image.url, image.prompt);
                                        }}
                                        className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30"
                                      >
                                        <Download className="w-4 h-4 text-white" />
                                      </motion.button>
                                      <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          shareImage(image.url, image.prompt);
                                        }}
                                        className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30"
                                      >
                                        <Share className="w-4 h-4 text-white" />
                                      </motion.button>
                                    </div>
                                  </div>

                                  {/* Image Info */}
                                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/70 to-transparent">
                                    <p className="text-white text-sm font-medium truncate">
                                      {image.prompt}
                                    </p>
                                    <div className="flex items-center justify-between mt-1">
                                      <span className="text-xs text-white/70 capitalize">
                                        {image.style}
                                      </span>
                                      <span className="text-xs text-white/70">
                                        {image.createdAt.toLocaleTimeString()}
                                      </span>
                                    </div>
                                  </div>
                        </motion.div>
                      ))}
                            </div>
                          )}
                    </div>
                  </div>
                </Card>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Code Assistant Section */}
            {activeSection === 'code' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-[calc(100vh-8rem)] flex flex-col"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-12 h-12 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg"
                      whileHover={{ rotate: 5, scale: 1.05 }}
                    >
                    <Code2 className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        AI Code Studio
                      </h1>
                      <p className="text-muted-foreground">Generate, debug, and optimize code with AI</p>
                  </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowCodeHistory(!showCodeHistory)}
                      className="gap-2"
                    >
                      <Code2 className="w-4 h-4" />
                      {showCodeHistory ? 'Hide' : 'Show'} History
                    </Button>
                  </div>
                </div>

                <div className="flex-1 flex gap-6 min-h-0">
                  {/* Code Generation Panel */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-96 shrink-0"
                  >
                    <Card className="h-full p-6">
                      <div className="h-full flex flex-col">
                        {/* Prompt Input */}
                        <div className="mb-6">
                          <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                            Describe your code
                          </label>
                          <div className="relative">
                            <Input
                              value={codePrompt}
                              onChange={(e) => setCodePrompt(e.target.value)}
                              placeholder="Create a function to calculate fibonacci..."
                              className="pr-12 h-12 text-base"
                              disabled={isGeneratingCode}
                            />
                            <motion.div
                              className="absolute right-3 top-1/2 transform -translate-y-1/2"
                              whileHover={{ scale: 1.1 }}
                            >
                              <Code2 className="w-5 h-5 text-blue-500" />
                            </motion.div>
                          </div>
                        </div>

                        {/* Language Selection */}
                        <div className="mb-6">
                          <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                            Programming Language
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { id: 'javascript', label: 'JavaScript', icon: Code2, color: 'from-yellow-500 to-orange-600' },
                              { id: 'python', label: 'Python', color: 'from-green-500 to-emerald-600' },
                              { id: 'typescript', label: 'TypeScript', color: 'from-blue-500 to-cyan-600' },
                              { id: 'react', label: 'React', color: 'from-cyan-500 to-blue-600' },
                              { id: 'nodejs', label: 'Node.js', color: 'from-green-600 to-green-700' },
                              { id: 'html', label: 'HTML', color: 'from-orange-500 to-red-600' },
                              { id: 'css', label: 'CSS', color: 'from-blue-600 to-indigo-600' }
                            ].map((lang) => (
                              <motion.button
                                key={lang.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setCodeLanguage(lang.id as any)}
                                className={`p-3 rounded-xl border-2 transition-all ${
                                  codeLanguage === lang.id
                                    ? `border-transparent bg-linear-to-r ${lang.color} text-white shadow-lg`
                                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                                }`}
                              >
                                {lang.icon && <lang.icon className="w-4 h-4 mx-auto mb-1" />}
                                <span className="text-xs font-medium">{lang.label}</span>
                              </motion.button>
                            ))}
                          </div>
                        </div>


                        {/* Complexity Selection */}
                        <div className="mb-6">
                          <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                            Complexity Level
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { id: 'beginner', label: 'Beginner', color: 'from-green-500 to-emerald-600' },
                              { id: 'intermediate', label: 'Intermediate', color: 'from-yellow-500 to-orange-600' },
                              { id: 'advanced', label: 'Advanced', color: 'from-red-500 to-pink-600' }
                            ].map((level) => (
                              <motion.button
                                key={level.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setCodeComplexity(level.id as any)}
                                className={`p-3 rounded-xl border-2 transition-all ${
                                  codeComplexity === level.id
                                    ? `border-transparent bg-linear-to-r ${level.color} text-white shadow-lg`
                                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                                }`}
                              >
                                <div className="text-xs font-medium">{level.label}</div>
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        {/* Generate Button */}
                        <motion.div
                          className="mt-auto"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            onClick={handleGenerateCode}
                            disabled={!codePrompt.trim() || isGeneratingCode}
                            className="w-full h-12 bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50"
                          >
                            {isGeneratingCode ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                              />
                            ) : (
                              <Code2 className="w-5 h-5 mr-2" />
                            )}
                            {isGeneratingCode ? 'Generating...' : 'Generate Code'}
                          </Button>
                        </motion.div>
                      </div>
                    </Card>
                  </motion.div>

                  {/* Code History */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex-1"
                  >
                    <Card className="h-full p-6">
                      <div className="h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                            Generated Code
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">{generatedCode.length} files</span>
                            {generatedCode.length > 0 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setGeneratedCode([])}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                          {generatedCode.length === 0 ? (
                            <div className="h-full flex items-center justify-center text-center">
                  <div>
                                <motion.div
                                  animate={{ 
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0]
                                  }}
                                  transition={{ 
                                    duration: 2, 
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                  }}
                                  className="w-20 h-20 bg-linear-to-br from-blue-100 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-2xl flex items-center justify-center mx-auto mb-4"
                                >
                                  <Code2 className="w-10 h-10 text-blue-400" />
                                </motion.div>
                                <h3 className="text-xl font-semibold mb-2">No code generated yet</h3>
                                <p className="text-gray-500 mb-4">Generate your first AI code to get started</p>
                                <div className="flex flex-wrap gap-2 justify-center">
                                  {[
                                    "Create a todo list component",
                                    "Write a sorting algorithm",
                                    "Build a REST API endpoint",
                                    "Create a database schema"
                                  ].map((suggestion) => (
                                    <motion.button
                                      key={suggestion}
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={() => setCodePrompt(suggestion)}
                                      className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                                    >
                                      {suggestion}
                                    </motion.button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {generatedCode.map((codeItem) => (
                                <motion.div
                                  key={codeItem.id}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  whileHover={{ scale: 1.02, y: -2 }}
                                  className="group relative bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700"
                                >
                                  {/* Code Header */}
                                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                          <Code2 className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                          <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                                            {codeItem.prompt}
                                          </h4>
                                          <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <span className="capitalize">{codeItem.language}</span>
                                            <span>•</span>
                                            <span className="capitalize">{codeItem.task}</span>
                                            <span>•</span>
                                            <span>{codeItem.createdAt.toLocaleTimeString()}</span>
                                          </div>
                  </div>
                </div>

                                      <div className="flex items-center gap-2">
                                        <motion.button
                                          whileHover={{ scale: 1.1 }}
                                          whileTap={{ scale: 0.9 }}
                                          onClick={() => copyCode(codeItem.code)}
                                          className="p-2 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30"
                                        >
                                          <Copy className="w-4 h-4" />
                                        </motion.button>
                                        <motion.button
                                          whileHover={{ scale: 1.1 }}
                                          whileTap={{ scale: 0.9 }}
                                          onClick={() => downloadCode(codeItem.code, codeItem.language, codeItem.prompt)}
                                          className="p-2 bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30"
                                        >
                                          <Download className="w-4 h-4" />
                                        </motion.button>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Code Content */}
                                  <div className="p-4">
                                    <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                                      <code>{codeItem.code}</code>
                                    </pre>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </div>
                  </div>
                </Card>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Content Writer Section */}
            {activeSection === 'content' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-linear-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">Content Writer</h1>
                    <p className="text-muted-foreground">Generate high-quality content</p>
                  </div>
                </div>

                <Card className="p-6">
                  <div className="text-center py-20">
                    <FileText className="w-20 h-20 mx-auto mb-4 text-orange-500" />
                    <h3 className="text-2xl font-bold mb-2">Content Writer</h3>
                    <p className="text-muted-foreground">This feature is coming soon!</p>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Profile Section */}
            {activeSection === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-[calc(100vh-8rem)] flex flex-col"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-12 h-12 bg-linear-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg"
                      whileHover={{ rotate: 5, scale: 1.05 }}
                    >
                    <User className="w-6 h-6 text-white" />
                    </motion.div>
                  <div>
                      <h1 className="text-3xl font-bold bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        Profile Center
                      </h1>
                      <p className="text-muted-foreground">Manage your account and preferences</p>
                  </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {!isEditingProfile && (
                      <Button
                        onClick={handleEditProfile}
                        className="bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>

                <div className="flex-1 flex gap-6 min-h-0">
                  {/* Profile Sidebar */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-80 shrink-0"
                  >
                    <Card className="h-full p-6">
                      <div className="h-full flex flex-col">
                        {/* Profile Avatar */}
                        <div className="text-center mb-6">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="relative inline-block"
                          >
                            <div className="w-24 h-24 bg-linear-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                              <User className="w-12 h-12 text-white" />
                            </div>
                            {isEditingProfile && (
                              <motion.button
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                whileHover={{ scale: 1.1 }}
                                className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
                              >
                                <Edit3 className="w-4 h-4 text-white" />
                              </motion.button>
                            )}
                          </motion.div>
                          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">
                            {user?.name || 'User Name'}
                          </h2>
                          <p className="text-sm text-gray-500">AI Developer</p>
                        </div>

                        {/* Profile Stats */}
                        <div className="space-y-4 mb-6">
                          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Activity Stats</h3>
                          <div className="grid grid-cols-2 gap-3">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className="p-3 bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-xl"
                            >
                              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">24</div>
                              <div className="text-xs text-gray-500">Chats</div>
                            </motion.div>
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className="p-3 bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl"
                            >
                              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">12</div>
                              <div className="text-xs text-gray-500">Images</div>
                            </motion.div>
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className="p-3 bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl"
                            >
                              <div className="text-2xl font-bold text-green-600 dark:text-green-400">8</div>
                              <div className="text-xs text-gray-500">Code Files</div>
                            </motion.div>
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className="p-3 bg-linear-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-xl"
                            >
                              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">156</div>
                              <div className="text-xs text-gray-500">Hours</div>
                            </motion.div>
                          </div>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="space-y-2">
                          {[
                            { id: 'overview', label: 'Overview', icon: User },
                            { id: 'settings', label: 'Settings', icon: Settings },
                            { id: 'security', label: 'Security', icon: Shield },
                            { id: 'billing', label: 'Billing', icon: CreditCard }
                          ].map((tab) => (
                            <motion.button
                              key={tab.id}
                              whileHover={{ scale: 1.02, x: 5 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setActiveTab(tab.id as any)}
                              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                                activeTab === tab.id
                                  ? 'bg-linear-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                              }`}
                            >
                              <tab.icon className="w-4 h-4" />
                              <span className="font-medium">{tab.label}</span>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </motion.div>

                  {/* Profile Content */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex-1"
                  >
                    <Card className="h-full p-6">
                      <div className="h-full flex flex-col">
                        {/* Tab Content */}
                        {activeTab === 'overview' && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">Profile Overview</h3>
                              {isEditingProfile && (
                                <div className="flex gap-2">
                                  <Button
                                    onClick={handleSaveProfile}
                                    size="sm"
                                    className="bg-green-500 hover:bg-green-600"
                                  >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Save
                                  </Button>
                                  <Button
                                    onClick={handleCancelEdit}
                                    variant="outline"
                                    size="sm"
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Personal Information */}
                    <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Personal Information</h4>
                                
                      <div>
                                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                                    Full Name
                                  </label>
                                  {isEditingProfile ? (
                                    <Input
                                      value={profileData.name}
                                      onChange={(e) => handleProfileChange('name', e.target.value)}
                                      className="w-full"
                                    />
                                  ) : (
                                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                      {user?.name || 'User Name'}
                                    </p>
                                  )}
                      </div>

                      <div>
                                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                                    Email
                                  </label>
                                  {isEditingProfile ? (
                                    <Input
                                      value={profileData.email}
                                      onChange={(e) => handleProfileChange('email', e.target.value)}
                                      type="email"
                                      className="w-full"
                                    />
                                  ) : (
                                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                      {user?.email || 'user@example.com'}
                                    </p>
                                  )}
                      </div>

                      <div>
                                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                                    Bio
                                  </label>
                                  {isEditingProfile ? (
                                    <textarea
                                      value={profileData.bio}
                                      onChange={(e) => handleProfileChange('bio', e.target.value)}
                                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                      rows={3}
                                      placeholder="Tell us about yourself..."
                                    />
                                  ) : (
                                    <p className="text-gray-600 dark:text-gray-400">
                                      AI enthusiast and developer passionate about creating innovative solutions.
                                    </p>
                                  )}
                      </div>
                    </div>

                              {/* Additional Information */}
                              <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Additional Information</h4>
                                
                                <div>
                                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                                    Location
                                  </label>
                                  {isEditingProfile ? (
                                    <Input
                                      value={profileData.location}
                                      onChange={(e) => handleProfileChange('location', e.target.value)}
                                      className="w-full"
                                      placeholder="City, Country"
                                    />
                                  ) : (
                                    <p className="text-gray-600 dark:text-gray-400">San Francisco, CA</p>
                                  )}
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                                    Website
                                  </label>
                                  {isEditingProfile ? (
                                    <Input
                                      value={profileData.website}
                                      onChange={(e) => handleProfileChange('website', e.target.value)}
                                      className="w-full"
                                      placeholder="https://yourwebsite.com"
                                    />
                                  ) : (
                                    <p className="text-gray-600 dark:text-gray-400">https://example.com</p>
                                  )}
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                                    Phone
                                  </label>
                                  {isEditingProfile ? (
                                    <Input
                                      value={profileData.phone}
                                      onChange={(e) => handleProfileChange('phone', e.target.value)}
                                      className="w-full"
                                      placeholder="+1 (555) 123-4567"
                                    />
                                  ) : (
                                    <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                                  )}
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                                    Member Since
                                  </label>
                                  <p className="text-gray-600 dark:text-gray-400">
                                    {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {activeTab === 'settings' && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                          >
                            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">Account Settings</h3>
                            <div className="space-y-4">
                              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Notifications</h4>
                                <p className="text-sm text-gray-500 mb-3">Manage your notification preferences</p>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">Email notifications</span>
                                  <Button variant="outline" size="sm">Configure</Button>
                                </div>
                              </div>
                              
                              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Privacy</h4>
                                <p className="text-sm text-gray-500 mb-3">Control your privacy settings</p>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">Profile visibility</span>
                                  <Button variant="outline" size="sm">Configure</Button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {activeTab === 'security' && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                          >
                            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">Security</h3>
                            <div className="space-y-4">
                              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Password</h4>
                                <p className="text-sm text-gray-500 mb-3">Update your password</p>
                                <Button variant="outline" size="sm">Change Password</Button>
                              </div>
                              
                              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Two-Factor Authentication</h4>
                                <p className="text-sm text-gray-500 mb-3">Add an extra layer of security</p>
                                <Button variant="outline" size="sm">Enable 2FA</Button>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {activeTab === 'billing' && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                          >
                            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">Billing & Subscription</h3>
                            <div className="p-6 bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl border border-green-200 dark:border-green-800">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-linear-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                  <Star className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-green-700 dark:text-green-300">Pro Plan</h4>
                                  <p className="text-sm text-green-600 dark:text-green-400">Active subscription</p>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                You have access to all premium features including unlimited AI generations, priority support, and advanced analytics.
                              </p>
                              <Button variant="outline" size="sm" className="border-green-300 text-green-700 hover:bg-green-50">
                                Manage Subscription
                      </Button>
                            </div>
                          </motion.div>
                        )}
                    </div>
                  </Card>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
