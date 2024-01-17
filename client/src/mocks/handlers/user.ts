import { rest } from "msw";

export const signUp = rest.get("http://localhost:5000/oauth2/login/:provider", (req, res, ctx) =>
  res(
    ctx.status(200),
    ctx.json({
      responseType: "SIGN_UP",
        attributes: {
          responseType: "SIGN_UP",
          email: "collusic@gmail.com",
          authId: "collusic",
          profileImageUrl: "../../assets/signin/default_profile@3x.png",
          snsType: req.params.provider,
        }
      }
    ),
  )
);

export const checkNickName = rest.get("http://localhost:5000/members/:nickname", (req, res, ctx) => 
  res(
    ctx.status(200),
    ctx.json({
      status : 200,
      message : "사용 가능한 닉네임입니다."
    }),
  )
);

export const signIn = rest.post("http://localhost:5000/members", (req, res, ctx) =>
  res(
    ctx.status(200),
    ctx.json({
      responseType: "SIGN_IN",
      attributes: {
        accessToken : "slkdfjaiefj.sefiajsef.sfiaejlf"
      }
    }),
    ctx.cookie('refeshToken', "dkfjaie.feiajfiose.fjsiae212d")
  ),
);

export const reissue = rest.post("http://localhost:5000/reissue", (req, res, ctx) => 
  res(
    ctx.status(200),
    ctx.json({
      status : 200,
      message : "사용 가능한 닉네임입니다."
    }),
  )
);
