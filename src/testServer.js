import { rest } from "msw";

const handlers = [
  rest.post("http://206.189.91.54//api/v1/auth/sign_in", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: { email: "odie@gmail.com", id: 123 },
      })
    );
  }),
  rest.get("http://206.189.91.54//api/v1/users", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          {
            id: 1,
            uid: "odie@gmail.com",
            email: "odie@gmail.com",
          },
          {
            id: 2,
            uid: "quev@gmail.com",
            email: "quev@gmail.com",
          },
          {
            id: 3,
            uid: "erma@gmail.com",
            email: "erma@gmail.com",
          },
          {
            id: 4,
            uid: "dio@gmail.com",
            email: "dio@gmail.com",
          },
        ],
      })
    );
  }),
  rest.post("http://206.189.91.54//api/v1/messages", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),
  rest.get(
    `http://206.189.91.54//api/v1/messages?receiver_class=User&receiver_id=1`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          data: [
            {
              body: "Hi",
              created_at: "2022-02-03T12:46:48.839Z",
              id: 14431,
              receiver: {
                id: 1,
                uid: "odie@gmail.com",
                email: "odie@gmail.com",
              },
              sender: {
                id: 2,
                uid: "quev@gmail.com",
                email: "quev@gmail.com",
              },
            },
            {
              body: "hei",
              created_at: "2022-02-03T12:46:48.839Z",
              id: 14431,
              receiver: {
                id: 2,
                uid: "quev@gmail.com",
                email: "quev@gmail.com",
              },
              sender: {
                id: 1,
                uid: "odie@gmail.com",
                email: "odie@gmail.com",
              },
            },
          ],
        })
      );
    }
  ),
  rest.get("http://206.189.91.54//api/v1/users/recent", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          {
            id: 1,
            uid: "odie@gmail.com",
          },
          {
            id: 2,
            uid: "quev@gmail.com",
          },
          {
            id: 3,
            uid: "erma@gmail.com",
          },
        ],
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

/* const mockUserStorage = {
  email: "odie@gmail.com",
  id: 123,
};

const mockHeaderStorage = {
  accessToken: "xxx",
  client: "yyy",
  expiry: "1645530342",
  uid: "odie@gmail.com",
}; */

export { handlers };
