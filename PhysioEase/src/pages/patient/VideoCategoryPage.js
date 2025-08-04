import React, { useState, useEffect, useContext} from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../styles/patient/VideoCategoryPage.css';
import { submitVideoRating, fetchUserVideoRatings } from '../../services/apiService';
import { markVideoAsWatched, fetchWatchedVideos } from '../../services/apiService';
import { UserContext } from '../../UserContext';

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
      title: "Resistance Training Guide for the Time-Poor - Be Mobile Physiotherapy",
      youtubeLink: "https://www.youtube.com/watch?v=p9yyQ5fb0sI&pp=ygUqcGh5c2lvdGhlcmFweSByZXNpc3RhbmNlIHRyYWluaW5nIHR1dG9yaWFs",
      previewImage: "https://i.ytimg.com/vi/p9yyQ5fb0sI/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBGm0Zqdj4e9fJMKqiEFtSasctsmw",
      description: "Advanced resistance training tips for building muscle."
    }
  ],
  stretching: [
    {
      id: 1,
      title: "Neck Exercises & Stretches that Relieve Neck & Shoulders - Michelle Kenway",
      youtubeLink: "https://www.youtube.com/watch?v=t-1Z2ZYpmt0&pp=ygUhcGh5c2lvdGhlcmFweSBzdHJldGNoaW5nIHRyYWluaW5n",
      previewImage: "https://i.ytimg.com/vi/t-1Z2ZYpmt0/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDCofevZkKSLD89jw4CSOzAy2Kv9w",
      description: "Improve your flexibility with this dynamic stretching routine."
    },
    {
      id: 2,
      title: "Quick Morning Stretching Routine For Flexibility, Mobility, And Stiffness",
      youtubeLink: "https://www.youtube.com/watch?v=t2jel6q1GRk&pp=ygUhcGh5c2lvdGhlcmFweSBzdHJldGNoaW5nIHRyYWluaW5n",
      previewImage: "https://i.ytimg.com/vi/t2jel6q1GRk/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDsS8BZHBXXB9bmUXrq353NkStwuA",
      description: "A relaxing routine for static stretching exercises."
    }
  ],
  strengthening: [
    {
      id: 1,
      title: "Abdominal Strenghtening Exercises - NHS",
      youtubeLink: "https://www.youtube.com/watch?v=pFK0xXEnv6s&pp=ygUlc3RyZW5ndGhlbmluZyBleGVyY2lzZXMgcGh5c2lvdGhlcmFwedIHCQmFCQGHKiGM7w%3D%3D",
      previewImage: "https://i.ytimg.com/vi/pFK0xXEnv6s/hq720.jpg?sqp=-oaymwFBCNAFEJQDSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AHUBoAC4AOKAgwIABABGDcgVihyMA8=&rs=AOn4CLDsMhrFh98nNuHKH6ykSGaEjDcgSQ",
      description: "Build muscle strength effectively with this workout."
    },
    {
      id: 2,
      title: "Basic Hip Strenghening Exercises - Physical Therapy 101",
      youtubeLink: "https://www.youtube.com/watch?v=Omm8UjzQGPo&pp=ygUlc3RyZW5ndGhlbmluZyBleGVyY2lzZXMgcGh5c2lvdGhlcmFweQ%3D%3D",
      previewImage: "https://i.ytimg.com/vi/Omm8UjzQGPo/hq720.jpg?sqp=-oaymwFBCNAFEJQDSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-CYAC0AWKAgwIABABGEEgTihlMA8=&rs=AOn4CLAqIoWZi6AMek0vmDmBiMcUkENNhA",
      description: "Strength training for beginners explained step-by-step."
    }
  ],
  functional: [
    {
      id: 1,
      title: "Functional Assessment in Physiotherapy - Physiotutors",
      youtubeLink: "https://www.youtube.com/watch?v=cmFExKxV0dE&pp=ygUhZnVuY3Rpb25hbCB0cmFpbmluZyBwaHlzaW90aGVyYXB5",
      previewImage: "https://i.ytimg.com/vi/cmFExKxV0dE/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBMdhWgEEsycKs17PHLkomeKee8tA",
      description: "Exercises to improve everyday functional movements."
    },
    {
      id: 2,
      title: "Functional Exercises for Multiple Sclerosis - Dr. Gretchen Hawley",
      youtubeLink: "https://www.youtube.com/watch?v=D_QY4FnPd5I&pp=ygUhZnVuY3Rpb25hbCB0cmFpbmluZyBwaHlzaW90aGVyYXB5",
      previewImage: "https://i.ytimg.com/vi/D_QY4FnPd5I/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDojSUsvNxYlm-2CxmM_8MGKKoc5Q",
      description: "Functional training routines for increased stability."
    }
  ],
  "balance-neuromuscular": [
    {
      id: 1,
      title: "10 Minute Balance Exercises - Jessica Valant",
      youtubeLink: "https://www.youtube.com/watch?v=uth_9K3EmDI&pp=ygUdYmFsYW5jZSBuZXVyb211c2N1bGFyIHRoZXJhcHk%3D",
      previewImage: "https://i.ytimg.com/vi/uth_9K3EmDI/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLATqaCOx_1Fdb9W5htMzx_W13s0mQ",
      description: "Improve balance and coordination with these exercises."
    },
    {
      id: 2,
      title: "Neuromuscular Training for Concussion Recovery - Physiotutors",
      youtubeLink: "https://www.youtube.com/watch?v=LcGyN5FyZEg&pp=ygUdYmFsYW5jZSBuZXVyb211c2N1bGFyIHRoZXJhcHk%3D",
      previewImage: "https://i.ytimg.com/vi/LcGyN5FyZEg/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDkg7skXlNpRPEW_bK8vkY1QuliEw",
      description: "Exercises designed to enhance neuromuscular control."
    }
  ]
};

function VideoCategoryPage() {
    const { category } = useParams();
    //const categoryVideos = videoData[category] || [];
    const { t } = useTranslation();
    const [videosState, setVideosState] = useState([]);
    const { user } = useContext(UserContext);
    
    useEffect(() => {
    const fetchData = async () => {
    const videos = videoData[category] || [];
    let ratingsMap = {};
    let watchedSet = new Set();
    try {
      const userRatings = await fetchUserVideoRatings(user.id);
      ratingsMap = userRatings.reduce((acc, r) => {
        acc[r.videoId] = r.rating;
        return acc;
      }, {});
    } catch (err) {
      console.error('Failed to load ratings:', err);
    }
    try {
      const watchedList = await fetchWatchedVideos(user.id);
      watchedSet = new Set(watchedList.map(w => w.videoId));
    } catch (err) {
      console.error('Failed to load watched videos:', err);
    }
    setVideosState(
      videos.map(video => ({
        ...video,
        watched: watchedSet.has(video.title),
        rating: ratingsMap[video.title] || null
      }))
    );
  };
  fetchData();
  }, [category, user.id]);
    
    const [ratingModalVideo, setRatingModalVideo] = useState(null);
    const [tempRating, setTempRating] = useState(0);
    
    const openRatingModal = (video) => {
      setRatingModalVideo(video);
      setTempRating(video.rating !== null ? video.rating : 0);
    };
    
    const closeRatingModal = () => {
      setRatingModalVideo(null);
      setTempRating(0);
    };
    
    const handleRatingSubmit = async (e) => {
      e.preventDefault();
      try {
        await submitVideoRating({
          userId: user.id,
          videoId: ratingModalVideo.title,
          rating: tempRating
        });
        setVideosState(prevVideos =>
          prevVideos.map(video =>
          video.id === ratingModalVideo.id ? { ...video, rating: tempRating } : video
        )
      );
    } catch (err) {
      console.error("Error submitting rating:", err);
    }

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
                    onClick={() => {
                      if (!video.watched) {
                        markVideoAsWatched({
                          userId: user.id,
                          videoId: video.title
                        });
                        setVideosState(prev =>
                          prev.map(v =>
                            v.id === video.id ? { ...v, watched: true } : v
                          )
                        );
                      }
                    }}
                  >
                    {t('watchVideo')}
                  </a>
                  <div className="video-controls">
                    <label>
                      <input 
                        type="checkbox" 
                        checked={video.watched}
                        disabled
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