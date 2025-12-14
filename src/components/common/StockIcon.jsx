import PropTypes from 'prop-types';
import { useState } from 'react';
import { getStockIconInfo } from '../../utils/stockIcon';

/**
 * 주식 아이콘 컴포넌트
 * 회사 로고 이미지 또는 fallback 이모지 표시
 * 
 * @param {string} stockName - 주식 이름 (필수)
 * @param {string} type - 매매 유형 ('BUY' | 'SELL', 선택)
 * @param {string} className - 추가 CSS 클래스 (선택)
 * @param {string} size - 아이콘 크기 ('sm' | 'md' | 'lg', 기본값: 'md')
 */
const StockIcon = ({ stockName, type, className = '', size = 'md' }) => {
  const [imageError, setImageError] = useState(false);
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const stockIcon = getStockIconInfo(stockName);

  // 이미지 로딩 실패 시 fallback URL 시도
  const handleImageError = () => {
    if (stockIcon.type === 'image' && stockIcon.fallbackUrls && currentUrlIndex < stockIcon.fallbackUrls.length) {
      setCurrentUrlIndex(currentUrlIndex + 1);
    } else {
      setImageError(true);
    }
  };

  // 현재 사용할 이미지 URL 결정
  const getCurrentImageUrl = () => {
    if (stockIcon.type === 'image' && !imageError) {
      if (currentUrlIndex === 0) {
        return stockIcon.url;
      } else if (stockIcon.fallbackUrls && stockIcon.fallbackUrls[currentUrlIndex - 1]) {
        return stockIcon.fallbackUrls[currentUrlIndex - 1];
      }
    }
    return null;
  };

  const currentImageUrl = getCurrentImageUrl();

  // 크기별 클래스 매핑
  const sizeClasses = {
    sm: 'h-8 w-8 text-base',
    md: 'h-10 w-10 text-lg',
    lg: 'h-12 w-12 text-xl',
  };

  const sizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <div className={`flex items-center justify-center rounded-lg ${sizeClass} ${className}`}>
      {stockIcon.type === 'image' && !imageError && currentImageUrl ? (
        <img
          key={currentUrlIndex} // key를 변경하여 이미지 재로딩 강제
          src={currentImageUrl}
          alt={stockIcon.alt}
          className="w-full h-full object-contain p-1 bg-white rounded"
          onError={handleImageError}
        />
      ) : (
        <span className="flex items-center justify-center">
          {stockIcon.type === 'emoji' ? stockIcon.value : (type === 'BUY' ? '📈' : '📉')}
        </span>
      )}
    </div>
  );
};

StockIcon.propTypes = {
  stockName: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['BUY', 'SELL']),
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

StockIcon.defaultProps = {
  type: undefined,
  className: '',
  size: 'md',
};

export default StockIcon;
