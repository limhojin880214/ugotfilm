import { NavLink } from 'react-router-dom';
// import MainChart from '../../tmdb/Main_chart';
// import MainSide from '../../tmdb/Main_side';
import './layout.css';

const Header = () => {
  return (
    <div className='header'>
      {localStorage.getItem('username') !== null ? (
        <div>
          <div className='header_list'>
            <div>
              <NavLink to='/logout'>
                <span className='menu_name'>logout</span>
              </NavLink>
            </div>
            <div>
              <NavLink to='/mypage'>
                <span className='menu_name'>my page</span>
              </NavLink>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className='header_list'>
            <div>
              <NavLink to='/login'>
                <span className='menu_name'>login</span>
              </NavLink>
            </div>
            <div>
              <NavLink to='/join'>
                <span className='menu_name'>join</span>
              </NavLink>
            </div>
          </div>
        </div>
      )}

      <div className='logo_box'>
        <NavLink to='/' style={{ textDecoration: 'none' }}>
          <img className='logo_box_img' src='/images/ugf_logo.png' />
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
