"use client"

import { useEffect, useState, useRef } from "react"
import { AlertCircle, RotateCw } from "lucide-react"

interface FeedItem {
  prompt: string
  imageURL: string
  model?: string
  timestamp?: number
}

export function LiveImageFeed() {
  const [items, setItems] = useState<FeedItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const feedRef = useRef<HTMLDivElement>(null)
  const eventSourceRef = useRef<EventSource | null>(null)
  const lastUpdateRef = useRef<number>(0)

  const connectToFeed = () => {
    setError("")
    setLoading(true)

    try {
      eventSourceRef.current = new EventSource("https://image.pollinations.ai/feed")

      const handleMessage = (event: MessageEvent) => {
        try {
          const now = Date.now()
          if (now - lastUpdateRef.current < 3500) {
            return
          }
          lastUpdateRef.current = now

          const data = JSON.parse(event.data)
          setItems((prev) => {
            const newItems = [data, ...prev].slice(0, 12)
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
    <div ref={feedRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item, index) => (
        <div
          key={`${item.imageURL}-${index}`}
          className="group rounded-xl overflow-hidden border-2 border-gray-600 hover:border-red-500 transition-all bg-gray-800 cursor-pointer hover:scale-105 duration-300"
        >
          <div className="relative aspect-square bg-gray-900 overflow-hidden">
            <img
              src={item.imageURL || "/placeholder.svg"}
              alt={item.prompt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.currentTarget.src = "/abstract-ai-generated-image.jpg"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <p className="text-white text-sm line-clamp-3 font-medium">{item.prompt}</p>
            </div>
            {item.model && (
              <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                {item.model}
              </div>
            )}
          </div>
        </div>
      ))}

      {loading && items.length === 0 && (
        <>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl border-2 border-gray-600 animate-pulse"
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </>
      )}
    </div>
  )
}