import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  test("renders and contains headline", () => {
    render(<App />);
    const headlineElement = screen.getByText(/Gustav Klimt/i);
    expect(headlineElement).toBeInTheDocument();
  });
});
