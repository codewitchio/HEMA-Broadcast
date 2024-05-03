"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/shadcn-ui/card'
import { Button } from '@/components/shadcn-ui/button'
import { GraphicInfoList } from '@/components/graphics/Graphics'
import { RainbowBadge } from '@/components/RainbowBadge'

export default function Page() {
    return (
        <div className="page page-frontpage flex flex-col gap-8 [&>section]:flex [&>section]:flex-col [&>section]:gap-2">
            <section className='vertical-flex justify-center items-center h-80'>
                <h1 className='hero text-center text-6xl w-max'>
                    <RainbowBadge className='ms-auto bottom-8 right-6'>Beta</RainbowBadge>
                    HEMA Broadcast Tools
                </h1>
                <span className='text-center text-xl text-muted-foreground'>An easier way of creating overlays for HEMA events</span>
            </section>
            <section>
                <h2 className='text-center text-3xl'>Graphic templates</h2>
                <div className='horizontal-flex flex-wrap justify-center [&>*]:w-72'>
                    {GraphicInfoList.map((graphic) =>
                        <Card key={graphic.path}>
                            <CardHeader>
                                <CardTitle>{graphic.title}</CardTitle>
                                <CardDescription>{graphic.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>TODO: Add screenshot</p>
                            </CardContent>
                            <CardFooter>
                                <Button asChild className="w-full">
                                    <Link href={graphic.path}>Create</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    )}
                </div>
            </section>
            <section>
                <h2 className='text-center text-3xl'>Example usage</h2>
                <Image src='/example.png' width={1807} height={1016} alt="example of usage" className='rounded-lg' style={{ boxShadow: "0px 5px 80px 10px var(--card-blue-glow)" }} />
            </section>
        </div>
    )
}