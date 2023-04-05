import { useEffect } from 'react';

const LogOut = () => {
  useEffect(() => {
    localStorage.removeItem('Authorizaton');
    localStorage.removeItem('username');
    localStorage.clear();
    window.location.replace('/');
  });
};

export default LogOut;
