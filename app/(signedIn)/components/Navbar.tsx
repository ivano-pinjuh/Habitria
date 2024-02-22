"use client"

import { FiUser } from "react-icons/fi"

import {Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/dropdown"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export default function Navbar() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => {setMounted(true)}, [])

  const pathname = usePathname()

  return (
    <nav className="flex items-center w-full justify-between h-16 dark:text-text-d-100 text-text-l-100 px-10 shadow-lg dark:bg-bg-d-100 bg-bg-l-100 z-50">
      <div className="flex h-full items-center">
        <h2 className="text-2xl font-bold mr-8">
          <Link href="/">Habitria</Link>
        </h2>

        <Link className={`${pathname == "/tasks" && "border-b-4"} border-bg-d-100 dark:border-bg-l-100 hover:bg-bg-l-200 dark:hover:bg-bg-d-200 h-16 pt-6 px-4`} href="/tasks">Tasks</Link>
        <Link className={`${pathname == "/notes" && "border-b-4"} border-bg-d-100 dark:border-bg-l-100 hover:bg-bg-l-200 dark:hover:bg-bg-d-200 h-16 pt-6 px-4`} href="/notes">Notes</Link>
        <Link className={`${pathname == "/challenges" && "border-b-4"} border-bg-d-100 dark:border-bg-l-100 hover:bg-bg-l-200 dark:hover:bg-bg-d-200 h-16 pt-6 px-4`} href="/challenges">Challenges</Link>
        <Link className={`${pathname == "/history" && "border-b-4"} border-bg-d-100 dark:border-bg-l-100 hover:bg-bg-l-200 dark:hover:bg-bg-d-200 h-16 pt-6 px-4`} href="/history">History</Link>
        <Link className={`${pathname == "/help" && "border-b-4"} border-bg-d-100 dark:border-bg-l-100 hover:bg-bg-l-200 dark:hover:bg-bg-d-200 h-16 pt-6 px-4`} href="/help">Help</Link>

      </div>
      

      <div className="hidden md:flex items-center gap-20">
        {(resolvedTheme === "dark" && mounted) && <p className="cursor-pointer" onClick={() => {setTheme("light")}}>toggle light</p>}
        {(resolvedTheme === "light" && mounted) && <p className="cursor-pointer" onClick={() => {setTheme("dark")}}>toggle dark</p>}
      </div>

      <div>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <button>
              <FiUser className="text-3xl" />
            </button>
          </DropdownTrigger>
          <DropdownMenu className="bg-pink-400 w-40 mt-2" aria-label="User dropdown">
            <DropdownItem className="bg-bg-l-300" key="new">
              New file
            </DropdownItem>
            <DropdownItem key="copy">
              Copy link
            </DropdownItem>
            <DropdownItem key="edit">
              Edit file
            </DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger">
              Delete file
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </nav>
  )
}