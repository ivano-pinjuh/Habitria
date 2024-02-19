import Image from "next/image";
import Link from "next/link";
import LoginForm from "./components/LoginForm"
import { redirect } from "next/navigation";




export default function Home() {
  
  
  return (
    <main className="flex dark:bg-bg-d-100 bg-bg-l-100 min-h-screen flex-col items-center">
      helo this is home page

      <Link className="text-white" href={"/private"}>
        go to private page
      </Link>
      
      <div className="w-full flex mt-20 gap-20 px-[15vw]">
        <div className="bg-yellow-300 w-[50%]">img placeholder</div>
        <LoginForm />
      </div>
    </main>
  );
}
