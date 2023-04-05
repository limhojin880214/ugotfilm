import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// 페이지 이동할 때 스크롤 맨 위로 올라가게 함

const ScrollTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollTop;
