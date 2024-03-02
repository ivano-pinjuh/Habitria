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
      


      <div className='w-full px-[25vw]'>

        <h3 className='text-2xl font-semibold'>
          General Settings
        </h3>

        <table className='w-full bg-pink-400'>
          <tr className=''>
            <td className='w-[20%] bg-purple-600'>Username</td>
            <td></td>
            <td className='w-[20%] bg-blue-500'></td>
          </tr>
          <tr>
            <td>Email</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Password</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Delete Account</td>
            <td></td>
            <td></td>
          </tr>
        </table>
        

        <p className='mt-20'>Hello {data.user.email}</p>
        <p>Hello {data.user.user_metadata.name}</p>
      </div>
      
    </div>
  )
}