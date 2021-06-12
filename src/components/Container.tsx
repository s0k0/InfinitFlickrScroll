import * as config from "../config.json";
import { ImageCard } from "./ImageCard/ImageCard";
import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Container.scss";
import logo from "../Flickr_logo.png";

interface ImageProps {
  id: string;
  farm: number;
  secret: string;
  title: string;
  server: string;
}

const saveFavourites = (favs: string[]): void => {
  localStorage.setItem("favourites", JSON.stringify(favs));
};

const getFavourites = (): string[] => {
  const favourites = localStorage.getItem("favourites");
  return favourites ? JSON.parse(favourites) : [];
};

const MAX_PAGE_LIMIT = 25;

function Container() {
  const query = "Gustav Klimt";
  const [images, setImages] = useState<ImageProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);

  const getImages = () => {
    setLoading(true);
    fetch(
      `https://api.flickr.com/services/rest/?method=flickr.photos.search&text=${query}&media=photos&api_key=${config.apiKey}&per_page=24&page=${page}&format=json&nojsoncallback=true`
    )
      .then((response) => response.json())
      .then((data) => {
        setImages(images.concat(data.photos.photo));
        setPage(page + 1);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching data", error);
      });
  };

  const observer = useRef<IntersectionObserver>();
  const lastImageElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page < MAX_PAGE_LIMIT) {
          getImages();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

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

  return (
    <div className="container">
      <div className="headline">
        <img className="logo" src={logo} alt="flickr-logo" />
        <h1> "{query}"</h1>
      </div>
      <div className="image-list">
        {loading && images.length === 0 ? (
          <h3> Loading ... </h3>
        ) : (
          images.map((image, index) => {
            if (index + 1 === images.length) {
              return (
                <div ref={lastImageElementRef}>
                  <ImageCard
                    title={image.title}
                    id={image.id}
                    farm={image.farm}
                    secret={image.secret}
                    server={image.server}
                    favourites={favourites}
                    onClick={() => hanldeClick(image.id)}
                  />
                </div>
              );
            } else {
              return (
                <ImageCard
                  title={image.title}
                  id={image.id}
                  farm={image.farm}
                  secret={image.secret}
                  server={image.server}
                  favourites={favourites}
                  onClick={() => hanldeClick(image.id)}
                />
              );
            }
          })
        )}
      </div>
    </div>
  );
}

export { Container };
