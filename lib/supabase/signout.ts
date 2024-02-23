"use server"

import { redirect } from "next/navigation"
import { createServClient } from "./server"

export const signOut = async () => {

    const supabase = createServClient()
    await supabase.auth.signOut()
    return redirect("/")
}