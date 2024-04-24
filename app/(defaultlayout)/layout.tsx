import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { Analytics } from "@vercel/analytics/react"
import "@/styles/global.css"
import { Toaster } from '@/components/ui/sonner'

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
                    <nav className="flex flex-row gap-3 text-xl border-b border-border [&>*]:p-4 mb-12 sticky top-0 left-0 w-full backdrop-blur z-10">
                        <Link className="nav-primary" href="/">HEMA Broadcast</Link>
                        {/* TODO: Graphics dropdown */}
                        <span className='link text-muted-foreground'>Graphics</span>
                        <Link className="text-muted-foreground" href="/about">About</Link>
                    </nav>
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
            </body>
        </html >
    )
}