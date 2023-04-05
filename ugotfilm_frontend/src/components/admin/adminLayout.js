import { Outlet } from 'react-router-dom';
import AdminHeader from './adminHeader';

const AdminLayout = () => {
  return (
    <div>
      <AdminHeader />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
