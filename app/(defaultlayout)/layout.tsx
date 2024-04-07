import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

import 'overlayscrollbars/overlayscrollbars.css'
import "../global.css"

export const metadata: Metadata = {
    title: 'HEMA Broadcast',
    description: 'Broadcast tools for HEMA tournaments',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <Script src="https://kit.fontawesome.com/264ffc9fb7.js" crossOrigin="anonymous" />
            <body>
                <div className="default-layout-root">
                    <div className="header">
                        <Link className="nav-primary" href="/">HEMA Broadcast</Link>
                        <Link className="nav-secondary" href="/about">About</Link>
                    </div>
                    <div className="content">
                        {children}
                    </div>
                    <div className="footer">
                        {/* TODO: Move to about page? */}
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
            </body>
        </html>
    )
}