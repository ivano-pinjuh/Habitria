import Image from "next/image";
import Link from "next/link";
import LoginForm from "./components/LoginForm"


export default function Home() {
  
  
  return (
    <main className="flex dark:bg-bg-d-100 bg-bg-l-100 min-h-screen flex-col items-center px-[15vw]">
      <Link className="text-white" href={"/private"}>
        go to private page
      </Link>
      
      <div className="w-full flex mt-32 gap-20">
        <div className="bg-yellow-300 w-[45%]">img placeholder</div>
        <LoginForm />
      </div>

      <div className="w-full mt-32">
        <h2 className="w-full text-center text-5xl font-semibold">
          Track Your Habits
        </h2>

        <div className="w-full flex justify-between mt-16">
          <div className="flex flex-col w-[29%] border">
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

          <div className="flex flex-col w-[29%] border">
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

          <div className="flex flex-col w-[29%] border">
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

      <div className="w-full mt-20">

      </div>

    </main>
  );
}
