import React from 'react';

const NewsSection = ({ news, onMoreClick }) => {
  const displayNews = news ? news.slice(0, 5) : [];
  
  return (
    <div className="card news-section">
      <div className="news-header">
        <h3 className="section-title" style={{ marginBottom: 0 }}>최신 뉴스</h3>
        <button className="more-btn" onClick={onMoreClick}>더보기</button>
      </div>
      <div className="news-list">
        {displayNews.map((item, i) => (
          <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="news-item">
            <p className="news-title">{item.title_ko || item.title}</p>
            <span className="news-source">{item.source}</span>
          </a>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .news-section {
          margin-top: 20px;
        }
        .news-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .more-btn {
          background: none;
          border: none;
          color: #58a6ff;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
        }
        .more-btn:hover {
          text-decoration: underline;
        }
        .news-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #1e2633;
          text-decoration: none;
          transition: background-color 0.2s;
        }
        .news-item:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }
        .news-item:last-child { border-bottom: none; }
        .news-title {
          font-size: 0.9rem;
          color: #f0f6fc;
          flex: 1;
          padding-right: 20px;
          margin: 0;
        }
        .news-source {
          font-size: 0.75rem;
          color: #64748b;
        }
      `}} />
    </div>
  );
};

export default NewsSection;
