import React, { useEffect } from 'react';
import { useImageContext } from '../context/ImageContext';
import SearchForm from '../components/SearchForm';
import ImageGrid from '../components/ImageGrid';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
function HomePage() {
  const { loading, error, fetchImages } = useImageContext();

  useEffect(() => {
    
    fetchImages();
  }, []);

  return (
    <div className="home-page">
      <SearchForm />
      {loading && <LoadingSpinner />}
      {error && <div className="error-message">{error}</div>}
      <ImageGrid />
      <Pagination />
    </div>
  );
}

export default HomePage;