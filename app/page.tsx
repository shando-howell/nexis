import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import  Link from "next/link";

export default async function Home() {
  // Retrieve the user ID from auth 
  const { userId } = await auth();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-purple-950">
      {/* The Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"/>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top, rgba(120,119,198,0.3),transparent_50%)]"/>
  
        <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8 mb-48">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="bg-linear-to-r from-white via-blue-600 to-white bg-clip-text text-transparent">
                Understand Technical
              </span>
              <span className="block bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Documentations
              </span>
              <span className="bg-linear-to-r from-white via-blue-900 to-white bg-clip-text text-transparent">
                Easily.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-200 leading-relaxed">
              Harness the power of AI to analyze complex technical documentions when working on your web apps.
            </p>
            <span className="text-purple-500 font-medium">
              {" "}
              A powerful user-friendly tool.
            </span>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              {userId ? (
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="text-base text-gray-200 px-8 py-6 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700
                    hover:to-purple-700 shadow-lg hover:shdow-xl hover:shadow-blue-500/25 transition-all duration-300
                    border-0"
                  >
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <SignInButton
                  mode="modal"
                  fallbackRedirectUrl={"/dashboard"}
                  forceRedirectUrl={"/dashboard"}
                >
                  <Button
                    size="lg"
                    className="text-base text-gray-200 px-8 py-6 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700
                    hover:to-purple-700 shadow-lg hover:shdow-xl hover:shadow-blue-500/25 transition-all duration-300
                    border-0">
                      Sign In
                  </Button>
                </SignInButton>
              )}
            </div>
        </div>
      </div>
      </section>
    </div>
  );
}
