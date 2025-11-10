"use client"

import { useEffect, useState, useRef } from "react"
import gsap from "gsap"
import { AlertCircle, RotateCw } from "lucide-react"

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
            const newItems = [data, ...prev].slice(0, 6)

            // Animate new item with stagger
            setTimeout(() => {
              const newElement = feedRef.current?.querySelector('[data-new="true"]')
              if (newElement) {
                gsap.from(newElement, {
                  opacity: 0,
                  x: -40,
                  duration: 0.6,
                  ease: "power2.out",
                })
                setTimeout(() => {
                  newElement.removeAttribute("data-new")
                }, 600)
              }
            }, 0)

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
      <div className="flex flex-col items-center justify-center min-h-96 gap-4 p-8 border-2 border-[#ff4444] bg-[#1a0000]/50 rounded-lg">
        <AlertCircle className="w-8 h-8 text-[#ff4444]" />
        <div className="text-center">
          <p className="text-[#ff4444] mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-[#ff0000] text-white font-bold rounded-lg hover:bg-[#cc0000] transition-all flex items-center gap-2 mx-auto"
          >
            <RotateCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div ref={feedRef} className="w-full space-y-4">
      {items.map((item, index) => (
        <div
          key={`${item.response}-${index}`}
          data-new="true"
          className="group p-6 rounded-lg border-2 border-[#222222] hover:border-[#ff0000]/50 transition-all bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] hover:shadow-lg hover:shadow-[#ff0000]/10 cursor-pointer"
        >
          <div className="flex items-start justify-between mb-3">
            <span className="text-xs font-bold text-[#ff0000] bg-[#ff0000]/10 px-2 py-1 rounded">
              {item.model?.toUpperCase() || "AI"}
            </span>
          </div>
          <p className="text-[#cccccc] leading-relaxed text-sm line-clamp-4">{item.response}</p>
        </div>
      ))}

      {loading && items.length === 0 && (
        <>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-24 bg-gradient-to-r from-[#1a1a1a] to-[#0a0a0a] rounded-lg border-2 border-[#222222] animate-pulse"
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
