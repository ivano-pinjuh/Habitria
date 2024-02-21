import { redirect } from 'next/navigation'
import { createServClient } from '@/lib/supabase/server'

export default async function PrivatePage() {
  const supabase = createServClient()
  const { data, error } = await supabase.auth.getUser()

  const signOut = async () => {
    "use server"

    const supabase = createServClient()
    await supabase.auth.signOut()
    return redirect("/")
  }


  return (
    <div>
      register
    </div>
  )
}