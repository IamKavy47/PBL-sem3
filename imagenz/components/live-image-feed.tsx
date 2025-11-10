"use client"

import { useEffect, useState, useRef } from "react"
import gsap from "gsap"
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

            // Animate new item with stagger
            setTimeout(() => {
              const newElement = feedRef.current?.querySelector('[data-new="true"]')
              if (newElement) {
                gsap.from(newElement, {
                  opacity: 0,
                  scale: 0.8,
                  rotationY: 90,
                  y: 20,
                  duration: 0.8,
                  ease: "back.out",
                })
                // Remove the data-new attribute after animation
                setTimeout(() => {
                  newElement.removeAttribute("data-new")
                }, 800)
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
    <div ref={feedRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item, index) => (
        <div
          key={`${item.imageURL}-${index}`}
          data-new="true"
          className="group rounded-lg overflow-hidden border-2 border-[#222222] hover:border-[#ff0000]/50 transition-all bg-[#0a0a0a] cursor-pointer"
          style={{ perspective: "1000px" }}
        >
          <div className="relative aspect-square bg-[#111111] overflow-hidden">
            <img
              src={item.imageURL || "/placeholder.svg"}
              alt={item.prompt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.currentTarget.src = "/abstract-ai-generated-image.jpg"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <p className="text-white text-sm line-clamp-3">{item.prompt}</p>
            </div>
          </div>
        </div>
      ))}

      {loading && items.length === 0 && (
        <>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-lg border-2 border-[#222222] animate-pulse"
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
