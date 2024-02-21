import Image from "next/image";
import Link from "next/link";
import SignUpForm from "./components/SignUpForm"

import { createServClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"


export default async function Home() {
  const supabase = createServClient()
  const { data, error } = await supabase.auth.getUser()


  if (data?.user) {
    redirect('/private')
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full min-h-screen flex py-24 gap-24 px-[15vw] pattern-hive-purple-500/5">
        <div className="flex flex-col items-center w-[40%] gap-10 py-10">
          <Image className=""
            src="/Hero.svg"
            width={350}
            height={350}
            alt="Hero image."/>

          <h3 className="w-full text-center text-3xl font-semibold">
            Motivate yourself to achieve your goals.
          </h3>
        </div>  
        <SignUpForm />
      </div>

      <div className="w-full py-32 px-[15vw]">
        <h2 className="w-full text-center text-5xl font-semibold">
          Track Your Habits
        </h2>

        <div className="w-full flex justify-between mt-16">
          <div className="flex flex-col w-[29%]">
            <h4 className="text-3xl font-semibold">
              First Card
            </h4>

            <p className="text-sm font-light mt-4 mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Nostrum nam sequi ut tenetur facere vero quidem atque obcaecati fugit sed.
            </p>

            <div className="w-full bg-prim-200 h-40">
              img placeholder
            </div>
          </div>

          <div className="flex flex-col w-[29%]">
            <h4 className="text-3xl font-semibold">
              Second Card
            </h4>

            <p className="text-sm font-light mt-4 mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Nostrum nam sequi ut tenetur facere vero quidem atque obcaecati fugit sed.
            </p>

            <div className="w-full bg-prim-200 h-40">
              img placeholder
            </div>
          </div>

          <div className="flex flex-col w-[29%]">
            <h4 className="text-3xl font-semibold">
              Third Card
            </h4>

            <p className="text-sm font-light mt-4 mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Nostrum nam sequi ut tenetur facere vero quidem atque obcaecati fugit sed.
            </p>

            <div className="w-full bg-prim-200 h-40">
              img placeholder
            </div>
          </div>


        </div>
      </div>

      <Link className="text-white" href={"/private"}>
        go to private page
      </Link>

      <div className="h-screen w-full">

      </div>

    </main>
  );
}
