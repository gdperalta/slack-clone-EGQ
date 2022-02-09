import { render, screen } from "@testing-library/react";
import App from "./App";
import { messageHandlers } from "./testServer";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";

const server = setupServer(...messageHandlers);

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
  test("should login and navigate to home page", async () => {
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

  sessionStorage.clear();
});
