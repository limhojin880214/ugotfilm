import { Link, NavLink } from 'react-router-dom';

const MoviePop = (props) => {
  const { movie } = props;
  return (
    <div className='Tmdb_pop_movieTile_section'>
      <div className='Tmdb_pop_movie_tile'>
        <NavLink to={`/detail/${movie.id}`} style={{ textDecoration: 'none' }}>
          <div className='Tmdb_pop_movie_title'>{movie.title}</div>
        </NavLink>
      </div>
    </div>
  );
};

export default MoviePop;
