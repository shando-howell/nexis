import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import  Link from "next/link";

export default async function Home() {
  // Retrieve the user ID from auth 
  const { userId } = await auth();

  return (
    <div className="flex flex-col flex-1 items-center justify-center h-full">
      {userId ? (
        <Link href="/dashboard" className="text-white bg-black p-4">
          Dashboard
        </Link>
      ) : (
        <SignInButton
          mode="modal"
          fallbackRedirectUrl={"/dashboard"}
          forceRedirectUrl={"/dashboard"}
        >
          <button className="text-white bg-black p-4">
            Sign In
          </button>
        </SignInButton>
      )}
    </div>
  );
}
