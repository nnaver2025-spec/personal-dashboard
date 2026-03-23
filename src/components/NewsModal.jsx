import React from 'react';
import { X } from 'lucide-react';

const NewsModal = ({ news, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content news-modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
        <h2 style={{ marginBottom:('20px') }}>최신 뉴스 전체보기</h2>
        <div className="full-news-list">
          {news && news.map((item, i) => (
            <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="news-item full-news-item">
              <p className="news-title">{item.title}</p>
              <span className="news-source">{item.source}</span>
            </a>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .news-modal {
          width: 90%;
          max-width: 800px;
          max-height: 80vh;
          overflow-y: auto;
        }
        .full-news-list {
          display: flex;
          flex-direction: column;
        }
        .full-news-item {
          text-decoration: none;
          display: flex;
          justify-content: space-between;
          padding: 16px 0;
          border-bottom: 1px solid #1e2633;
          transition: background-color 0.2s;
        }
        .full-news-item:hover {
          background-color: rgba(255,255,255,0.05);
        }
        .full-news-item:last-child {
          border-bottom: none;
        }
      `}} />
    </div>
  );
};

export default NewsModal;
