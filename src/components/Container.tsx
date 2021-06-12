import * as config from "../config.json";
import { ImageCard, ImageCardProps } from "./ImageCard/ImageCard";
import React, { useState, useEffect } from "react";
import "./Container.scss";
import logo from "../Flickr_logo.png";
import InfiniteScroll from "react-infinite-scroll-component";

const saveFavourites = (favs: string[]): void => {
  localStorage.setItem("favourites", JSON.stringify(favs));
};

const getFavourites = (): string[] => {
  const favourites = localStorage.getItem("favourites");
  return favourites ? JSON.parse(favourites) : [];
};

function Container() {
  const query = "Gustav Klimt";
  const [images, setImages] = useState<ImageCardProps[]>([]);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);

  const getImages = () => {
    fetch(
      `https://api.flickr.com/services/rest/?method=flickr.photos.search&text=${query}&media=photos&api_key=${config.apiKey}&per_page=24&page=${page}&format=json&nojsoncallback=true`
    )
      .then((response) => response.json())
      .then((data) => {
        setImages(images.concat(data.photos.photo));
        setPage(page + 1);
      })
      .catch((error) => {
        console.log("Error fetching data", error);
      });
  };

  const hanldeClick = (id: string) => {
    const updateFavourites =
      favourites.indexOf(id) > -1
        ? favourites.filter((fav) => fav !== id)
        : [...favourites, id];
    saveFavourites(updateFavourites);
    setFavourites(updateFavourites);
  };

  useEffect(() => {
    getImages();
    const updateFavourites = getFavourites();
    setFavourites(updateFavourites);
  }, []);

  //TODO: replace infinite scroll with self made solution
  return (
    <div className="container">
      <h1>
        <img className="logo" src={logo} alt="flickr-logo" />: "{query}"
      </h1>
      <InfiniteScroll
        className="image-list"
        dataLength={images.length}
        next={getImages}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {images.map((image) => (
          <ImageCard
            title={image.title}
            id={image.id}
            farm={image.farm}
            secret={image.secret}
            server={image.server}
            favourites={favourites}
            onClick={() => hanldeClick(image.id)}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export { Container };
