/**
 * 대시보드 페이지용 Mock 데이터
 */

export const PORTFOLIO_STOCKS = [
  { name: '삼성전자', symbol: '005930', price: '₩72,400', change: '+2.3%', trend: 'up' },
  { name: 'SK하이닉스', symbol: '000660', price: '₩145,200', change: '+5.1%', trend: 'up' },
  { name: 'NAVER', symbol: '035420', price: '₩198,500', change: '-1.2%', trend: 'down' },
  { name: '카카오', symbol: '035720', price: '₩52,300', change: '+0.8%', trend: 'up' },
];

export const SUMMARY_CARDS = [
  {
    id: 'balance',
    label: '총 자산',
    value: '₩45,320,000',
    change: '+3.2% 오늘',
    changeType: 'positive',
    gradient: 'from-purple-500 to-indigo-600',
    icon: '💰',
  },
  {
    id: 'invested',
    label: '투자 원금',
    value: '₩37,450,000',
    change: '+₩520,000 이번 주',
    changeType: 'positive',
    gradient: 'from-blue-500 to-cyan-600',
    icon: '📈',
  },
  {
    id: 'cash',
    label: '가용 현금',
    value: '₩7,870,000',
    change: '신규 입금 없음',
    changeType: 'neutral',
    gradient: 'from-emerald-500 to-teal-600',
    icon: '💵',
  },
];

