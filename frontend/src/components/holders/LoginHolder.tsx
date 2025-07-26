"use client"

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
// import { Metadata } from "next";
import { APP_NAME, CALLBACK_URL, NEW_USER_CALLBACK_URL } from "@/constants/common";
import { signIn } from "@/lib/auth-client";
import { useState } from "react";
import { ErrorContext } from "better-auth/react";
import { toast } from "sonner";
import {
    RiErrorWarningFill,
} from "@remixicon/react";

const LoginHolder = () => {
    const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

    const login = async () => {
        await signIn.social(
            {
                provider: "google",
                callbackURL: CALLBACK_URL,
                newUserCallbackURL: NEW_USER_CALLBACK_URL,
            },
            {
                onRequest: () => {
                    // set isLoggingIn to true
                    setIsLoggingIn(true);
                },
                onError: (ctx: ErrorContext) => {
                    // display the error message
                    console.error(
                        "Some error occurred while trying to sign in with Google:",
                        ctx
                    );
                    setIsLoggingIn(false);
                    toast.error(
                        <div className="flex flex-col gap-2">
                            <div className="font-bold text-base flex items-center gap-1.5 w-fit">
                                <RiErrorWarningFill className="h-5 w-5" />
                                <span className="mt-[1px]">ERROR</span>
                            </div>
                            <div className="leading-relaxed font-medium text-sm">
                                Some error occurred while trying to sign in with Google. Please
                                try again.
                            </div>
                        </div>,
                        {
                            duration: Infinity,
                            icon: null,
                        }
                    );
                },
            }
        );
    };

    return (
        <div className="my-8 max-w-xl bg-background p-6 sm:p-8 rounded-lg shadow-lg border animate-fade-in flex flex-col items-center gap-6">
            <h1 className="text-xl sm:text-2xl font-semibold text-center">Welcome to ILLUMYN!</h1>
            <Separator className="bg-primary" />
            <div className="text-center text-foreground/80 leading-relaxed">
                <p>{`Login with Google to access your personalized learning experience. It's easy, fast, and secure.`}</p>
            </div>
            <Button
                className="w-full flex items-center justify-center gap-3 py-6 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-primary/30"
                variant="outline"
                onClick={isLoggingIn ? undefined : () => login()}
                disabled={isLoggingIn}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" className="hover:scale-110 transition-transform duration-300">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                </svg>
                <span className="hover:text-gray-900 transition-colors duration-300">
                    {isLoggingIn ? "Logging in with Google..." : "Login with Google"}
                </span>
            </Button>
            <p className="text-xs/relaxed text-foreground/60 text-center">
                By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>
        </div>
    );
}

export default LoginHolder;