import React from "react";
import { Container } from "../components/Container";
import { render } from "@testing-library/react";

describe("Container Component", () => {
  test("renders and contains logo", () => {
    //Given
    const { getByAltText } = render(<Container />);

    //When
    const flickrLogo = getByAltText(/flickr-logo/i);

    //Then
    expect(flickrLogo).toBeInTheDocument();
  });
});
