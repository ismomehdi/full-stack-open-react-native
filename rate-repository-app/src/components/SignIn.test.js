import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { SignInForm } from "./SignIn";

const onSubmit = jest.fn();

describe("Sign in form", () => {
  it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
    render(<SignInForm onSubmit={onSubmit} />);
    fireEvent.changeText(screen.getByPlaceholderText("Username"), "kalle");
    fireEvent.changeText(screen.getByPlaceholderText("Password"), "password");
    fireEvent.press(screen.getByText("Sign in"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: "kalle",
        password: "password",
      });
    });
  });
});
