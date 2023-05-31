// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken, JWT } from "next-auth/jwt";

type Data = {
  name: string;
  token: JWT | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  res.status(200).json({ name: "JSON Web Token", token });
  res.end();
}
