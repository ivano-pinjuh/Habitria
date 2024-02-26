import Link from "next/link"

export default function ConfirmSignup() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-6 pattern-hive-purple-500/5">
      <h3 className="text-3xl font-semibold">
        Check Your Email For Cofirmation Mail
      </h3>
      <Link href={"/"}>Back to home</Link>
    </div>
  )
}