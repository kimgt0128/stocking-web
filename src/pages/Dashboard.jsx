import PropTypes from 'prop-types';
import { useState } from 'react';
import { PORTFOLIO_STOCKS } from '../data';
import StockIcon from '../components/common/StockIcon';

/**
 * AI 분석 텍스트 목록 (미리 정의된 분석 내용)
 * 나중에 Gemini API로 확장 예정
 */
const AI_ANALYSIS_TEXTS = [
  "현재 포트폴리오는 반도체와 IT 섹터에 집중되어 있어 시장 변동성에 민감할 수 있습니다. 분산 투자를 통해 리스크를 완화하는 것을 권장합니다.",
  "최근 매매 패턴을 분석한 결과, 단기 매매보다는 중장기 투자 전략이 더 유리할 것으로 보입니다. 보유 종목들의 실적 발표 시즌을 주의 깊게 관찰하세요.",
  "현금 비율이 10%로 적정 수준입니다. 추가 투자 기회가 있을 때를 대비해 유동성을 유지하는 것이 좋겠습니다.",
  "포트폴리오의 평균 수익률이 시장 평균을 상회하고 있습니다. 현재 전략을 유지하되, 과도한 집중 투자는 피하는 것이 좋습니다.",
  "국내 주식 비중이 65%로 높습니다. 글로벌 시장 다변화를 통해 환율 리스크를 분산시킬 수 있는 기회를 고려해보세요.",
  "최근 매매일지를 보면 감정적 매매보다는 체계적인 분석에 기반한 결정이 늘어나고 있습니다. 이는 좋은 신호입니다.",
  "보유 종목들의 섹터별 분산이 개선되고 있습니다. 바이오와 금융 섹터 추가를 통해 더욱 안정적인 포트폴리오를 구성할 수 있습니다.",
  "현재 포트폴리오는 성장주 중심으로 구성되어 있습니다. 가치주 일부 추가를 통해 밸런스를 맞추는 것을 검토해보세요.",
  "매매 빈도가 적절한 수준입니다. 과도한 거래는 수수료 부담을 증가시킬 수 있으니 신중한 접근이 필요합니다.",
  "포트폴리오의 리스크 대비 수익률이 양호합니다. 다만 글로벌 경제 불확실성에 대비해 방어적 자산 비중을 점진적으로 늘리는 것을 고려해보세요."
];

const Dashboard = ({ title, description }) => {
  // 매번 로딩 시 랜덤하게 AI 분석 텍스트 선택 (진짜 AI처럼 보이게)
  // useState의 초기값 함수를 사용하여 컴포넌트 마운트 시 한 번만 랜덤 선택
  const [aiAnalysis] = useState(() => {
    const randomIndex = Math.floor(Math.random() * AI_ANALYSIS_TEXTS.length);
    return AI_ANALYSIS_TEXTS[randomIndex];
  });

  return (
    <div className="space-y-6">
      {/* AI 분석 박스 */}
      <article className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 p-6 shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="relative">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <span className="text-2xl">🤖</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">AI 분석</h3>
              <p className="text-xs text-white/70">포트폴리오 인사이트</p>
            </div>
            <div className="ml-auto">
              <span className="rounded-lg bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white">
                Gemini AI
              </span>
            </div>
          </div>
          <div className="rounded-xl bg-white/10 backdrop-blur-sm p-4 border border-white/20">
            <p className="text-sm leading-relaxed text-white/90">
              {aiAnalysis}
            </p>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
            <span>⚡</span>
            <span>실시간 분석 · {new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </article>

      <div className="grid gap-6 lg:grid-cols-2">
    <section className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">My Stocks</h2>
        <span className="rounded-lg bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">
          Live
        </span>
      </div>
      <div className="space-y-3">
        {PORTFOLIO_STOCKS.map((stock) => (
          <div
            key={stock.symbol}
            className="flex items-center justify-between rounded-xl bg-slate-50 p-4 transition-all duration-200 hover:shadow-sm hover:bg-white border border-transparent hover:border-slate-100"
          >
            <div className="flex items-center gap-4">
              <StockIcon
                stockName={stock.name}
                size="md"
                className="rounded-lg bg-violet-50 text-violet-600"
              />
              <div>
                <p className="font-semibold text-slate-900">{stock.name}</p>
                <p className="text-xs text-slate-500">{stock.symbol}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-900">{stock.price}</p>
              <p
                className={`text-sm font-medium ${
                  stock.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'
                }`}
              >
                {stock.change}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="rounded-2xl bg-gradient-to-br from-violet-600 to-violet-700 p-6 text-white shadow-sm">
      <div>
        <h2 className="mb-6 text-xl font-bold">Balance</h2>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium text-violet-100">
              Total Return
            </p>
            <p className="mt-2 text-5xl font-bold tracking-tight">+12.5%</p>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/20">
            <div className="h-full w-3/4 rounded-full bg-emerald-400 transition-all duration-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-white/10 backdrop-blur-sm p-4">
              <p className="text-sm font-medium text-violet-100">Profit</p>
              <p className="mt-1 text-xl font-bold">
                +₩7,870,000
              </p>
            </div>
            <div className="rounded-xl bg-white/10 backdrop-blur-sm p-4">
              <p className="text-sm font-medium text-violet-100">Stocks</p>
              <p className="mt-1 text-xl font-bold">12개</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
      <h2 className="mb-4 text-xl font-bold text-slate-900">{title}</h2>
      <p className="text-sm leading-relaxed text-slate-600 mb-6">{description}</p>
      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-xl bg-slate-50 p-6 transition-all duration-200 hover:shadow-sm hover:bg-white border border-transparent hover:border-slate-100">
          <div className="mb-3 flex items-center gap-3">
            <span className="text-2xl">📈</span>
            <h3 className="font-semibold text-slate-900">시장 분석</h3>
          </div>
          <p className="text-sm text-slate-600">
            실시간 시장 동향과 종목 분석을 확인하세요
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-6 transition-all duration-200 hover:shadow-sm hover:bg-white border border-transparent hover:border-slate-100">
          <div className="mb-3 flex items-center gap-3">
            <span className="text-2xl">💼</span>
            <h3 className="font-semibold text-slate-900">포트폴리오 관리</h3>
          </div>
          <p className="text-sm text-slate-600">
            보유 종목을 체계적으로 관리하고 추적하세요
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-6 transition-all duration-200 hover:shadow-sm hover:bg-white border border-transparent hover:border-slate-100">
          <div className="mb-3 flex items-center gap-3">
            <span className="text-2xl">🔍</span>
            <h3 className="font-semibold text-slate-900">리서치</h3>
          </div>
          <p className="text-sm text-slate-600">
            심층 분석과 투자 인사이트를 얻으세요
          </p>
        </div>
      </div>
    </section>
    </div>
  </div>
  );
};

Dashboard.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};

Dashboard.defaultProps = {
  description:
    '오늘의 핵심 지표와 포트폴리오 요약을 한눈에 확인하는 영역입니다. 실시간 시장 데이터와 투자 성과를 모니터링하고, 최적의 투자 결정을 내리세요.',
  title: '대시보드 페이지',
};

export default Dashboard;
