import { redirect } from 'next/navigation'
import { createServClient } from '@/lib/supabase/server'

export default async function AccountPage() {
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
    <div className="w-full">
      <div className='pattern-hive-purple-500/5 pattern-hive-scale-75 opacity-80 fixed top-0 left-0 h-screen w-full -z-50'></div>
      
      <div className='w-full h-screen'>
        {!(error || !data?.user) && <form action={signOut}><button className="bg-prim-100 w-40 mt-6">sign out</button></form>}

        <p>Hello {data.user.email}</p>
        <p>Hello {data.user.user_metadata.name}</p>
      </div>
      
    </div>
  )
}