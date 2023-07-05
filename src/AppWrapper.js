// AppWrapper.js

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Preloader from './Pre';

const AppWrapper = ({ children }) => {
  const location = useLocation();
  const [load, updateLoad] = useState(false);
  const [loadText, setLoadText] = useState('');

  useEffect(() => {
    if (location.pathname.startsWith('/report/')) {
      setLoadText('AI가 레포트 초안을 작성중입니다!');
      updateLoad(true);

      const timer = setTimeout(() => {
        updateLoad(false);
      }, 7000);

      return () => clearTimeout(timer);
    } else {
      setLoadText('');
      updateLoad(false);
    }
  }, [location]);

  return (
    <>
      {load && <Preloader load={load} text={loadText} />}
      {children}
    </>
  );
};

export default AppWrapper;
