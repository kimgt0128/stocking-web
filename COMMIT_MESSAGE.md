# 커밋 메시지

## 변경 사항 요약

### 주요 리팩토링
- 데이터 파일 제거 및 컴포넌트 내부로 이동
- 불필요한 유틸리티 및 컴포넌트 제거
- Props 전달 구조 간소화

### 상세 변경 내용

#### 삭제된 파일 (9개)
- `src/data/` 폴더 전체 제거
  - `community.js`, `dashboard.js`, `diary.js`, `index.js`, `portfolio.js`, `research.js`
- `src/components/common/PieChart.jsx` - 미사용 컴포넌트
- `src/utils/portfolioCalculator.js` - 미사용 유틸리티
- `commit_message.txt` - 임시 파일

#### 수정된 파일 (6개)

**src/App.jsx**
- `SUMMARY_CARDS`를 외부 데이터 파일에서 인라인 상수로 이동
- `INITIAL_DIARY_ENTRIES` 제거 (Diary 컴포넌트 내부로 이동)
- `diaryEntries` state 및 props 제거 (컴포넌트 자체 관리로 변경)

**src/pages/Community.jsx**
- 외부 데이터 파일 의존성 제거
- 데이터를 컴포넌트 내부 상수로 정의 (`COMMUNITY_STATS`, `TRENDING_TOPICS`, `RECENT_POSTS`)
- 코드 간소화 (약 833줄 감소)

**src/pages/Diary.jsx**
- 외부 데이터 파일 의존성 제거
- 데이터를 컴포넌트 내부 상수로 정의 (`DIARY_STATS`, `RECENT_ENTRIES`, `MOOD_INDICATORS`)
- App.jsx에서 전달받던 `diaryEntries` props 제거
- 코드 간소화 (약 653줄 감소)

**src/pages/Portfolio.jsx**
- 외부 데이터 파일 의존성 제거
- 데이터를 컴포넌트 내부 상수로 정의 (`PORTFOLIO_SUMMARY`, `HOLDINGS`, `ASSET_ALLOCATION`)
- 코드 간소화 (약 338줄 감소)

**src/pages/Dashboard.jsx**
- 약간의 수정 (데이터 구조 변경 반영)

**src/pages/Research.jsx**
- 데이터를 컴포넌트 내부 상수로 정의 (`RESEARCH_STATS`, `MARKET_NEWS`, `ANALYST_REPORTS`)
- 약간의 수정

### 통계
- 총 변경: 15개 파일
- 추가: 590줄
- 삭제: 1,982줄
- 순 감소: 1,392줄

### 개선 효과
1. **코드 구조 단순화**: 데이터 파일 의존성 제거로 import 경로 감소
2. **컴포넌트 독립성 향상**: 각 페이지 컴포넌트가 자체 데이터 관리
3. **유지보수성 개선**: 데이터와 컴포넌트가 함께 위치하여 관련 코드 파악 용이
4. **불필요한 코드 제거**: 미사용 컴포넌트 및 유틸리티 삭제

---

## 커밋 메시지

```
refactor: 데이터 구조 단순화 및 컴포넌트 리팩토링

- 데이터 파일 제거 및 컴포넌트 내부로 이동
  * src/data/ 폴더 전체 제거 (community, dashboard, diary, portfolio, research)
  * 각 페이지 컴포넌트 내부에 데이터를 상수로 정의하여 관리

- 불필요한 파일 제거
  * PieChart.jsx (미사용 컴포넌트)
  * portfolioCalculator.js (미사용 유틸리티)

- App.jsx 리팩토링
  * SUMMARY_CARDS를 인라인 상수로 이동
  * INITIAL_DIARY_ENTRIES 제거 (Diary 컴포넌트 내부로 이동)
  * diaryEntries props 제거 (컴포넌트 자체 관리로 변경)

- 페이지 컴포넌트 간소화
  * Community.jsx: 외부 데이터 의존성 제거, 약 833줄 감소
  * Diary.jsx: 외부 데이터 의존성 제거, 약 653줄 감소
  * Portfolio.jsx: 외부 데이터 의존성 제거, 약 338줄 감소
  * Dashboard.jsx, Research.jsx: 데이터 구조 변경 반영

통계: 15개 파일 변경, 590줄 추가, 1,982줄 삭제 (순 감소 1,392줄)

개선 효과:
- 코드 구조 단순화로 import 경로 감소
- 컴포넌트 독립성 향상 (자체 데이터 관리)
- 데이터와 컴포넌트 위치 통합으로 유지보수성 개선
```

