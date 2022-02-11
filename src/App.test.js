

import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from '@testing-library/user-event';
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

describe("testing in Sign in Page", () => {
  test('render email input', () => {
    render(<App />);
    const inputEmail = screen.getByTestId("email-input");
    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toHaveAttribute("type", "text");
  });
  test('render password input', () => {
    render(<App />);

    const inputPassword = screen.getByTestId("password-input");
    expect(inputPassword).toBeInTheDocument();
    expect(inputPassword).toHaveAttribute("type", "password");
  });
  test('Check if return error message when you signin without email input value', () => {
    render(<App />);
 
    const inputEl = screen.getByTestId("email-input");
    userEvent.type(inputEl, "");
    const Signin = screen.getByText('Sign In with Email');
    fireEvent.click(Signin)
 
    expect(screen.getByTestId("email-input")).toHaveValue("");
    expect(screen.queryByTestId("error-msg")).toBeInTheDocument();
    expect(screen.queryByTestId("error-msg").textContent).toEqual("Email is required!");
  });
  test('Check if return error message when you signin without password input value', () => {
    render(<App />);
 
    const inputEl = screen.getByTestId("password-input");
    userEvent.type(inputEl, "");
    const Signin = screen.getByText('Sign In with Email');
    fireEvent.click(Signin)
 
    expect(screen.getByTestId("password-input")).toHaveValue("");
    expect(screen.queryByTestId("pw-error-msg")).toBeInTheDocument();
    expect(screen.queryByTestId("pw-error-msg").textContent).toEqual("Password is required");
  });
  test('Check if return error message when you input Invalid Email.', () => {
    render(<App />);
 
    const inputEl = screen.getByTestId("email-input");
    userEvent.type(inputEl, "test");
    const Signin = screen.getByText('Sign In with Email');
    fireEvent.click(Signin)
 
    expect(screen.getByTestId("email-input")).toHaveValue("test");
    expect(screen.queryByTestId("error-msg")).toBeInTheDocument();
    expect(screen.queryByTestId("error-msg").textContent).toEqual("This is not a valid email format!");
  });
  test('Check if return error message when you input less than 6 characters password.', () => {
    render(<App />);
 
    const inputEl = screen.getByTestId("password-input");
    userEvent.type(inputEl, "1");
    const Signin = screen.getByText('Sign In with Email');
    fireEvent.click(Signin)
 
    expect(screen.getByTestId("password-input")).toHaveValue("1");
    expect(screen.queryByTestId("pw-error-msg")).toBeInTheDocument();
    expect(screen.queryByTestId("pw-error-msg").textContent).toEqual("Password must be more than 5 characters");
  });
});
describe("testing in Sign up Page", () => {
  test("render Sign up Page", async () => {
        render(<App />);
        const CreateAccBtn = screen.getByText("Create an account");
        userEvent.click(CreateAccBtn);
    
        expect(await screen.findByText("First, enter your email")).toBeInTheDocument();
        expect(await screen.findByText("Continue")).toBeInTheDocument();
  });
  test("render email input", async () => {
    render(<App />);
      const inputEmail = screen.getByTestId("email1-input");
      expect(inputEmail).toBeInTheDocument();
      expect(inputEmail).toHaveAttribute("type", "text");
    });
    test('Check if return error message when you signup without email input value', () => {
      render(<App />);
   
      const inputEl = screen.getByTestId("email1-input");
      userEvent.type(inputEl, "");
      const Signup = screen.getByText('Continue');
      fireEvent.click(Signup)
   
      expect(screen.getByTestId("email1-input")).toHaveValue("");
      expect(screen.queryByTestId("error1-msg")).toBeInTheDocument();
      expect(screen.queryByTestId("error1-msg").textContent).toEqual("Email is required!");
    });
    test('Check if return error message when you signup without password input value', () => {
      render(<App />);
   
      const inputEl = screen.getByTestId("password1-input");
      userEvent.type(inputEl, "");
      const Signin = screen.getByText('Continue');
      fireEvent.click(Signin)
   
      expect(screen.getByTestId("password1-input")).toHaveValue("");
      expect(screen.queryByTestId("pw1-error-msg")).toBeInTheDocument();
      expect(screen.queryByTestId("pw1-error-msg").textContent).toEqual("Password is required");
    });
    test('Check if return error message when you signup without confirm_password input value', () => {
      render(<App />);
   
      const inputEl = screen.getByTestId("password2-input");
      userEvent.type(inputEl, "");
      const Signup = screen.getByText('Continue');
      fireEvent.click(Signup)
   
      expect(screen.getByTestId("password2-input")).toHaveValue("");
      expect(screen.queryByTestId("pw2-error-msg")).toBeInTheDocument();
      expect(screen.queryByTestId("pw2-error-msg").textContent).toEqual("Password is required");
    });
    test('Check if return error message when you input Invalid Email.', () => {
      render(<App />);
   
      const inputEl = screen.getByTestId("email1-input");
      userEvent.type(inputEl, "test");
      const Signup = screen.getByText('Continue');
      fireEvent.click(Signup)
   
      expect(screen.getByTestId("email1-input")).toHaveValue("test");
      expect(screen.queryByTestId("error1-msg")).toBeInTheDocument();
      expect(screen.queryByTestId("error1-msg").textContent).toEqual("This is not a valid email format!");
    });
    test('Check if return error message when the password and confirm password do not match.', () => {
      render(<App />);
   
      const inputPassword = screen.getByTestId("password1-input");
      userEvent.type(inputPassword, "123456");
      const inputConfirmPassword = screen.getByTestId("password2-input");
      userEvent.type(inputConfirmPassword, "1234567");
      const Signup = screen.getByText('Continue');
      fireEvent.click(Signup)
   
      expect(screen.getByTestId("password1-input")).toHaveValue("123456");
      expect(screen.getByTestId("password2-input")).toHaveValue("1234567");
      expect(screen.queryByTestId("pw1-error-msg")).toBeInTheDocument();
      expect(screen.queryByTestId("pw1-error-msg").textContent).toEqual("The password and confirmation password do not match.");
      expect(screen.queryByTestId("pw2-error-msg")).toBeInTheDocument();
      expect(screen.queryByTestId("pw2-error-msg").textContent).toEqual("The password and confirmation password do not match.");
    });
    test('Check if return error message when you input less than 6 characters password.', () => {
      render(<App />);
   
      const inputPassword = screen.getByTestId("password1-input");
      userEvent.type(inputPassword, "12345");
      const inputConfirmPassword = screen.getByTestId("password2-input");
      userEvent.type(inputConfirmPassword, "12345");
      const Signup = screen.getByText('Continue');
      fireEvent.click(Signup)
   
      expect(screen.getByTestId("password1-input")).toHaveValue("12345");
      expect(screen.getByTestId("password2-input")).toHaveValue("12345");
      expect(screen.queryByTestId("pw1-error-msg")).toBeInTheDocument();
      expect(screen.queryByTestId("pw1-error-msg").textContent).toEqual("Password must be more than 5 characters");
      expect(screen.queryByTestId("pw2-error-msg")).toBeInTheDocument();
      expect(screen.queryByTestId("pw2-error-msg").textContent).toEqual("Password must be more than 5 characters");
    });
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
    expect(await screen.findByText("Direct Messages")).toBeInTheDocument();
    expect(await screen.findByText(/Welcome to Slack/i)).toBeInTheDocument();
  });
  test("show display messages with selected user and sends message", async () => {
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
    const user = await screen.findByRole("link", { name: /dio/i });
    userEvent.click(user);
    const msgHeader = await screen.findByRole("heading", {
      name: /dio/i,
      level: 2,
    });
    expect(msgHeader).toBeInTheDocument();
    expect(await screen.findByText("Hi")).toBeInTheDocument();
    expect(await screen.findByText("Hey")).toBeInTheDocument();
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
    test("show error on creating a channel with blank name", async () => {
    render(<App />);
    const btnAddNewChannel = await screen.findByRole("createChannelButton");
    expect(btnAddNewChannel).toBeInTheDocument();
    userEvent.click(btnAddNewChannel);
    const createChannelHeader = await screen.findByText("Create a new channel");
    expect(createChannelHeader).toBeInTheDocument();
    const inputChannelName = screen.getByTestId("input-channel-name");
    userEvent.type(inputChannelName, "");
    const btnNext = await screen.findByText("Next");
    expect(btnNext).toBeInTheDocument();
    userEvent.click(btnNext);
    const errorMessage = await screen.findByText("Name cannot be blank");
    expect(errorMessage).toBeInTheDocument();
  });
  test("show error on creating a channel with existing name", async () => {
    render(<App />);
    const btnAddNewChannel = await screen.findByRole("createChannelButton");
    expect(btnAddNewChannel).toBeInTheDocument();
    userEvent.click(btnAddNewChannel);
    const createChannelHeader = await screen.findByText("Create a new channel");
    expect(createChannelHeader).toBeInTheDocument();
    const inputChannelName = screen.getByTestId("input-channel-name");
    userEvent.type(inputChannelName, "avion-team");
    const btnNext = await screen.findByText("Next");
    expect(btnNext).toBeInTheDocument();
    userEvent.click(btnNext);
    const addMembersHeader = await screen.findByText("Add members to");
    expect(addMembersHeader).toBeInTheDocument();
    const btnDone = await screen.findByText("Done");
    userEvent.click(btnDone);
   const showErrorExists = await screen.findByText("Name has already been taken");
    expect(showErrorExists).toBeInTheDocument();
  });
});

