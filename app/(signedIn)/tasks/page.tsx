import { redirect } from 'next/navigation'
import { createServClient } from '@/lib/supabase/server'

export default async function TasksPage() {
  const supabase = createServClient()
  const { data, error } = await supabase.auth.getUser()

  const signOut = async () => {
    "use server"

    const supabase = createServClient()
    await supabase.auth.signOut()
    return redirect("/")
  }


  if (error || !data?.user) {
    redirect('/')
  }

  return (
    <div>
      {!(error || !data?.user) && <form action={signOut}><button className="bg-prim-100 w-40 mt-6">sign out</button></form>}
      <p>Hello {data.user.email}</p>

      helo
    </div>
  )
}