"use client"

import type React from "react"
import { useState } from "react"
import { Loader2, Copy, Check, AlertCircle, Sparkles } from "lucide-react"

const TEXT_MODELS = [{ name: "openai", label: "OpenAI GPT-5 Nano", description: "High quality" }]

export function TextGenerator() {
  const [prompt, setPrompt] = useState("")
  const [model] = useState("openai") // Set to openai by default only
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const generateText = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt")
      return
    }

    setLoading(true)
    setError("")
    setResult("")

    try {
      const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}?model=${model}`, {
        method: "GET",
        headers: {
          Accept: "text/plain",
        },
      })

      if (response.status === 402) {
        throw new Error("Daily quota exceeded. Please try again later.")
      }

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`)
      }

      const text = await response.text()
      if (!text || text.trim() === "") {
        throw new Error("Empty response from API")
      }

      setResult(text)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      setError(`Text generation failed: ${errorMessage}`)
      console.error("[v0] Text generation error:", err)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault()
      generateText()
    }
  }

  return (
    <div className="space-y-6">
      {/* Main Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-8 border-2 border-[#222222] hover:border-[#333333] transition-all rounded-lg">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-[#ff0000]" />
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "HelveticaNowDisplay-ExtBlk" }}>
              PROMPT
            </h2>
          </div>
          <div className="space-y-4">
            {error && (
              <div className="p-3 border-2 border-[#ff4444] bg-[#1a0000]/50 rounded-lg flex items-start gap-3 animate-in fade-in">
                <AlertCircle className="w-5 h-5 text-[#ff4444] flex-shrink-0 mt-0.5" />
                <p className="text-[#ff4444] text-sm">{error}</p>
              </div>
            )}
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything amazing..."
              className="w-full min-h-40 p-4 bg-[#0a0a0a] border-2 border-[#333333] text-white placeholder-[#555555] focus:outline-none focus:border-[#ff0000] focus:ring-2 focus:ring-[#ff0000]/20 rounded-lg transition-all resize-none"
              disabled={loading}
              style={{ fontFamily: "VCR-Mono" }}
            />
            <button
              onClick={generateText}
              disabled={loading || !prompt.trim()}
              className="w-full py-4 bg-gradient-to-r from-[#ff0000] to-[#cc0000] text-white font-bold border-2 border-[#ff0000] hover:shadow-lg hover:shadow-[#ff0000]/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all rounded-lg active:scale-95"
              style={{ fontFamily: "HelveticaNowDisplay-ExtBlk" }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  GENERATING...
                </span>
              ) : (
                "GENERATE TEXT"
              )}
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-8 border-2 border-[#222222] hover:border-[#333333] transition-all rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "HelveticaNowDisplay-ExtBlk" }}>
              RESULT
            </h2>
            {result && (
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-[#1a1a1a] border-2 border-[#333333] text-[#cccccc] hover:border-[#ff0000] hover:text-[#ff0000] transition-all rounded-lg flex items-center gap-2 active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    COPIED
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    COPY
                  </>
                )}
              </button>
            )}
          </div>

          <div className="min-h-40 p-4 border-2 border-[#333333] bg-[#0a0a0a] rounded-lg">
            {loading && (
              <div className="flex flex-col items-center justify-center h-40 gap-3">
                <div className="relative w-12 h-12">
                  <Loader2 className="w-12 h-12 animate-spin text-[#ff0000]" />
                </div>
                <p className="text-[#888888] text-sm">Generating text...</p>
              </div>
            )}
            {!loading && result && (
              <p className="text-[#cccccc] whitespace-pre-wrap text-sm leading-relaxed">{result}</p>
            )}
            {!result && !loading && !error && (
              <div className="flex items-center justify-center h-40 text-[#888888]">
                <p className="text-sm">Generated text will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
