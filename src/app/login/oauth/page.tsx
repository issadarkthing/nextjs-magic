"use client";
import { createMagic } from "@/lib/magic";
import { getCsrfToken, signIn } from "next-auth/react";
import { SiweMessage } from "siwe";
import { useEffect } from "react";
import { ethers } from "ethers";

export default function Page() {
    const finishSocialLogin = async () => {
        try {
            const magic = createMagic()!;

            await magic.oauth.getRedirectResult();

            const isLoggedIn = await magic.user.isLoggedIn();

            if (!isLoggedIn) return;

            const provider = new ethers.BrowserProvider(magic.rpcProvider);
            const network = await provider.getNetwork();
            const chainId = Number(network.chainId);
            const signer = await provider.getSigner();
            const address = signer.address;

            const message = new SiweMessage({
                domain: window.location.host,
                address,
                statement: "Sign in with Ethereum to the app.",
                uri: window.location.origin,
                version: "1",
                chainId,
                nonce: await getCsrfToken(),
            });

            const signature = await signer.signMessage(
                message.prepareMessage()
            );

            signIn("credentials", {
                message: JSON.stringify(message),
                signature,
                callbackUrl: "/",
            });
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        finishSocialLogin();
    }, []);

    return (
        <div className="text-xl weight-bold mb-3">
            OAuth login successful, please wait you will be redirected promptly.
        </div>
    );
}
