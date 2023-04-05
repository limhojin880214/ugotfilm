import { NavLink} from 'react-router-dom';
import './Search_info_style.css';

const Search_Movie = (props) => {
  const { movie } = props;

  return (
    
    <div className='search_wrap'>
      <div
        className='search_movie_content'
        style={{ width: '200px', height: '400px', padding: '0' }}
      >
        <div className='movie_image'>
          {movie.poster_path === null ? (
            <div>
              <img className='poster' src='/images/none_img.jpg' />
            </div>
          ) : (
            <img
              className='poster'
              src={'https://image.tmdb.org/t/p/w500' + movie.poster_path}
            />
          )}
        </div>
        <div className='search_movie_text'>
          <NavLink
            to={`/detail/${movie.id}`}
            style={{ textDecoration: 'none' }}
          >
            <div className='search_movie_title'>{movie.title}</div>
          </NavLink>
          <div className='movie_date'>{movie.release_date}</div>
          <span className='star_rating'>★</span>
          <span className='movie_rating'>{movie.vote_average}</span>
        </div>
      </div>
    </div>
  );
};

export default Search_Movie;
