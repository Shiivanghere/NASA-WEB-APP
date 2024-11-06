import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { useImageContext } from '../context/ImageContext';
import '../styles/SearchForm.css';

function SearchForm() {
  const [searchTerm, setSearchTerm] = useState('');
  const { fetchImages, setCurrentPage } = useImageContext();

 
  const debouncedSearch = useCallback(
    debounce((query) => {
      setCurrentPage(1);
      fetchImages(query, 1);
    }, 500),
    []
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div className="search-form">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search NASA images..."
        className="search-input"
      />
    </div>
  );
}

export default SearchForm;