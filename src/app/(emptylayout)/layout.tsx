import type { Metadata } from 'next'
import "../global.css"
import Script from 'next/script'

export const metadata: Metadata = {
    title: 'HEMA Broadcast',
    description: 'Broadcast tools for HEMA tournaments',
}

export default function GraphicLayout({ children, }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <Script src="https://kit.fontawesome.com/264ffc9fb7.js" crossOrigin="anonymous" />
            <body>
                <div className="graphic-layout-root">
                    {children}
                </div>
            </body>
        </html>
    )
}
