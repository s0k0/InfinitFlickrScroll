import * as config from '../config.json';
import axios from 'axios';
import { ImageCard, ImageCardProps } from './ImageCard/ImageCard'
import React, { useState, useEffect } from 'react';
import './Container.scss'
import logo from '../Flickr_logo.png'

function Container() {
  const [loading, setLoading] = useState<boolean>(false)
  const [images, setImages] = useState<ImageCardProps[]>([])
  const [query, setQuery] = useState<string>('Gustav Klimt')

  const getRecentImages = () => {
    setLoading(true)
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&text=${query}&media=photos&api_key=${config.apiKey}&per_page=24&page=1&format=json&nojsoncallback=true`)
      .then(response => {
        setLoading(false)
        setImages(response.data.photos.photo)
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
        setLoading(false)
      })
  }
  useEffect(() => {
    getRecentImages()
  }, [])


  return (
    <div className="image-container">
      <h1> <img className="logo" src={logo} />: "{query}"</h1>
      <div className="image-list">
        {loading ? <h5>Please wait...</h5> :
          images.map(image => ImageCard(image))}
      </div>
    </div>
  )
}

export { Container } 
