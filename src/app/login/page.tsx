import { authOptions } from "@/lib/auth/authOptions";
import MagicLoginButton from "./MagicLoginButton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/");
    }

    return <MagicLoginButton />;
}
