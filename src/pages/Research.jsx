import PropTypes from 'prop-types';
import { RESEARCH_STATS, MARKET_NEWS, ANALYST_REPORTS, ECONOMIC_CALENDAR, SECTOR_ANALYSIS } from '../data';

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
