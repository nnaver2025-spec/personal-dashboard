import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const TopTicker = ({ indices }) => {
  return (
    <div className="ticker-wrapper">
      <div className="ticker-content">
        {indices.map((idx, i) => (
          <div key={i} className="ticker-item">
            <span className="ticker-name">{idx.name}</span>
            <span className="ticker-value">{idx.value}</span>
            <span className={`ticker-change ${idx.change.startsWith('-') ? 'text-up' : 'text-down'}`}>
              {idx.change}
            </span>
          </div>
        ))}
        {/* Duplicate for seamless loop if needed, but for now just static */}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .ticker-wrapper {
          background: #0a0d14;
          border-bottom: 1px solid #1e2633;
          padding: 8px 0;
          overflow: hidden;
          font-size: 0.85rem;
          white-space: nowrap;
        }
        .ticker-content {
          display: flex;
          gap: 30px;
          padding-left: 20px;
        }
        .ticker-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ticker-name { color: #94a3b8; }
        .ticker-value { font-weight: 600; }
      `}} />
    </div>
  );
};

export default TopTicker;
