import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      helo this is home page
      <Link className="text-white" href={"/login"}>
        go to login
      </Link>

      <Link className="text-white" href={"/private"}>
        go to private
      </Link>
      
    </main>
  );
}
