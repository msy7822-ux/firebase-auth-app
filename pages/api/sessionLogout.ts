import type { NextApiRequest as Req, NextApiResponse as Res } from "next";
import { parseCookies, destroyCookie } from "nookies";

import { firebaseAdmin } from "../../libs/firebase/firebaseAdmin";

export default async function sessionLogoutApi(req: Req, res: Res) {
  if (req.method !== "POST") return res.status(404).send("Not Found");

  const auth = firebaseAdmin.auth();
  const sessionId = parseCookies({ req }).session || "";
  const decodedClaims = await auth
    .verifySessionCookie(sessionId)
    .catch(() => null)

  if (decodedClaims) {
    await auth.revokeRefreshTokens(decodedClaims.sub);
  }

  destroyCookie({ res }, "session", { path: "/" });
  res.send(JSON.stringify({ status: "success" }));
}