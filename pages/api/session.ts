import type { NextApiRequest as Req, NextApiResponse as Res } from "next";
import { setCookie } from "nookies";

import { firebaseAdmin } from "../../libs/firebase/firebaseAdmin";

const sessionApi = async (req: Req, res: Res) => {
  // POSTリクエスト以外は、"404 Not Found"を返す
  if (req.method !== "POST") return res.status(404).send("Not Found");

  const auth = firebaseAdmin.auth();
  // Tokenの有効期限
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5日
  // セッションCookieを作成するためのIDを取得
  const idToken = (JSON.parse(req.body).id || "").toString();
  const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

  // Cookieのオプション
  const options = {
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
    path: "/",
  };

  // セッションIDをCookieに設定する
  setCookie({ res }, "session", sessionCookie, options);
  res.send(JSON.stringify({ status: "success" }));
}

export default sessionApi;