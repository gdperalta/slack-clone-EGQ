import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import App from "./App";
import { handlers } from "./testServer";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { act } from "react-dom/test-utils";

const server = setupServer(...handlers);

beforeAll(() => {
  //render(<App />);
  //const loginBtn = screen.getByText("Sign in with Email");

  server.listen();
});
afterEach(() => {
  cleanup;
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

test("should login and display interface when logged in", async () => {
  const { findByText } = render(<App />);
  const loginBtn = screen.getByText("Sign In with Email");
  userEvent.click(loginBtn);

  const header = await findByText("Header");
  expect(header).toBeInTheDocument();

  const dm = await findByText("Direct Messages");
  expect(dm).toBeInTheDocument();

  const user = await findByText("odie");
  expect(user).toBeInTheDocument();

  const outlet = await findByText("Select a Channel");
  expect(outlet).toBeInTheDocument();
});

test("should login and display interface when logged in", async () => {
  const { findByText } = render(<App />);
  /*const loginBtn = screen.getByText("Sign In with Email");
  userEvent.click(loginBtn); */

  const user = await findByText("odie");
  userEvent.click(user);

  const msgHeader = await findByText("Hi odie");

  expect(msgHeader).toBeInTheDocument();
});
