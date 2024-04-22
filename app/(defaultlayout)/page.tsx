"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Page() {
    return (
        <div className="page page-frontpage flex flex-col gap-8 [&>section]:flex [&>section]:flex-col [&>section]:gap-2">
            <section className='vertical-flex justify-center' style={{ height: "480px" }}>
                <div className='hero text-center text-6xl'>HEMA-Broadcast</div>
                <div className='text-center text-xl text-muted-foreground'>An easier way of creating overlays for HEMA events</div>
            </section>
            <section>
                <div className='text-center text-3xl'>Graphic templates</div>
                <div className='horizontal-flex flex-wrap justify-center graphics-list'>
                    <Link href="/config/fightercard">Fighter Card</Link>
                    <Link href="/config/lowerthird">Lower Third</Link>
                </div>
            </section>
            <section>
                <div className='text-center text-3xl'>Example usage</div>
                <Image src='/example.png' width={1807} height={1016} alt="example of usage" className='rounded-lg' style={{ boxShadow: "0px 5px 80px 10px var(--card-blue-glow)" }} />
            </section>
        </div>
    )
}