import PropTypes from 'prop-types';

const ACCENT_MAP = {
  violet: 'from-primary-600 via-primary-500 to-primary-400',
  blue: 'from-sky-500 via-indigo-500 to-sky-400',
  emerald: 'from-emerald-500 via-emerald-400 to-lime-400',
  amber: 'from-amber-500 via-orange-400 to-yellow-300',
  pink: 'from-fuchsia-500 via-pink-500 to-rose-400',
};

export const PagePlaceholder = ({
  title,
  subtitle,
  accent,
  description,
  children,
}) => {
  const accentClass = ACCENT_MAP[accent] || ACCENT_MAP.violet;

  return (
    <section className="space-y-6">
      <div
        className={`rounded-3xl bg-gradient-to-br ${accentClass} p-8 text-white shadow-card`}
      >
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-white/70">
          {subtitle}
        </p>
        <h1 className="mt-2 text-3xl font-semibold">{title}</h1>
        <p className="mt-4 max-w-2xl text-base text-white/80">{description}</p>
      </div>

      <div className="grid gap-6 rounded-3xl bg-white/80 p-8 text-slate-700 shadow-card backdrop-blur-sm md:grid-cols-2">
        {children}
      </div>
    </section>
  );
};

PagePlaceholder.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  accent: PropTypes.oneOf(Object.keys(ACCENT_MAP)),
  description: PropTypes.string,
  children: PropTypes.node,
};

PagePlaceholder.defaultProps = {
  title: '',
  subtitle: '',
  accent: 'violet',
  description: '',
  children: null,
};

