'use client'
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

type Props = {
  children?: React.ReactNode;
};

export default function SignIn({ children }: Props) {

  const { status, data } = useSession();
  
  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("keycloak", { redirect: false });

     } else if(status === "authenticated" && data.error) {
      signIn("keycloak", { redirect: false });
    }
  }, [status, data]);

  if (status === "authenticated" && !data.error) {
    return <main className="flex-grow">{ children }</main>;
  } 
  return <main>Checking authentication...</main>;
}