import { redirect } from 'next/navigation'
import { createServClient } from '@/lib/supabase/server'

import { Habits } from './components/Habits'

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


        <div className='w-full md:w-[32%]'>
          <div className='flex justify-between items-center'>
            <h3 className='text-xl font-semibold py-1 pl-2'>
              Dailies
            </h3>
            <div className='flex'>
              <p className='cursor-pointer px-2 py-1 text-xs border-b-2 border-bg-d-100 dark:border-bg-l-100 font-semibold'>All</p>
              <p className='cursor-pointer px-2 py-1 text-xs opacity-75 dark:opacity-50 hover:opacity-100 transition-all'>Active</p>
              <p className='cursor-pointer px-2 py-1 text-xs opacity-75 dark:opacity-50 hover:opacity-100 transition-all'>Completed</p>
            </div>
          </div>
          

          <div className='w-full flex flex-col gap-3 bg-bg-l-300 dark:bg-bg-d-200 h-[500px] py-2 px-2 rounded-md'>
            <div>
              <input className='placeholder:font-semibold w-full bg-bg-l-100 dark:bg-bg-d-300 h-12 px-4 rounded outline-none shadow-md transition-all' 
                type="text" 
                placeholder='Add a Daily'
                name="add-daily" 
                id="add-daily" />

              <p className='text-xs'>
                
              </p>
            </div>

            <div className='w-full rounded flex-grow'>
              
            </div>
          </div>
        </div>


        <div className='w-full md:w-[32%]'>
          <div className='flex justify-between items-center'>
            <h3 className='text-xl font-semibold py-1 pl-2'>
              To-Do's
            </h3>
            <div className='flex'>
              <p className='cursor-pointer px-2 py-1 text-xs border-b-2 border-bg-d-100 dark:border-bg-l-100 font-semibold'>All</p>
              <p className='cursor-pointer px-2 py-1 text-xs opacity-75 dark:opacity-50 hover:opacity-100 transition-all'>Active</p>
              <p className='cursor-pointer px-2 py-1 text-xs opacity-75 dark:opacity-50 hover:opacity-100 transition-all'>Completed</p>
            </div>
          </div>
          

          <div className='w-full flex flex-col gap-3 bg-bg-l-300 dark:bg-bg-d-200 h-[500px] py-2 px-2 rounded-md'>
            <input className='placeholder:font-semibold w-full bg-bg-l-100 dark:bg-bg-d-300 h-12 px-4 rounded outline-none shadow-md transition-all' 
              type="text" 
              placeholder='Add a To-Do'
              name="add-todo" 
              id="add-todo" />

            <div className='w-full rounded flex-grow'>
              
            </div>
          </div>
        </div>



      </div>

      <div className='w-full'>
        {!(error || !data?.user) && <form action={signOut}><button className="bg-prim-100 w-40 mt-6">sign out</button></form>}

        <p>Hello {data.user.email}</p>
        <p>Hello {data.user.user_metadata.name}</p>
      </div>
      
    </div>
  )
}