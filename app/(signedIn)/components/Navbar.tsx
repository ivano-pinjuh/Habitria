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
    <nav className="flex items-center w-full justify-between h-16 dark:text-text-d-100 text-text-l-100 px-10 shadow-xl dark:bg-bg-d-100 bg-bg-l-100 z-50 relative">
      <div className="flex h-full items-center">
        <h2 className="text-2xl font-bold mr-8">
          <Link href="/tasks">Habitria</Link>
        </h2>
    
        <Link className={`${pathname == "/tasks" && "border-b-4"} hidden md:inline-block border-bg-d-100 dark:border-bg-l-100 hover:bg-bg-l-200 dark:hover:bg-bg-d-200 h-16 pt-6 px-4`} href="/tasks">Tasks</Link>
        <Link className={`${pathname == "/notes" && "border-b-4"} hidden md:inline-block border-bg-d-100 dark:border-bg-l-100 hover:bg-bg-l-200 dark:hover:bg-bg-d-200 h-16 pt-6 px-4`} href="/notes">Notes</Link>
        <Link className={`${pathname == "/challenges" && "border-b-4"} hidden md:inline-block border-bg-d-100 dark:border-bg-l-100 hover:bg-bg-l-200 dark:hover:bg-bg-d-200 h-16 pt-6 px-4`} href="/challenges">Challenges</Link>
        <Link className={`${pathname == "/history" && "border-b-4"} hidden md:inline-block border-bg-d-100 dark:border-bg-l-100 hover:bg-bg-l-200 dark:hover:bg-bg-d-200 h-16 pt-6 px-4`} href="/history">History</Link>
        <Link className={`${pathname == "/help" && "border-b-4"} hidden md:inline-block border-bg-d-100 dark:border-bg-l-100 hover:bg-bg-l-200 dark:hover:bg-bg-d-200 h-16 pt-6 px-4`} href="/help">Help</Link>

      </div>
      

      <div className="hidden md:flex items-center gap-20">
        {(resolvedTheme === "dark" && mounted) && <p className="cursor-pointer" onClick={() => {setTheme("light")}}>toggle light</p>}
        {(resolvedTheme === "light" && mounted) && <p className="cursor-pointer" onClick={() => {setTheme("dark")}}>toggle dark</p>}
      </div>

      <div className="hidden md:block">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <button className="outline-none">
              <FiUser className="text-3xl mt-1" />
            </button>
          </DropdownTrigger>
          <DropdownMenu className="bg-bg-l-200 dark:bg-bg-d-200 rounded-xl w-64 px-3 pt-2" aria-label="User dropdown">
            <DropdownSection className="pb-2 border-b border-bg-d-100 dark:border-bg-l-100"> 
              <DropdownItem className="hover:bg-bg-l-200 dark:hover:bg-bg-d-300 py-2 px-2 rounded hover:underline" key="edit profile">
                Edit Profile
              </DropdownItem>
              <DropdownItem className="hover:bg-bg-l-200 dark:hover:bg-bg-d-300 py-2 px-2 rounded hover:underline mt-1" key="changebg">
                Change Background
              </DropdownItem>
            </DropdownSection>

            <DropdownSection className="pb-2 border-b border-bg-d-100 dark:border-bg-l-100"> 
              <DropdownItem className="hover:bg-bg-l-200 dark:hover:bg-bg-d-300 py-2 px-2 rounded hover:underline" key="stats">
                Stats
              </DropdownItem>
              <DropdownItem className="hover:bg-bg-l-200 dark:hover:bg-bg-d-300 py-2 px-2 rounded hover:underline mt-1" key="settings">
                Settings
              </DropdownItem>
            </DropdownSection>

            <DropdownSection className=""> 
              <DropdownItem className="hover:bg-bg-l-200 dark:hover:bg-bg-d-300 py-2 px-2 rounded hover:underline" key="logout">
                Log Out
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>
    </nav>
  )
}