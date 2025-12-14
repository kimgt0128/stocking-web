import PropTypes from 'prop-types';
import { PORTFOLIO_SUMMARY, HOLDINGS, ASSET_ALLOCATION } from '../data';
import StockIcon from '../components/common/StockIcon';

const Portfolio = ({ title, description }) => (
  <div className="space-y-6">
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {PORTFOLIO_SUMMARY.map((item) => (
        <div
          key={item.label}
          className={`rounded-2xl bg-gradient-to-br ${item.color} p-6 shadow-sm transition-all duration-300 hover:shadow-md`}
        >
          <div className="mb-3">
            <span className="text-3xl drop-shadow-sm">{item.icon}</span>
          </div>
          <p className="text-sm font-medium opacity-90">
            {item.label}
          </p>
          <p className="mt-2 text-2xl font-bold tracking-tight">
            {item.value}
          </p>
        </div>
      ))}
    </div>

    <div className="grid gap-6 lg:grid-cols-3">
      <section className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">보유 종목</h3>
          <span className="rounded-lg bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">
            {HOLDINGS.length}개 종목
          </span>
        </div>

        <div className="space-y-3">
          {HOLDINGS.map((stock) => (
            <div
              key={stock.code}
              className="rounded-xl bg-slate-50 p-5 transition-all duration-200 hover:shadow-sm hover:bg-white border border-transparent hover:border-slate-100"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <StockIcon
                      stockName={stock.name}
                      size="md"
                      className="rounded-lg bg-violet-50 text-violet-600"
                    />
                    <div>
                      <p className="font-semibold text-slate-900">{stock.name}</p>
                      <p className="text-xs text-slate-500">{stock.code}</p>
                    </div>
                  </div>
                  <div className="ml-13 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-slate-400 text-xs">보유수량</p>
                      <p className="font-medium text-slate-900">{stock.shares}주</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs">평균단가</p>
                      <p className="font-medium text-slate-900">{stock.avgPrice}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs">현재가</p>
                      <p className="font-medium text-slate-900">{stock.currentPrice}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs">평가손익</p>
                      <p className={`font-semibold ${stock.isProfit ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {stock.profitAmount}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${stock.isProfit ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {stock.profit}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
        <h3 className="mb-6 text-xl font-bold text-slate-900">자산 배분</h3>

        <div className="mb-6 space-y-4">
          {ASSET_ALLOCATION.map((asset) => (
            <div key={asset.category}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">{asset.category}</span>
                <span className="font-semibold text-slate-900">{asset.percentage}%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full ${asset.color} rounded-full transition-all duration-500`}
                  style={{ width: `${asset.percentage}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-slate-400">{asset.amount}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3 rounded-xl bg-gradient-to-br from-violet-600 to-violet-700 p-6 text-white shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-white/80">총 자산</span>
            <span className="text-xl font-bold tracking-tight">₩45,320,000</span>
          </div>
          <div className="h-px bg-white/20" />
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-white/80">전체 수익률</span>
            <span className="text-2xl font-bold text-emerald-300 tracking-tight">+21.0%</span>
          </div>
        </div>
      </section>
    </div>
  </div>
);

Portfolio.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};

Portfolio.defaultProps = {
  description:
    '보유 자산 비중과 수익률을 한눈에 확인하세요',
  title: '포트폴리오',
};

export default Portfolio;
