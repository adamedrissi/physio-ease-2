import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './VideoLibrary.css';

const categories = [
  { id: 1, nameKey: "resistance", slug: "resistance" },
  { id: 2, nameKey: "stretching", slug: "stretching" },
  { id: 3, nameKey: "strengthening", slug: "strengthening" },
  { id: 4, nameKey: "functional", slug: "functional" },
  { id: 5, nameKey: "balanceNeuromuscular", slug: "balance-neuromuscular" },
];

function VideoLibrary() {
    const { t } = useTranslation();
  return (
    <div>
      <h1>{t('videoLibrary')}</h1>
      <p>{t('selectCategory')}</p>
      <div className="video-categories-container">
        {categories.map(category => (
          <div key={category.id} className="video-category-box">
            <Link to={`/video-library/${category.slug}`}>
              <h3>{t(category.nameKey)}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoLibrary;