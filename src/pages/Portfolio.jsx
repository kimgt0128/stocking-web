import PropTypes from 'prop-types';

const PORTFOLIO_SUMMARY = [
  { label: '총 평가액', value: '₩45,320,000', icon: '💰', color: 'from-purple-100 to-purple-200 text-purple-700' },
  { label: '총 투자금', value: '₩37,450,000', icon: '📊', color: 'from-blue-100 to-blue-200 text-blue-700' },
  { label: '평가 손익', value: '+₩7,870,000', icon: '📈', color: 'from-emerald-100 to-emerald-200 text-emerald-700', isProfit: true },
  { label: '수익률', value: '+21.0%', icon: '🎯', color: 'from-amber-100 to-amber-200 text-amber-700', isProfit: true },
];

const HOLDINGS = [
  { name: '삼성전자', code: '005930', shares: 50, avgPrice: '₩68,000', currentPrice: '₩72,400', profit: '+6.5%', profitAmount: '+₩220,000', isProfit: true },
  { name: 'SK하이닉스', code: '000660', shares: 20, avgPrice: '₩138,000', currentPrice: '₩145,200', profit: '+5.2%', profitAmount: '+₩144,000', isProfit: true },
  { name: 'NAVER', code: '035420', shares: 15, avgPrice: '₩205,000', currentPrice: '₩198,500', profit: '-3.2%', profitAmount: '-₩97,500', isProfit: false },
  { name: '카카오', code: '035720', shares: 80, avgPrice: '₩54,200', currentPrice: '₩52,300', profit: '-3.5%', profitAmount: '-₩152,000', isProfit: false },
];

const ASSET_ALLOCATION = [
  { category: '국내 주식', percentage: 65, amount: '₩29,458,000', color: 'bg-purple-500' },
  { category: '해외 주식', percentage: 25, amount: '₩11,330,000', color: 'bg-blue-500' },
  { category: '현금', percentage: 10, amount: '₩4,532,000', color: 'bg-emerald-500' },
];

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
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                      <span className="text-lg">📊</span>
                    </div>
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
