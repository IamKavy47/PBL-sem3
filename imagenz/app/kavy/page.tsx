"use client"

import { useState, useEffect } from "react"
import { TextGenerator } from "@/components/text-generator"
import { ImageGenerator } from "@/components/gptimage"
import { Sparkles, ImageIcon, Home } from "lucide-react"
import Link from "next/link"

export default function AppPage() {
  const [activeTab, setActiveTab] = useState<"text" | "image">("text")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-[#222222] bg-gradient-to-b from-[#1a1a1a] to-[#111111]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-[#ff0000] to-[#cc0000] rounded-lg flex items-center justify-center font-bold text-lg">
                  IG
                </div>
                <h1 className="text-5xl font-bold text-white" style={{ fontFamily: "HelveticaNowDisplay-ExtBlk" }}>
                  ImaGenz
                </h1>
              </div>
              <p className="text-[#888888] text-sm tracking-widest">AI-POWERED GENERATION ENGINE</p>
            </div>
            <Link
              href="/landing"
              className="p-3 bg-[#1a1a1a] border-2 border-[#333333] text-[#cccccc] hover:border-[#ff0000] hover:text-[#ff0000] transition-all rounded-lg"
            >
              <Home className="w-5 h-5" />
            </Link>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setActiveTab("text")}
              className={`px-6 py-3 font-bold transition-all rounded-lg border-2 ${
                activeTab === "text"
                  ? "bg-gradient-to-r from-[#ff0000] to-[#cc0000] text-white border-[#ff0000] shadow-lg shadow-[#ff0000]/30"
                  : "bg-[#1a1a1a] text-[#cccccc] border-[#333333] hover:border-[#ff0000]/50"
              }`}
              style={{ fontFamily: "HelveticaNowDisplay-ExtBlk" }}
            >
              <Sparkles className="w-5 h-5 inline mr-2" />
              TEXT
            </button>
            <button
              onClick={() => setActiveTab("image")}
              className={`px-6 py-3 font-bold transition-all rounded-lg border-2 ${
                activeTab === "image"
                  ? "bg-gradient-to-r from-[#ff0000] to-[#cc0000] text-white border-[#ff0000] shadow-lg shadow-[#ff0000]/30"
                  : "bg-[#1a1a1a] text-[#cccccc] border-[#333333] hover:border-[#ff0000]/50"
              }`}
              style={{ fontFamily: "HelveticaNowDisplay-ExtBlk" }}
            >
              <ImageIcon className="w-5 h-5 inline mr-2" />
              IMAGE
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="transition-all duration-300">
          {activeTab === "text" && <TextGenerator />}
          {activeTab === "image" && <ImageGenerator />}
        </div>
      </div>
    </main>
  )
}
