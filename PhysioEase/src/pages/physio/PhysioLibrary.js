import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchAllVideos, fetchAllVideoRatings } from '../../services/apiService';
import '../../styles/physio/PhysioLibrary.css';

function PhysioLibrary() {
  const { t } = useTranslation();
  const [groupedVideos, setGroupedVideos] = useState({});
  const [ratingsMap, setRatingsMap] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const videos = await fetchAllVideos();
        const ratings = await fetchAllVideoRatings();
        const grouped = {};
        videos.forEach(video => {
          if (!grouped[video.category]) {
            grouped[video.category] = [];
          }
          grouped[video.category].push(video);
        });
        setGroupedVideos(grouped);
        const ratingSums = {};
        const ratingCounts = {};
        ratings.forEach(({ videoId, rating }) => {
          ratingSums[videoId] = (ratingSums[videoId] || 0) + rating;
          ratingCounts[videoId] = (ratingCounts[videoId] || 0) + 1;
        });

        const avgRatings = {};
        Object.keys(ratingSums).forEach(id => {
          avgRatings[id] = (ratingSums[id] / ratingCounts[id]).toFixed(1);
        });

        setRatingsMap(avgRatings);
      } catch (error) {
        console.error("Error loading physio video data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="physio-video-library">
      <h1>{t('videoLibrary')}</h1>

      {Object.entries(groupedVideos).map(([category, videos]) => (
        <div key={category} className="video-category">
          <h2>{t(category)}</h2>
          <div className="video-grid">
            {videos.map(video => (
              <div className="video-card" key={video.id}>
                <img src={video.previewImage} alt={video.title} />
                <h3>{video.title}</h3>
                <p>{video.description}</p>
                <p className="rating">
                  ⭐ {ratingsMap[video.title] || t('noRating')}
                </p>
                <a href={video.youtubeLink} target="_blank" rel="noreferrer">
                  {t('watchVideo')}
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PhysioLibrary;