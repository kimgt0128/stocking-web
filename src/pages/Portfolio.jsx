import PropTypes from 'prop-types';
import { useState, useMemo, useRef, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, PieChart, Pie, Cell, Legend } from 'recharts';
import { PORTFOLIO_SUMMARY, HOLDINGS, ASSET_ALLOCATION } from '../data';
import StockIcon from '../components/common/StockIcon';

/**
 * 날짜를 YYYY-MM-DD 형식으로 변환하는 헬퍼 함수
 */
const formatDateString = (date) => {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Mock 데이터 생성 함수 (다이어리와 동일)
 */
const generateMockEntries = () => {
  const today = new Date();
  const entries = [];
  let idCounter = 1;

  // 이번 주 데이터 (월~일)
  const thisWeekStart = new Date(today);
  const currentDay = today.getDay();
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
  thisWeekStart.setDate(today.getDate() + mondayOffset);
  
  const thisWeekEntries = [
    { stock: '삼성전자', type: 'BUY', price: '₩72,400', shares: 10, reason: '반도체 업황 개선 기대. 최근 실적 발표에서 긍정적인 전망 제시', emotion: '긍정적', tags: ['반도체', '장기투자'] },
    { stock: 'SK하이닉스', type: 'SELL', price: '₩145,200', shares: 5, reason: '목표가 도달로 일부 수익 실현. 추가 상승 가능성도 있지만 리스크 관리 차원', emotion: '만족', tags: ['수익실현', '리스크관리'] },
    { stock: 'NAVER', type: 'BUY', price: '₩198,500', shares: 3, reason: 'AI 기술 투자 확대 발표. 장기적 성장 가능성 높음', emotion: '기대', tags: ['AI', '성장주'] },
    { stock: '카카오', type: 'BUY', price: '₩52,300', shares: 20, reason: '모바일 게임 부문 성장세 지속', emotion: '긍정적', tags: ['게임', '모바일'] },
  ];

  thisWeekEntries.forEach((entry, index) => {
    const date = new Date(thisWeekStart);
    date.setDate(thisWeekStart.getDate() + index);
    if (date <= today) {
      entries.push({
        id: idCounter++,
        date: formatDateString(date),
        ...entry,
      });
    }
  });

  // 저번 주 데이터
  const lastWeekStart = new Date(thisWeekStart);
  lastWeekStart.setDate(thisWeekStart.getDate() - 7);
  
  const lastWeekEntries = [
    { stock: 'LG전자', type: 'SELL', price: '₩98,500', shares: 8, reason: '목표가 달성으로 수익 실현', emotion: '만족', tags: ['가전', '수익실현'] },
    { stock: '현대차', type: 'BUY', price: '₩245,000', shares: 5, reason: '전기차 시장 확대 기대', emotion: '기대', tags: ['전기차', '자동차'] },
    { stock: '셀트리온', type: 'BUY', price: '₩185,000', shares: 7, reason: '신약 파이프라인 긍정적 전망', emotion: '긍정적', tags: ['바이오', '신약'] },
  ];

  lastWeekEntries.forEach((entry, index) => {
    const date = new Date(lastWeekStart);
    date.setDate(lastWeekStart.getDate() + index * 2);
    entries.push({
      id: idCounter++,
      date: formatDateString(date),
      ...entry,
    });
  });

  // 이번 달 데이터
  const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const thisMonthEntries = [
    { stock: '포스코', type: 'BUY', price: '₩425,000', shares: 3, reason: '철강 수요 회복 기대', emotion: '긍정적', tags: ['철강', '원자재'] },
    { stock: 'KB금융', type: 'BUY', price: '₩58,200', shares: 15, reason: '금리 인하 기대에 따른 금융주 상승', emotion: '기대', tags: ['금융', '은행'] },
    { stock: 'LG화학', type: 'SELL', price: '₩412,000', shares: 4, reason: '단기 조정 국면 진입', emotion: '중립', tags: ['화학', '조정'] },
    { stock: '아모레퍼시픽', type: 'BUY', price: '₩125,000', shares: 8, reason: '중국 시장 회복 기대', emotion: '기대', tags: ['화장품', '소비재'] },
  ];

  thisMonthEntries.forEach((entry, index) => {
    const date = new Date(thisMonthStart);
    date.setDate(1 + index * 3);
    const weekStart = new Date(thisWeekStart);
    weekStart.setDate(weekStart.getDate() - 7);
    const weekEnd = new Date(thisWeekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    if (date < weekStart || date > weekEnd) {
      entries.push({
        id: idCounter++,
        date: formatDateString(date),
        ...entry,
      });
    }
  });

  // 저번 달 데이터
  const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const lastMonthEntries = [
    { stock: '삼성SDI', type: 'BUY', price: '₩385,000', shares: 5, reason: '2차전지 수요 증가', emotion: '긍정적', tags: ['2차전지', '배터리'] },
    { stock: 'SK텔레콤', type: 'BUY', price: '₩52,800', shares: 12, reason: '5G 인프라 확대', emotion: '기대', tags: ['통신', '5G'] },
    { stock: '한화솔루션', type: 'SELL', price: '₩28,500', shares: 20, reason: '목표가 달성', emotion: '만족', tags: ['에너지', '수익실현'] },
    { stock: '롯데케미칼', type: 'BUY', price: '₩185,000', shares: 6, reason: '화학 업황 개선', emotion: '긍정적', tags: ['화학', '업황개선'] },
    { stock: 'CJ제일제당', type: 'BUY', price: '₩385,000', shares: 3, reason: '식품 부문 성장', emotion: '긍정적', tags: ['식품', '소비재'] },
  ];

  lastMonthEntries.forEach((entry, index) => {
    const date = new Date(lastMonthStart);
    date.setDate(5 + index * 5);
    entries.push({
      id: idCounter++,
      date: formatDateString(date),
      ...entry,
    });
  });

  return entries.sort((a, b) => new Date(a.date) - new Date(b.date));
};

/**
 * 가격 문자열에서 숫자 추출
 */
const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  const cleaned = priceStr.replace(/[₩,]/g, '');
  return parseInt(cleaned, 10) || 0;
};

/**
 * 날짜별 포트폴리오 데이터 계산
 * 주식 수를 주식 평가액으로 환산
 */
const calculatePortfolioData = (entries, initialCash = 10000000) => {
  const dataMap = new Map();
  let currentCash = initialCash;
  // 종목별 보유 주식 수와 가격 추적
  const stockHoldings = new Map(); // { stockName: { shares: number, lastPrice: number } }

  // 모든 날짜에 대한 데이터 포인트 생성
  const allDates = [...new Set(entries.map(e => e.date))].sort();
  
  allDates.forEach(date => {
    const dayEntries = entries.filter(e => e.date === date);
    
    dayEntries.forEach(entry => {
      const price = parsePrice(entry.price);
      const shares = entry.shares || 0;
      const stockName = entry.stock;
      
      if (entry.type === 'BUY') {
        const cost = price * shares;
        if (currentCash >= cost) {
          currentCash -= cost;
          // 종목별 보유 주식 수 업데이트
          const current = stockHoldings.get(stockName) || { shares: 0, lastPrice: price };
          stockHoldings.set(stockName, {
            shares: current.shares + shares,
            lastPrice: price, // 마지막 매수가로 업데이트
          });
        }
      } else if (entry.type === 'SELL') {
        const revenue = price * shares;
        currentCash += revenue;
        // 종목별 보유 주식 수 업데이트
        const current = stockHoldings.get(stockName) || { shares: 0, lastPrice: price };
        const newShares = Math.max(0, current.shares - shares);
        if (newShares > 0) {
          stockHoldings.set(stockName, {
            shares: newShares,
            lastPrice: current.lastPrice, // 매도 시 가격은 유지
          });
        } else {
          stockHoldings.delete(stockName);
        }
      }
    });

    // 주식 평가액 계산 (각 종목의 보유 주식 수 × 마지막 가격)
    let totalStockValue = 0;
    stockHoldings.forEach((holding, stockName) => {
      totalStockValue += holding.shares * holding.lastPrice;
    });

    dataMap.set(date, {
      date,
      stockValue: totalStockValue, // 주식 수 대신 평가액 사용
      cash: currentCash,
    });
  });

  // 빈 날짜 채우기 (연속된 데이터 포인트 생성)
  const result = [];
  if (allDates.length > 0) {
    const startDate = new Date(allDates[0]);
    const endDate = new Date(allDates[allDates.length - 1]);
    const currentDate = new Date(startDate);
    
    let lastStockValue = 0;
    let lastCash = initialCash;

    while (currentDate <= endDate) {
      const dateStr = formatDateString(currentDate);
      if (dataMap.has(dateStr)) {
        const data = dataMap.get(dateStr);
        lastStockValue = data.stockValue;
        lastCash = data.cash;
        result.push({
          date: dateStr,
          displayDate: `${currentDate.getMonth() + 1}/${currentDate.getDate()}`,
          stockValue: data.stockValue,
          cash: data.cash,
        });
      } else {
        result.push({
          date: dateStr,
          displayDate: `${currentDate.getMonth() + 1}/${currentDate.getDate()}`,
          stockValue: lastStockValue,
          cash: lastCash,
        });
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  return result;
};

const Portfolio = ({ title, description }) => {
  const entries = useMemo(() => generateMockEntries(), []);
  const [viewMode, setViewMode] = useState('daily'); // 'daily' | 'weekly' | 'monthly'
  const [assetViewMode, setAssetViewMode] = useState('pie'); // 'pie' | 'bar'
  const scrollContainerRef = useRef(null);
  const graphContainerRef = useRef(null);
  
  // 화면 크기에 따라 초기 표시 개수 계산
  const calculateInitialVisibleCount = useMemo(() => {
    if (typeof window !== 'undefined') {
      // 사이드바 너비(약 256px) + 패딩 등을 고려한 실제 사용 가능한 너비
      const availableWidth = window.innerWidth - 300; // 사이드바 + 여유 공간
      // 데이터 포인트당 필요한 너비 (일별: 50px, 주별: 80px, 월별: 100px)
      const pointWidth = viewMode === 'daily' ? 50 : viewMode === 'weekly' ? 80 : 100;
      return Math.max(Math.floor(availableWidth / pointWidth), 10);
    }
    return viewMode === 'daily' ? 30 : viewMode === 'weekly' ? 20 : 12;
  }, [viewMode]);

  const [visibleCount, setVisibleCount] = useState(calculateInitialVisibleCount);
  
  // 뷰 모드 변경 시 visibleCount 재계산
  useEffect(() => {
    setVisibleCount(calculateInitialVisibleCount);
  }, [viewMode, calculateInitialVisibleCount]);

  // 파이차트용 색상 팔레트 (그라데이션 형식의 연한 색상)
  const PIE_COLORS = [
    '#a78bfa', // 연한 보라색 (국내 주식)
    '#60a5fa', // 연한 파란색 (해외 주식)
    '#34d399', // 연한 초록색 (현금)
  ];

  // 전체 포트폴리오 데이터 계산
  const allPortfolioData = useMemo(() => calculatePortfolioData(entries), [entries]);

  // 뷰 모드에 따른 데이터 필터링
  const filteredData = useMemo(() => {
    let filtered = [];

    if (viewMode === 'daily') {
      // 일별: 최근 N일
      filtered = allPortfolioData.slice(-visibleCount);
    } else if (viewMode === 'weekly') {
      // 주별: 주 단위로 집계 (매주 마지막 날 데이터 사용)
      const weeklyMap = new Map();
      allPortfolioData.forEach(item => {
        const date = new Date(item.date);
        // ISO 주 번호 계산
        const startOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - startOfYear) / 86400000;
        const weekNumber = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
        const weekKey = `${date.getFullYear()}-W${weekNumber}`;
        
        if (!weeklyMap.has(weekKey) || new Date(weeklyMap.get(weekKey).date) < date) {
          weeklyMap.set(weekKey, { ...item, weekKey });
        }
      });
      filtered = Array.from(weeklyMap.values())
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(-visibleCount)
        .map(item => ({
          ...item,
          displayDate: item.weekKey.replace('W', '주차 ')
        }));
    } else if (viewMode === 'monthly') {
      // 월별: 월 단위로 집계 (매월 마지막 날 데이터 사용)
      const monthlyMap = new Map();
      allPortfolioData.forEach(item => {
        const date = new Date(item.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        if (!monthlyMap.has(monthKey) || new Date(monthlyMap.get(monthKey).date) < date) {
          monthlyMap.set(monthKey, { ...item, monthKey });
        }
      });
      filtered = Array.from(monthlyMap.values())
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(-visibleCount)
        .map(item => ({
          ...item,
          displayDate: `${item.monthKey.split('-')[0]}년 ${parseInt(item.monthKey.split('-')[1])}월`
        }));
    }

    return filtered;
  }, [allPortfolioData, viewMode, visibleCount]);

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      // 오른쪽 끝에 가까우면 더 많은 데이터 로드
      if (scrollLeft + clientWidth >= scrollWidth - 100) {
        if (visibleCount < allPortfolioData.length) {
          setVisibleCount(prev => Math.min(prev + 20, allPortfolioData.length));
        }
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [visibleCount, allPortfolioData]);

  // 화면 크기 변경 시 visibleCount 재계산
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        const availableWidth = window.innerWidth - 300;
        const pointWidth = viewMode === 'daily' ? 50 : viewMode === 'weekly' ? 80 : 100;
        const newCount = Math.max(Math.floor(availableWidth / pointWidth), 10);
        setVisibleCount(Math.min(newCount, allPortfolioData.length));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [viewMode, allPortfolioData.length]);

  // Y축 최대값 계산 (그래프 여백을 위해)
  const maxValue = useMemo(() => {
    const maxStockValue = Math.max(...filteredData.map(d => d.stockValue || 0), 0);
    const maxCash = Math.max(...filteredData.map(d => d.cash || 0), 0);
    return Math.max(maxStockValue, maxCash) * 1.1;
  }, [filteredData]);

  return (
    <div className="space-y-6">
      {/* 뷰 모드 탭 */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 rounded-xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => {
              setViewMode('daily');
            }}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
              viewMode === 'daily'
                ? 'bg-white text-violet-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            일별 보기
          </button>
          <button
            type="button"
            onClick={() => {
              setViewMode('weekly');
            }}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
              viewMode === 'weekly'
                ? 'bg-white text-violet-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            주별 보기
          </button>
          <button
            type="button"
            onClick={() => {
              setViewMode('monthly');
            }}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
              viewMode === 'monthly'
                ? 'bg-white text-violet-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            월별 보기
          </button>
        </div>
      </div>

      {/* 그래프 영역 */}
      <div 
        ref={graphContainerRef}
        className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100"
      >
        <h3 className="mb-4 text-xl font-bold text-slate-900">포트폴리오 추이</h3>
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto overflow-y-hidden -mx-6 px-6"
          style={{ 
            scrollbarWidth: 'thin',
            scrollbarColor: '#cbd5e1 #f1f5f9',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <div 
            className="inline-block"
            style={{ 
              minWidth: '100%',
              width: 'max-content'
            }}
          >
            <div style={{ 
              width: typeof window !== 'undefined' 
                ? `${Math.max(filteredData.length * (viewMode === 'daily' ? 50 : viewMode === 'weekly' ? 80 : 100), window.innerWidth - 300)}px`
                : `${Math.max(filteredData.length * 50, 1000)}px`,
              minWidth: typeof window !== 'undefined' 
                ? `${window.innerWidth - 300}px`
                : '1000px'
            }}>
              <ResponsiveContainer width="100%" height={600}>
              <AreaChart
                data={filteredData}
                margin={{ top: 30, right: 40, left: 30, bottom: 30 }}
              >
                <defs>
                  {/* 보라색 그라데이션 (주식 수) */}
                  <linearGradient id="colorShares" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.3}/>
                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.05}/>
                  </linearGradient>
                  {/* 초록색 그라데이션 (현금) */}
                  <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity={0.3}/>
                    <stop offset="50%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="100%" stopColor="#059669" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
                <XAxis 
                  dataKey="displayDate" 
                  stroke="#64748b"
                  style={{ fontSize: '12px', fontWeight: '500' }}
                  angle={viewMode === 'daily' ? -45 : 0}
                  textAnchor={viewMode === 'daily' ? 'end' : 'middle'}
                  height={viewMode === 'daily' ? 70 : 40}
                  tick={{ fill: '#64748b' }}
                />
                <YAxis 
                  stroke="#64748b"
                  style={{ fontSize: '12px', fontWeight: '500' }}
                  domain={[0, maxValue]}
                  tick={{ fill: '#64748b' }}
                  tickFormatter={(value) => {
                    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
                    return value.toLocaleString();
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '16px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    fontSize: '14px',
                  }}
                  formatter={(value, name) => {
                    if (name === 'stockValue') {
                      return [`₩${value.toLocaleString()}`, '주식 평가액'];
                    }
                    return [`₩${value.toLocaleString()}`, '현금'];
                  }}
                  labelFormatter={(label) => `📅 ${label}`}
                  labelStyle={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}
                />
                <Area
                  type="monotone"
                  dataKey="stockValue"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  fill="url(#colorShares)"
                  dot={false}
                  activeDot={{ r: 7, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 3 }}
                  strokeLinecap="round"
                />
                <Area
                  type="monotone"
                  dataKey="cash"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#colorCash)"
                  dot={false}
                  activeDot={{ r: 7, fill: '#10b981', stroke: '#fff', strokeWidth: 3 }}
                  strokeLinecap="round"
                />
              </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-violet-500"></div>
            <span className="text-sm text-slate-600">주식 평가액</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
            <span className="text-sm text-slate-600">현금</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 보유 종목 */}
        <section className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">보유 종목</h3>
            <span className="rounded-lg bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">
              {HOLDINGS.length}개
            </span>
          </div>
          <div className="space-y-3">
            {HOLDINGS.map((holding) => (
              <div
                key={holding.code}
                className="flex items-center justify-between rounded-xl bg-slate-50 p-4 transition-all duration-200 hover:shadow-sm hover:bg-white border border-transparent hover:border-slate-100"
              >
                <div className="flex items-center gap-4">
                  <StockIcon
                    stockName={holding.name}
                    size="md"
                    className="rounded-lg bg-violet-50 text-violet-600"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">{holding.name}</p>
                    <p className="text-xs text-slate-500">{holding.code}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      평균가: {holding.avgPrice} · 보유: {holding.shares}주
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">{holding.currentPrice}</p>
                  <p
                    className={`text-sm font-medium ${
                      holding.isProfit ? 'text-emerald-500' : 'text-rose-500'
                    }`}
                  >
                    {holding.profit}
                  </p>
                  <p
                    className={`text-xs font-medium mt-1 ${
                      holding.isProfit ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {holding.profitAmount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 자산 배분 */}
        <section className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">자산 배분</h3>
            <div className="flex gap-2 rounded-lg bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setAssetViewMode('pie')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 ${
                  assetViewMode === 'pie'
                    ? 'bg-white text-violet-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                원형
              </button>
              <button
                type="button"
                onClick={() => setAssetViewMode('bar')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 ${
                  assetViewMode === 'bar'
                    ? 'bg-white text-violet-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                막대형
              </button>
            </div>
          </div>
          
          {assetViewMode === 'pie' ? (
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <defs>
                    {/* 그라데이션 정의 */}
                    <linearGradient id="gradientDomestic" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#c4b5fd" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#a78bfa" stopOpacity={0.6} />
                    </linearGradient>
                    <linearGradient id="gradientOverseas" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#93c5fd" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.6} />
                    </linearGradient>
                    <linearGradient id="gradientCash" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#6ee7b7" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#34d399" stopOpacity={0.6} />
                    </linearGradient>
                  </defs>
                  <Pie
                    data={ASSET_ALLOCATION}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} ${percentage}%`}
                    outerRadius={100}
                    innerRadius={50}
                    fill="#8884d8"
                    dataKey="percentage"
                    stroke="#fff"
                    strokeWidth={2}
                    paddingAngle={2}
                  >
                    {ASSET_ALLOCATION.map((entry, index) => {
                      const gradientIds = ['gradientDomestic', 'gradientOverseas', 'gradientCash'];
                      return (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={`url(#${gradientIds[index % gradientIds.length]})`}
                        />
                      );
                    })}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '12px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    }}
                    formatter={(value, name, props) => {
                      const asset = ASSET_ALLOCATION.find(a => a.category === props.payload.category);
                      return [`${value}%`, asset?.amount || ''];
                    }}
                    labelFormatter={(label) => label}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                {ASSET_ALLOCATION.map((asset, index) => {
                  const gradientIds = ['gradientDomestic', 'gradientOverseas', 'gradientCash'];
                  return (
                    <div key={asset.category} className="flex items-center gap-2">
                      <div
                        className="h-4 w-4 rounded-full"
                        style={{ 
                          background: `linear-gradient(135deg, ${
                            index === 0 ? '#c4b5fd, #a78bfa' :
                            index === 1 ? '#93c5fd, #60a5fa' :
                            '#6ee7b7, #34d399'
                          })`
                        }}
                      />
                      <span className="text-sm font-medium text-slate-700">{asset.category}</span>
                      <span className="text-sm text-slate-500">({asset.percentage}%)</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {ASSET_ALLOCATION.map((asset) => (
                <div key={asset.category}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-700">{asset.category}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900">{asset.percentage}%</span>
                      <span className="ml-2 text-xs text-slate-500">{asset.amount}</span>
                    </div>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className={`h-full ${asset.color} rounded-full transition-all duration-500`}
                      style={{ width: `${asset.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

Portfolio.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};

Portfolio.defaultProps = {
  description: '매매일지 데이터를 기반으로 한 포트폴리오 추이를 확인하세요',
  title: '포트폴리오',
};

export default Portfolio;
