import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';
import { SiweMessage } from 'siwe';
import { getCsrfToken } from 'next-auth/react';
import crypto from "crypto";

function createAccessToken(walletAddress: string) {
    return crypto
        .createHmac('sha256', process.env.ACCESS_TOKEN_SALT!)
        .update(walletAddress)
        .digest('hex');
}

//https://dev.to/ifennamonanu/building-google-jwt-authentication-with-nextauth-5g78
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Ethereum',
            credentials: {
                message: {
                    label: 'Message',
                    type: 'text',
                    placeholder: '0x0',
                },
                signature: {
                    label: 'Signature',
                    type: 'text',
                    placeholder: '0x0',
                },
            },
            async authorize(credentials, req) {
                try {
                    if (!credentials?.message) {
                        throw new Error('SiweMessage is undefined');
                    }

                    const siwe = new SiweMessage(JSON.parse(credentials.message));
                    const nonce = await getCsrfToken({ req: { headers: req.headers } });
                    const result = await siwe.verify({
                        signature: credentials?.signature || '',
                        nonce,
                    });
                    const accessToken = createAccessToken(siwe.address);

                    if (result.success) {
                        return {
                            id: `eip155:${siwe.chainId}:${siwe.address}:${accessToken}`,
                        };
                    }

                    return null;
                } catch (e) {
                    console.log('err: ', e);
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: '/login',
        error: '/login',
    },
    callbacks: {
        async session({ session, token }) {
            if (!token.sub) {
                return session;
            }

            const [, chainId, address, accessToken] = token.sub.split(':');
            if (chainId && address) {
                session.address = address;
                session.chainId = parseInt(chainId, 10);
                session.accessToken = accessToken;
            }

            return session;
        },
    },
};
