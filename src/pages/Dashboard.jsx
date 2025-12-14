import PropTypes from 'prop-types';
import { PORTFOLIO_STOCKS } from '../data';
import StockIcon from '../components/common/StockIcon';

const Dashboard = ({ title, description }) => (
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
);

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
