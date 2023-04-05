import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import TmdbdiscoverUrl from '../commonApi_tmdb/tmdbDiscoverUrl';
import TMDB_KEY from '../commonApi_tmdb/tmdb_key';
import './Genre_list_style.css';

const Genre_btn = () => {
  const lang = '&language=ko';
  const popular = '&sort_by=popularity.desc';
  const vote = '&sort_by=vote_average.desc';
  const region = '&region=kr';
  const adult = '&include_adult=false';
  const genre_id = '&with_genres=';
  const v_count = '&vote_count.gte=100';
  const page = '&page=1';
  const genreList = [
    { id: 28, genre: '액션' },
    { id: 12, genre: '모험' },
    { id: 16, genre: '애니메이션' },
    { id: 35, genre: '코미디' },
    { id: 53, genre: '스릴러' },
    { id: 80, genre: '범죄' },
    { id: 18, genre: '드라마' },
    { id: 99, genre: '다큐멘터리' },
    { id: 10751, genre: '가족' },
    { id: 14, genre: '판타지' },
    { id: 36, genre: '역사' },
    { id: 27, genre: '공포' },
    { id: 10402, genre: '음악' },
    { id: 9648, genre: '미스터리' },
    { id: 10749, genre: '로맨스' },
    { id: 878, genre: 'SF' },
    { id: 10752, genre: '전쟁' },
    { id: 37, genre: '서부' },
  ];

  // 인기순
  const getPopList = async (element) => {
    await axios
      .get(
        TmdbdiscoverUrl +
          '?api_key=' +
          TMDB_KEY +
          lang +
          region +
          popular +
          adult +
          page +
          genre_id +
          element +
          v_count
      )
      .then()
      .catch((err) => {
        console.log(err.message);
      });
  };

  // 평점순
  const getVoteList = async (element) => {
    await axios
      .get(
        TmdbdiscoverUrl +
          '?api_key=' +
          TMDB_KEY +
          lang +
          region +
          vote +
          adult +
          page +
          genre_id +
          element +
          v_count
      )
      .then()
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handle_pop = async (e) => {
    await getPopList(e.target.value);
  };

  const handle_vote = async (e) => {
    await getVoteList(e.target.value);
  };

  const genre_pop = (
    <Popover className='category_wrap'>
      <Popover.Body>
        {genreList.map((element, idx) => (
          <NavLink
            to={`/genre/pop/${element.id}`}
            key={element.id}
            value={element.id}
          >
            <button
              className='category_btn'
              key={element.id}
              value={element.id}
              onClick={handle_pop}
            >
              {element.genre}
            </button>
          </NavLink>
        ))}
      </Popover.Body>
    </Popover>
  );

  const genre_vote = (
    <Popover className='category_wrap'>
      <Popover.Body>
        {genreList.map((element, idx) => (
          <NavLink
            to={`/genre/vote/${element.id}`}
            key={element.id}
            value={element.id}
          >
            <button
              className='category_btn'
              key={element.id}
              value={element.id}
              onClick={handle_vote}
            >
              {element.genre}
            </button>
          </NavLink>
        ))}
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <div className='genre_btn_wrap'>
        <div>
          <div
            className='genre_btn_info'
            style={{
              textAlign: 'center',
              padding: '10px',
            }}
          >
            - 장르별 검색 -
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <OverlayTrigger
            trigger='focus'
            placement='bottom'
            overlay={genre_pop}
          >
            <Button
              className='genre_option_btn'
              variant='success'
              style={{ border: 'none', backgroundColor: 'transparent' }}
            >
              <div className='genre_btn_name'>인기순</div>
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            trigger='focus'
            placement='bottom'
            overlay={genre_vote}
          >
            <Button
              className='genre_option_btn'
              variant='success'
              style={{ border: 'none', backgroundColor: 'transparent' }}
            >
              <span className='genre_btn_name'>평점순</span>
            </Button>
          </OverlayTrigger>
        </div>
      </div>
    </>
  );
};

export default Genre_btn;
