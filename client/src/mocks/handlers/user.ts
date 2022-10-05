import { rest } from "msw";

export const signUp = rest.get("http://localhost:5000/oauth2/login/:provider", (req, res, ctx) =>
  res(
    ctx.status(200),
    ctx.json({
      responseType: "SIGN_UP",
        attributes: {
          responseType: "SIGN_UP",
          email: "singco@gmail.com",
          authId: "singco",
          profileImageUrl: "../../assets/signin/default_profile@3x.png",
          snsType: "kakao",
        }
      }
    ),
  ),
);

export const signIn = rest.post("http://localhost:5000/members", (req, res, ctx) =>
  res(
    ctx.status(200),
    ctx.json({
      responseType: "SIGN_IN",
      accessToken: "slkdfjaiefj.sefiajsef.sfiaejlf",
      resfreshToken: "dkfjaie.feiajfiose.fjsiae212d",
    }),
  ),
);
