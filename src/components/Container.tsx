import * as config from '../config.json';
import { ImageCard, ImageCardProps } from './ImageCard/ImageCard'
import React, { useState, useEffect } from 'react';
import './Container.scss'
import logo from '../Flickr_logo.png'
import InfiniteScroll from 'react-infinite-scroll-component';

function Container() {
  const query = 'Gustav Klimt'
  const [images, setImages] = useState<ImageCardProps[]>([])
  const [page, setPage] = useState<number>(1)
  //TODO: saveFavourite() in local storage
  const getImages = () => {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&text=${query}&media=photos&api_key=${config.apiKey}&per_page=24&page=${page}&format=json&nojsoncallback=true`)
      .then(response => response.json())
      .then(data => {
        setImages(images.concat(data.photos.photo))
        setPage(page + 1)
      })
      .catch(error => {
        console.log('Error fetching data', error);
      })
  }

  useEffect(() => {
    getImages()
  }, [])

  return (
    <div className="container">
      <h1> <img className="logo" src={logo} />: "{query}"</h1>
      <InfiniteScroll
        className="image-list"
        dataLength={images.length}
        next={getImages}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {images.map(image => ImageCard(image))}
      </InfiniteScroll>
    </div>
  )
}

export { Container } 
