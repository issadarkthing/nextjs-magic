"use client";
import { createMagic } from "@/lib/magic";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
    const onLogout = async () => {
        const magic = createMagic()!;
        const isMagicConnected = await magic.user.isLoggedIn();

        if (isMagicConnected) {
            await magic.user.logout();
        }

        signOut({ callbackUrl: "/login" });
    };

    return (
        <button onClick={onLogout} className="px-2 py-1 border pointer">
            Log Out
        </button>
    );
}
