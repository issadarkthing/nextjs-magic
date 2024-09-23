"use client";
import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";

export function createMagic() {
    if (typeof window === "undefined") return;

    return new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY!, {
        extensions: [new OAuthExtension()],
        network: {
            rpcUrl: process.env.NEXT_PUBLIC_RPC_URL!,
            chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID!),
        },
    });
}
