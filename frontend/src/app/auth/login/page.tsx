import LoginHolder from "@/components/holders/LoginHolder";
import { APP_NAME } from "@/constants/common";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: `Login - ${APP_NAME}`
};

const LoginPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // If user is authenticated, navigate to dashboard page
    if (session) {
        redirect("/user/dashboard");
    }

    return <LoginHolder />
}

export default LoginPage;