import PropTypes from 'prop-types';
import { useState } from 'react';
import { COMMUNITY_STATS, TRENDING_TOPICS, EXPERT_INSIGHTS } from '../data';

/**
 * 커뮤니티 페이지 컴포넌트
 * 게시글 CRUD 및 댓글 CRUD 기능 제공
 */
const Community = ({ title, description }) => {
  // 게시글 상태 관리
  const [posts, setPosts] = useState([
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
      commentList: [
        { id: 1, author: '댓글러1', content: '좋은 분석 감사합니다!', time: '3분 전' },
        { id: 2, author: '댓글러2', content: '저도 같은 의견입니다.', time: '1분 전' },
      ],
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
      commentList: [],
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
      commentList: [],
    },
  ]);

  // UI 상태 관리
  const [showPostForm, setShowPostForm] = useState(false);
  const [showPostDetail, setShowPostDetail] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [editingComment, setEditingComment] = useState(null);

  // 게시글 폼 상태
  const [postForm, setPostForm] = useState({
    title: '',
    content: '',
    tags: '',
  });

  // 댓글 폼 상태
  const [commentForm, setCommentForm] = useState('');

  /**
   * 게시글 생성
   */
  const handleCreatePost = () => {
    if (!postForm.title.trim() || !postForm.content.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    const newPost = {
      id: Date.now(),
      author: '나',
      avatar: '👤',
      time: '방금 전',
      title: postForm.title,
      content: postForm.content,
      likes: 0,
      comments: 0,
      tags: postForm.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      commentList: [],
    };

    setPosts([newPost, ...posts]);
    setPostForm({ title: '', content: '', tags: '' });
    setShowPostForm(false);
  };

  /**
   * 게시글 수정
   */
  const handleUpdatePost = (postId) => {
    if (!postForm.title.trim() || !postForm.content.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              title: postForm.title,
              content: postForm.content,
              tags: postForm.tags
                .split(',')
                .map((tag) => tag.trim())
                .filter((tag) => tag),
            }
          : post
      )
    );

    setPostForm({ title: '', content: '', tags: '' });
    setEditingPost(null);
  };

  /**
   * 게시글 삭제
   */
  const handleDeletePost = (postId) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setPosts(posts.filter((post) => post.id !== postId));
      if (showPostDetail === postId) {
        setShowPostDetail(null);
      }
    }
  };

  /**
   * 게시글 수정 모드 시작
   */
  const handleStartEditPost = (post) => {
    setEditingPost(post.id);
    setPostForm({
      title: post.title,
      content: post.content,
      tags: post.tags.join(', '),
    });
    setShowPostDetail(null);
  };

  /**
   * 게시글 수정 취소
   */
  const handleCancelEditPost = () => {
    setEditingPost(null);
    setPostForm({ title: '', content: '', tags: '' });
  };

  /**
   * 댓글 작성
   */
  const handleCreateComment = (postId) => {
    if (!commentForm.trim()) {
      alert('댓글을 입력해주세요.');
      return;
    }

    const newComment = {
      id: Date.now(),
      author: '나',
      content: commentForm,
      time: '방금 전',
    };

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments + 1,
            commentList: [...(post.commentList || []), newComment],
          };
        }
        return post;
      })
    );

    setCommentForm('');
  };

  /**
   * 댓글 수정
   */
  const handleUpdateComment = (postId, commentId) => {
    if (!commentForm.trim()) {
      alert('댓글을 입력해주세요.');
      return;
    }

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            commentList: post.commentList.map((comment) =>
              comment.id === commentId ? { ...comment, content: commentForm } : comment
            ),
          };
        }
        return post;
      })
    );

    setCommentForm('');
    setEditingComment(null);
  };

  /**
   * 댓글 삭제
   */
  const handleDeleteComment = (postId, commentId) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      setPosts(
        posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: post.comments - 1,
              commentList: post.commentList.filter((comment) => comment.id !== commentId),
            };
          }
          return post;
        })
      );
    }
  };

  /**
   * 댓글 수정 모드 시작
   */
  const handleStartEditComment = (comment) => {
    setEditingComment(comment.id);
    setCommentForm(comment.content);
  };

  /**
   * 댓글 수정 취소
   */
  const handleCancelEditComment = () => {
    setEditingComment(null);
    setCommentForm('');
  };

  /**
   * 좋아요 토글
   */
  const handleToggleLike = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, likes: post.likes + (post.isLiked ? -1 : 1), isLiked: !post.isLiked }
          : post
      )
    );
  };

  /**
   * 게시글 상세 보기
   */
  const handleViewPostDetail = (postId) => {
    setShowPostDetail(postId);
    setEditingPost(null);
  };

  return (
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
                <p className="mt-3 text-sm font-medium text-white/90">{stat.label}</p>
                <p className="mt-1 text-3xl font-bold tracking-tight text-white">{stat.value}</p>
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
              onClick={() => {
                setShowPostForm(!showPostForm);
                setEditingPost(null);
                setPostForm({ title: '', content: '', tags: '' });
              }}
              className="rounded-xl bg-gradient-to-r from-violet-600 to-violet-700 px-4 py-2 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:from-violet-700 hover:to-violet-800"
            >
              {showPostForm ? '취소' : '+ 글쓰기'}
            </button>
          </div>

          {/* 게시글 작성 폼 */}
          {showPostForm && (
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h4 className="mb-4 text-lg font-bold text-slate-900">새 게시글 작성</h4>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">제목</label>
                  <input
                    type="text"
                    value={postForm.title}
                    onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                    placeholder="제목을 입력하세요"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-100"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">내용</label>
                  <textarea
                    value={postForm.content}
                    onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                    placeholder="내용을 입력하세요"
                    rows={5}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-100"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    태그 (쉼표로 구분)
                  </label>
                  <input
                    type="text"
                    value={postForm.tags}
                    onChange={(e) => setPostForm({ ...postForm, tags: e.target.value })}
                    placeholder="태그1, 태그2, 태그3"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-100"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleCreatePost}
                    className="flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-violet-700 px-4 py-2 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:from-violet-700 hover:to-violet-800"
                  >
                    작성하기
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPostForm(false);
                      setPostForm({ title: '', content: '', tags: '' });
                    }}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-50"
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 게시글 목록 */}
          {posts.map((post) => {
            const isDetailView = showPostDetail === post.id;
            const isEditing = editingPost === post.id;

            return (
              <article
                key={post.id}
                className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
              >
                {/* 게시글 수정 폼 */}
                {isEditing ? (
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-slate-900">게시글 수정</h4>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">제목</label>
                      <input
                        type="text"
                        value={postForm.title}
                        onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-violet-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-100"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">내용</label>
                      <textarea
                        value={postForm.content}
                        onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                        rows={5}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-violet-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-100"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        태그 (쉼표로 구분)
                      </label>
                      <input
                        type="text"
                        value={postForm.tags}
                        onChange={(e) => setPostForm({ ...postForm, tags: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-violet-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-100"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleUpdatePost(post.id)}
                        className="flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-violet-700 px-4 py-2 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:shadow-md"
                      >
                        수정하기
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEditPost}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-50"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
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

                    <div className="mb-4 flex items-center justify-between">
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
                          onClick={() => handleToggleLike(post.id)}
                          className="flex items-center gap-1 transition-colors hover:text-rose-500"
                        >
                          <span>❤️</span>
                          <span className="font-semibold">{post.likes}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleViewPostDetail(isDetailView ? null : post.id)}
                          className="flex items-center gap-1 transition-colors hover:text-blue-500"
                        >
                          <span>💬</span>
                          <span className="font-semibold">{post.comments}</span>
                        </button>
                      </div>
                    </div>

                    {/* 게시글 액션 버튼 */}
                    <div className="mb-4 flex gap-2 border-t border-slate-100 pt-4">
                      <button
                        type="button"
                        onClick={() => handleStartEditPost(post)}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-50"
                      >
                        수정
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeletePost(post.id)}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-rose-600 transition-all duration-200 hover:bg-rose-50"
                      >
                        삭제
                      </button>
                    </div>

                    {/* 댓글 영역 */}
                    {isDetailView && (
                      <div className="mt-4 space-y-4 border-t border-slate-100 pt-4">
                        <h5 className="font-semibold text-slate-900">댓글 ({post.commentList?.length || 0})</h5>

                        {/* 댓글 목록 */}
                        {post.commentList?.map((comment) => {
                          const isEditingComment = editingComment === comment.id;

                          return (
                            <div key={comment.id} className="rounded-xl bg-slate-50 p-4">
                              {isEditingComment ? (
                                <div className="space-y-2">
                                  <textarea
                                    value={commentForm}
                                    onChange={(e) => setCommentForm(e.target.value)}
                                    rows={2}
                                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-100"
                                  />
                                  <div className="flex gap-2">
                                    <button
                                      type="button"
                                      onClick={() => handleUpdateComment(post.id, comment.id)}
                                      className="rounded-lg bg-violet-600 px-3 py-1 text-xs font-semibold text-white transition-all duration-200 hover:bg-violet-700"
                                    >
                                      수정
                                    </button>
                                    <button
                                      type="button"
                                      onClick={handleCancelEditComment}
                                      className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-50"
                                    >
                                      취소
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <div className="mb-2 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-semibold text-slate-900">
                                        {comment.author}
                                      </span>
                                      <span className="text-xs text-slate-400">{comment.time}</span>
                                    </div>
                                    <div className="flex gap-2">
                                      <button
                                        type="button"
                                        onClick={() => handleStartEditComment(comment)}
                                        className="text-xs text-slate-500 hover:text-violet-600"
                                      >
                                        수정
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteComment(post.id, comment.id)}
                                        className="text-xs text-slate-500 hover:text-rose-600"
                                      >
                                        삭제
                                      </button>
                                    </div>
                                  </div>
                                  <p className="text-sm text-slate-700">{comment.content}</p>
                                </>
                              )}
                            </div>
                          );
                        })}

                        {/* 댓글 작성 폼 */}
                        <div className="space-y-2">
                          <textarea
                            value={commentForm}
                            onChange={(e) => setCommentForm(e.target.value)}
                            placeholder="댓글을 입력하세요..."
                            rows={3}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-100"
                          />
                          <button
                            type="button"
                            onClick={() => handleCreateComment(post.id)}
                            className="rounded-xl bg-gradient-to-r from-violet-600 to-violet-700 px-4 py-2 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:from-violet-700 hover:to-violet-800"
                          >
                            댓글 작성
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </article>
            );
          })}
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
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                      topic.rank <= 3
                        ? 'bg-gradient-to-br from-violet-600 to-violet-700 text-white font-bold'
                        : 'bg-slate-200 text-slate-600'
                    } text-sm shadow-sm`}
                  >
                    {topic.rank}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 text-sm">{topic.topic}</p>
                    <p className="text-xs text-slate-500">{topic.posts}개 게시물</p>
                  </div>
                  <span
                    className={`text-lg ${
                      topic.trend === 'up'
                        ? 'text-rose-500'
                        : topic.trend === 'down'
                          ? 'text-blue-500'
                          : 'text-slate-400'
                    }`}
                  >
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
                  {index < EXPERT_INSIGHTS.length - 1 && <div className="my-3 h-px bg-white/20" />}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

Community.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};

Community.defaultProps = {
  description: '투자자들과 소통하고 정보를 공유하세요',
  title: '커뮤니티',
};

export default Community;
