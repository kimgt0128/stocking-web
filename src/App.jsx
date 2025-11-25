import PropTypes from 'prop-types';
import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import { NAV_ITEMS } from './constants/navigation';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Diary from './pages/Diary';
import Research from './pages/Research';
import Community from './pages/Community';

const SUMMARY_CARDS = [
  {
    id: 'balance',
    label: '총 자산',
    value: '₩45,320,000',
    change: '+3.2% 오늘',
    changeType: 'positive',
    gradient: 'from-purple-500 to-indigo-600',
    icon: '💰',
  },
  {
    id: 'invested',
    label: '투자 원금',
    value: '₩37,450,000',
    change: '+₩520,000 이번 주',
    changeType: 'positive',
    gradient: 'from-blue-500 to-cyan-600',
    icon: '📈',
  },
  {
    id: 'cash',
    label: '가용 현금',
    value: '₩7,870,000',
    change: '신규 입금 없음',
    changeType: 'neutral',
    gradient: 'from-emerald-500 to-teal-600',
    icon: '💵',
  },
];

const VIEW_COMPONENTS = {
  dashboard: Dashboard,
  portfolio: Portfolio,
  diary: Diary,
  research: Research,
  community: Community,
};

const MENU_VALUES = NAV_ITEMS.map((item) => item.value);

function App({ initialMenu }) {
  const [activeMenu, setActiveMenu] = useState(initialMenu);
  const ActiveView = VIEW_COMPONENTS[activeMenu] ?? Dashboard;
  const activeLabel =
    NAV_ITEMS.find((item) => item.value === activeMenu)?.label || '대시보드';

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-6 bg-white px-8 py-6 shadow-sm border-b border-slate-100">
          <div>
            <p className="text-sm font-medium text-slate-400">Hello Matt,</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">
              {activeLabel}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search for stocks and more"
                className="w-80 rounded-xl border border-slate-100 bg-slate-50 px-5 py-3 pl-11 text-sm text-slate-600 shadow-sm transition-all duration-200 placeholder:text-slate-400 hover:bg-white hover:border-slate-200 focus:border-violet-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-100"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                🔍
              </span>
            </div>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:bg-slate-200 hover:shadow-md"
            >
              🔔
            </button>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-violet-700 font-bold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:from-violet-700 hover:to-violet-800"
            >
              MJ
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto h-screen scrollbar-hide px-8 py-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {SUMMARY_CARDS.map((card) => (
                <article
                  key={card.id}
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.gradient} p-6 shadow-sm transition-all duration-300 hover:shadow-md`}
                >
                  <div className="relative">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-3xl drop-shadow-sm">{card.icon}</span>
                    </div>
                    <p className="text-sm font-medium text-white/90">
                      {card.label}
                    </p>
                    <p className="mt-2 text-3xl font-bold text-white tracking-tight">
                      {card.value}
                    </p>
                    <p
                      className={`mt-3 text-sm font-medium ${
                        card.changeType === 'positive'
                          ? 'text-white/80'
                          : card.changeType === 'negative'
                            ? 'text-white/80'
                            : 'text-white/70'
                      }`}
                    >
                      {card.change}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <ActiveView />
          </div>
        </main>
      </div>
    </div>
  );
}

App.propTypes = {
  initialMenu: PropTypes.oneOf(MENU_VALUES),
};

App.defaultProps = {
  initialMenu: NAV_ITEMS[0].value,
};

export default App;
