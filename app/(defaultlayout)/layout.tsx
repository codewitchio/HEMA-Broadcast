import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

import "@/styles/global.css"
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
    title: 'HEMA Broadcast',
    description: 'Broadcast tools for HEMA tournaments',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <Script src="https://kit.fontawesome.com/264ffc9fb7.js" crossOrigin="anonymous" />
            <body>
                <div className="flex flex-row gap-3 text-xl border-b border-border [&>*]:p-4 mb-12">
                    <Link className="nav-primary" href="/">HEMA Broadcast</Link>
                    {/* TODO: Graphics dropdown */}
                    <span className='link text-muted-foreground'>Graphics</span>
                    <Link className="text-muted-foreground" href="/about">About</Link>
                </div>
                <div className="default-layout-root">
                    <div className="content">
                        {children}
                    </div>
                    <div className="pt-12 pb-4">
                        <div className="frontpage-credits">
                            Author: <a href="https://github.com/Aryuko/">Aryuko</a>, Code: <a href="https://github.com/Aryuko/HEMA-Broadcast">GitHub</a>
                        </div>
                    </div>
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
            </body>
        </html >
    )
}