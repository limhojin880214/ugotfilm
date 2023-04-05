import { NavLink } from 'react-router-dom';
import './Search_info_style.css';

const Search_people = (props) => {
  const { people } = props;

  return (
    <div className='search_wrap'>
      <div className='search_person'>
        <div>
          {people.profile_path === null ? (
            <div className='search_person_image'>
              <img src='/images/none_img.jpg' />
            </div>
          ) : (
            <img
              className='search_person_image'
              src={'https://image.tmdb.org/t/p/w500' + people.profile_path}
              width='300'
            />
          )}
        </div>
        <NavLink to={`/person/${people.id}`} style={{ textDecoration: 'none' }}>
          <div className='search_person_name'>{people.name}</div>
        </NavLink>
        <div className='search_person_department'>
          {people.known_for_department}
        </div>
      </div>
    </div>
  );
};

export default Search_people;
