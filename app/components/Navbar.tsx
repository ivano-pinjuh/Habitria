import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="flex items-center w-full justify-between h-20 px-28 border-b border-white sticky bg-black top-0 z-50">
        <h2 className="text-2xl font-bold">
            <Link href="/">Habitria</Link>
        </h2>

        <Link href="/login">Get Started</Link>

        <Link href="/login" className="bg-white text-black px-8 py-1 rounded-md">
            Login
        </Link>
    </nav>
  )
}
