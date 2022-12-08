import { rest } from "msw";

export const signIn = rest.get("http://localhost:8080/oauth2/login/:provider", (req, res, ctx) =>
  res(
    ctx.status(200),
    ctx.json({
      responseType: "SIGN_UP",
      email: "singco@gmail.com",
      authId: "singco",
      profile: "",
      snsType: "kakao",
    }),
  ),
);

export const signUp = rest.post("http://localhost:8080/members", (req, res, ctx) =>
  res(
    ctx.status(200),
    ctx.json({
      responseType: "SIGN_IN",
      accessToken: "slkdfjaiefj.sefiajsef.sfiaejlf",
      resfreshToken: "dkfjaie.feiajfiose.fjsiae212d",
    }),
  ),
);
