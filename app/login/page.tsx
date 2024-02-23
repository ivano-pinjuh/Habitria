'use client'

import { createBrowserClient } from "@supabase/ssr";
import { login } from "@/lib/supabase/supabase-actions"
import Image from "next/image"
import Link from "next/link"

export default function Login() {

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  
  const signInGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin.replace("/login", "")}/auth/callback`,
      }
    })
  }
  

  return (
    <div className="w-full min-h-screen pt-16 items-center flex flex-col px-[15vw] pattern-hive-purple-500/5">

      <div className="lg:w-[55%] flex flex-grow flex-col items-center py-4">
        <Link href={"/"} className="flex items-center mb-6">
          <Image className="filter"
            src={"logo.svg"}
            width={75}
            height={80}
            alt="Habitria logo."
            priority/>
            
          <h2 className="font-semibold text-4xl">
            Habitria
          </h2>
        </Link>
        
        <div className="w-full px-4 mb-4">
          <button onClick={signInGoogle} className="w-full h-10 dark:border-bg-l-100 border-bg-d-100 border hover:opacity-90 bg-bg-l-200 dark:bg-bg-d-300 rounded transition-all">
            Log in with Google
          </button>
        </div>

        <form className="flex flex-col w-full gap-4 px-4">
          <div className="w-full h-[1px] dark:bg-bg-l-100 bg-bg-d-100"></div>

          <div className="w-full flex flex-col gap-2">
            <label htmlFor="email">
              Email
            </label>
            <input className={`dark:bg-bg-d-300 px-3 h-12 bg-bg-l-200 outline-none transition-all text-sm`}
              type="email" 
              name="email" 
              id="email" 
              placeholder="Email" 
              required/>
          </div>

          <div className="w-full flex flex-col gap-2">
            <div className="w-full flex justify-between items-center">
              <label htmlFor="password">
                Password
              </label>
              <p className="text-xs cursor-pointer opacity-60 hover:underline">
                Forgot Password?
              </p>
            </div>
            
            <input className={`dark:bg-bg-d-300 px-3 h-12 bg-bg-l-200 outline-none transition-all text-sm`}
              type="password" 
              name="password" 
              autoComplete="new-password"
              id="password" 
              placeholder="Password" 
              required/>
          </div>

          
          <button className={`h-12 rounded-md mt-6 bg-prim-100 transition-all`} formAction={login}>
            Login
          </button>
          <Link href={"/register"} className="text-sm mt-2 w-fit m-auto text-center hover:underline">
            Don't have a Habitria account? <span className="font-semibold">Sign up</span>
          </Link>
        </form>
      </div>
    </div>
  )
}