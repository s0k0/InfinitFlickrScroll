import React from 'react';
import './ImageCard.scss'

export interface ImageCardProps {
    farm: number;
    server: string;
    id: string;
    secret: string;
    title: string;
}

function ImageCard(image: ImageCardProps) {

    const url = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`;
    return (
        <div className="image-card">
            <img className="thumbnail" key={image.id} src={url} alt={image.title} />
        </div>
    )
}

export { ImageCard }; 
