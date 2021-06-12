import * as config from '../config.json';
import axios from 'axios';
import { ImageCard } from './ImageCard'
import React, { useState, useEffect } from 'react';

function Container() {
  const [loading, setLoading] = useState<boolean>(false)
  const [images, setImages] = useState<any[]>([])

  const getRecentImages = () => {
    setLoading(true)
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&text=cats&api_key=${config.apiKey}&per_page=24&page=1&format=json&nojsoncallback=true`)
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
      {(loading) ? <p>Please wait...</p> :
        images.map(image => ImageCard(image))}
    </div>
  )
}

export { Container } 
