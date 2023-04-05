import { Link, NavLink } from 'react-router-dom';

const AdminHeader = () => {
  return (
    <div className='adminheader_wrap'>
      <div>
        <Link to='/admin' style={{ textDecoration: 'none' }}>
          <div className='adminheader_title'>ADMIN PAGE.</div>
        </Link>
      </div>
      <div>
        <ul className='adminheader_ul'>
          <li className='adminheader_li'>
            <NavLink to='/' style={{ textDecoration: 'none' }}>
              <span className='adminheader_menu'>메인으로</span>
            </NavLink>
          </li>
          <li className='adminheader_li'>
            <NavLink to='/admin/mem/1' style={{ textDecoration: 'none' }}>
              <span className='adminheader_menu'>회원 등급 수정</span>
            </NavLink>
          </li>
          <li className='adminheader_li'>
            <NavLink to='/admin/comment/1' style={{ textDecoration: 'none' }}>
              <span className='adminheader_menu'>전체 한줄평 조회 및 삭제</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminHeader;
