import { rest } from "msw";

export const signIn = rest.get("http://localhost:8080/oauth2/login/:provider", (req, res, ctx) =>
  res(
    ctx.status(200),
    ctx.json({
      response_type: "SIGN_UP",
      email: "singco@gmail.com",
      authId: "singco",
      profile: "",
      sns_type: "google",
    }),
  ),
);

export const signUp = rest.post("http://localhost:8080/members", (req, res, ctx) =>
  res(
    ctx.status(200),
    ctx.json({
      response_type: "SIGN_IN",
      access_token: "slkdfjaiefj.sefiajsef.sfiaejlf",
      resfresh_token: "dkfjaie.feiajfiose.fjsiae212d",
    }),
  ),
);
