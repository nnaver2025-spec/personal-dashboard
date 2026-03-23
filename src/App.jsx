import React, { useState, useEffect } from 'react';
import TopTicker from './components/TopTicker';
import IndexCard from './components/IndexCard';
import NewsSection from './components/NewsSection';
import IndicatorGrid from './components/IndicatorGrid';
import EconomicCalendar from './components/EconomicCalendar';
import ChartModal from './components/ChartModal';
import NewsModal from './components/NewsModal';
import { fetchMarketData, fetchNewsData, fetchCalendarData } from './services/api';

function App() {
  const [marketData, setMarketData] = useState({ indices: [], indicators: [] });
  const [newsData, setNewsData] = useState([]);
  const [calendarData, setCalendarData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState('');
  
  // Modals state
  const [selectedChartSymbol, setSelectedChartSymbol] = useState(null);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      try {
        const mData = await fetchMarketData();
        if (mData && mData.indices && isMounted) {
          setMarketData(mData);
        }
        
        const nData = await fetchNewsData();
        if (nData && isMounted) {
          setNewsData(nData);
        }
        
        const cData = await fetchCalendarData();
        if (cData && isMounted) {
          setCalendarData(cData);
        }
        
        if (isMounted) {
          setLastUpdated(new Date().toLocaleString('ko-KR'));
        }
      } catch (error) {
        console.error("Failed to refresh data", error);
      }
    };

    loadData(); // Initial load
    const interval = setInterval(loadData, 60000); // Auto-refresh every 60s
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <TopTicker indices={marketData.indices} />
      <div className="dashboard-container">
        <header className="main-header">
          <h1>대시보드</h1>
          <span className="last-trading">마지막 업데이트: {lastUpdated || '불러오는 중...'}</span>
        </header>

        <section className="indices-grid">
          {marketData.indices.map((idx, i) => (
            <IndexCard key={i} data={idx} onCardClick={() => setSelectedChartSymbol(idx.tvSymbol)} />
          ))}
        </section>

        <NewsSection news={newsData} onMoreClick={() => setIsNewsModalOpen(true)} />

        <h3 className="section-title" style={{ marginTop: '30px', marginBottom: '10px' }}>주요 경제지표</h3>
        <IndicatorGrid indicators={marketData.indicators} onCardClick={(tvSymbol) => setSelectedChartSymbol(tvSymbol)} />

        <EconomicCalendar calendar={calendarData} />
      </div>

      {selectedChartSymbol && (
        <ChartModal tvSymbol={selectedChartSymbol} onClose={() => setSelectedChartSymbol(null)} />
      )}
      
      {isNewsModalOpen && (
        <NewsModal news={newsData} onClose={() => setIsNewsModalOpen(false)} />
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .main-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .last-trading {
          font-size: 0.8rem;
          color: #94a3b8;
        }
        .indices-grid {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        h1 { margin-bottom: 0; }
        
        /* Modal Base Styles appended here globally since App is root */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(5px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          position: relative;
          box-shadow: 0 10px 25px rgba(0,0,0,0.5);
        }
        .close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          transition: color 0.2s;
        }
        .close-btn:hover { color: #fff; }
      `}} />
    </>
  );
}

export default App;
