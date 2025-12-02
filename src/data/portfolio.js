/**
 * 포트폴리오 페이지용 Mock 데이터
 */

export const PORTFOLIO_SUMMARY = [
  { label: '총 평가액', value: '₩45,320,000', icon: '💰', color: 'from-purple-100 to-purple-200 text-purple-700' },
  { label: '총 투자금', value: '₩37,450,000', icon: '📊', color: 'from-blue-100 to-blue-200 text-blue-700' },
  { label: '평가 손익', value: '+₩7,870,000', icon: '📈', color: 'from-emerald-100 to-emerald-200 text-emerald-700', isProfit: true },
  { label: '수익률', value: '+21.0%', icon: '🎯', color: 'from-amber-100 to-amber-200 text-amber-700', isProfit: true },
];

export const HOLDINGS = [
  { name: '삼성전자', code: '005930', shares: 50, avgPrice: '₩68,000', currentPrice: '₩72,400', profit: '+6.5%', profitAmount: '+₩220,000', isProfit: true },
  { name: 'SK하이닉스', code: '000660', shares: 20, avgPrice: '₩138,000', currentPrice: '₩145,200', profit: '+5.2%', profitAmount: '+₩144,000', isProfit: true },
  { name: 'NAVER', code: '035420', shares: 15, avgPrice: '₩205,000', currentPrice: '₩198,500', profit: '-3.2%', profitAmount: '-₩97,500', isProfit: false },
  { name: '카카오', code: '035720', shares: 80, avgPrice: '₩54,200', currentPrice: '₩52,300', profit: '-3.5%', profitAmount: '-₩152,000', isProfit: false },
];

export const ASSET_ALLOCATION = [
  { category: '국내 주식', percentage: 65, amount: '₩29,458,000', color: 'bg-purple-500' },
  { category: '해외 주식', percentage: 25, amount: '₩11,330,000', color: 'bg-blue-500' },
  { category: '현금', percentage: 10, amount: '₩4,532,000', color: 'bg-emerald-500' },
];

