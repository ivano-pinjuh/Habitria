"use client"

import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="flex items-center w-full justify-between h-20 dark:text-text-d-100 text-text-l-100 px-10 lg:px-28 shadow-lg sticky dark:bg-bg-d-100 bg-bg-l-100 top-0 z-50">
      <h2 className="text-2xl font-bold">
        <Link href="/">Habitria</Link>
      </h2>

      <div className="hidden md:flex items-center gap-20">
        <Link href="/register">Get Started</Link>
        <Link href="/login">Learn More</Link>
      </div>
      
      <Link href="/login" className="hover:opacity-85 dark:bg-bg-l-100 bg-bg-d-100 text-text-d-100 dark:text-text-l-100 px-8 py-1 rounded-md">
        Login
      </Link>
    </nav>
  )
}
