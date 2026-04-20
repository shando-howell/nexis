"use client"

import Link from "next/link";
import { Loader2, UserRound } from "lucide-react";
import { AuthLoading, Unauthenticated, Authenticated } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const Header = () => {
    return (
        <header className={`sticky top-0 w-full text-gray-200 bg-indigo-800/80 backdrop-blur supports-backdrop-filter:bg-background/60 z-10`}>
            <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-4">
                <div className="flex-1 text-3xl uppercase tracking-widest">
                    <Link href="/">Nexis</Link>
                </div>

                <div className="flex items-center justify-end">
                    <AuthLoading>
                        <Button variant="outline">
                            <Loader2 className="size-5 animate-spin text-muted-foreground" />
                            <span className="sr-only">Loading...</span>
                        </Button>
                    </AuthLoading>

                    <Unauthenticated>
                        <SignInButton 
                            mode="modal"
                            fallbackRedirectUrl={"/dashboard"}
                            forceRedirectUrl={"/dashboard"}
                        >
                            <Button variant="outline">
                                <UserRound className="size-4" />
                                <span className="sr-only md:not-sr-only md:ml-2">Sign In</span>
                            </Button>
                        </SignInButton>
                    </Unauthenticated>

                    <Authenticated>
                        <h1 className="uppercase px-2">
                            <Link href="/dashboard">Dashboard</Link>
                        </h1>
                        <h1 className="uppercase px-2">
                            <Link href="/chat">Chat</Link>
                        </h1>

                        <Button variant="ghost">
                            <UserButton
                                appearance={{
                                    elements: {
                                        userButtonAvatarBox: "size-8",
                                    },
                                }}
                            />
                        </Button>
                    </Authenticated>
                </div>
            </div>
        </header>
    )
}

export default Header;