import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const ImageContext = createContext();

export function ImageProvider({ children }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchImages = async (query = '', page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://images-api.nasa.gov/search`,
        {
          params: {
            q: query || '',
            media_type: 'image',
            page: page,
          }
        }
      );
      setImages(response.data.collection.items);
      setTotalResults(response.data.collection.metadata.total_hits);
    } catch (err) {
      setError('Failed to fetch images');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageContext.Provider 
      value={{
        images,
        loading,
        error,
        currentPage,
        totalResults,
        setCurrentPage,
        fetchImages,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
}

export function useImageContext() {
  return useContext(ImageContext);
}