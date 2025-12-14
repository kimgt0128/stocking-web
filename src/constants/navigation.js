import { 
  HiHome, 
  HiBriefcase, 
  HiBookOpen, 
  HiSearch, 
  HiUserGroup 
} from 'react-icons/hi';

export const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: '대시보드',
    value: 'dashboard',
    description: 'Dashboard',
    icon: HiHome,
  },
  {
    id: 'portfolio',
    label: '포트폴리오',
    value: 'portfolio',
    description: 'Portfolio',
    icon: HiBriefcase,
  },
  {
    id: 'diary',
    label: '투자 일기',
    value: 'diary',
    description: 'Investment Diary',
    icon: HiBookOpen,
  },
  {
    id: 'research',
    label: '리서치',
    value: 'research',
    description: 'Research',
    icon: HiSearch,
  },
  {
    id: 'community',
    label: '커뮤니티',
    value: 'community',
    description: 'Community',
    icon: HiUserGroup,
  },
];

