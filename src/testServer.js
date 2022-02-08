import { rest } from "msw";

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
