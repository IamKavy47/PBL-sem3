"use client"

import { useState } from "react"
import { Loader2, Download, AlertCircle, ImageIcon, Settings2 } from "lucide-react"

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
  const [customWidth, setCustomWidth] = useState(1024)
  const [customHeight, setCustomHeight] = useState(576)

  const API_KEY = process.env.NEXT_PUBLIC_POLLINATIONS_API_KEY  // ✅ from .env

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError("Please enter an image description")
      return
    }

    setLoading(true)
    setError("")
    setImageUrl("")

    try {
      const selectedRatio = ASPECT_RATIOS.find((r) => r.value === aspectRatio)
      const width = customWidth || selectedRatio?.width || 1024
      const height = customHeight || selectedRatio?.height || 768
      const encodedPrompt = encodeURIComponent(prompt)

      const url = `https://enter.pollinations.ai/api/generate/image/${encodedPrompt}?model=${model}&width=${width}&height=${height}&seed=42&enhance=false&negative_prompt=worst+quality%2C+blurry&private=false&nologo=true&nofeed=false&safe=false&quality=medium&transparent=false&guidance_scale=1`

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      })

      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const blob = await res.blob()
      const objectUrl = URL.createObjectURL(blob)
      setImageUrl(objectUrl)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      setError(`Error generating image: ${errorMessage}`)
      console.error("Image generation error:", err)
    } finally {
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

  const handleImageError = () => setError("Failed to load image. Please try again.")

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault()
      generateImage()
    }
  }

  const selectedRatio = ASPECT_RATIOS.find((r) => r.value === aspectRatio)

  return (
    <div className="space-y-6">
      {/* Model and Settings Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[#cccccc] font-bold mb-2 text-xs">MODEL</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            disabled={loading}
            className="w-full p-3 bg-[#1a1a1a] border-2 border-[#333333] text-white hover:border-[#ff0000] focus:outline-none focus:border-[#ff0000] focus:ring-2 focus:ring-[#ff0000]/20 transition-all rounded-lg cursor-pointer"
          >
            <option value="flux">FLUX</option>
            <option value="turbo">TURBO</option>
            <option value="gptimage">GPTIMAGE</option>
          </select>
        </div>

        <div>
          <label className="block text-[#cccccc] font-bold mb-2 text-xs">ASPECT RATIO</label>
          <select
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value)}
            disabled={loading}
            className="w-full p-3 bg-[#1a1a1a] border-2 border-[#333333] text-white hover:border-[#ff0000] focus:outline-none focus:border-[#ff0000] focus:ring-2 focus:ring-[#ff0000]/20 transition-all rounded-lg cursor-pointer"
          >
            {ASPECT_RATIOS.map((ratio) => (
              <option key={ratio.value} value={ratio.value}>
                {ratio.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Custom Resolution Inputs */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[#cccccc] font-bold mb-2 text-xs">CUSTOM WIDTH (px)</label>
          <input
            type="number"
            value={customWidth}
            onChange={(e) => setCustomWidth(Number(e.target.value))}
            disabled={loading}
            className="w-full p-3 bg-[#1a1a1a] border-2 border-[#333333] text-white rounded-lg focus:border-[#ff0000] focus:ring-2 focus:ring-[#ff0000]/20"
          />
        </div>
        <div>
          <label className="block text-[#cccccc] font-bold mb-2 text-xs">CUSTOM HEIGHT (px)</label>
          <input
            type="number"
            value={customHeight}
            onChange={(e) => setCustomHeight(Number(e.target.value))}
            disabled={loading}
            className="w-full p-3 bg-[#1a1a1a] border-2 border-[#333333] text-white rounded-lg focus:border-[#ff0000] focus:ring-2 focus:ring-[#ff0000]/20"
          />
        </div>
      </div>

      {/* Prompt + Generate Button */}
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-8 border-2 border-[#222222] hover:border-[#333333] transition-all rounded-lg">
        <div className="flex items-center gap-2 mb-6">
          <Settings2 className="w-5 h-5 text-[#ff0000]" />
          <h2 className="text-2xl font-bold text-white">SETTINGS</h2>
        </div>

        <div className="space-y-4">
          {error && (
            <div className="p-3 border-2 border-[#ff4444] bg-[#1a0000]/50 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#ff4444]" />
              <p className="text-[#ff4444] text-sm">{error}</p>
            </div>
          )}

          <label className="block text-[#cccccc] font-bold mb-3 text-xs">IMAGE PROMPT</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Describe your vision..."
            className="w-full min-h-40 p-4 bg-[#0a0a0a] border-2 border-[#333333] text-white placeholder-[#555555] focus:outline-none focus:border-[#ff0000] focus:ring-2 focus:ring-[#ff0000]/20 rounded-lg resize-none"
            disabled={loading}
          />

          <button
            onClick={generateImage}
            disabled={loading || !prompt.trim()}
            className="w-full py-4 bg-gradient-to-r from-[#ff0000] to-[#cc0000] text-white font-bold border-2 border-[#ff0000] hover:shadow-lg hover:shadow-[#ff0000]/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all rounded-lg active:scale-95"
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
      </div>

      {/* Output Section */}
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-8 border-2 border-[#222222] hover:border-[#333333] transition-all rounded-lg">
        <div className="flex items-center gap-2 mb-6">
          <ImageIcon className="w-5 h-5 text-[#ff0000]" />
          <h2 className="text-2xl font-bold text-white">PREVIEW</h2>
        </div>

        {loading && (
          <div className="w-full bg-[#0a0a0a] border-2 border-dashed border-[#333333] flex flex-col items-center justify-center gap-3 rounded-lg" style={{ aspectRatio: selectedRatio?.value }}>
            <Loader2 className="w-8 h-8 animate-spin text-[#ff0000]" />
            <p className="text-[#888888] text-sm">Generating image...</p>
          </div>
        )}

        {imageUrl && !loading && (
          <div className="space-y-4">
            <div className="relative w-full bg-[#0a0a0a] border-2 border-[#333333] overflow-hidden rounded-lg" style={{ aspectRatio: selectedRatio?.value }}>
              <img
                src={imageUrl}
                alt="Generated image"
                className="w-full h-full object-cover"
                onError={handleImageError}
                crossOrigin="anonymous"
              />
            </div>
            <button
              onClick={downloadImage}
              className="w-full py-3 bg-[#1a1a1a] border-2 border-[#333333] text-[#cccccc] font-bold hover:border-[#ff0000] hover:text-[#ff0000] transition-all rounded-lg flex items-center justify-center gap-2 active:scale-95"
            >
              <Download className="w-4 h-4" />
              DOWNLOAD
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
