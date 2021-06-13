import React from "react";
import { ImageCard } from "../components/ImageCard/ImageCard";
import { render, fireEvent } from "@testing-library/react";

describe("ImageCard Component", () => {
  let image = {
    id: "1234",
    title: "This is a dummy",
    server: "1",
    farm: 2,
    secret: "secret"
  };
  let favourites = ["1234"];
  let mockClick = jest.fn();

  test("renders image with given alt and src", () => {
    //Given
    const fakeSrc = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`;
    const { getByAltText } = render(
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

    //When
    const imageCard = getByAltText(image.title);

    //Then
    expect(imageCard).toBeInTheDocument();
    expect(imageCard).toHaveAttribute("src", fakeSrc);
  });

  test("on click at heart button function is called", () => {
    //Given
    const { getByRole } = render(
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

    //When
    const heartButton = getByRole("button", { name: /favourite/ });

    fireEvent.click(heartButton);

    //Then
    expect(mockClick).toHaveBeenCalled();
  });
});
