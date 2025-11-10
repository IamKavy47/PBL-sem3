import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "ImaGenz - Multi-Modal AI Generator",
  description: "Generate text, audio, and images using AI APIs",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" />
      </head>
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  )
}
