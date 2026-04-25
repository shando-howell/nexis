import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { 
  Card, CardHeader, CardTitle, CardDescription, CardContent
} from "@/components/ui/card";
import { Atom, Brain, CheckCircle } from "lucide-react";

export default async function Home() {
  // Retrieve the user ID from auth 
  const { userId } = await auth();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-purple-950">
      {/* The Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"/>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top, rgba(120,119,198,0.3),transparent_50%)]"/>
  
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
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
            <span className="text-yellow-600 font-medium">
              {" "}
              Powered by OpenAI GPT.
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

      {/* Feature Highlights */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-200 sm:text-4xl mb-4">
              Build with ease and accuracy.
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Gain better understanding of technical documentations when building your
              web apps.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Add To Knowledgbase */}
            <Card className="relative overflow-hidden border-2 border-blue-800 hover:border-blue-600
            transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 group 
            bg-linear-to-br from-blue-950/50 to-cyan-950/50">
              <div className="absolute"/>
              <CardHeader className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-linear-to-br from-blue-500 to-cyan-500 text-gray-200">
                    <Brain className="w-6 h-6" />
                  </div>
                  <h1 className="text-2xl text-gray-200">
                    Build The Knowledgebase
                  </h1>
                </div>
                <CardTitle className="text-base text-gray-200">
                  Add URLs to the AI knowledgbase
                </CardTitle>
                <CardDescription className="text-gray-200">
                  Add the target URLs and curate the knoweldgebase you want the AI to be
                  trained with.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-200">
                      Add the URLs for the documentations you want to work with.
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-200">
                      Nexis scrapes the targeted web pages for the content to
                      train the AI with.
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-200">
                      You can add and remove as many URLs as you like.
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Analyis */}
            <Card className="relative overflow-hidden border-2 border-purple-800 hover:border-purple-600
            transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 group 
            bg-purple-950/80">
              <div className="absolute"/>
              <CardHeader className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-linear-to-br from-purple-500 to-pink-500 text-gray-200">
                    <Atom className="w-6 h-6" />
                  </div>
                  <h1 className="text-2xl text-gray-200">
                    AI Analyzes Knowledgbase
                  </h1>
                </div>
                <CardTitle className="text-base text-gray-200">
                  The AI conducts an analysis of the curated knowledgbase.
                </CardTitle>
                <CardDescription className="text-gray-200">
                  The AI is trained with the content of the knowledgebase and can now
                  serve as your assistant.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-200">
                      Ask the AI questions regarding content in knoweledgebase.
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-200">
                      Nexis uses a Retrieval Augmented Generation pipeline to generate
                      responses.
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-gray-200">
                      The AI strictly generates responses based on the provided
                      urls, ensuring accuracy.
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="flex justify-center text-purple-400 text-2xl">
        <p>Nexis &copy; 2026</p>
      </div>
    </div>
  );
}
