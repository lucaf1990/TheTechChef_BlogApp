"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "styles/globals.scss";
import { ReactNode } from "react";
import Providers from "./Providers";
import { SessionToken } from "next-auth/core/lib/cookie";

interface IProps {
  children: ReactNode;
}
interface Props {
  session: SessionToken;
}
export default function RootLayout({ children }: IProps, { session }: Props) {
  return (
    <html lang="en">
      <body>
        <Providers session={session}> {children}</Providers>
      </body>
    </html>
  );
}
