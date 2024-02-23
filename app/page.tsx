import Image from "next/image";
import Link from "next/link";

import { createServClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

import SignUpForm from "./components/SignUpForm"
import Navbar from "./components/Navbar";

export default async function Home() {
  const supabase = createServClient()
  const { data, error } = await supabase.auth.getUser()


  if (data?.user) {
    redirect("/tasks")
  }
  
  return (
    <>
    <Navbar />
    <main className="flex min-h-screen flex-col items-center">
      
      <div className="w-full min-h-[calc(100vh-40px)] shadow-2xl z-20 flex flex-col-reverse md:flex-row justify-between pt-24 gap-14 md:gap-24 px-[10vw] md:px-[15vw] pattern-hive-purple-500/5">
        <div className="flex flex-col items-center md:w-[45%] gap-10 py-10">
          <Image className="w-auto h-auto"
            src="/hero.svg"
            width={350}
            height={350}
            alt="Hero image."
            priority/>

          <h3 className="w-full text-center text-3xl font-semibold">
            Motivate yourself to achieve your goals.
          </h3>
        </div>
        <SignUpForm />
      </div>



      <div className="w-full py-36 px-[15vw] shadow-2xl bg-gradient-to-tl from-bg-l-200 dark:from-bg-d-100 from-15% via-bg-l-200 dark:via-bg-d-200 via-85% to-bg-l-100 dark:to-bg-d-300">
        <h2 className="w-full text-center text-5xl font-semibold">
          Track Your Habits
        </h2>

        <div className="w-full flex flex-col md:flex-row gap-16 md:gap-0 justify-between mt-24">
          <div className="flex flex-col w-full md:w-[29%] justify-between h-96">
            <h4 className="text-3xl text-center font-semibold">
              Track Your Habits and Goals
            </h4>
            <p className="text-sm text-center font-light mt-4 mb-4">
              Keep yourself on track by monitoring and organizing your Habits, Daily goals,
              and To-Do list using our user-friendly mobile apps and web interface.
            </p>
            <div className="w-full bg-prim-200 h-40">
              img placeholder
            </div>
          </div>

          <div className="flex flex-col w-full md:w-[29%] justify-between h-96">
            <h4 className="text-3xl text-center font-semibold">
              Earn Rewards for Achieving Goals
            </h4>
            <p className="text-sm text-center font-light mt-4 mb-4">
              Mark off completed tasks to enhance your progress and unlock features such as
              badges, personalized avatars, and exclusive challenges.
            </p>
            <div className="w-full bg-prim-200 h-40">
              img placeholder
            </div>
          </div>

          <div className="flex flex-col w-full md:w-[29%] justify-between h-96">
            <h4 className="text-3xl text-center font-semibold">
              Challenge Yourself and Friends
            </h4>
            <p className="text-sm text-center font-light mt-4 mb-4">
              Engage in friendly competitions with others to stay motivated! Utilize your
              earned rewards to unlock new features for achieveng your habit-related milestones!
            </p>
            <div className="w-full bg-prim-200 h-40">
              img placeholder
            </div>
          </div>
        </div>



        <h2 className="w-full text-center text-4xl font-semibold mt-32">
          People Use Habitria to Improve
        </h2>

        <div className="w-full flex flex-col md:flex-row gap-16 md:gap-0 justify-between mt-16">
          <div className="flex flex-col w-full md:w-[29%] justify-between h-80">
            <h4 className="text-3xl text-center font-semibold">
              Health and Fitness
            </h4>
            <p className="text-sm text-center font-light mt-4 mb-4">
              Finding it hard to prioritize your well-being or make it to the gym? 
              Habitria turns health into an enjoyable journey.
            </p>
            <div className="w-full bg-prim-200 h-40">
              img placeholder
            </div>
          </div>

          <div className="flex flex-col w-full md:w-[29%] justify-between h-80">
            <h4 className="text-3xl text-center font-semibold">
              School and Work
            </h4>
            <p className="text-sm text-center font-light mt-4 mb-4">
              Whether you're creating a presentation for your teacher or tackling tasks for 
              your boss, easily track your progress with Habitria.
            </p>
            <div className="w-full bg-prim-200 h-40">
              img placeholder
            </div>
          </div>

          <div className="flex flex-col w-full md:w-[29%] justify-between h-80">
            <h4 className="text-3xl text-center font-semibold">
              And Beyond!
            </h4>
            <p className="text-sm text-center font-light mt-4 mb-4">
              Customize Habitria to fit your goals—explore creative projects, focus on 
              self-care, or pursue unique aspirations.
            </p>
            <div className="w-full bg-prim-200 h-40">
              img placeholder
            </div>
          </div>
        </div>
      </div>


      <div className="w-full flex flex-wrap gap-8 py-20 px-[10vw] pattern-bubbles-purple-500/5">
        <h5 className="w-full text-center text-2xl md:text-3xl font-semibold">
          Join over 100,000 people having fun while accomplishing their goals!
        </h5>
        <Link href={"/register"} className="w-full text-center text-lg py-3 lg:w-96 rounded-sm m-auto bg-prim-100 hover:opacity-85 transition-all">
          Join Habitria Today
        </Link>
      </div>

    </main>
    </>
  );
}
