'use client'

import { createBrowserClient } from "@supabase/ssr";
import { login, signup } from "./actions";

export default function LoginForm() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const signInGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `{location.origin}/auth/callback`,
      }
    })
  }
  

  return (
    <div className="flex flex-grow flex-col items-center py-4 dark:bg-bg-d-300 bg-bg-l-200">
      <h2 className="font-semibold text-3xl mb-8">
        Sign Up For Free
      </h2>

      <form className="flex flex-col w-full gap-3 px-4">
        <input className="dark:bg-bg-d-200 px-3 h-8 bg-bg-l-200 outline-none transition-all"
          type="text"
          autoComplete="off"
          name="username" 
          id="username" 
          placeholder="Username" />

        <input className="dark:bg-bg-d-200 px-3 h-8 bg-bg-l-200 outline-none transition-all"
          type="email" 
          name="email" 
          id="email" 
          placeholder="Email" />

        <input className="dark:bg-bg-d-200 px-3 h-8 bg-bg-l-200 outline-none transition-all"
          type="password" 
          name="password" 
          autoComplete="new-password"
          id="password" 
          placeholder="Password" />

        <input className="dark:bg-bg-d-200 px-3 h-8 bg-bg-l-200 outline-none transition-all"
          type="password" 
          name="password2" 
          id="password2" 
          placeholder="Confirm Password" />

          <button className="h-8 mt-6 bg-prim-100" formAction={signup}>
            Sign Up
          </button>

          <button className="h-8 mt-1 bg-prim-100" formAction={login}>
            Log In
          </button>

          <hr />

          <button onClick={signInGoogle} className="h-8 bg-prim-200">
            Sign Up with Google
          </button>
      </form>

    </div>
  )
}