import React from 'react';
import { Link } from 'react-router-dom';
import { useImageContext } from '../context/ImageContext';
import '../styles/ImageGrid.css';

function ImageGrid() {
  const { images } = useImageContext();

  return (
    <div className="image-grid">
      {images.map((image, index) => (
        <div key={index} className="image-card">
          <div className="image-card-inner">
            <div className="image-card-front">
              <img 
                src={image.links[0].href} 
                alt={image.data[0].title} 
              />
            </div>
            <div className="image-card-back">
              <h3>{image.data[0].title}</h3>
              <p>Date: {image.data[0].date_created}</p>
              <Link to={`/image/${image.data[0].nasa_id}`}>View Details</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImageGrid;