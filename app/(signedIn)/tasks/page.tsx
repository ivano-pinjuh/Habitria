import { redirect } from 'next/navigation'
import { createServClient } from '@/lib/supabase/server'

import { Habits } from './components/Habits'
import { Dailies } from './components/Dailies'
import { Todos } from './components/Todos'


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
    <div className="w-full">
      <div className='dark:pattern-hive-purple-500/10 pattern-hive-purple-500/15 pattern-hive-scale-75 opacity-80 fixed top-0 left-0 h-screen w-full -z-50'></div>
      
      <div className='w-full bg-bg-l-300 dark:bg-bg-d-200 h-44 shadow-lg'>
      </div>

      <div className='w-full flex md:flex-row flex-col gap-y-20 md:justify-between px-10 mt-10 '>
        <Habits />
        <Dailies />
        <Todos />
      </div>

      <div className='w-full'>
        {!(error || !data?.user) && <form action={signOut}><button className="bg-prim-100 w-40 mt-6">sign out</button></form>}

        <p>Hello {data.user.email}</p>
        <p>Hello {data.user.user_metadata.name}</p>
      </div>
      
    </div>
  )
}