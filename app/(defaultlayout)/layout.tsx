import React from 'react'
import type { Metadata } from 'next'
import Script from 'next/script'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "@/styles/global.css"
import { Toaster } from '@/components/shadcn-ui/sonner'
import NavBar from '@/components/NavBar'

export const metadata: Metadata = {
    title: 'HEMA Broadcast Tools',
    description: 'Broadcast tools for HEMA tournaments',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <Script src="https://kit.fontawesome.com/264ffc9fb7.js" crossOrigin="anonymous" />
            <body>
                <div className="default-layout-root">
                    <NavBar />
                    {children}
                </div>
                <svg style={{ height: 0, width: 0, position: "absolute" }}>
                    <filter id='noise'>
                        <feTurbulence
                            type='fractalNoise'
                            baseFrequency='0.65'
                            stitchTiles='stitch' />
                    </filter>
                </svg>
                <Toaster />
                <Analytics />
                <SpeedInsights />
            </body>
        </html >
    )
}