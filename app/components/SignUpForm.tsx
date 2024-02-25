'use client'

import { createBrowserClient } from "@supabase/ssr";
import { signup } from "@/lib/supabase/supabase-actions";
import { useState, useEffect } from "react";

export default function SignUpForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  const [isValid, setIsValid] = useState({form: false,
                                          email: false,
                                          password: false,
                                          password2: true})

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )


  const signInGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      }
    })
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      validateForm();
    }, 300);

    return () => clearInterval(intervalId);
  }, [email, password, password2]);


  const handleEmail = (e: any) => {
    setEmail(e.target.value)
  }
  const handlePassword = (e: any) => {
    setPassword(e.target.value)
  }
  const handlePassword2 = (e: any) => {
    setPassword2(e.target.value)
  }

  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    let emailValid = false
    let passValid = false
    let pass2Valid = false
    let formValid = false

    if (password.length > 7) {
      passValid = true
    }

    if (password === password2){
      pass2Valid = true
    }

    if (email.match(emailRegex)) {
      emailValid = true
    }

    if (emailValid && passValid && pass2Valid){
      formValid = true
    }

    setIsValid({form: formValid,
      email: emailValid,
      password: passValid,
      password2: pass2Valid})
  }
  

  return (
    <div className="flex flex-grow flex-col items-center py-4">
      <h2 className="font-semibold text-3xl mb-8">
        Sign Up For Free
      </h2>

      <form className="flex flex-col w-full gap-4 px-4">
        <input className="border border-bg-d-100 dark:border-none dark:bg-bg-d-300 px-3 h-8 bg-bg-l-200 outline-none transition-all text-sm"
          type="text"
          autoComplete="off"
          name="username" 
          id="username" 
          placeholder="Display Name" />


        <input className={`${(!isValid.email && email.length > 0) && "border border-red-500"} border border-bg-d-100 dark:border-none dark:bg-bg-d-300 px-3 h-8 bg-bg-l-200 outline-none transition-all text-sm`}
          onChange={handleEmail}
          type="email" 
          name="email" 
          autoComplete="email"
          id="email" 
          placeholder="Email" 
          required/>


        <input className={`${!(isValid.password || password.length < 1) && "border border-red-500"} border border-bg-d-100 dark:border-none dark:bg-bg-d-300 px-3 h-8 bg-bg-l-200 outline-none transition-all text-sm`}
          onChange={handlePassword}
          type="password" 
          name="password" 
          autoComplete="new-password"
          id="password" 
          placeholder="Password" 
          required/>

        {!(isValid.password || password.length < 1) && <label htmlFor="password" className="text-xs mb-2">
          Password must be 8 characters or more
        </label>} 

        <input className={`${(!isValid.password2 && password2.length > 3) && "border border-red-500"} border border-bg-d-100 dark:border-none dark:bg-bg-d-300 px-3 h-8 bg-bg-l-200 outline-none transition-all text-sm`}
          onChange={handlePassword2}
          type="password" 
          name="password2" 
          autoComplete="new-password"
          id="password2" 
          placeholder="Confirm Password" 
          required/>

        {(!isValid.password2 && password2.length > 3) && <label htmlFor="password" className="text-xs mb-2">
          Password confirmation doesn't match password.
        </label>}
        
        <p className="text-xs mt-2">
          By clicking the button below, you are indicating that you have read and agree to the Terms of Service and Privacy Policy.
        </p>
        <button disabled={!isValid.form} className={`${!isValid.form && "opacity-45"} h-12 rounded-md mt-6 bg-prim-100 transition-all`} formAction={signup}>
          Sign Up
        </button>

        <div className="w-full h-[1px] dark:bg-bg-l-100 bg-bg-d-100"></div>
      </form>

      <div className="w-full px-4 mt-4">
        <button onClick={signInGoogle} className="w-full h-10 dark:border-bg-l-100 border-bg-d-100 border hover:opacity-90 bg-bg-l-200 dark:bg-bg-d-300 rounded transition-all">
          Sign Up with Google
        </button>
      </div>
    </div>
  )
}