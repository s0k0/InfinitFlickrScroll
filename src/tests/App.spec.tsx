import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  test("renders and contains headline", () => {
    //Given
    const { getByText } = render(<App />);

    //When
    const headlineElement = getByText(/Gustav Klimt/);

    //Then
    expect(headlineElement).toBeInTheDocument();
  });
});
