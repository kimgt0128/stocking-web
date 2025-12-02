import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import { DIARY_STATS, MOOD_INDICATORS } from '../data';

/**
 * 투자 일기 페이지 컴포넌트
 * 매매일지 작성, 수정, 삭제 기능 제공
 */
const Diary = ({ title, description }) => {
  // 일지 목록 상태 관리
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: '2025-01-24',
      stock: '삼성전자',
      type: 'BUY',
      price: '₩72,400',
      shares: 10,
      reason: '반도체 업황 개선 기대. 최근 실적 발표에서 긍정적인 전망 제시',
      emotion: '긍정적',
      tags: ['반도체', '장기투자'],
    },
    {
      id: 2,
      date: '2025-01-23',
      stock: 'SK하이닉스',
      type: 'SELL',
      price: '₩145,200',
      shares: 5,
      reason: '목표가 도달로 일부 수익 실현. 추가 상승 가능성도 있지만 리스크 관리 차원',
      emotion: '만족',
      tags: ['수익실현', '리스크관리'],
    },
    {
      id: 3,
      date: '2025-01-22',
      stock: 'NAVER',
      type: 'BUY',
      price: '₩198,500',
      shares: 3,
      reason: 'AI 기술 투자 확대 발표. 장기적 성장 가능성 높음',
      emotion: '기대',
      tags: ['AI', '성장주'],
    },
  ]);

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
   * 일지 생성
   */
  const handleCreateEntry = () => {
    if (!formData.stock.trim() || !formData.price.trim() || !formData.shares.trim()) {
      alert('종목명, 가격, 수량을 입력해주세요.');
      return;
    }

    const newEntry = {
      id: Date.now(),
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
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    return entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= weekAgo;
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
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">최근 거래 일지</h3>
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

          {/* 일지 목록 */}
          {entries.map((entry) => (
            <article
              key={entry.id}
              className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                      entry.type === 'BUY'
                        ? 'bg-gradient-to-br from-emerald-500 to-emerald-600'
                        : 'bg-gradient-to-br from-rose-500 to-rose-600'
                    } text-white shadow-sm`}
                  >
                    <span className="text-xl">{entry.type === 'BUY' ? '📈' : '📉'}</span>
                  </div>
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
          ))}
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
