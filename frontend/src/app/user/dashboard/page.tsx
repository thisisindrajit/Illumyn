import { Metadata } from "next";
import { APP_NAME } from "@/constants/common";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import UserDashboardHolder from "@/components/holders/UserDashboardHolder";

export async function generateMetadata(): Promise<Metadata> {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return {
        title: `${session?.user.name}'s Dashboard - ${APP_NAME}`,
        description: `This is the ${APP_NAME} dashboard for ${session?.user.name}`,
    };
}

const UserDashboard = () => {
    return <UserDashboardHolder />
};

export default UserDashboard;