import { redirect } from 'next/navigation'
import { createServClient } from '@/lib/supabase/server'

import Stats from './components/Stats'

export default async function NotesPage(){

  const supabase = createServClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/')
  }

  return (
    <div className="w-full">
      <div className='dark:pattern-hive-purple-500/10 pattern-hive-purple-500/15 pattern-hive-scale-75 opacity-80 fixed top-0 left-0 h-screen w-full -z-50'></div>
      
      <div className='w-full bg-bg-l-300 dark:bg-bg-d-200 h-44 px-10 py-8 shadow-lg'>
      </div>

      <Stats />
    </div>
  )
}