import { ImageCard } from "../components/ImageCard/ImageCard";
import { render, screen } from "@testing-library/react";

describe("ImageCard Component", () => {
  let image = {
    id: "1234",
    title: "This is a dummy",
    server: "1",
    farm: 2,
    secret: "secret",
  };
  let favourites = ["1234"];
  let mockClick = jest.fn();

  test("renders main container logo", () => {
    render(
      <ImageCard
        id={image.id}
        title={image.title}
        server={image.server}
        farm={image.farm}
        secret={image.secret}
        favourites={favourites}
        onClick={mockClick}
      />
    );
    const altImage = screen.getByAltText(image.title);
    expect(altImage).toBeInTheDocument();
  });
});
