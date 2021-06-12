import React from 'react';

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
        <img key={image.id} src={url} alt={image.title}/>
    )
}

export { ImageCard }; 
