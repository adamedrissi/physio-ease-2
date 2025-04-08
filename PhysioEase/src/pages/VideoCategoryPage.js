import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './VideoCategoryPage.css';

const videoData = {
  resistance: [
    {
      id: 1,
      title: "Manual Resistance - PNF Patterns",
      youtubeLink: "https://www.youtube.com/watch?v=uHRaGdLymGA",
      previewImage: "https://i.ytimg.com/vi/uHRaGdLymGA/hqdefault.jpg?sqp=-oaymwE9CNACELwBSFryq4qpAy8IARUAAAAAGAElAADIQj0AgKJDeAHwAQH4Af4JgALQBYoCDAgAEAEYZSBcKFAwDw==&rs=AOn4CLAimLcG-LBBfdgPpLzJGQrtD2zK_w",
      description: "Learn proper form and techniques for resistance training."
    },
    {
      id: 2,
      title: "Resistance Exercise Video 2",
      youtubeLink: "https://www.youtube.com/watch?v=VIDEO_ID_2",
      previewImage: "https://img.youtube.com/vi/VIDEO_ID_2/0.jpg",
      description: "Advanced resistance training tips for building muscle."
    }
  ],
  stretching: [
    {
      id: 1,
      title: "Stretching Exercise Video 1",
      youtubeLink: "https://www.youtube.com/watch?v=VIDEO_ID_3",
      previewImage: "https://img.youtube.com/vi/VIDEO_ID_3/0.jpg",
      description: "Improve your flexibility with this dynamic stretching routine."
    },
    {
      id: 2,
      title: "Stretching Exercise Video 2",
      youtubeLink: "https://www.youtube.com/watch?v=VIDEO_ID_4",
      previewImage: "https://img.youtube.com/vi/VIDEO_ID_4/0.jpg",
      description: "A relaxing routine for static stretching exercises."
    }
  ],
  strengthening: [
    {
      id: 1,
      title: "Strengthening Exercise Video 1",
      youtubeLink: "https://www.youtube.com/watch?v=VIDEO_ID_5",
      previewImage: "https://img.youtube.com/vi/VIDEO_ID_5/0.jpg",
      description: "Build muscle strength effectively with this workout."
    },
    {
      id: 2,
      title: "Strengthening Exercise Video 2",
      youtubeLink: "https://www.youtube.com/watch?v=VIDEO_ID_6",
      previewImage: "https://img.youtube.com/vi/VIDEO_ID_6/0.jpg",
      description: "Strength training for beginners explained step-by-step."
    }
  ],
  functional: [
    {
      id: 1,
      title: "Functional Exercise Video 1",
      youtubeLink: "https://www.youtube.com/watch?v=VIDEO_ID_7",
      previewImage: "https://img.youtube.com/vi/VIDEO_ID_7/0.jpg",
      description: "Exercises to improve everyday functional movements."
    },
    {
      id: 2,
      title: "Functional Exercise Video 2",
      youtubeLink: "https://www.youtube.com/watch?v=VIDEO_ID_8",
      previewImage: "https://img.youtube.com/vi/VIDEO_ID_8/0.jpg",
      description: "Functional training routines for increased stability."
    }
  ],
  "balance-neuromuscular": [
    {
      id: 1,
      title: "Balance & Neuromuscular Video 1",
      youtubeLink: "https://www.youtube.com/watch?v=VIDEO_ID_9",
      previewImage: "https://img.youtube.com/vi/VIDEO_ID_9/0.jpg",
      description: "Improve balance and coordination with these exercises."
    },
    {
      id: 2,
      title: "Balance & Neuromuscular Video 2",
      youtubeLink: "https://www.youtube.com/watch?v=VIDEO_ID_10",
      previewImage: "https://img.youtube.com/vi/VIDEO_ID_10/0.jpg",
      description: "Exercises designed to enhance neuromuscular control."
    }
  ]
};

function VideoCategoryPage() {
    const { category } = useParams();
    const categoryVideos = videoData[category] || [];
    const { t } = useTranslation();
    const [videosState, setVideosState] = useState([]);
    
    useEffect(() => {
      setVideosState(
        categoryVideos.map(video => ({
          ...video,
          watched: false,
          rating: null
        }))
      );
    }, [category, categoryVideos]);
    
    const [ratingModalVideo, setRatingModalVideo] = useState(null);
    const [tempRating, setTempRating] = useState(0);
    
    const handleWatchedChange = (videoId, checked) => {
      setVideosState(prevVideos =>
        prevVideos.map(video =>
          video.id === videoId ? { ...video, watched: checked } : video
        )
      );
    };
    
    const openRatingModal = (video) => {
      setRatingModalVideo(video);
      setTempRating(video.rating !== null ? video.rating : 0);
    };
    
    const closeRatingModal = () => {
      setRatingModalVideo(null);
      setTempRating(0);
    };
    
    const handleRatingSubmit = (e) => {
      e.preventDefault();
      setVideosState(prevVideos =>
        prevVideos.map(video =>
          video.id === ratingModalVideo.id ? { ...video, rating: tempRating } : video
        )
      );
      closeRatingModal();
    };
  
    const formatCategoryName = (slug) => {
      switch(slug) {
        case "resistance": return t('resistance');
        case "stretching": return t('stretching');
        case "strengthening": return t('strengthening');
        case "functional": return t('functional');
        case "balance-neuromuscular": return t('balanceNeuromuscular');
        default: return "";
      }
    };
    
    return (
      <div>
        <h1>{formatCategoryName(category)}</h1>
        {videosState.length > 0 ? (
          <ul className="video-list">
            {videosState.map(video => (
              <li key={video.id} className="video-item">
                <img
                  src={video.previewImage}
                  alt={video.title}
                  className="video-preview"
                />
                <div className="video-info">
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                  <a
                    href={video.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="watch-button"
                  >
                    {t('watchVideo')}
                  </a>
                  <div className="video-controls">
                    <label>
                      <input 
                        type="checkbox" 
                        checked={video.watched}
                        onChange={(e) => handleWatchedChange(video.id, e.target.checked)}
                      />
                      {t('watched')}
                    </label>
                    <button onClick={() => openRatingModal(video)} className="feedback-button">
                      {video.rating !== null ? `Rated: ${video.rating}` : t('gFeedback')}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>{t('noVideos')}</p>
        )}
        <Link to="/video-library" className="back-link">{t('backCategories')}</Link>
        
        {ratingModalVideo && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>{t('rate')} {ratingModalVideo.title}</h2>
              <form onSubmit={handleRatingSubmit}>
                <div className="rating-group">
                  <p>{t('selectRating')}</p>
                  {[0, 1, 2, 3, 4, 5].map(value => (
                    <label key={value}>
                      <input
                        type="radio"
                        name="rating"
                        value={value}
                        checked={tempRating === value}
                        onChange={() => setTempRating(value)}
                      />
                      {value}
                    </label>
                  ))}
                </div>
                <div className="modal-buttons">
                  <button type="button" onClick={closeRatingModal}>{t('cancel')}</button>
                  <button type="submit">{t('submitRating')}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  export default VideoCategoryPage;