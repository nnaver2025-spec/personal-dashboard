import React from 'react';
import { X } from 'lucide-react';

const ChartModal = ({ tvSymbol, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content chart-modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
        <div className="chart-container">
          <iframe
            src={`https://s.tradingview.com/widgetembed/?symbol=${tvSymbol}&interval=D&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=Etc%2FUTC&withdateranges=1&showpopupbutton=1&locale=en`}
            width="100%"
            height="500"
            frameBorder="0"
            allowtransparency="true"
            scrolling="no"
          ></iframe>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .chart-modal {
          width: 95%;
          max-width: 1000px;
          padding: 40px 20px 20px;
        }
        .chart-container {
          width: 100%;
          height: 500px;
          border-radius: 8px;
          overflow: hidden;
        }
      `}} />
    </div>
  );
};

export default ChartModal;
