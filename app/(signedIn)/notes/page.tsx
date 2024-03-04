import { redirect } from 'next/navigation'
import { createServClient } from '@/lib/supabase/server'

import NoteItem from './components/NoteItem'

export default async function NotesPage() {
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

      <div className='px-10 mt-6 flex w-full lg:w-[40%] m-auto'>
        <input className='placeholder:font-semibold w-full duration-300 bg-bg-l-100 dark:bg-bg-d-300 h-12 px-4 rounded outline-none shadow-md transition-all' 
          type="text" 
          placeholder='Add a Note'
          name="add-note" 
          id="add-note"
          autoComplete="off" />
          
      </div>

      <div className='px-32 mt-10 flex justify-between flex-wrap'>
        <NoteItem />
        <NoteItem />
        <NoteItem />
        <NoteItem />
      </div>

      
    </div>
  )
}