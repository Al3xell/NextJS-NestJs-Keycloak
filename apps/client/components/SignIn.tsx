'use client'
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function SignIn() {

  const { status, data } = useSession();
  
  useEffect(() => {
    if (status === "unauthenticated" || status === "authenticated" && data.error) {
      signIn("keycloak", { redirect: false });
    }
  }, [status, data]);

  return <></>
}