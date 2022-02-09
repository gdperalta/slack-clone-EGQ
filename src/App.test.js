import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { handlers } from "./testServer";
import { setupServer } from "msw/node";
import { rest } from "msw";

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

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders list of channels", async () => {
 /*  server.use(
 
  ); */

  render(<App />);
  const btnLogin = screen.getByText("Sign In with Email");
  userEvent.click(btnLogin);

  //expect(await screen.findByText("Channels")).toBeInTheDocument();
  const btnChannels =  await screen.findByText("Channels");
  userEvent.click(btnChannels);
  screen.debug();

  /*  const channel = screen.getByText("egq123-2");
  expect(channel).toBeInTheDocument(); */
});
