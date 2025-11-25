import PropTypes from 'prop-types';

const COMMUNITY_STATS = [
  { label: '활성 사용자', value: '2,847명', icon: '👥', color: 'from-blue-500 to-cyan-600' },
  { label: '오늘의 게시물', value: '134개', icon: '📝', color: 'from-purple-500 to-indigo-600' },
  { label: '내 포인트', value: '1,250P', icon: '⭐', color: 'from-amber-500 to-orange-600' },
];

const TRENDING_TOPICS = [
  { rank: 1, topic: '반도체 업황 분석', posts: 245, trend: 'up' },
  { rank: 2, topic: '2차전지 투자 전략', posts: 189, trend: 'up' },
  { rank: 3, topic: 'AI 관련주 추천', posts: 156, trend: 'up' },
  { rank: 4, topic: '배당주 포트폴리오', posts: 134, trend: 'down' },
  { rank: 5, topic: '미국 증시 전망', posts: 98, trend: 'same' },
];

const RECENT_POSTS = [
  {
    id: 1,
    author: '투자고수',
    avatar: '👨‍💼',
    time: '5분 전',
    title: '삼성전자 3분기 실적 분석 및 투자 의견',
    content: 'HBM 수요 증가로 인한 실적 개선이 예상됩니다. 다만 단기 변동성에 주의가 필요할 것 같습니다.',
    likes: 45,
    comments: 12,
    tags: ['삼성전자', '반도체', '실적분석'],
  },
  {
    id: 2,
    author: '배당왕',
    avatar: '👑',
    time: '23분 전',
    title: '월 배당 100만원 달성 포트폴리오 공유',
    content: '3년간 배당주에 집중 투자한 결과입니다. 안정적인 현금흐름 창출이 목표라면 참고하세요.',
    likes: 128,
    comments: 34,
    tags: ['배당주', '포트폴리오', '노하우'],
  },
  {
    id: 3,
    author: '차트분석러',
    avatar: '📊',
    time: '1시간 전',
    title: 'KOSPI 지수 기술적 분석 - 주요 저항선 돌파 여부 주목',
    content: '2,600선이 단기 저항으로 작용하고 있습니다. 거래량 동반 돌파 시 추가 상승 가능성 높습니다.',
    likes: 67,
    comments: 18,
    tags: ['기술적분석', 'KOSPI', '차트'],
  },
];

const EXPERT_INSIGHTS = [
  { expert: '김투자', title: '2025 전망: 반도체 슈퍼사이클 재개', time: '오늘 09:00' },
  { expert: '이애널', title: '금리 인하기 최적 투자 전략', time: '어제 16:30' },
  { expert: '박증권', title: '실적 시즌 주목할 종목 5선', time: '2일 전' },
];

const Community = ({ title, description }) => (
  <div className="space-y-6">
    <section className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm text-slate-600">{description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {COMMUNITY_STATS.map((stat) => (
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
      <section className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">최신 게시물</h3>
          <button
            type="button"
            className="rounded-xl bg-gradient-to-r from-violet-600 to-violet-700 px-4 py-2 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:from-violet-700 hover:to-violet-800"
          >
            + 글쓰기
          </button>
        </div>

        {RECENT_POSTS.map((post) => (
          <article
            key={post.id}
            className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <div className="mb-4 flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-violet-700 text-2xl shadow-sm">
                {post.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{post.author}</span>
                  <span className="text-sm text-slate-400">·</span>
                  <span className="text-sm text-slate-500">{post.time}</span>
                </div>
                <h4 className="mt-1 font-bold text-slate-900">{post.title}</h4>
              </div>
            </div>

            <p className="mb-4 text-sm text-slate-600 leading-relaxed">{post.content}</p>

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <button
                  type="button"
                  className="flex items-center gap-1 transition-colors hover:text-rose-500"
                >
                  <span>❤️</span>
                  <span className="font-semibold">{post.likes}</span>
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1 transition-colors hover:text-blue-500"
                >
                  <span>💬</span>
                  <span className="font-semibold">{post.comments}</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="space-y-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <h3 className="mb-4 text-lg font-bold text-slate-900">인기 토픽</h3>

          <div className="space-y-3">
            {TRENDING_TOPICS.map((topic) => (
              <div
                key={topic.rank}
                className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 transition-all duration-200 hover:bg-white hover:shadow-sm"
              >
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${topic.rank <= 3 ? 'bg-gradient-to-br from-violet-600 to-violet-700 text-white font-bold' : 'bg-slate-200 text-slate-600'} text-sm shadow-sm`}>
                  {topic.rank}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 text-sm">{topic.topic}</p>
                  <p className="text-xs text-slate-500">{topic.posts}개 게시물</p>
                </div>
                <span className={`text-lg ${topic.trend === 'up' ? 'text-rose-500' : topic.trend === 'down' ? 'text-blue-500' : 'text-slate-400'}`}>
                  {topic.trend === 'up' ? '🔥' : topic.trend === 'down' ? '📉' : '—'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-violet-700 p-6 text-white shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            <h3 className="text-lg font-bold">전문가 인사이트</h3>
          </div>
          <div className="space-y-3">
            {EXPERT_INSIGHTS.map((insight, index) => (
              <div key={index}>
                <button
                  type="button"
                  className="w-full text-left transition-transform duration-200 hover:translate-x-1"
                >
                  <p className="text-sm font-bold text-white">{insight.title}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-white/70">
                    <span>{insight.expert}</span>
                    <span>·</span>
                    <span>{insight.time}</span>
                  </div>
                </button>
                {index < EXPERT_INSIGHTS.length - 1 && (
                  <div className="my-3 h-px bg-white/20" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  </div>
);

Community.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};

Community.defaultProps = {
  description: '투자자들과 소통하고 정보를 공유하세요',
  title: '커뮤니티',
};

export default Community;
