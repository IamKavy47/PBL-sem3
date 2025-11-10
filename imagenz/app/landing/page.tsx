"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles, Image, ArrowRight, Zap, Send, Globe, Shield } from "lucide-react"
import { LiveImageFeed } from "@/components/live-image-feed"
import { LiveTextFeed } from "@/components/live-text-feed"

export default function LandingPage() {
  const [feedType, setFeedType] = useState<"image" | "text">("image")
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleFeedTypeChange = (newType: "image" | "text") => {
    if (newType === feedType || isAnimating) return
    
    setIsAnimating(true)
    if (containerRef.current) {
      containerRef.current.style.opacity = "0"
      containerRef.current.style.transform = "translateY(10px)"
      
      setTimeout(() => {
        setFeedType(newType)
        if (containerRef.current) {
          containerRef.current.style.opacity = "1"
          containerRef.current.style.transform = "translateY(0)"
        }
        setIsAnimating(false)
      }, 300)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg shadow-red-500/50">
              IG
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
              ImaGenz
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://t.me/imggen0_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex px-4 py-2 text-gray-400 hover:text-white transition-colors items-center gap-2 text-sm"
            >
              <Send className="w-4 h-4" />
              Telegram Bot
            </a>
            <a
              href="/app"
              className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-500 hover:to-red-600 transition-all shadow-lg shadow-red-500/30"
            >
              Try Generator
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-purple-600/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-600/20 via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-red-500" />
              <span className="text-sm text-gray-300">Powered by Advanced AI Models</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              AI Generation <br />
              <span className="bg-gradient-to-r from-red-500 via-red-600 to-pink-600 text-transparent bg-clip-text">
                Made Simple
              </span>
            </h2>
            
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Generate stunning images and creative text instantly. Watch real-time creations from users around the
              world with our live feeds.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/app"
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-red-500/50 transition-all flex items-center justify-center gap-2 group"
              >
                Start Creating Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#features"
                className="px-8 py-4 bg-gray-800/50 text-white font-semibold rounded-xl border border-gray-700 hover:border-red-600/50 hover:bg-gray-800 transition-all backdrop-blur-sm"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-y border-gray-800 bg-gradient-to-r from-transparent via-gray-900/50 to-transparent">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center group hover:scale-105 transition-transform">
            <div className="text-5xl font-bold bg-gradient-to-r from-red-500 to-pink-500 text-transparent bg-clip-text mb-2">10M+</div>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Generations Served</p>
          </div>
          <div className="text-center group hover:scale-105 transition-transform">
            <div className="text-5xl font-bold bg-gradient-to-r from-red-500 to-pink-500 text-transparent bg-clip-text mb-2">Instant</div>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">No Sign Up Required</p>
          </div>
          <div className="text-center group hover:scale-105 transition-transform">
            <div className="text-5xl font-bold bg-gradient-to-r from-red-500 to-pink-500 text-transparent bg-clip-text mb-2">24/7</div>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Always Available</p>
          </div>
        </div>
      </section>

      {/* Live Feeds Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <h3 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
            Watch Creation in Real-Time
          </h3>
          <p className="text-gray-400 text-center text-lg mb-8 max-w-2xl mx-auto">
            See what others are generating right now with ImaGenz. Join our creative community.
          </p>

          {/* Toggle Button */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => handleFeedTypeChange("image")}
              disabled={isAnimating}
              className={`px-6 py-3 font-semibold rounded-xl transition-all border-2 flex items-center gap-2 ${
                feedType === "image"
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white border-red-600 shadow-lg shadow-red-500/30"
                  : "bg-gray-800/50 text-gray-300 border-gray-700 hover:border-red-600/50 hover:text-white"
              }`}
            >
              <Image className="w-5 h-5" />
              IMAGE FEED
            </button>
            <button
              onClick={() => handleFeedTypeChange("text")}
              disabled={isAnimating}
              className={`px-6 py-3 font-semibold rounded-xl transition-all border-2 flex items-center gap-2 ${
                feedType === "text"
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white border-red-600 shadow-lg shadow-red-500/30"
                  : "bg-gray-800/50 text-gray-300 border-gray-700 hover:border-red-600/50 hover:text-white"
              }`}
            >
              <Sparkles className="w-5 h-5" />
              TEXT FEED
            </button>
          </div>
        </div>

        {/* Feed Display - Much better visibility */}
        <div
          ref={containerRef}
          className="relative min-h-96 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-2 border-gray-700 rounded-2xl p-8 shadow-2xl transition-all duration-300"
          style={{ opacity: 1, transform: 'translateY(0)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-purple-600/5 rounded-2xl" />
          <div className="relative z-10">
            {feedType === "image" && <LiveImageFeed />}
            {feedType === "text" && <LiveTextFeed />}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-800">
        <h3 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
          Powerful Features
        </h3>
        <p className="text-gray-400 text-center text-lg mb-12 max-w-2xl mx-auto">
          Everything you need to create stunning AI-generated content
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 border border-gray-700 rounded-2xl hover:border-red-600/50 transition-all group hover:shadow-xl hover:shadow-red-500/10">
            <div className="w-14 h-14 bg-gradient-to-br from-red-600/20 to-red-700/20 rounded-xl flex items-center justify-center mb-6 group-hover:from-red-600/30 group-hover:to-red-700/30 transition-all">
              <Zap className="w-7 h-7 text-red-500" />
            </div>
            <h4 className="text-xl font-bold mb-3 group-hover:text-red-500 transition-colors">Lightning Fast</h4>
            <p className="text-gray-400 leading-relaxed">Generate images and text in seconds with our optimized infrastructure and cutting-edge models</p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 border border-gray-700 rounded-2xl hover:border-red-600/50 transition-all group hover:shadow-xl hover:shadow-red-500/10">
            <div className="w-14 h-14 bg-gradient-to-br from-red-600/20 to-red-700/20 rounded-xl flex items-center justify-center mb-6 group-hover:from-red-600/30 group-hover:to-red-700/30 transition-all">
              <Globe className="w-7 h-7 text-red-500" />
            </div>
            <h4 className="text-xl font-bold mb-3 group-hover:text-red-500 transition-colors">Multiple Models</h4>
            <p className="text-gray-400 leading-relaxed">Choose from FLUX, Turbo, and other state-of-the-art AI models for your creative needs</p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 border border-gray-700 rounded-2xl hover:border-red-600/50 transition-all group hover:shadow-xl hover:shadow-red-500/10">
            <div className="w-14 h-14 bg-gradient-to-br from-red-600/20 to-red-700/20 rounded-xl flex items-center justify-center mb-6 group-hover:from-red-600/30 group-hover:to-red-700/30 transition-all">
              <Shield className="w-7 h-7 text-red-500" />
            </div>
            <h4 className="text-xl font-bold mb-3 group-hover:text-red-500 transition-colors">Instant Access</h4>
            <p className="text-gray-400 leading-relaxed">Start creating immediately - no sign up, no authentication, just pure creativity</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-800">
        <div className="relative bg-gradient-to-r from-red-600/10 via-purple-600/10 to-red-600/10 border-2 border-red-600/30 rounded-3xl p-12 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-600/20 via-transparent to-transparent" />
          
          <div className="relative z-10">
            <h3 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
              Ready to Create Something Amazing?
            </h3>
            <p className="text-gray-400 mb-8 text-lg max-w-2xl mx-auto">
              Join thousands of users generating AI content with ImaGenz. Start your creative journey today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/app"
                className="inline-flex px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-red-500/50 transition-all items-center gap-2 group"
              >
                Start Creating Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://t.me/imggen0_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex px-8 py-4 bg-gray-800 text-white font-semibold rounded-xl border-2 border-gray-700 hover:border-red-600/50 transition-all items-center gap-2"
              >
                <Send className="w-5 h-5" />
                Try Telegram Bot
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gradient-to-t from-black to-transparent mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center font-bold text-sm">
                IG
              </div>
              <span className="text-gray-400">ImaGenz - AI Generation Made Simple</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </main>
  )
}