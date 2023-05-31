"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  session: any;
}
function Providers({ children, session }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default Providers;
