import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import { DIARY_STATS, MOOD_INDICATORS } from '../data';
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
 * Mock 데이터 생성 함수
 * 현재 날짜를 기준으로 이번 주, 저번 주, 이번 달, 저번 달에 데이터 생성
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

  // 이번 달 데이터 (이번 주와 저번 주 제외한 날짜들)
  const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const thisMonthEntries = [
    { stock: '포스코', type: 'BUY', price: '₩425,000', shares: 3, reason: '철강 수요 회복 기대', emotion: '긍정적', tags: ['철강', '원자재'] },
    { stock: 'KB금융', type: 'BUY', price: '₩58,200', shares: 15, reason: '금리 인하 기대에 따른 금융주 상승', emotion: '기대', tags: ['금융', '은행'] },
    { stock: 'LG화학', type: 'SELL', price: '₩412,000', shares: 4, reason: '단기 조정 국면 진입', emotion: '중립', tags: ['화학', '조정'] },
    { stock: '아모레퍼시픽', type: 'BUY', price: '₩125,000', shares: 8, reason: '중국 시장 회복 기대', emotion: '기대', tags: ['화장품', '소비재'] },
  ];

  // 이번 달 초반 날짜들에 데이터 추가 (1일~10일 사이)
  thisMonthEntries.forEach((entry, index) => {
    const date = new Date(thisMonthStart);
    date.setDate(1 + index * 3);
    // 이번 주와 저번 주 범위가 아닌 경우만 추가
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

  // 날짜순으로 정렬 (최신순)
  return entries.sort((a, b) => new Date(b.date) - new Date(a.date));
};

/**
 * 투자 일기 페이지 컴포넌트
 * 매매일지 작성, 수정, 삭제 기능 제공
 * 최근/주별/월별 보기 기능 포함
 */
const Diary = ({ title, description }) => {
  // 일지 목록 상태 관리 (현재 날짜 기준으로 동적 생성)
  const [entries, setEntries] = useState(() => generateMockEntries());

  // 뷰 모드 상태 관리 (recent, weekly, monthly)
  const [viewMode, setViewMode] = useState('recent');
  
  // 주별 보기 상태 관리
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0); // 0: 이번주, -1: 저번주, 1: 다음주
  
  // 월별 보기 상태 관리
  const [currentMonthOffset, setCurrentMonthOffset] = useState(0); // 0: 이번달, -1: 저번달, 1: 다음달

  // UI 상태 관리
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

  // 일지 폼 상태
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    stock: '',
    type: 'BUY',
    price: '',
    shares: '',
    reason: '',
    emotion: '긍정적',
    tags: '',
  });

  // 감정 옵션
  const EMOTION_OPTIONS = ['긍정적', '중립', '부정적', '기대', '만족', '우려'];


  /**
   * 주의 시작일(월요일)과 종료일(일요일) 계산
   */
  const getWeekRange = (weekOffset = 0) => {
    const today = new Date();
    const currentDay = today.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay; // 월요일까지의 오프셋
    
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset + (weekOffset * 7));
    monday.setHours(0, 0, 0, 0);
    
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);
    
    return { start: monday, end: sunday };
  };

  /**
   * 월의 첫날과 마지막날 계산
   */
  const getMonthRange = (monthOffset = 0) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + monthOffset;
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // lastDay는 end로 반환되어 사용됨
    return { start: firstDay, end: lastDay, year, month };
  };

  /**
   * 날짜를 YYYY-MM-DD 형식으로 변환
   */
  const formatDate = (date) => {
    if (!date) return '';
    const d = date instanceof Date ? date : new Date(date);
    return d.toISOString().split('T')[0];
  };

  /**
   * 캘린더 그리드 생성
   */
  const generateCalendar = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - startDate.getDay()); // 일요일로 맞춤
    
    const calendar = [];
    const currentDate = new Date(startDate);
    
    // 6주치 생성 (42일)
    for (let week = 0; week < 6; week++) {
      const weekDays = [];
      for (let day = 0; day < 7; day++) {
        weekDays.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      calendar.push(weekDays);
    }
    
    return calendar;
  };

  /**
   * 특정 날짜에 매매일지가 있는지 확인
   */
  const hasEntryOnDate = (date) => {
    const dateStr = formatDate(date);
    return entries.some((entry) => entry.date === dateStr);
  };

  /**
   * 특정 날짜의 매매일지 개수
   */
  const getEntryCountOnDate = (date) => {
    const dateStr = formatDate(date);
    return entries.filter((entry) => entry.date === dateStr).length;
  };

  /**
   * 필터링된 일지 목록
   */
  const filteredEntries = useMemo(() => {
    if (viewMode === 'recent') {
      // 최근 5개만 반환
      return [...entries]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
    } else if (viewMode === 'weekly') {
      const { start, end } = getWeekRange(currentWeekOffset);
      return entries.filter((entry) => {
        const entryDate = new Date(entry.date);
        return entryDate >= start && entryDate <= end;
      }).sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (viewMode === 'monthly') {
      const { start, end } = getMonthRange(currentMonthOffset);
      return entries.filter((entry) => {
        const entryDate = new Date(entry.date);
        return entryDate >= start && entryDate <= end;
      }).sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    return entries;
  }, [entries, viewMode, currentWeekOffset, currentMonthOffset]);

  /**
   * 주별 보기 제목
   */
  const getWeekTitle = () => {
    const { start, end } = getWeekRange(currentWeekOffset);
    const isCurrentWeek = currentWeekOffset === 0;
    
    if (isCurrentWeek) {
      return `이번 주 (${formatDate(start)} ~ ${formatDate(end)})`;
    }
    return `${formatDate(start)} ~ ${formatDate(end)}`;
  };

  /**
   * 월별 보기 제목
   */
  const getMonthTitle = () => {
    const { year, month } = getMonthRange(currentMonthOffset);
    const isCurrentMonth = currentMonthOffset === 0 && new Date().getMonth() === month;
    
    const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    if (isCurrentMonth) {
      return `이번 달 (${year}년 ${monthNames[month]})`;
    }
    return `${year}년 ${monthNames[month]}`;
  };

  /**
   * 다음 주로 이동 가능한지 확인 (현재 주보다 미래가 아닌 경우만)
   */
  const canGoToNextWeek = () => {
    return currentWeekOffset < 0; // 현재 주(0)보다 미래로는 이동 불가
  };

  /**
   * 다음 달로 이동 가능한지 확인
   */
  const canGoToNextMonth = () => {
    return currentMonthOffset < 0; // 현재 달(0)보다 미래로는 이동 불가
  };

  /**
   * 일지 생성
   */
  const handleCreateEntry = () => {
    if (!formData.stock.trim() || !formData.price.trim() || !formData.shares.trim()) {
      alert('종목명, 가격, 수량을 입력해주세요.');
      return;
    }

    // ID 생성 (이벤트 핸들러 내부이므로 안전)
    const timestamp = new Date().getTime();
    const randomStr = Math.random().toString(36).substring(2, 11);
    const entryId = `${timestamp}-${randomStr}`;

    const newEntry = {
      id: entryId,
      date: formData.date,
      stock: formData.stock,
      type: formData.type,
      price: formData.price,
      shares: parseInt(formData.shares, 10),
      reason: formData.reason,
      emotion: formData.emotion,
      tags: formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    };

    setEntries([newEntry, ...entries]);
    resetForm();
    setShowForm(false);
  };

  /**
   * 일지 수정
   */
  const handleUpdateEntry = () => {
    if (!formData.stock.trim() || !formData.price.trim() || !formData.shares.trim()) {
      alert('종목명, 가격, 수량을 입력해주세요.');
      return;
    }

    setEntries(
      entries.map((entry) =>
        entry.id === editingEntry.id
          ? {
              ...entry,
              date: formData.date,
              stock: formData.stock,
              type: formData.type,
              price: formData.price,
              shares: parseInt(formData.shares, 10),
              reason: formData.reason,
              emotion: formData.emotion,
              tags: formData.tags
                .split(',')
                .map((tag) => tag.trim())
                .filter((tag) => tag),
            }
          : entry
      )
    );

    resetForm();
    setEditingEntry(null);
    setShowForm(false);
  };

  /**
   * 일지 삭제
   */
  const handleDeleteEntry = (entryId) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setEntries(entries.filter((entry) => entry.id !== entryId));
    }
  };

  /**
   * 일지 수정 모드 시작
   */
  const handleStartEdit = (entry) => {
    setEditingEntry(entry);
    setFormData({
      date: entry.date,
      stock: entry.stock,
      type: entry.type,
      price: entry.price,
      shares: entry.shares.toString(),
      reason: entry.reason,
      emotion: entry.emotion,
      tags: entry.tags.join(', '),
    });
    setShowForm(true);
  };

  /**
   * 폼 초기화
   */
  const resetForm = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      stock: '',
      type: 'BUY',
      price: '',
      shares: '',
      reason: '',
      emotion: '긍정적',
      tags: '',
    });
  };

  /**
   * 폼 취소
   */
  const handleCancelForm = () => {
    resetForm();
    setShowForm(false);
    setEditingEntry(null);
  };

  /**
   * 통계 계산 (감정별 개수)
   */
  const emotionStats = useMemo(() => {
    const stats = {};
    entries.forEach((entry) => {
      stats[entry.emotion] = (stats[entry.emotion] || 0) + 1;
    });
    return stats;
  }, [entries]);

  /**
   * 통계 계산 (총 기록 수)
   */
  const totalEntries = entries.length;

  /**
   * 통계 계산 (이번 주 기록 수)
   */
  const thisWeekEntries = useMemo(() => {
    const { start, end } = getWeekRange(0);
    return entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= start && entryDate <= end;
    }).length;
  }, [entries]);

  /**
   * 통계 계산 (평균 승률) - 간단한 계산 (긍정적 감정 비율)
   */
  const winRate = useMemo(() => {
    if (entries.length === 0) return 0;
    const positiveCount = entries.filter(
      (entry) => entry.emotion === '긍정적' || entry.emotion === '만족' || entry.emotion === '기대'
    ).length;
    return Math.round((positiveCount / entries.length) * 100);
  }, [entries]);

  // 월별 캘린더 데이터
  const calendarData = useMemo(() => {
    if (viewMode === 'monthly') {
      const { year, month } = getMonthRange(currentMonthOffset);
      return generateCalendar(year, month);
    }
    return null;
  }, [viewMode, currentMonthOffset]);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
          <p className="mt-2 text-sm text-slate-600">{description}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 p-6 shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="relative">
              <span className="text-3xl drop-shadow-sm">📝</span>
              <p className="mt-3 text-sm font-medium text-white/90">총 기록</p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-white">{totalEntries}개</p>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 p-6 shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="relative">
              <span className="text-3xl drop-shadow-sm">📅</span>
              <p className="mt-3 text-sm font-medium text-white/90">이번 주</p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-white">{thisWeekEntries}개</p>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="relative">
              <span className="text-3xl drop-shadow-sm">🎯</span>
              <p className="mt-3 text-sm font-medium text-white/90">평균 승률</p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-white">{winRate}%</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 space-y-4">
          {/* 뷰 모드 탭 */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2 rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => {
                  setViewMode('recent');
                  setCurrentWeekOffset(0);
                  setCurrentMonthOffset(0);
                }}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  viewMode === 'recent'
                    ? 'bg-white text-violet-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                최근 매매일지
              </button>
              <button
                type="button"
                onClick={() => {
                  setViewMode('weekly');
                  setCurrentWeekOffset(0);
                }}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  viewMode === 'weekly'
                    ? 'bg-white text-violet-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                주별로 보기
              </button>
              <button
                type="button"
                onClick={() => {
                  setViewMode('monthly');
                  setCurrentMonthOffset(0);
                }}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  viewMode === 'monthly'
                    ? 'bg-white text-violet-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                월별로 보기
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                resetForm();
                setShowForm(!showForm);
                setEditingEntry(null);
              }}
              className="rounded-xl bg-gradient-to-r from-violet-600 to-violet-700 px-4 py-2 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:from-violet-700 hover:to-violet-800"
            >
              {showForm ? '취소' : '+ 새 일지 작성'}
            </button>
          </div>

          {/* 주별/월별 네비게이션 */}
          {viewMode === 'weekly' && (
            <div className="flex items-center justify-between rounded-xl bg-white p-4 border border-slate-100 shadow-sm">
              <button
                type="button"
                onClick={() => setCurrentWeekOffset(currentWeekOffset - 1)}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-50"
              >
                <span>←</span>
                <span>저번 주</span>
              </button>
              <h3 className="text-lg font-bold text-slate-900">{getWeekTitle()}</h3>
              <button
                type="button"
                onClick={() => setCurrentWeekOffset(currentWeekOffset + 1)}
                disabled={!canGoToNextWeek()}
                className={`flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  canGoToNextWeek()
                    ? 'bg-white text-slate-700 hover:bg-slate-50'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>다음 주</span>
                <span>→</span>
              </button>
            </div>
          )}

          {viewMode === 'monthly' && (
            <div className="flex items-center justify-between rounded-xl bg-white p-4 border border-slate-100 shadow-sm">
              <button
                type="button"
                onClick={() => setCurrentMonthOffset(currentMonthOffset - 1)}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-50"
              >
                <span>←</span>
                <span>저번 달</span>
              </button>
              <h3 className="text-lg font-bold text-slate-900">{getMonthTitle()}</h3>
              <button
                type="button"
                onClick={() => setCurrentMonthOffset(currentMonthOffset + 1)}
                disabled={!canGoToNextMonth()}
                className={`flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  canGoToNextMonth()
                    ? 'bg-white text-slate-700 hover:bg-slate-50'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>다음 달</span>
                <span>→</span>
              </button>
            </div>
          )}

          {/* 일지 작성/수정 폼 */}
          {showForm && (
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h4 className="mb-4 text-lg font-bold text-slate-900">
                {editingEntry ? '일지 수정' : '새 일지 작성'}
              </h4>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">날짜</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-violet-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-100"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">종목명</label>
                    <input
                      type="text"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      placeholder="예: 삼성전자"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-100"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">매매 유형</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-violet-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-100"
                    >
                      <option value="BUY">매수</option>
                      <option value="SELL">매도</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">가격</label>
                    <input
                      type="text"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="예: ₩72,400"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-100"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">수량</label>
                    <input
                      type="number"
                      value={formData.shares}
                      onChange={(e) => setFormData({ ...formData, shares: e.target.value })}
                      placeholder="예: 10"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">매매 근거</label>
                  <textarea
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    placeholder="매매 근거를 입력하세요"
                    rows={4}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-100"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">감정</label>
                    <select
                      value={formData.emotion}
                      onChange={(e) => setFormData({ ...formData, emotion: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-violet-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-100"
                    >
                      {EMOTION_OPTIONS.map((emotion) => (
                        <option key={emotion} value={emotion}>
                          {emotion}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      태그 (쉼표로 구분)
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="태그1, 태그2"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-100"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={editingEntry ? handleUpdateEntry : handleCreateEntry}
                    className="flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-violet-700 px-4 py-2 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:from-violet-700 hover:to-violet-800"
                  >
                    {editingEntry ? '수정하기' : '작성하기'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelForm}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-50"
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 월별 캘린더 뷰 */}
          {viewMode === 'monthly' && calendarData && (
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="grid grid-cols-7 gap-2">
                {/* 요일 헤더 */}
                {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                  <div key={day} className="text-center text-sm font-bold text-slate-700 py-2">
                    {day}
                  </div>
                ))}
                
                {/* 캘린더 날짜 */}
                {calendarData.map((week, weekIndex) =>
                  week.map((date, dayIndex) => {
                    const { month } = getMonthRange(currentMonthOffset);
                    const isCurrentMonth = date.getMonth() === month;
                    const isToday = formatDate(date) === formatDate(new Date());
                    const hasEntry = hasEntryOnDate(date);
                    const entryCount = getEntryCountOnDate(date);
                    
                    return (
                      <div
                        key={`${weekIndex}-${dayIndex}`}
                        className={`relative rounded-lg border-2 p-2 min-h-[80px] transition-all duration-200 ${
                          isCurrentMonth
                            ? hasEntry
                              ? 'border-violet-300 bg-violet-50 hover:bg-violet-100'
                              : 'border-slate-100 bg-white hover:bg-slate-50'
                            : 'border-transparent bg-slate-50'
                        } ${isToday ? 'ring-2 ring-violet-500' : ''}`}
                      >
                        <div
                          className={`text-sm font-semibold mb-1 ${
                            isCurrentMonth ? 'text-slate-900' : 'text-slate-400'
                          } ${isToday ? 'text-violet-700' : ''}`}
                        >
                          {date.getDate()}
                        </div>
                        {hasEntry && isCurrentMonth && (
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-violet-600 font-bold">📝</span>
                            {entryCount > 1 && (
                              <span className="text-xs text-violet-600 font-semibold">
                                {entryCount}개
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* 일지 목록 */}
          {viewMode !== 'monthly' && (
            <>
              {filteredEntries.length === 0 ? (
                <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center shadow-sm">
                  <p className="text-slate-500">표시할 매매일지가 없습니다.</p>
                </div>
              ) : (
                filteredEntries.map((entry) => (
                  <article
                    key={entry.id}
                    className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <StockIcon
                          stockName={entry.stock}
                          type={entry.type}
                          className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                            entry.type === 'BUY'
                              ? 'bg-gradient-to-br from-emerald-500 to-emerald-600'
                              : 'bg-gradient-to-br from-rose-500 to-rose-600'
                          } text-white shadow-sm overflow-hidden`}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900">{entry.stock}</h4>
                            <span
                              className={`rounded-lg px-2 py-1 text-xs font-bold ${
                                entry.type === 'BUY'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-rose-50 text-rose-700'
                              }`}
                            >
                              {entry.type === 'BUY' ? '매수' : '매도'}
                            </span>
                          </div>
                          <p className="text-sm text-slate-500">{entry.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-slate-900">{entry.price}</p>
                        <p className="text-sm text-slate-600">{entry.shares}주</p>
                      </div>
                    </div>

                    <div className="mb-4 rounded-xl bg-slate-50 p-4">
                      <p className="mb-1 text-sm font-semibold text-slate-700">매매 근거</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{entry.reason}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {entry.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-lg bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-400">감정:</span>
                          <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                            {entry.emotion}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleStartEdit(entry)}
                            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-50"
                          >
                            수정
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteEntry(entry.id)}
                            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-rose-600 transition-all duration-200 hover:bg-rose-50"
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </>
          )}
        </section>

        <section className="space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
            <h3 className="mb-4 text-lg font-bold text-slate-900">감정 분석</h3>

            <div className="space-y-4">
              {Object.entries(emotionStats).map(([emotion, count]) => {
                const percentage = totalEntries > 0 ? Math.round((count / totalEntries) * 100) : 0;
                const color =
                  emotion === '긍정적' || emotion === '만족' || emotion === '기대'
                    ? 'bg-emerald-500'
                    : emotion === '중립'
                      ? 'bg-blue-500'
                      : 'bg-amber-500';

                return (
                  <div key={emotion}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-semibold text-slate-700">{emotion}</span>
                      <span className="font-bold text-slate-900">{count}회</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full ${color} rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-slate-400">{percentage}%</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-violet-700 p-6 text-white shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              <h3 className="text-lg font-bold">투자 인사이트</h3>
            </div>
            <div className="space-y-3 text-sm">
              <p className="leading-relaxed text-white/90">
                긍정적인 감정으로 매매한 경우의 승률이 72%로 가장 높습니다.
              </p>
              <div className="h-px bg-white/20" />
              <p className="leading-relaxed text-white/90">
                충분한 근거를 기록한 거래의 수익률이 평균 18% 더 높습니다.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

Diary.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};

Diary.defaultProps = {
  description: '매매 근거와 감정을 기록하고 분석하세요',
  title: '투자 일기',
};

export default Diary;
