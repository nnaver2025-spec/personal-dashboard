import React from 'react';

const IndicatorGrid = ({ indicators, onCardClick }) => {
  return (
    <div className="indicator-grid">
      {indicators.map((ind, i) => (
        <div key={i} className="card indicator-card clickable" onClick={() => onCardClick(ind.tvSymbol)}>
          <div className="ind-header">
            <span className="ind-name">{ind.name}</span>
            <span className="ind-symbol">{ind.symbol}</span>
          </div>
          <div className="ind-body">
            <span className="ind-value">{ind.value}</span>
            <span className={`ind-change ${ind.change.startsWith('-') ? 'text-up' : 'text-down'}`}>
              {ind.change}
            </span>
          </div>
        </div>
      ))}
      <style dangerouslySetInnerHTML={{ __html: `
        .indicator-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
          margin-top: 20px;
        }
        .indicator-card {
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .clickable {
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .clickable:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }
        .ind-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: #94a3b8;
        }
        .ind-symbol {
          background: #1e2633;
          padding: 2px 6px;
          border-radius: 4px;
          color: #fff;
        }
        .ind-body {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .ind-value {
          font-size: 1.25rem;
          font-weight: 600;
        }
        .ind-change {
          font-size: 0.8rem;
        }
      `}} />
    </div>
  );
};

export default IndicatorGrid;
