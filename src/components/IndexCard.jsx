import React from 'react';

const IndexCard = ({ data, onCardClick }) => {
  const isNegative = data.change.startsWith('-');
  const colorClass = isNegative ? 'text-up' : 'text-down'; // Red for negative in image

  return (
    <div className="card index-card clickable" onClick={onCardClick}>
      <div className="index-header">
        <span className="index-name">{data.name}</span>
        <h2 className="index-value">{data.value}</h2>
        <span className={`index-change ${colorClass}`}>{data.change}</span>
      </div>
      <div className="index-details">
        <div className="detail-row">
          <span>시가 <span className="detail-val">{data.open}</span></span>
          <span>전일 <span className="detail-val">{data.prev}</span></span>
        </div>
        <div className="detail-row">
          <span className="text-up">고가 <span className="detail-val">{data.high}</span></span>
          <span className="text-down">저가 <span className="detail-val">{data.low}</span></span>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .index-card {
          flex: 1;
          min-width: 250px;
        }
        .clickable {
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .clickable:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }
        .index-name {
          font-size: 0.75rem;
          color: #94a3b8;
          text-transform: uppercase;
        }
        .index-value {
          font-size: 1.75rem;
          margin: 4px 0;
          color: #ffffff;
        }
        .index-change {
          font-size: 0.9rem;
          font-weight: 600;
        }
        .index-details {
          margin-top: 16px;
          font-size: 0.75rem;
          border-top: 1px solid #1e2633;
          padding-top: 12px;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
        }
        .detail-val {
          color: #f0f6fc;
          margin-left: 4px;
        }
      `}} />
    </div>
  );
};

export default IndexCard;
