import React from "react";
import "./ImageCard.scss";

export interface ImageCardProps {
  title: string;
  id: string;
  farm: number;
  secret: string;
  server: string;
  owner: string;
  favourites: string[];
  onClick: (id: string) => void;
}

const ImageCard = ({
  title,
  id,
  farm,
  secret,
  server,
  owner,
  favourites,
  onClick,
}: ImageCardProps) => {
  const isFavourite = favourites.indexOf(id) > -1;

  const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
  return (
    <div className={isFavourite ? "active image-card" : "image-card"}>
      <img className="thumbnail" key={id} src={url} alt={title} />
      <div className="overlay">
        <button className="favourite" onClick={() => onClick(id)} aria-label="favourite">
            <div className={isFavourite ? "active" : "inactive"} id="heart" />
        </button>
        <div className="caption">
          <p>{title}</p>
          <hr/>
          <p>{owner}</p>
        </div>
        </div>
    </div>
  );
};

export { ImageCard };
