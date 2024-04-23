"use client"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function FadeInTemplate({ children, }: { children: React.ReactNode }) {
    const pathname = usePathname()
    useEffect(() => {
        window.scroll(0, 0)
    }, [pathname])

    return (
        <main className="content animate-fade-in">
            {children}
        </main>
    )
}