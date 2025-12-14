import PropTypes from 'prop-types';
import { RESEARCH_STATS, MARKET_NEWS, ANALYST_REPORTS, ECONOMIC_CALENDAR, SECTOR_ANALYSIS } from '../data';

/**
 * 네이버 파이낸스 리서치 페이지 URL 생성
 * @param {string} company - 종목명
 * @returns {string} 네이버 파이낸스 리서치 검색 URL
 */
const getNaverResearchUrl = (company) => {
  if (!company) return 'https://finance.naver.com/research/';
  // URL 인코딩하여 검색 쿼리 생성
  const encodedCompany = encodeURIComponent(company);
  return `https://finance.naver.com/research/company_list.naver?keyword=${encodedCompany}`;
};

/**
 * 네이버 파이낸스 종목 상세 페이지 URL 생성
 * @param {string} company - 종목명
 * @returns {string} 네이버 파이낸스 종목 상세 URL
 */
const getNaverStockUrl = (company) => {
  if (!company) return 'https://finance.naver.com/';
  const encodedCompany = encodeURIComponent(company);
  return `https://finance.naver.com/item/main.naver?code=${encodedCompany}`;
};

/**
 * 네이버 증권 뉴스 검색 URL 생성
 * @param {string} keyword - 검색 키워드 (뉴스 제목 또는 주요 키워드)
 * @returns {string} 네이버 증권 뉴스 검색 URL
 */
const getNaverNewsUrl = (keyword) => {
  if (!keyword) return 'https://finance.naver.com/news/';
  // URL 인코딩하여 검색 쿼리 생성
  const encodedKeyword = encodeURIComponent(keyword);
  return `https://finance.naver.com/news/news_search.naver?q=${encodedKeyword}`;
};

/**
 * 뉴스 제목에서 주요 키워드 추출
 * @param {string} title - 뉴스 제목
 * @returns {string} 추출된 키워드
 */
const extractNewsKeyword = (title) => {
  if (!title) return '';
  // 제목에서 종목명이나 주요 키워드 추출 시도
  // 예: "삼성전자, HBM3E 양산..." -> "삼성전자"
  const companyPatterns = [
    /([가-힣]+전자|SK하이닉스|NAVER|카카오|LG전자|현대차|셀트리온|포스코|KB금융|LG화학|아모레퍼시픽|삼성SDI|SK텔레콤|한화솔루션|롯데케미칼|CJ제일제당|LG에너지솔루션)/,
    /(KOSPI|코스피|코스닥)/,
  ];
  
  for (const pattern of companyPatterns) {
    const match = title.match(pattern);
    if (match) {
      return match[1];
    }
  }
  
  // 패턴이 없으면 제목의 앞부분(첫 10자) 사용
  return title.substring(0, 10).trim();
};

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
            {MARKET_NEWS.map((news) => {
              const newsKeyword = extractNewsKeyword(news.title);
              return (
                <a
                  key={news.id}
                  href={getNaverNewsUrl(newsKeyword)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-violet-300 cursor-pointer"
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
                      <h4 className="mb-2 font-bold text-slate-900 group-hover:text-violet-700 transition-colors">
                        {news.title}
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{news.summary}</p>
                      <div className="mt-3 flex items-center justify-end gap-1 text-xs text-violet-600">
                        <span>네이버 증권 뉴스에서 보기</span>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-bold text-slate-900">애널리스트 리포트</h3>
          <div className="space-y-3">
            {ANALYST_REPORTS.map((report) => (
              <a
                key={report.id}
                href={getNaverResearchUrl(report.company)}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-violet-300 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-slate-900 group-hover:text-violet-700 transition-colors">
                      {report.company}
                    </h4>
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
                <div className="mt-3 flex items-center justify-end gap-1 text-xs text-violet-600">
                  <span>네이버 리서치에서 보기</span>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>
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
