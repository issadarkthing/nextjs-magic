"use client";
import { createMagic } from "@/lib/magic";
import { useState } from "react";

export default function MagicLoginButton() {
    const [buttonState, setButtonState] = useState("primary");

    const onSignIn = async () => {
        setButtonState("loading");
        if (buttonState === "loading") return;

        const magic = createMagic()!;

        await magic.oauth.loginWithRedirect({
            provider: "google",
            redirectURI: new URL("/login/oauth", window.location.origin).href,
        });
    };

    return (
        <button className="border px-2 py-1" onClick={onSignIn}>
            {buttonState === "loading" ? "Logging In" : "Login with Google"}
        </button>
    );
}
