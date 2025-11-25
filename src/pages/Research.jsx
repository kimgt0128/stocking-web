import PropTypes from 'prop-types';

const RESEARCH_STATS = [
  { label: '오늘의 뉴스', value: '328건', icon: '📰', color: 'from-blue-500 to-cyan-600' },
  { label: '리포트', value: '47건', icon: '📊', color: 'from-purple-500 to-indigo-600' },
  { label: '주목 기업', value: '12개', icon: '🏢', color: 'from-emerald-500 to-teal-600' },
];

const MARKET_NEWS = [
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

const ANALYST_REPORTS = [
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

const ECONOMIC_CALENDAR = [
  { date: '01/25', event: '한국 GDP 성장률 발표', importance: 'high' },
  { date: '01/26', event: '미국 소비자 신뢰지수', importance: 'medium' },
  { date: '01/27', event: 'ECB 통화정책 회의', importance: 'high' },
  { date: '01/30', event: '삼성전자 실적발표', importance: 'high' },
];

const SECTOR_ANALYSIS = [
  { sector: '반도체', score: 85, trend: 'up', color: 'bg-emerald-500' },
  { sector: '2차전지', score: 78, trend: 'up', color: 'bg-blue-500' },
  { sector: '바이오', score: 65, trend: 'same', color: 'bg-purple-500' },
  { sector: '금융', score: 52, trend: 'down', color: 'bg-amber-500' },
];

const Research = ({ title, description }) => (
  <div className="space-y-6">
    <section className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm text-slate-600">{description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {RESEARCH_STATS.map((stat) => (
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
      <section className="lg:col-span-2 space-y-6">
        <div>
          <h3 className="mb-4 text-xl font-bold text-slate-900">주요 뉴스</h3>
          <div className="space-y-3">
            {MARKET_NEWS.map((news) => (
              <article
                key={news.id}
                className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <div className="flex gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-violet-700 text-3xl shadow-sm flex-shrink-0">
                    {news.image}
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded-lg bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">
                        {news.category}
                      </span>
                      <span className="text-xs text-slate-500">{news.source}</span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs text-slate-500">{news.time}</span>
                    </div>
                    <h4 className="mb-2 font-bold text-slate-900">{news.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{news.summary}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-bold text-slate-900">애널리스트 리포트</h3>
          <div className="space-y-3">
            {ANALYST_REPORTS.map((report) => (
              <div
                key={report.id}
                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-slate-900">{report.company}</h4>
                    <p className="text-sm text-slate-600">{report.analyst}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`rounded-lg px-3 py-1 text-xs font-bold ${report.rating === 'BUY' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                      {report.rating}
                    </span>
                    <span className="text-xs text-slate-500">{report.date}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 rounded-xl bg-white/60 p-3">
                  <div>
                    <p className="text-xs text-slate-500">목표가</p>
                    <p className="font-bold text-slate-900">{report.targetPrice}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">현재가</p>
                    <p className="font-semibold text-slate-700">{report.currentPrice}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">상승여력</p>
                    <p className="font-bold text-emerald-600">{report.upside}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <h3 className="mb-4 text-lg font-bold text-slate-900">경제 캘린더</h3>

          <div className="space-y-3">
            {ECONOMIC_CALENDAR.map((event, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-xl bg-slate-50 p-3 transition-all duration-200 hover:bg-white hover:shadow-sm"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-violet-700 text-xs font-bold text-white shadow-sm">
                  {event.date}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">{event.event}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${event.importance === 'high' ? 'bg-red-500' : event.importance === 'medium' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                    <span className="text-xs text-slate-500">
                      {event.importance === 'high' ? '중요도 높음' : event.importance === 'medium' ? '중요도 보통' : '중요도 낮음'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <h3 className="mb-4 text-lg font-bold text-slate-900">섹터 분석</h3>

          <div className="space-y-4">
            {SECTOR_ANALYSIS.map((sector) => (
              <div key={sector.sector}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-700">{sector.sector}</span>
                    <span className={`text-lg ${sector.trend === 'up' ? 'text-emerald-500' : sector.trend === 'down' ? 'text-red-500' : 'text-slate-400'}`}>
                      {sector.trend === 'up' ? '↗' : sector.trend === 'down' ? '↘' : '→'}
                    </span>
                  </div>
                  <span className="font-bold text-slate-900">{sector.score}점</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={`h-full ${sector.color} rounded-full transition-all duration-500`}
                    style={{ width: `${sector.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-violet-700 p-6 text-white shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-2xl">🎓</span>
            <h3 className="text-lg font-bold">투자 교육</h3>
          </div>
          <div className="space-y-3 text-sm">
            <button
              type="button"
              className="w-full text-left transition-transform duration-200 hover:translate-x-1"
            >
              <p className="font-bold text-white">재무제표 읽는 법</p>
              <p className="mt-1 text-xs text-white/70">기초부터 심화까지</p>
            </button>
            <div className="h-px bg-white/20" />
            <button
              type="button"
              className="w-full text-left transition-transform duration-200 hover:translate-x-1"
            >
              <p className="font-bold text-white">기술적 분석 입문</p>
              <p className="mt-1 text-xs text-white/70">차트 패턴과 지표</p>
            </button>
            <div className="h-px bg-white/20" />
            <button
              type="button"
              className="w-full text-left transition-transform duration-200 hover:translate-x-1"
            >
              <p className="font-bold text-white">가치 투자 전략</p>
              <p className="mt-1 text-xs text-white/70">워렌 버핏의 원칙</p>
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
);

Research.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};

Research.defaultProps = {
  description: '시장 뉴스, 리포트, 분석 자료를 한곳에서 확인하세요',
  title: '리서치',
};

export default Research;
