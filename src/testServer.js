import { rest } from "msw";

const mockUsers = [
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
];

const handlers = [
  rest.get("http://206.189.91.54//api/v1/users", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: mockUsers,
      })
    );
  }),
  rest.get(`http://206.189.91.54//api/v1/messages`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          {
            body: "Hi",
            created_at: "2022-02-03T12:46:48.839Z",
            id: 100001,
            receiver: mockUsers[0],
            sender: mockUsers[3],
          },
          {
            body: "Hey",
            created_at: "2022-02-03T12:46:48.839Z",
            id: 100002,
            receiver: mockUsers[3],
            sender: mockUsers[0],
          },
        ],
      })
    );
  }),
  rest.get("http://206.189.91.54//api/v1/users/recent", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [mockUsers[0], mockUsers[1], mockUsers[3]],
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

export { handlers, mockUsers, rest };
