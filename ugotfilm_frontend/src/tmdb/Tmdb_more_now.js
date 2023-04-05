import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import TmdbUrl from '../commonApi_tmdb/tmdbUrl';
import TMDB_KEY from '../commonApi_tmdb/tmdb_key';

const MoreNow = () => {
  const lang = '&language=ko';
  const now = '/now_playing?';
  const [page, setPage] = useState(1);

  const nowShow = TmdbUrl + now + 'api_key=' + TMDB_KEY + lang;

  // 현재 상영작
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    getMovieList();
  }, []);

  // 현재 상영작 리스트
  const getMovieList = async () => {
    await axios
      .get(nowShow + '&page=' + page)
      .then((response) => {
        setMovieList(movieList.concat(response.data.results));
        setPage(page + 1);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleChangeNow = (e) => {
    getMovieList(e.target.value);
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br /> <br />
      <div className='genre_wrap'>
        <h1 style={{ fontWeight: 'bolder' }}>현재 상영작</h1>
        <br />
        <br />
        {movieList.map((movie, idx) => {
          return (
            <div className='genre_tile' key={idx}>
              <div className='genre_movie_image'>
                {movie.poster_path === null ||
                movie.poster_path === undefined ? (
                  <img src='/images/none_img.jpg' />
                ) : (
                  <img
                    src={'https://image.tmdb.org/t/p/w500' + movie.poster_path}
                  />
                )}
              </div>

              <NavLink
                to={`/detail/${movie.id}`}
                style={{ textDecoration: 'none' }}
              >
                <div className='genre_movie_title'>{movie.title}</div>
              </NavLink>
            </div>
          );
        })}
      </div>
      <button className='button_more' onClick={handleChangeNow}>
        <span className='button_more_text'>MORE</span>
      </button>
    </>
  );
};

export default MoreNow;
