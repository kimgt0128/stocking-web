/**
 * 리서치 페이지용 Mock 데이터
 */

export const RESEARCH_STATS = [
  { label: '오늘의 뉴스', value: '328건', icon: '📰', color: 'from-blue-500 to-cyan-600' },
  { label: '리포트', value: '47건', icon: '📊', color: 'from-purple-500 to-indigo-600' },
  { label: '주목 기업', value: '12개', icon: '🏢', color: 'from-emerald-500 to-teal-600' },
];

export const MARKET_NEWS = [
  {
    id: 1,
    category: '국내증시',
    title: 'KOSPI, 외국인 순매수에 2,650선 회복',
    source: '연합뉴스',
    time: '10분 전',
    summary: '코스피 지수가 외국인 투자자들의 대규모 순매수에 힘입어 2,650선을 회복했습니다.',
    image: '📈',
  },
  {
    id: 2,
    category: '반도체',
    title: '삼성전자, HBM3E 양산 본격화... 실적 개선 기대',
    source: '매일경제',
    time: '35분 전',
    summary: '삼성전자가 고대역폭메모리(HBM3E) 양산을 본격화하며 실적 개선이 기대됩니다.',
    image: '💾',
  },
  {
    id: 3,
    category: '2차전지',
    title: 'LG에너지솔루션, 북미 공장 추가 증설 결정',
    source: '한국경제',
    time: '1시간 전',
    summary: 'LG에너지솔루션이 전기차 수요 증가에 대응하기 위해 북미 지역 공장을 추가 증설하기로 했습니다.',
    image: '🔋',
  },
];

export const ANALYST_REPORTS = [
  {
    id: 1,
    company: '삼성전자',
    analyst: '김증권 (KB증권)',
    rating: 'BUY',
    targetPrice: '₩85,000',
    currentPrice: '₩72,400',
    upside: '+17.4%',
    date: '2025-01-24',
  },
  {
    id: 2,
    company: 'SK하이닉스',
    analyst: '이애널 (미래에셋)',
    rating: 'BUY',
    targetPrice: '₩170,000',
    currentPrice: '₩145,200',
    upside: '+17.1%',
    date: '2025-01-24',
  },
  {
    id: 3,
    company: 'NAVER',
    analyst: '박리서치 (NH투자)',
    rating: 'HOLD',
    targetPrice: '₩210,000',
    currentPrice: '₩198,500',
    upside: '+5.8%',
    date: '2025-01-23',
  },
];

export const ECONOMIC_CALENDAR = [
  { date: '01/25', event: '한국 GDP 성장률 발표', importance: 'high' },
  { date: '01/26', event: '미국 소비자 신뢰지수', importance: 'medium' },
  { date: '01/27', event: 'ECB 통화정책 회의', importance: 'high' },
  { date: '01/30', event: '삼성전자 실적발표', importance: 'high' },
];

export const SECTOR_ANALYSIS = [
  { sector: '반도체', score: 85, trend: 'up', color: 'bg-emerald-500' },
  { sector: '2차전지', score: 78, trend: 'up', color: 'bg-blue-500' },
  { sector: '바이오', score: 65, trend: 'same', color: 'bg-purple-500' },
  { sector: '금융', score: 52, trend: 'down', color: 'bg-amber-500' },
];

