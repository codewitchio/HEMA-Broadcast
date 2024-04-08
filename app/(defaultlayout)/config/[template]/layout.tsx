"use client"
import { FighterProvider } from "@/components/FighterProvider"
import React from 'react'

export default function ConfigLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <FighterProvider>{children}</FighterProvider>
}