import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import ScrollTop from './components/Scroll_top';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    {/* 페이지 이동할 때 스크롤 제일 위로 올라가게 */}
    <ScrollTop />
    <App />
  </BrowserRouter>
);

reportWebVitals();
