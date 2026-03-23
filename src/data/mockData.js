export const marketIndices = [
  { name: 'S&P 500', value: '6,506.48', change: '-1.51%', open: '6,594.66', prev: '6,606.45', high: '6,594.66', low: '6,473.52', color: 'red' },
  { name: 'NASDAQ', value: '21,647.61', change: '-2.01%', open: '21,989.33', prev: '22,090.89', high: '21,997.09', low: '21,522.75', color: 'red' },
  { name: 'DOW JONES', value: '45,577.47', change: '-0.96%', open: '45,975.65', prev: '46,021.43', high: '46,068.31', low: '45,369.39', color: 'red' },
  { name: 'RUSSELL 2000', value: '2,438.45', change: '-2.26%', open: '2,494.27', prev: '2,494.71', high: '2,496.59', low: '2,422.99', color: 'red' },
];

export const news = [
  { title: "Oil prices rise as Trump's Hormuz ultimatum and Iran threats keep markets on edge", source: "CNBC" },
  { title: "European Gas Resumes Gains as US and Iran Trade Hormuz Threats", source: "Bloomberg" },
  { title: "Zenith Energy to begin construction on 7 MWp solar plant in Italy", source: "Investing.com" },
  { title: "Tokio Marine to form strategic partnership with Berkshire Hathaway, initially sell 2.49% stake", source: "Investing.com" },
  { title: "Pilot, co-pilot killed after passenger jet hits ground fire truck at New York's LaGuardia airport", source: "Investing.com" },
];

export const indicators = [
  { name: '미국 10년 국채', symbol: 'US10Y', value: '4.2%', change: '+0.05', type: 'yield' },
  { name: '미국 2년 국채', symbol: 'US02Y', value: '4.5%', change: '+0.02', type: 'yield' },
  { name: '달러 인덱스', symbol: 'DXY', value: '104.2', change: '+0.15', type: 'index' },
  { name: 'VIX 공포지수', symbol: 'VIX', value: '15.4', change: '+2.10', type: 'index' },
  { name: '금 선물', symbol: 'GC1!', value: '2,150.2', change: '-12.4', type: 'commodity' },
  { name: 'WTI 원유', symbol: 'CL1!', value: '78.45', change: '+0.85', type: 'commodity' },
  { name: '비트코인', symbol: 'BTCUSD', value: '68,353', change: '+493', type: 'crypto' },
  { name: '원/달러 환율', symbol: 'USDKRW', value: '1,508.860', change: '+5.2', type: 'fx' },
];

export const calendar = [
  { date: '3월 23일', events: [
    { time: '21:30', country: 'US', event: 'National Activity Index', actual: '0.18', forecast: '', previous: '0.1' },
    { time: '23:00', country: 'US', event: 'Construction Spending MM', actual: '0.1%', forecast: '0.3%', previous: '-0.2%' },
  ]},
  { date: '3월 24일', events: [
    { time: '00:00', country: 'US', event: 'Exp Soybean Inspected', actual: '966.082K', forecast: '', previous: '' },
    { time: '00:00', country: 'US', event: 'Export Corn Inspected', actual: '1,658.771K', forecast: '', previous: '' },
  ]},
];
