'use client'

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

type Props = {
  children?: React.ReactNode;
};

export default function SignIn({ children }: Props) {

  const { status, data } = useSession();
  
  useEffect(() => {
    console.log(data)
    if (status === "unauthenticated") {
      void signIn("keycloak", { redirect: false });
      console.log("No JWT");
      console.log(status);
    } else if(status === "authenticated" && data.error) {
      console.log("JWT error");
      console.log(status);
      console.log(data);
      void signIn("keycloak", { redirect: false });
    }
  }, [status]);

  if (status === "authenticated" && !data.error) {
    console.log("JWT");
    console.log(status);
    console.log(data);
    return <main>{ children }</main>;
  }  
  return <main>Checking authentication...</main>;
}