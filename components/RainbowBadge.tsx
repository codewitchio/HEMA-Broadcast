"use client"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

export function RainbowBadge({ children, className }: React.HTMLProps<HTMLElement>) {
    const ref = useRef<HTMLDivElement>(null)
    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)
    const [size, setSize] = useState<number>(0)
    useEffect(() => {
        if (ref.current) {
            setSize(Math.min(ref.current.offsetWidth, ref.current.offsetHeight) * 1.1)
            setWidth(ref.current.offsetWidth)
            setHeight(ref.current.offsetHeight)
        }
    }, [ref.current])
    return (
        <div className={cn('h-0 w-0 relative', className)}>
            <div className='rainbow-border'>
                <div ref={ref} className='text-lg py-1 px-2 bg-background'>
                    {children}
                </div>
            </div>
            <div className='rainbow-border-glow' style={{ width: `${size}px`, height: `${size}px`, bottom: (size - height) / 2, right: (size - width) / 2 }} />
        </div>
    )
}