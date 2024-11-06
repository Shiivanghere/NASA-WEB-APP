import React from 'react';

function ImageList({ images }) {
  return (
    <div className="image-list">
      {images.map((image, index) => (
        <div key={index} className="image-item">
          <img src={image.links[0].href} alt={image.data[0].title} />
          <p>{image.data[0].title}</p>
        </div>
      ))}
    </div>
  );
}

export default ImageList;