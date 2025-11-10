"use client"

import { useEffect, useState, useRef } from "react"
import { AlertCircle, RotateCw, Sparkles } from "lucide-react"

interface TextFeedItem {
  model: string
  response: string
  timestamp?: number
}

export function LiveTextFeed() {
  const [items, setItems] = useState<TextFeedItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const feedRef = useRef<HTMLDivElement>(null)
  const eventSourceRef = useRef<EventSource | null>(null)
  const lastUpdateRef = useRef<number>(0)

  const connectToFeed = () => {
    setError("")
    setLoading(true)

    try {
      eventSourceRef.current = new EventSource("https://text.pollinations.ai/feed")

      const handleMessage = (event: MessageEvent) => {
        try {
          const now = Date.now()
          if (now - lastUpdateRef.current < 3500) {
            return
          }
          lastUpdateRef.current = now

          const data = JSON.parse(event.data)
          setItems((prev) => {
            const newItems = [data, ...prev].slice(0, 8)
            return newItems
          })
          setLoading(false)
          setError("")
        } catch (err) {
          console.error("Error parsing feed data:", err)
        }
      }

      eventSourceRef.current.addEventListener("message", handleMessage)

      const timeout = setTimeout(() => {
        if (items.length === 0) {
          setError("Unable to connect to feed. Please try again.")
          setLoading(false)
        }
      }, 8000)

      return () => clearTimeout(timeout)
    } catch (err) {
      setError("Failed to connect to feed service")
      setLoading(false)
    }
  }

  useEffect(() => {
    connectToFeed()

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close()
      }
    }
  }, [])

  const handleRetry = () => {
    setItems([])
    lastUpdateRef.current = 0
    if (eventSourceRef.current) {
      eventSourceRef.current.close()
    }
    connectToFeed()
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 gap-4 p-8 border-2 border-red-500 bg-red-950/30 rounded-lg">
        <AlertCircle className="w-8 h-8 text-red-400" />
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all flex items-center gap-2 mx-auto"
          >
            <RotateCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div ref={feedRef} className="w-full space-y-4 max-h-[600px] overflow-y-auto pr-2">
      {items.map((item, index) => (
        <div
          key={`${item.response}-${index}`}
          className="group p-6 rounded-xl border-2 border-gray-600 hover:border-red-500 transition-all bg-gradient-to-br from-gray-800 to-gray-900 hover:shadow-lg hover:shadow-red-500/20 cursor-pointer"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-500" />
              <span className="text-xs font-bold text-white bg-red-600 px-3 py-1 rounded-full">
                {item.model?.toUpperCase() || "AI"}
              </span>
            </div>
            <span className="text-xs text-gray-500">Just now</span>
          </div>
          <p className="text-gray-200 leading-relaxed text-base line-clamp-4 group-hover:text-white transition-colors">
            {item.response}
          </p>
        </div>
      ))}

      {loading && items.length === 0 && (
        <>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl border-2 border-gray-600 animate-pulse"
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </>
      )}
      
      {!loading && items.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-600" />
          <p>Waiting for new text generations...</p>
        </div>
      )}
    </div>
  )
}