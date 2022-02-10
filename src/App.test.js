
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { handlers, mockUsers, rest } from "./testServer";
import { setupServer } from "msw/node";

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

describe("App Navigation and Interaction", () => {
  //Needed to manually add scrollIntoView beacuse it is not implemented in jsdom
  window.HTMLElement.prototype.scrollIntoView = function () {};

  test("should login and navigate to home page", async () => {
    server.use(
      rest.post(
        "http://206.189.91.54//api/v1/auth/sign_in",
        (req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              data: mockUsers[0],
            })
          );
        }
      )
    );

    render(<App />);
    const loginBtn = screen.getByText("Sign In with Email");
    userEvent.click(loginBtn);

    expect(await screen.findByText("Header")).toBeInTheDocument();
    expect(await screen.findByText("Direct Messages")).toBeInTheDocument();
    expect(await screen.findByText("Select a Channel")).toBeInTheDocument();
  });

  test("show display messages with selected user", async () => {
    render(<App />);

    const user = await screen.findByRole("link", { name: /dio/i });
    userEvent.click(user);

    const msgHeader = await screen.findByRole("heading", {
      name: /dio/i,
      level: 2,
    });

    expect(msgHeader).toBeInTheDocument();
    expect(await screen.findByText("Hi")).toBeInTheDocument();
    expect(await screen.findByText("Hey")).toBeInTheDocument();
  });

  test("sends message and shows message in message screen", async () => {
    server.use(
      rest.post("http://206.189.91.54//api/v1/messages", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            data: {
              body: "Hello World",
              created_at: "2022-02-09T12:00:00.839Z",
              id: 100000,
              receiver: mockUsers[1],
              sender: mockUsers[0],
            },
          })
        );
      })
    );
    render(<App />);

    userEvent.click(await screen.findByTitle("Send Message"));

    expect(await screen.findByText("Hello World")).toBeInTheDocument();
  });

  test("shows all direct messages and routes to user conversation on click of message", async () => {
    render(<App />);

    const openDMbtn = await screen.findByTitle("Open a Direct Message");
    userEvent.click(openDMbtn);

    expect(await screen.findByText("All direct messages")).toBeInTheDocument();

    const searchUserBox = await screen.findByPlaceholderText(/somebody/i);
    userEvent.type(searchUserBox, "erma");
    expect(await screen.findByText("erma@gmail.com")).toBeInTheDocument();

    const directMsgs = await screen.findAllByText("Hey");
    for (const msg of directMsgs) {
      expect(msg).toBeInTheDocument();
    }

    userEvent.click(directMsgs[0]);
    expect(
      await screen.findByRole("heading", {
        name: /dio/i,
        level: 2,
      })
    ).toBeInTheDocument();
  });

  test("renders list of channels", async () => {
    render(<App />);
  
    const channel = await screen.findByText("egq123-2");
    expect(channel).toBeInTheDocument();

    const btnAddNewChannel = await screen.findByRole("createChannelButton");
    expect(btnAddNewChannel).toBeInTheDocument();
  
  });

  test("renders the create channel modal", async () => {
    render(<App />);
  
    const btnAddNewChannel = await screen.findByRole("createChannelButton");
    expect(btnAddNewChannel).toBeInTheDocument();
    userEvent.click(btnAddNewChannel);

    const createChannelHeader = await screen.findByText("Create a new channel");
    expect(createChannelHeader).toBeInTheDocument();

    

  
  });

  sessionStorage.clear();
});


