from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf
import feedparser
import urllib.request
import urllib.parse
import json
from deep_translator import GoogleTranslator
from typing import Dict, List
from datetime import datetime, timezone, timedelta
import asyncio
import time

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

TV_SYMBOLS = {
    "^GSPC": "AMEX:SPY",
    "^IXIC": "NASDAQ:QQQ",
    "^DJI": "AMEX:DIA",
    "^RUT": "AMEX:IWM",
    "^TNX": "US10Y",
    "^FVX": "US05Y",
    "DX-Y.NYB": "DXY",
    "^VIX": "VIX",
    "GC=F": "GC1!",
    "CL=F": "CL1!",
    "BTC-USD": "CRYPTO:BTCUSD",
    "KRW=X": "FX_IDC:USDKRW"
}

def get_ticker_data(symbol: str, name: str, type_str: str = "index") -> Dict:
    try:
        t = yf.Ticker(symbol)
        info = t.fast_info
        last = info.last_price
        prev = info.previous_close
        change_val = last - prev
        change_pct = (change_val / prev) * 100
        
        change_str = f"{change_val:+.2f} ({change_pct:+.2f}%)"
        if type_str == "yield":
            change_str = f"{change_val:+.2f}"
            
        return {
            "name": name,
            "symbol": symbol,
            "tvSymbol": TV_SYMBOLS.get(symbol, symbol),
            "value": f"{last:,.2f}" if type_str != "crypto" else f"{last:,.0f}",
            "change": change_str,
            "open": f"{info.open:,.2f}" if getattr(info, 'open', None) else "-",
            "prev": f"{prev:,.2f}" if prev else "-",
            "high": f"{info.day_high:,.2f}" if getattr(info, 'day_high', None) else "-",
            "low": f"{info.day_low:,.2f}" if getattr(info, 'day_low', None) else "-",
            "type": type_str,
            "color": "red" if change_val < 0 else "green"
        }
    except Exception as e:
        print(f"Error fetching {symbol}: {e}")
        return {
            "name": name, "symbol": symbol, "tvSymbol": TV_SYMBOLS.get(symbol, symbol),
            "value": "-", "change": "-", "open": "-", "prev": "-", 
            "high": "-", "low": "-", "type": type_str
        }

@app.get("/api/market")
async def get_market_data():
    loop = asyncio.get_event_loop()
    def fetch_all():
        indices = [
            get_ticker_data("^GSPC", "S&P 500"),
            get_ticker_data("^IXIC", "NASDAQ"),
            get_ticker_data("^DJI", "DOW JONES"),
            get_ticker_data("^RUT", "RUSSELL 2000")
        ]
        indicators = [
            get_ticker_data("^TNX", "미국 10년 국채", "yield"),
            get_ticker_data("^FVX", "미국 5년 국채", "yield"), 
            get_ticker_data("DX-Y.NYB", "달러 인덱스", "index"),
            get_ticker_data("^VIX", "VIX 공포지수", "index"),
            get_ticker_data("GC=F", "금 선물", "commodity"),
            get_ticker_data("CL=F", "WTI 원유", "commodity"),
            get_ticker_data("BTC-USD", "비트코인", "crypto"),
            get_ticker_data("KRW=X", "원/달러 환율", "fx")
        ]
        return indices, indicators

    indices, indicators = await loop.run_in_executor(None, fetch_all)
    return {"indices": indices, "indicators": indicators}

@app.get("/api/news")
async def get_news():
    def fetch_news():
        translator = GoogleTranslator(source='auto', target='ko')
        news_list = []
        def fetch_feed(url, source_name):
            try:
                feed = feedparser.parse(url)
                return [{"title": entry.title, "link": getattr(entry, 'link', '#'), "source": source_name} for entry in feed.entries[:10]]
            except:
                return []
                
        raw_news = []
        raw_news.extend(fetch_feed("https://finance.yahoo.com/news/rssindex", "Yahoo Finance"))
        raw_news.extend(fetch_feed("https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=10000664", "CNBC"))
        raw_news.extend(fetch_feed("https://feeds.marketwatch.com/marketwatch/topstories", "MarketWatch"))
        raw_news.extend(fetch_feed("https://seekingalpha.com/market_currents.xml", "Seeking Alpha"))
        
        # Translate titles
        translated_news = []
        for item in raw_news[:20]:
            try:
                # Add a bit of timeout/safety but deep-translator is synchronous
                translated_title = translator.translate(item["title"])
                item["title_ko"] = translated_title
            except Exception as e:
                print(f"Translation error: {e}")
                item["title_ko"] = item["title"]
            translated_news.append(item)
            
        return translated_news
            
    loop = asyncio.get_event_loop()
    news_list = await loop.run_in_executor(None, fetch_news)
    return {"news": news_list}

FRED_SERIES = {
    "GDP": "GDP",
    "Nonfarm Payrolls": "PAYEMS",
    "Non-Farm": "PAYEMS",
    "Unemployment Rate": "UNRATE",
    "CPI": "CPIAUCSL",
    "Core CPI": "CPILFESL",
    "PPI": "PPIACO",
    "Core PPI": "PPIFES",
    "PCE": "PCE",
    "Core PCE": "PCEPILFE",
    "Retail Sales": "RSAFS",
    "Industrial Production": "INDPRO",
    "Durable Goods": "DGORDER",
    "Housing Starts": "HOUST",
    "Building Permits": "PERMIT",
    "Existing Home Sales": "EXHOSLUSM495S",
    "New Home Sales": "HSN1F",
    "Consumer Confidence": "UMCSENT",
    "Michigan": "UMCSENT",
    "ISM Manufacturing": "MANEMP",
    "ISM Services": "NMFCI",
    "PMI": "MANEMP",
    "Initial Jobless Claims": "ICSA",
    "Jobless Claims": "ICSA",
    "Continuing Jobless Claims": "CCSA",
    "Trade Balance": "BOPGSTB",
    "JOLTS": "JTSJOL",
    "ADP": "ADPWNUSNERSA",
    "Fed Funds Rate": "FEDFUNDS",
    "Interest Rate": "FEDFUNDS",
    "Treasury": "DGS10",
    "10-Year": "DGS10",
    "2-Year": "DGS2",
    "Import Price": "IR",
    "Export Price": "IQ",
    "Capacity Utilization": "TCU",
    "Factory Orders": "AMTMNO",
    "Personal Income": "PI",
    "Personal Spending": "PCE",
}

def get_fred_url(event_title: str) -> str:
    """Match event title to FRED series and return URL."""
    for keyword, series_id in FRED_SERIES.items():
        if keyword.lower() in event_title.lower():
            return f"https://fred.stlouisfed.org/series/{series_id}"
    # Fallback: search on FRED
    return f"https://fred.stlouisfed.org/search?st={urllib.parse.quote(event_title)}"

CALENDAR_CACHE = {"data": [], "timestamp": 0}

@app.get("/api/calendar")
async def get_calendar():
    global CALENDAR_CACHE
    def fetch_calendar():
        # Use cache if less than 1 hour old
        if time.time() - CALENDAR_CACHE["timestamp"] < 3600 and CALENDAR_CACHE["data"]:
            return CALENDAR_CACHE["data"]
            
        try:
            translator = GoogleTranslator(source='en', target='ko')
            req = urllib.request.Request(
                "https://nfs.faireconomy.media/ff_calendar_thisweek.json",
                headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0'}
            )
            with urllib.request.urlopen(req, timeout=10) as response:
                data = json.loads(response.read().decode())
                
            grouped = {}
            kst = timezone(timedelta(hours=9))
            
            for item in data:
                if item.get("country") != "USD": continue
                impact = item.get("impact", "")
                
                # "High" = 중요도 3, "Medium" = 중요도 2
                if impact not in ["High", "Medium"]: continue
                
                date_str = item.get("date")
                if not date_str: continue
                # Parse ISO string like "2024-03-20T10:00:00-04:00"
                date_str = date_str.replace("Z", "+00:00")
                dt = datetime.fromisoformat(date_str)
                dt_kst = dt.astimezone(kst)
                
                day_key = dt_kst.strftime("%m월 %d일")
                time_val = dt_kst.strftime("%H:%M")
                
                # Translate event title to Korean
                event_title = item.get("title", "")
                try:
                    event_title_ko = translator.translate(event_title) if event_title else ""
                except:
                    event_title_ko = event_title
                
                if day_key not in grouped:
                    grouped[day_key] = []
                    
                grouped[day_key].append({
                    "time": time_val,
                    "country": "US",
                    "event": event_title_ko or event_title,
                    "fred_url": get_fred_url(item.get("title", "")),
                    "actual": item.get("actual", "") or "-",
                    "forecast": item.get("forecast", "") or "-",
                    "previous": item.get("previous", "") or "-"
                })
                
            result = [{"date": k, "events": v} for k, v in grouped.items()]
            CALENDAR_CACHE["data"] = result
            CALENDAR_CACHE["timestamp"] = time.time()
            return result
        except Exception as e:
            print("Error fetching calendar:", e)
            if CALENDAR_CACHE["data"]:
                return CALENDAR_CACHE["data"]
            return [{"date": "안내", "events": [{"time": "-", "country": "US", "event": "무료 API 제한(429)으로 인해 일시적으로 데이터를 불러올 수 없습니다. 잠시 후 갱신됩니다.", "actual": "-", "forecast": "-", "previous": "-"}]}]
            
    loop = asyncio.get_event_loop()
    calendar_data = await loop.run_in_executor(None, fetch_calendar)
    return {"calendar": calendar_data}

