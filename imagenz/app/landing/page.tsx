"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles, ImageIcon, ArrowRight, Zap, Send } from "lucide-react"
import gsap from "gsap"
import { LiveImageFeed } from "@/components/live-image-feed"
import { LiveTextFeed } from "@/components/live-text-feed"

export default function LandingPage() {
  const [feedType, setFeedType] = useState<"image" | "text">("image")
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const feedToggleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Staggered animations for hero section
    const tl = gsap.timeline()

    if (titleRef.current) {
      tl.from(
        titleRef.current,
        {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out",
        },
        0,
      )
    }

    if (subtitleRef.current) {
      tl.from(
        subtitleRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        },
        0.2,
      )
    }

    if (buttonsRef.current) {
      tl.from(
        buttonsRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
        },
        0.4,
      )
    }

    // Animate feature cards on scroll
    if (featuresRef.current) {
      const cards = featuresRef.current.querySelectorAll(".feature-card")
      gsap.from(cards, {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      })
    }

    // Animate stats on scroll
    if (statsRef.current) {
      const stats = statsRef.current.querySelectorAll(".stat-item")
      gsap.from(stats, {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      })
    }
  }, [])

  const handleFeedTypeChange = (newType: "image" | "text") => {
    if (newType === feedType) return

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setFeedType(newType)
          gsap.from(containerRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: "power2.out",
          })
        },
      })
    }
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className="border-b border-[#222222] bg-gradient-to-b from-[#1a1a1a] to-transparent backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#ff0000] to-[#cc0000] rounded-lg flex items-center justify-center font-bold text-lg">
              IG
            </div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: "HelveticaNowDisplay-ExtBlk" }}>
              ImaGenz
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://t.me/imggen0_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-[#888888] hover:text-white transition-colors flex items-center gap-2 text-sm"
            >
              <Send className="w-4 h-4" />
              Telegram Bot
            </a>
            <a
              href="/app"
              className="px-6 py-2 bg-[#ff0000] text-white font-bold rounded-lg hover:bg-[#cc0000] transition-colors"
            >
              Try Generator
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section with Gradient Background */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#ff0000]/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center mb-20">
            <h2
              ref={titleRef}
              className="text-6xl md:text-7xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "HelveticaNowDisplay-ExtBlk" }}
            >
              AI Generation <br />
              <span className="bg-gradient-to-r from-[#ff0000] to-[#cc0000] text-transparent bg-clip-text">
                Made Simple
              </span>
            </h2>
            <p ref={subtitleRef} className="text-xl text-[#888888] mb-8 max-w-2xl mx-auto">
              Generate stunning images and creative text instantly. Watch real-time creations from users around the
              world with our live feeds.
            </p>
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/app"
                className="px-8 py-4 bg-gradient-to-r from-[#ff0000] to-[#cc0000] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-[#ff0000]/50 transition-all flex items-center justify-center gap-2 group"
              >
                Start Creating
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#features"
                className="px-8 py-4 bg-[#1a1a1a] text-white font-bold rounded-lg border-2 border-[#333333] hover:border-[#ff0000]/50 transition-all"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-[#222222]">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="stat-item text-center">
            <div className="text-4xl font-bold text-[#ff0000] mb-2">10M+</div>
            <p className="text-[#888888]">Generations Served</p>
          </div>
          <div className="stat-item text-center">
            <div className="text-4xl font-bold text-[#ff0000] mb-2">Instant</div>
            <p className="text-[#888888]">No Sign Up Required</p>
          </div>
          <div className="stat-item text-center">
            <div className="text-4xl font-bold text-[#ff0000] mb-2">24/7</div>
            <p className="text-[#888888]">Always Available</p>
          </div>
        </div>
      </section>

      {/* Live Feeds Section - Improved Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-[#222222]">
        <div className="mb-12">
          <h3 className="text-4xl font-bold mb-4 text-center" style={{ fontFamily: "HelveticaNowDisplay-ExtBlk" }}>
            Watch Creation in Real-Time
          </h3>
          <p className="text-[#888888] text-center text-lg mb-8">
            See what others are generating right now with ImaGenz
          </p>

          {/* Toggle Button with Animation */}
          <div ref={feedToggleRef} className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => handleFeedTypeChange("image")}
              className={`px-6 py-3 font-bold rounded-lg transition-all border-2 flex items-center gap-2 ${
                feedType === "image"
                  ? "bg-[#ff0000] text-white border-[#ff0000] shadow-lg shadow-[#ff0000]/30"
                  : "bg-[#1a1a1a] text-[#cccccc] border-[#333333] hover:border-[#ff0000]/50"
              }`}
              style={{ fontFamily: "HelveticaNowDisplay-ExtBlk" }}
            >
              <ImageIcon className="w-5 h-5" />
              IMAGE FEED
            </button>
            <button
              onClick={() => handleFeedTypeChange("text")}
              className={`px-6 py-3 font-bold rounded-lg transition-all border-2 flex items-center gap-2 ${
                feedType === "text"
                  ? "bg-[#ff0000] text-white border-[#ff0000] shadow-lg shadow-[#ff0000]/30"
                  : "bg-[#1a1a1a] text-[#cccccc] border-[#333333] hover:border-[#ff0000]/50"
              }`}
              style={{ fontFamily: "HelveticaNowDisplay-ExtBlk" }}
            >
              <Sparkles className="w-5 h-5" />
              TEXT FEED
            </button>
          </div>
        </div>

        {/* Feed Display - Improved visibility */}
        <div
          ref={containerRef}
          className="relative min-h-96 bg-gradient-to-br from-[#0a0a0a] to-[#000000] border-2 border-[#222222] rounded-lg p-8"
        >
          {feedType === "image" && <LiveImageFeed />}
          {feedType === "text" && <LiveTextFeed />}
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        id="features"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-[#222222]"
      >
        <h3 className="text-4xl font-bold mb-12 text-center" style={{ fontFamily: "HelveticaNowDisplay-ExtBlk" }}>
          Powerful Features
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="feature-card bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-8 border-2 border-[#222222] rounded-lg hover:border-[#ff0000]/50 transition-all group">
            <div className="w-12 h-12 bg-[#ff0000]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#ff0000]/20 transition-all">
              <Zap className="w-6 h-6 text-[#ff0000]" />
            </div>
            <h4 className="text-xl font-bold mb-2">Lightning Fast</h4>
            <p className="text-[#888888]">Generate images and text in seconds with our optimized infrastructure</p>
          </div>
          <div className="feature-card bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-8 border-2 border-[#222222] rounded-lg hover:border-[#ff0000]/50 transition-all group">
            <div className="w-12 h-12 bg-[#ff0000]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#ff0000]/20 transition-all">
              <ImageIcon className="w-6 h-6 text-[#ff0000]" />
            </div>
            <h4 className="text-xl font-bold mb-2">Multiple Models</h4>
            <p className="text-[#888888]">Choose from FLUX, Turbo, and other cutting-edge AI models</p>
          </div>
          <div className="feature-card bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-8 border-2 border-[#222222] rounded-lg hover:border-[#ff0000]/50 transition-all group">
            <div className="w-12 h-12 bg-[#ff0000]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#ff0000]/20 transition-all">
              <Sparkles className="w-6 h-6 text-[#ff0000]" />
            </div>
            <h4 className="text-xl font-bold mb-2">Instant Access</h4>
            <p className="text-[#888888]">Start creating immediately - no sign up or authentication needed</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-[#222222]">
        <div className="bg-gradient-to-r from-[#ff0000]/10 via-transparent to-[#ff0000]/10 border-2 border-[#ff0000]/30 rounded-lg p-12 text-center">
          <h3 className="text-4xl font-bold mb-4" style={{ fontFamily: "HelveticaNowDisplay-ExtBlk" }}>
            Ready to Create Something Amazing?
          </h3>
          <p className="text-[#888888] mb-8 text-lg">Join thousands of users generating AI content with ImaGenz</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/app"
              className="inline-flex px-8 py-4 bg-gradient-to-r from-[#ff0000] to-[#cc0000] text-white font-bold rounded-lg hover:shadow-lg hover:shadow-[#ff0000]/50 transition-all items-center gap-2"
            >
              Start Creating Now
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="https://t.me/imggen0_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-8 py-4 bg-[#1a1a1a] text-white font-bold rounded-lg border-2 border-[#333333] hover:border-[#ff0000]/50 transition-all items-center gap-2"
            >
              <Send className="w-5 h-5" />
              Try Telegram Bot
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#222222] bg-gradient-to-t from-[#0a0a0a] to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-center text-[#888888]">ImaGenz - AI Generation Made Simple</p>
        </div>
      </footer>
    </main>
  )
}
