import { rest } from "msw";
import { dummyChannels } from "./Utils/mockData";

const handlers = [
  rest.get("http://206.189.91.54//api/v1/users", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),
  rest.get("http://206.189.91.54//api/v1/messages", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),
  rest.get(
    "http://206.189.91.54//api/v1/messages?receiver_class=${msgClass}&receiver_id=${id}",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json());
    }
  ),
  rest.get("http://206.189.91.54//api/v1/users/recent", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),
  rest.get("http://206.189.91.54//api/v1/channels", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(dummyChannels));
  }), 
  rest.post("http://206.189.91.54//api/v1/auth/sign_in", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          allow_password_change: false,
          email: "ewl@gmail.com",
          id: 1675,
          image: null,
          name: null,
          nickname: null,
          provider: "email",
          uid: "ewl@gmail.com",
        },
      })
    );
  }),
  //prevents actual request from going out to the internet when you forget to add the
  //proper request handler
  //ex. wrong spelling of URL
  rest.get("*", (req, res, ctx) => {
    console.error(`Please add request handler for ${req.url.toString()}`);
    return res(
      ctx.status(500),
      ctx.json({ error: "Please add request handler" })
    );
  }),
];

export { handlers };
