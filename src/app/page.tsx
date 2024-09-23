import { getServerSession } from "next-auth";
import LogoutButton from "./LogoutButton";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth/authOptions";

export default async function Home() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="text-xl flex flex-col items-center">
            <div>Wallet Address: {session.address}</div>
            <LogoutButton />
        </div>
    );
}
