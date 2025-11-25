import PropTypes from 'prop-types';

const DIARY_STATS = [
  { label: '총 기록', value: '47개', icon: '📝', color: 'from-blue-500 to-cyan-600' },
  { label: '이번 주', value: '5개', icon: '📅', color: 'from-purple-500 to-indigo-600' },
  { label: '평균 승률', value: '68%', icon: '🎯', color: 'from-emerald-500 to-teal-600' },
];

const RECENT_ENTRIES = [
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
];

const MOOD_INDICATORS = [
  { mood: '긍정적', count: 28, percentage: 60, color: 'bg-emerald-500' },
  { mood: '중립', count: 12, percentage: 25, color: 'bg-blue-500' },
  { mood: '부정적', count: 7, percentage: 15, color: 'bg-amber-500' },
];

const Diary = ({ title, description }) => (
  <div className="space-y-6">
    <section className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm text-slate-600">{description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {DIARY_STATS.map((stat) => (
          <div
            key={stat.label}
            className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.color} p-6 shadow-sm transition-all duration-300 hover:shadow-md`}
          >
            <div className="relative">
              <span className="text-3xl drop-shadow-sm">{stat.icon}</span>
              <p className="mt-3 text-sm font-medium text-white/90">
                {stat.label}
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-white">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>

    <div className="grid gap-6 lg:grid-cols-3">
      <section className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">최근 거래 일지</h3>
          <button
            type="button"
            className="rounded-xl bg-gradient-to-r from-violet-600 to-violet-700 px-4 py-2 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:from-violet-700 hover:to-violet-800"
          >
            + 새 일지 작성
          </button>
        </div>

        {RECENT_ENTRIES.map((entry) => (
          <article
            key={entry.id}
            className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${entry.type === 'BUY' ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' : 'bg-gradient-to-br from-rose-500 to-rose-600'} text-white shadow-sm`}>
                  <span className="text-xl">{entry.type === 'BUY' ? '📈' : '📉'}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900">{entry.stock}</h4>
                    <span className={`rounded-lg px-2 py-1 text-xs font-bold ${entry.type === 'BUY' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
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
              <p className="text-sm font-semibold text-slate-700 mb-1">매매 근거</p>
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
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400">감정:</span>
                <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                  {entry.emotion}
                </span>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="space-y-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <h3 className="mb-4 text-lg font-bold text-slate-900">감정 분석</h3>

          <div className="space-y-4">
            {MOOD_INDICATORS.map((mood) => (
              <div key={mood.mood}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-700">{mood.mood}</span>
                  <span className="font-bold text-slate-900">{mood.count}회</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full ${mood.color} rounded-full transition-all duration-500`}
                    style={{ width: `${mood.percentage}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-slate-400">{mood.percentage}%</p>
              </div>
            ))}
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

Diary.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};

Diary.defaultProps = {
  description:
    '매매 근거와 감정을 기록하고 분석하세요',
  title: '투자 일기',
};

export default Diary;
