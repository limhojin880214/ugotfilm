import { useEffect, useState } from 'react';
import TmdbUrl from '../commonApi_tmdb/tmdbUrl';
import TMDB_KEY from '../commonApi_tmdb/tmdb_key';
import axios from 'axios';
import MovieInfo from './Tmdb_now';
import MoviePop from './Tmdb_pop';
import './Tmdb_style.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NavLink } from 'react-router-dom';

const MainChart = () => {
  const lang = '&language=ko';
  const now = '/now_playing?';
  const popular = '/popular?';

  const nowShow = TmdbUrl + now + 'api_key=' + TMDB_KEY + lang;

  const popShow = TmdbUrl + popular + 'api_key=' + TMDB_KEY + lang;

  // 현재 상영작
  const [movieList, setMovieList] = useState([]);

  // 인기작
  const [popList, setPopList] = useState([]);

  // 현재 상영작 리스트
  const getMovieList = async () => {
    await axios
      .get(nowShow + '&page=1')
      .then((response) => {
        setMovieList(response.data.results);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getMovieList();
    getPopList();
  }, []);

  // 인기작 리스트
  const getPopList = async () => {
    await axios
      .get(popShow + '&page=1')
      .then((response) => {
        setPopList(response.data.results);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      {/* 메인 오른쪽: 현재상영작, 인기작 */}
      <div className='main_right'>
        <div className='now_playing_wrap'>
          <div className='main_right_title'>
            현재 상영작
            <div className='button_wrap'>
              <NavLink to='/movie/now'>
                <button
                  className='plus_button'
                  style={{
                    border: 'none',
                  }}
                >
                  <span className='plus_button_txt'>+</span>
                </button>
              </NavLink>
            </div>
          </div>
          <div className='main_chart now_playing'>
            {movieList && movieList.map((movie) => {
              return <MovieInfo movie={movie} key={movie.id} />;
            })}
          </div>
        </div>
        <br />
        <br />
        {/* 인기영화 */}
        <div className='popular_wrap'>
          <div className='main_right_title'>
            현재 인기작
            <div className='button_wrap'>
              <NavLink to='movie/pop'>
                <button
                  className='plus_button'
                  style={{
                    border: 'none',
                  }}
                >
                  <span className='plus_button_txt'>+</span>
                </button>
              </NavLink>
            </div>
          </div>

          <div className='main_chart popular'>
            {popList && popList.map((movie) => {
              return <MoviePop movie={movie} key={movie.id} />;
            })}
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>
    </>
  );
};

export default MainChart;
