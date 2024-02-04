'use client'

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function Providers({ children, session }: { children: ReactNode, session: Session }) {
    return (
        <SessionProvider refetchOnWindowFocus={true} session={session}>
            {children}
        </SessionProvider>
    );
};
