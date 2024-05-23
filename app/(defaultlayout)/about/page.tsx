"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn-ui/avatar'
import { Card, CardContent } from '@/components/shadcn-ui/card'
import { GetFlagEmoji } from '@/lib/GetFlagEmoji'
import GitHubSponsorButton from '@/components/GitHubSponsorButton'

export default function Page() {
    return (
        <div className="page page-about flex flex-col gap-6">
            <section className='flex flex-row gap-6 [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&_h1]:text-2xl [&_h1]:text-center'>
                <div>
                    <h1>Author</h1>
                    <Link href="https://github.com/Aryuko" className='inline-block'>
                        <Card className='w-[400px] h-30'>
                            <CardContent className='p-5 pt-5 flex flex-col'>
                                <div className='flex flex-row gap-2  items-center'>
                                    <Avatar className='h-12 w-12'>
                                        <AvatarImage src="https://github.com/aryuko.png?size=48" />
                                        <AvatarFallback>github.com/Aryuko</AvatarFallback>
                                    </Avatar>
                                    <div className='flex flex-col gap-1'>
                                        <p><span className='font-bold'>Hanna</span> <span className='text-muted-foreground text-sm'>(she/they)</span></p>
                                        <p className='text-muted-foreground text-sm'>github.com/Aryuko</p>
                                    </div>
                                </div>
                                <span className='pt-3 text-muted-foreground text-sm'>{GetFlagEmoji('SE')} Stockholm, Sweden</span>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
                <div>
                    <h1>Repository</h1>
                    <Link href="https://github.com/Aryuko/HEMA-Broadcast" className='inline-block'>
                        <Image unoptimized alt='Github Repository preview' width={400} height={120} src={"https://github-readme-stats.vercel.app/api/pin/?username=Aryuko&repo=HEMA-Broadcast&theme=dark&border_color=6a77a4&bg_color=020817&text_color=94a3b8&icon_color=94a3b8&border_radius=10"} />
                    </Link>
                </div>
            </section>
            <div className='flex justify-center'>
                <GitHubSponsorButton />
            </div>
            <div className='w-[824px] flex flex-col gap-4'>
                <p>
                    This application was made possible by <Link href="https://hemaratings.com/">HEMA Ratings</Link>.
                </p>
                <p>
                    If you are an organizer of HEMA events or are interested in helping create tools for organizers (or just have some feedback about this tool), feel free to join <Link target='_blank' href='https://discord.com/invite/3JkPwCpSmg'>our Discord</Link>.
                </p>
            </div>
        </div>
    )
}