"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export default function Navbar() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => {setMounted(true)}, [])

  return (
    <nav className="flex items-center w-full justify-between h-20 dark:text-text-d-100 text-text-l-100 px-28 shadow-lg sticky dark:bg-bg-d-100 bg-bg-l-100 top-0 z-50">
      <h2 className="text-2xl font-bold">
        <Link href="/">Habitria</Link>
      </h2>

      <div className="flex items-center gap-20">
        <Link href="/login">Get Started</Link>
        <Link href="/login">Learn More</Link>
        {(resolvedTheme === "dark" && mounted) && <p className="cursor-pointer" onClick={() => {setTheme("light")}}>toggle light</p>}
        {(resolvedTheme === "light" && mounted) && <p className="cursor-pointer" onClick={() => {setTheme("dark")}}>toggle dark</p>}
      </div>
      
      <Link href="/login" className="dark:bg-bg-l-100 bg-bg-d-100 text-text-d-100 dark:text-text-l-100 px-8 py-1 rounded-md">
        Login
      </Link>
    </nav>
  )
}
