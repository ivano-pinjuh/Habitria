import { redirect } from 'next/navigation'
import { createServClient } from '@/lib/supabase/server'
import { dailyReset, fetchOneItem } from '@/lib/supabase/db-actions'

import Habits from './components/Habits'
import Dailies from './components/Dailies'
import Todos from './components/Todos'
import { ResetModal } from './components/ResetModal'

export default async function TasksPage() {
  const supabase = createServClient()
  const { data, error } = await supabase.auth.getUser()


  if (error || !data?.user) {
    redirect('/')
  }

  
  const itemData:any = await fetchOneItem()
  const lastResetDate = new Date(itemData.data[0]?.last_reset)
  const currentDate = new Date()

  let content = <></>

  if (currentDate.getFullYear() === lastResetDate.getFullYear() &&
    currentDate.getMonth() === lastResetDate.getMonth() &&
    currentDate.getDate() === lastResetDate.getDate()){
    
    console.log("No Need for Daily Reset")

    content = <ResetModal showModal={true}></ResetModal>
  }
  else {
    // Daily Reset
    
    console.log("Daily Reset Activated")
    dailyReset()
  }

  return (
    <>
    <div className="w-full">
      {content}
      <div className='dark:pattern-hive-purple-500/10 pattern-hive-purple-500/15 pattern-hive-scale-75 opacity-80 fixed top-0 left-0 h-screen w-full -z-50'></div>
      
      <div className='w-full bg-bg-l-300 dark:bg-bg-d-200 h-44 px-10 py-8 shadow-lg'>
        {/*<h3 className='lg:w-[40%]'>
          Here, you can conveniently oversee and cultivate your habits, daily tasks, and to-do lists all in one place, 
          simplifying your journey towards enhanced productivity and goal achievement.
        </h3>*/}
      </div>

      <div className='w-full flex lg:flex-row flex-col gap-y-20 lg:justify-between px-10 mt-10 '>
        <Habits />
        <Dailies />
        <Todos />
      </div>
    </div>
    </>
  )
}