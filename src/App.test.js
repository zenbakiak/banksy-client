import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders signup link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Sign Up/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders login link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Log In/i);
  expect(linkElement).toBeInTheDocument();
});
