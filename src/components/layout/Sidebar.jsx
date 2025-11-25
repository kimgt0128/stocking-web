import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NAV_ITEMS } from '../../constants/navigation';

const SIDEBAR_STYLES = {
  container:
    'flex min-h-screen w-72 flex-col bg-white text-slate-700 shadow-sm border-r border-slate-100',
  brand: 'px-8 py-8 text-2xl font-bold tracking-tight text-slate-900',
  nav: 'flex-1 px-5 py-6',
  menuButton:
    'flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200',
  menuInactive:
    'text-slate-600 hover:bg-violet-50 hover:text-violet-700',
  menuActive:
    'bg-violet-600 text-white shadow-sm hover:bg-violet-700',
  icon: 'text-xl',
  footer:
    'border-t border-slate-100 px-8 py-6 text-xs font-medium text-slate-400',
};

const Sidebar = ({ activeMenu, onMenuChange }) => {
  const [selectedMenu, setSelectedMenu] = useState(activeMenu);

  useEffect(() => {
    setSelectedMenu(activeMenu);
  }, [activeMenu]);

  const handleMenuClick = (value) => {
    setSelectedMenu(value);
    onMenuChange(value);
  };

  return (
    <aside className={SIDEBAR_STYLES.container}>
      <div className={SIDEBAR_STYLES.brand}>Stocking</div>
      <nav className={SIDEBAR_STYLES.nav}>
        <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
          User Panel
        </p>
        <ul className="space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = selectedMenu === item.value;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleMenuClick(item.value)}
                  className={`${SIDEBAR_STYLES.menuButton} ${
                    isActive
                      ? SIDEBAR_STYLES.menuActive
                      : SIDEBAR_STYLES.menuInactive
                  }`}
                  aria-pressed={isActive}
                >
                  <span aria-hidden="true" className={SIDEBAR_STYLES.icon}>
                    {item.icon}
                  </span>
                  <span className={isActive ? 'font-semibold' : 'font-medium'}>
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className={SIDEBAR_STYLES.footer}>
        <div className="mb-1 text-sm font-semibold text-slate-700">
          © {new Date().getFullYear()} Stocking
        </div>
        <p className="text-slate-400">
          스마트한 투자 관리
        </p>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  activeMenu: PropTypes.string,
  onMenuChange: PropTypes.func,
};

Sidebar.defaultProps = {
  activeMenu: NAV_ITEMS[0].value,
  onMenuChange: () => {},
};

export default Sidebar;
