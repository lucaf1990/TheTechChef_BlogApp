import "bootstrap/dist/css/bootstrap.min.css";
import "styles/globals.scss";
import { ReactNode } from "react";
import Providers from "../Providers";
import { SessionToken } from "next-auth/core/lib/cookie";

export const metadata = {
  title: "TheTechChef",
  description: "TECH CHEF BLOG",
};

interface IProps {
  children: ReactNode;
  session: SessionToken;
}

export default function RootLayout({ children, session }: IProps) {
  return (
    <html lang="en">
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
