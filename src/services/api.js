import { marketIndices, indicators, news, calendar } from '../data/mockData';

const API_URL = 'http://localhost:8000/api';

export const fetchMarketData = async () => {
    try {
        const response = await fetch(`${API_URL}/market`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error("Error fetching real market data, falling back to mock:", error);
        return { indices: marketIndices, indicators: indicators };
    }
};

export const fetchNewsData = async () => {
    try {
        const response = await fetch(`${API_URL}/news`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (data.news && data.news.length > 0) return data.news;
        return news; // Fallback to mock
    } catch (error) {
        console.error("Error fetching real news data, falling back to mock:", error);
        return news;
    }
};

export const fetchCalendarData = async () => {
    try {
        const response = await fetch(`${API_URL}/calendar`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (data.calendar && data.calendar.length > 0) return data.calendar;
        return calendar; // Fallback to mock
    } catch (error) {
        console.error("Error fetching real calendar data, falling back to mock:", error);
        return calendar;
    }
};
