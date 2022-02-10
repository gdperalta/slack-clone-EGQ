import { fireEvent,render, screen } from "@testing-library/react";
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
  const linkElement = screen.getByText(/Sign out/i);
  expect(linkElement).toBeInTheDocument();
});
