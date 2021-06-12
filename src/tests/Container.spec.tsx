import { Container } from "../components/Container";
import { render, screen } from "@testing-library/react";

describe("Container Component", () => {
  test("renders and contains logo", () => {
    render(<Container />);
    const flickrLogo = screen.getByAltText(/flickr-logo/i);
    expect(flickrLogo).toBeInTheDocument();
  });
});
