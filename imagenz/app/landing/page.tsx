"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles, Image, ArrowRight, Zap, Send, Globe, Shield, Download } from "lucide-react"
import { LiveImageFeed } from "@/components/live-image-feed"
import { LiveTextFeed } from "@/components/live-text-feed"

export default function LandingPage() {
  const [feedType, setFeedType] = useState<"image" | "text">("image")
  const [isAnimating, setIsAnimating] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<"android" | "ios">("android")
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

  const handleDownload = () => {
    // Replace these URLs with your actual APK and iOS app URLs
    const downloadUrls = {
      android: "./imagenz.apk", // Your APK file path
      ios: "https://apps.apple.com/app/your-app-id" // Your iOS App Store link
    }
    
    window.open(downloadUrls[selectedPlatform], '_blank')
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

      {/* Mobile App Download Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-gray-800">
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-2 border-gray-700 rounded-3xl p-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-purple-600/5" />
          
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/20 rounded-full mb-6">
              <Download className="w-4 h-4 text-red-500" />
              <span className="text-sm text-gray-300">Available on Mobile</span>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
              Download Our Mobile App
            </h3>
            <p className="text-gray-400 mb-8 text-lg max-w-2xl mx-auto">
              Create AI-generated content on the go. Available for Android and iOS devices.
            </p>

            {/* Platform Toggle */}
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setSelectedPlatform("android")}
                className={`px-6 py-3 font-semibold rounded-xl transition-all border-2 flex items-center gap-3 ${
                  selectedPlatform === "android"
                    ? "bg-gradient-to-r from-red-600 to-red-700 text-white border-red-600 shadow-lg shadow-red-500/30"
                    : "bg-gray-800/50 text-gray-300 border-gray-700 hover:border-red-600/50 hover:text-white"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 50 50" fill="currentColor">
                  <path d="M 16.28125 0.03125 C 16.152344 0.0546875 16.019531 0.078125 15.90625 0.15625 C 15.449219 0.464844 15.347656 1.105469 15.65625 1.5625 L 17.8125 4.78125 C 14.480469 6.546875 11.996094 9.480469 11.1875 13 L 38.8125 13 C 38.003906 9.480469 35.519531 6.546875 32.1875 4.78125 L 34.34375 1.5625 C 34.652344 1.105469 34.550781 0.464844 34.09375 0.15625 C 33.632813 -0.152344 32.996094 -0.0195313 32.6875 0.4375 L 30.3125 3.9375 C 28.664063 3.335938 26.875 3 25 3 C 23.125 3 21.335938 3.335938 19.6875 3.9375 L 17.3125 0.4375 C 17.082031 0.09375 16.664063 -0.0429688 16.28125 0.03125 Z M 19.5 8 C 20.328125 8 21 8.671875 21 9.5 C 21 10.332031 20.328125 11 19.5 11 C 18.667969 11 18 10.332031 18 9.5 C 18 8.671875 18.667969 8 19.5 8 Z M 30.5 8 C 31.332031 8 32 8.671875 32 9.5 C 32 10.332031 31.332031 11 30.5 11 C 29.671875 11 29 10.332031 29 9.5 C 29 8.671875 29.671875 8 30.5 8 Z M 8 15 C 6.34375 15 5 16.34375 5 18 L 5 32 C 5 33.65625 6.34375 35 8 35 C 8.351563 35 8.6875 34.925781 9 34.8125 L 9 15.1875 C 8.6875 15.074219 8.351563 15 8 15 Z M 11 15 L 11 37 C 11 38.652344 12.347656 40 14 40 L 36 40 C 37.652344 40 39 38.652344 39 37 L 39 15 Z M 42 15 C 41.648438 15 41.3125 15.074219 41 15.1875 L 41 34.8125 C 41.3125 34.921875 41.648438 35 42 35 C 43.65625 35 45 33.65625 45 32 L 45 18 C 45 16.34375 43.65625 15 42 15 Z M 15 42 L 15 46 C 15 48.207031 16.792969 50 19 50 C 21.207031 50 23 48.207031 23 46 L 23 42 Z M 27 42 L 27 46 C 27 48.207031 28.792969 50 31 50 C 33.207031 50 35 48.207031 35 46 L 35 42 Z"/>
                </svg>
                Android
              </button>
              <button
                onClick={() => setSelectedPlatform("ios")}
                className={`px-6 py-3 font-semibold rounded-xl transition-all border-2 flex items-center gap-3 ${
                  selectedPlatform === "ios"
                    ? "bg-gradient-to-r from-red-600 to-red-700 text-white border-red-600 shadow-lg shadow-red-500/30"
                    : "bg-gray-800/50 text-gray-300 border-gray-700 hover:border-red-600/50 hover:text-white"
                }`}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                iOS
              </button>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="inline-flex px-10 py-5 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-red-500/50 transition-all items-center gap-3 text-lg group"
            >
              <Download className="w-6 h-6 group-hover:animate-bounce" />
              Download for {selectedPlatform === "android" ? "Android" : "iOS"}
            </button>

            <p className="text-gray-500 text-sm mt-6">
              {selectedPlatform === "android" 
                ? "Supports Android 6.0 and above" 
                : "Available on the App Store"}
            </p>
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

        {/* Feed Display */}
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