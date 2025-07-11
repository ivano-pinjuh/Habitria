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

      <div className='w-full bg-bg-l-300 dark:bg-bg-d-200 h-44 px-10 py-8 shadow-lg'>
        {/*<h3 className='lg:w-[40%]'>
          Here, you can conveniently oversee and cultivate your habits, daily tasks, and to-do lists all in one place, 
          simplifying your journey towards enhanced productivity and goal achievement.
        </h3>*/}
      </div>

      <div className='w-full h-12 bg-bg-l-200 dark:bg-bg-d-300 shadow-lg'>

      </div>
      


      <div className='w-full px-[25vw] pt-24'>

        <h3 className='text-2xl font-semibold'>
          General Data
        </h3>

        <table className='w-full bg-bg-l-200 dark:bg-bg-d-200 mt-6 shadow-xl'>
          <tbody>
          <tr className='h-10 border-y border-bg-d-300 dark:border-bg-l-200'>
            <td className='w-[25%] pl-2 font-semibold'>Username</td>
            <td className='text-sm'>{data.user.user_metadata.name}</td>
            <td className='w-fit text-end pr-3 text-purple-600 font-light cursor-pointer transition-all hover:underline'>Edit</td>
          </tr>
          <tr className='h-10 border-y border-bg-d-300 dark:border-bg-l-200'>
            <td className='pl-2 font-semibold'>Email</td>
            <td className='text-sm'>{data.user.email}</td>
            <td></td>
          </tr>
          <tr className='h-10 border-y border-bg-d-300 dark:border-bg-l-200'>
            <td className='pl-2 font-semibold'>Account Created</td>
            <td>{new Date(data.user.created_at).toLocaleString()}</td>
            <td></td>
          </tr>
          </tbody>
        </table>

        
      </div>
      
    </div>
  )
}