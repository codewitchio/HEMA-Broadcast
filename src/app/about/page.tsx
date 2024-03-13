"use client"
import Link from 'next/link'
import '../../client/index.css'

export default function Page() {
    return (
        <div className="page page-about">
            <p>
                Project developed by <Link href="https://github.com/Aryuko/">Hanna Kjellén</Link> of <Link href="http://spiffaktning.se/">SPIFF Sweden</Link>.
                <br />
                This application is made possible by <Link href="https://hemaratings.com/">HEMA Ratings</Link>.
                <br />
                The code for this project is open source and available on <Link href="https://github.com/Aryuko/HEMA-Broadcast">GitHub</Link>.
            </p>
        </div>
    )
}