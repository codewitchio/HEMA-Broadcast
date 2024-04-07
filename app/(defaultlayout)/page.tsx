"use client"
import React from 'react'
import Link from 'next/link'

export default function Page() {
    return (
        <div className="page page-frontpage vertical-flex">
            Frontpage :D
            <Link href="/config/fightercard">Config - Fighter Card</Link>
            <Link href="/config/lowerthird">Config - Lower Third</Link>
            {/* Todo: Add list/grid of templates */}
        </div>
    )
}