import React from 'react';

const EconomicCalendar = ({ calendar }) => {
  return (
    <div className="card calendar-card">
      <h3 className="section-title">미국 경제 캘린더</h3>
      <div className="calendar-table">
        <div className="event-row table-header">
          <span className="ev-time">시간</span>
          <span className="ev-flag">국가</span>
          <span className="ev-name">지표명</span>
          <span className="ev-actual">실제치</span>
          <span className="ev-forecast">예상치</span>
          <span className="ev-prev">이전치</span>
        </div>
        {calendar.map((day, i) => (
          <div key={i} className="calendar-day">
            <div className="day-header">{day.date}</div>
            {day.events.map((ev, j) => (
              <div key={j} className="event-row">
                <span className="ev-time">{ev.time}</span>
                <span className="ev-flag">{ev.country === 'US' ? '🇺🇸' : ev.country}</span>
                <span className="ev-name">{ev.event}</span>
                <span className="ev-actual">{ev.actual}</span>
                <span className="ev-forecast text-secondary">{ev.forecast || '-'}</span>
                <span className="ev-prev text-secondary">{ev.previous || '-'}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .calendar-card {
          margin-top: 20px;
        }
        .calendar-day {
          margin-bottom: 16px;
        }
        .day-header {
          background: #1e2633;
          padding: 6px 12px;
          font-size: 0.85rem;
          font-weight: 600;
          border-radius: 4px;
          margin-bottom: 12px;
          color: #58a6ff;
        }
        .event-row {
          display: grid;
          grid-template-columns: 80px 40px 1fr 100px 100px 100px;
          padding: 8px 12px;
          font-size: 0.85rem;
          border-bottom: 1px solid #1e2633;
          align-items: center;
        }
        .table-header {
          color: #64748b;
          font-size: 0.75rem;
          border-bottom: 1px solid #1e2633;
          margin-bottom: 8px;
        }
        .event-row:last-child { border-bottom: none; }
        .ev-time { color: #94a3b8; }
        .ev-actual { font-weight: 600; text-align: right; }
        .ev-forecast, .ev-prev { text-align: right; }
      `}} />
    </div>
  );
};

export default EconomicCalendar;
