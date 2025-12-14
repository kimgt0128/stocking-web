/**
 * 주식 관련 유틸리티 함수
 * 순수 함수로 작성하여 재사용 가능하도록 구성
 */

/**
 * 주식 이름을 도메인으로 매핑하는 상수
 */
const STOCK_DOMAIN_MAP = {
  '삼성전자': 'samsung.com',
  'SK하이닉스': 'skhynix.com',
  'NAVER': 'naver.com',
  '카카오': 'kakaocorp.com',
  'LG전자': 'lge.co.kr',
  '현대차': 'hyundai.com',
  '셀트리온': 'celltrion.com',
  '포스코': 'posco.co.kr',
  'KB금융': 'kbfg.com',
  'LG화학': 'lgchem.com',
  '아모레퍼시픽': 'amorepacific.com',
  '삼성SDI': 'samsungsdi.com',
  'SK텔레콤': 'sktelecom.com',
  '한화솔루션': 'hanwhasolutions.com',
  '롯데케미칼': 'lottechem.com',
  'CJ제일제당': 'cj.co.kr',
};

/**
 * 주식 이름의 앞부분을 이모지로 매핑하는 상수
 */
const STOCK_EMOJI_MAP = {
  '삼성': '🏢',
  'SK': '⚡',
  'NAVER': '🌐',
  '카카오': '💬',
  'LG': '🔷',
  '현대': '🚗',
  '셀트리온': '💊',
  '포스코': '🏭',
  'KB': '💰',
  '아모레': '💄',
  '한화': '🏗️',
  '롯데': '🛍️',
  'CJ': '🍜',
};

/**
 * 주식 이름에 따른 회사 로고 정보 반환
 * 여러 로고 API를 조합하여 사용 (Google Favicon API, Logo.dev 등)
 * 
 * @param {string} stockName - 주식 이름 (예: '삼성전자')
 * @returns {Object} 로고 정보 객체
 *   - type: 'image' | 'emoji'
 *   - url: 이미지 URL (type이 'image'인 경우)
 *   - value: 이모지 (type이 'emoji'인 경우)
 *   - alt: 대체 텍스트
 *   - fallbackUrls: fallback 이미지 URL 배열
 */
export const getStockIconInfo = (stockName) => {
  if (!stockName || typeof stockName !== 'string') {
    return { type: 'emoji', value: '📊', alt: '기본 아이콘' };
  }

  // 도메인 매핑 확인
  const domain = STOCK_DOMAIN_MAP[stockName];
  
  if (domain) {
    // Google Favicon API 사용 (가장 간단하고 안정적)
    const googleFaviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    
    return { 
      type: 'image', 
      url: googleFaviconUrl, 
      alt: `${stockName} 로고`,
      // fallback URL들 (필요시 사용)
      fallbackUrls: [
        `https://logo.dev/${domain}`,
        `https://www.${domain}/favicon.ico`,
      ]
    };
  }

  // 이모지 매핑 확인 (주식 이름의 앞부분으로 매칭)
  for (const [key, icon] of Object.entries(STOCK_EMOJI_MAP)) {
    if (stockName.startsWith(key)) {
      return { type: 'emoji', value: icon, alt: `${stockName} 아이콘` };
    }
  }

  // 최종 fallback
  return { type: 'emoji', value: '📊', alt: '기본 아이콘' };
};

/**
 * 주식 이름에 따른 도메인 반환
 * 
 * @param {string} stockName - 주식 이름
 * @returns {string|null} 도메인 또는 null
 */
export const getStockDomain = (stockName) => {
  if (!stockName || typeof stockName !== 'string') {
    return null;
  }
  return STOCK_DOMAIN_MAP[stockName] || null;
};
