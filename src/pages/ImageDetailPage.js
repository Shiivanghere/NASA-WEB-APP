import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/ImageDetailPage.css';

function ImageDetailPage() {
  const { nasaId } = useParams();
  const navigate = useNavigate();
  const [imageDetails, setImageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImageDetails = async () => {
      try {
        const response = await axios.get(
          `https://images-api.nasa.gov/asset/${nasaId}`
        );
        setImageDetails(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load image details');
        setLoading(false);
      }
    };

    fetchImageDetails();
  }, [nasaId]);

  const handleDownload = async () => {
    try {
      const response = await fetch(imageDetails.collection.items[0].href);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nasa-image-${nasaId}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to download image');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;
  if (!imageDetails) return <div>No image found</div>;

  return (
    <div className="image-detail-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      {imageDetails && (
        <div className="image-detail-container">
          <img 
            src={imageDetails.collection.items[0].href} 
            alt={imageDetails.collection.items[0].title} 
          />
          <div className="image-info">
            <h2>{imageDetails.collection.items[0].title}</h2>
            <p>{imageDetails.collection.items[0].description}</p>
            <button 
              className="download-button"
              onClick={handleDownload}
            >
              Download Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageDetailPage;