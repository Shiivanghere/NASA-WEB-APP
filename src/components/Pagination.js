import React from 'react';
import { useImageContext } from '../context/ImageContext';
import '../styles/Pagination.css';

function Pagination() {
  const { currentPage, totalResults, setCurrentPage, fetchImages } = useImageContext();
  const resultsPerPage = 100;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchImages(null, page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="pagination">
      <button 
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button 
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;