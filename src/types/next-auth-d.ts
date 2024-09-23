import type { SIWESession } from '@web3modal/siwe';

declare module 'next-auth' {
    interface Session extends SIWESession {
        address: string;
        chainId: number;
        accessToken: string;
    }
}
