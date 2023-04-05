import { Navigate, Outlet } from 'react-router-dom';
// import LoginPage from './components/login/loginPage';
// import AccessDenied from './accessDenied';

const PrivateRoute = ({ isAuth, RouteComponent, roles }) => {
  const authorization = localStorage.getItem('Authorization');
  const authRole = roles.includes(localStorage.getItem('authRole'))
    ? true
    : false;

  const userHasRequiredRole = authorization != null && authRole;

  // 인증이 반드시 필요한 페이지이고 인증이 된 페이지
  if (isAuth && userHasRequiredRole) {
    return <RouteComponent />;
  }

  // 인증이 반드시 필요한 페이지이고 인증이 안된 페이지
  if (isAuth && !userHasRequiredRole) {
    return <Navigate to='/login' />;
  }

  //인증이 필요하지 않은 페이지
  if (!isAuth) {
    return <RouteComponent />;
  }

  return <Navigate to='/' />;
};

export default PrivateRoute;
