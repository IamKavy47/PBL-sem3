"use client"

import type React from "react"
import { useState } from "react"
import { Loader2, Download, AlertCircle, ImageIcon, Settings2, ExternalLink } from "lucide-react"

const ASPECT_RATIOS = [
  { label: "16:9", value: "16:9", width: 1024, height: 576 },
  { label: "1:1", value: "1:1", width: 768, height: 768 },
  { label: "9:16", value: "9:16", width: 576, height: 1024 },
  { label: "4:3", value: "4:3", width: 1024, height: 768 },
  { label: "3:2", value: "3:2", width: 960, height: 640 },
]

export function ImageGenerator() {
  const [prompt, setPrompt] = useState("")
  const [model, setModel] = useState("flux")
  const [aspectRatio, setAspectRatio] = useState("16:9")
  const [imageUrl, setImageUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [fullImageUrl, setFullImageUrl] = useState("")

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError("Please enter an image description")
      return
    }

    setLoading(true)
    setError("")
    setImageUrl("")
    setFullImageUrl("")

    try {
      const selectedRatio = ASPECT_RATIOS.find((r) => r.value === aspectRatio)
      const encodedPrompt = encodeURIComponent(prompt)
      const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?model=${model}&width=${selectedRatio?.width}&height=${selectedRatio?.height}&nologo=true`

      setFullImageUrl(url)
      // Preload image for smooth transition
      const img = new Image()
      img.src = url
      img.onload = () => {
        setImageUrl(url)
        setLoading(false)
      }
      img.onerror = () => {
        setError("Failed to load image. Please try again.")
        setLoading(false)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      setError(`Error generating image: ${errorMessage}`)
      console.error("Image generation error:", err)
      setLoading(false)
    }
  }

  const downloadImage = async () => {
    if (!imageUrl) return
    try {
      const response = await fetch(imageUrl, { mode: "cors" })
      if (!response.ok) throw new Error("Failed to fetch image")

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "generated-image.jpg"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      setError("Failed to download image. Please try again.")
      console.error("Download error:", err)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault()
      generateImage()
    }
  }

  const selectedRatio = ASPECT_RATIOS.find((r) => r.value === aspectRatio)

  return (
    <div className="space-y-6">
      {/* Model and Aspect Ratio Selectors */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[#cccccc] font-bold mb-2 text-xs">MODEL</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            disabled={loading}
            className="w-full p-3 bg-[#1a1a1a] border-2 border-[#333333] text-white hover:border-[#ff0000] focus:outline-none focus:border-[#ff0000] focus:ring-2 focus:ring-[#ff0000]/20 transition-all rounded-lg cursor-pointer"
            style={{ fontFamily: "VCR-Mono" }}
          >
            <option value="flux">FLUX</option>
            <option value="turbo">TURBO</option>
          </select>
        </div>
        <div>
          <label className="block text-[#cccccc] font-bold mb-2 text-xs">ASPECT RATIO</label>
          <select
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value)}
            disabled={loading}
            className="w-full p-3 bg-[#1a1a1a] border-2 border-[#333333] text-white hover:border-[#ff0000] focus:outline-none focus:border-[#ff0000] focus:ring-2 focus:ring-[#ff0000]/20 transition-all rounded-lg cursor-pointer"
            style={{ fontFamily: "VCR-Mono" }}
          >
            {ASPECT_RATIOS.map((ratio) => (
              <option key={ratio.value} value={ratio.value}>
                {ratio.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Input Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-8 border-2 border-[#222222] hover:border-[#333333] transition-all rounded-lg">
          <div className="flex items-center gap-2 mb-6">
            <Settings2 className="w-5 h-5 text-[#ff0000]" />
            <h2 className="text-2xl font-bold text-white">SETTINGS</h2>
          </div>

          {error && (
            <div className="p-3 border-2 border-[#ff4444] bg-[#1a0000]/50 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#ff4444]" />
              <p className="text-[#ff4444] text-sm">{error}</p>
            </div>
          )}

          <div>
            <p className="text-[#cccccc] font-bold mb-3 text-xs">SELECTED RATIO: {aspectRatio}</p>
            <div className="p-3 bg-[#0a0a0a] border-2 border-[#333333] rounded-lg text-center">
              <p className="text-[#888888] text-xs">
                {selectedRatio?.width} × {selectedRatio?.height} px
              </p>
            </div>
          </div>

          <div>
            <label className="block text-[#cccccc] font-bold mb-3 text-xs mt-4">IMAGE PROMPT</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your vision..."
              className="w-full min-h-40 p-4 bg-[#0a0a0a] border-2 border-[#333333] text-white placeholder-[#555555] focus:outline-none focus:border-[#ff0000] focus:ring-2 focus:ring-[#ff0000]/20 rounded-lg resize-none"
              disabled={loading}
              style={{ fontFamily: "VCR-Mono" }}
            />
          </div>

          <button
            onClick={generateImage}
            disabled={loading || !prompt.trim()}
            className="w-full mt-4 py-4 bg-gradient-to-r from-[#ff0000] to-[#cc0000] text-white font-bold border-2 border-[#ff0000] hover:shadow-lg hover:shadow-[#ff0000]/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all rounded-lg active:scale-95"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                GENERATING...
              </span>
            ) : (
              "GENERATE IMAGE"
            )}
          </button>
        </div>

        {/* Output Section */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-8 border-2 border-[#222222] hover:border-[#333333] transition-all rounded-lg">
          <div className="flex items-center gap-2 mb-6">
            <ImageIcon className="w-5 h-5 text-[#ff0000]" />
            <h2 className="text-2xl font-bold text-white">PREVIEW</h2>
          </div>

          {/* Loading Skeleton */}
          {loading && (
            <div
              className="w-full border-2 border-[#333333] bg-gradient-to-r from-[#0a0a0a] via-[#111111] to-[#0a0a0a] bg-[length:200%_100%] animate-[shimmer_2s_infinite] rounded-lg"
              style={{
                aspectRatio: selectedRatio?.value,
                backgroundImage:
                  "linear-gradient(90deg, #0a0a0a 25%, #111111 50%, #0a0a0a 75%)",
              }}
            />
          )}

          {!loading && imageUrl && !error && (
            <div className="space-y-4">
              <div
                className="relative w-full bg-[#0a0a0a] border-2 border-[#333333] overflow-hidden rounded-lg"
                style={{ aspectRatio: selectedRatio?.value }}
              >
                <img
                  src={imageUrl}
                  alt="Generated image"
                  className="w-full h-full object-cover transition-opacity duration-500 opacity-100"
                  crossOrigin="anonymous"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={downloadImage}
                  className="flex-1 py-3 bg-[#1a1a1a] border-2 border-[#333333] text-[#cccccc] font-bold hover:border-[#ff0000] hover:text-[#ff0000] transition-all rounded-lg flex items-center justify-center gap-2 active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  DOWNLOAD
                </button>

                <button
                  onClick={() => fullImageUrl && window.open(fullImageUrl, "_blank")}
                  disabled={!fullImageUrl}
                  className="flex-1 py-3 bg-[#1a1a1a] border-2 border-[#333333] text-[#cccccc] font-bold hover:border-[#ff0000] hover:text-[#ff0000] transition-all rounded-lg flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  <ExternalLink className="w-4 h-4" />
                  VIEW FULL IMAGE
                </button>
              </div>
            </div>
          )}

          {!loading && !imageUrl && !error && (
            <div
              className="w-full bg-[#0a0a0a] border-2 border-dashed border-[#333333] flex flex-col items-center justify-center gap-3 rounded-lg text-[#888888]"
              style={{ aspectRatio: selectedRatio?.value }}
            >
              <ImageIcon className="w-8 h-8 opacity-50" />
              <p className="text-center text-sm">Generated images appear here</p>
            </div>
          )}

          {error && !loading && (
            <div className="p-4 border-2 border-[#ff4444] bg-[#1a0000]/50 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#ff4444]" />
              <p className="text-[#ff4444] text-sm">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
