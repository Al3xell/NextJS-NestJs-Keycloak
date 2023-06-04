'use client'

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function SignOut() {

  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      void signOut();
    }
  }, [status]);

  return <div></div>;
}