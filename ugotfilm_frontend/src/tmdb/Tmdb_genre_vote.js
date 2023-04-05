import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import TmdbdiscoverUrl from '../commonApi_tmdb/tmdbDiscoverUrl';
import TMDB_KEY from '../commonApi_tmdb/tmdb_key';
import './Genre_list_style.css';

const Genre_vote = () => {
  const lang = '&language=ko';
  const vote = '&sort_by=vote_average.desc';
  const region = '&region=kr';
  const adult = '&include_adult=false';
  const genres = '&with_genres=';
  const v_count = '&vote_count.gte=100';
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

  const [page, setPage] = useState(1);

  const { genre_id } = useParams();

  const [genreInfo, setGenreInfo] = useState([]);

  const getGenreList = async () => {
    await axios
      .get(
        TmdbdiscoverUrl +
          '?api_key=' +
          TMDB_KEY +
          lang +
          region +
          vote +
          adult +
          '&page=' +
          page +
          genres +
          genre_id +
          v_count
      )
      .then((response) => {
        setGenreInfo(genreInfo.concat(response.data.results));
        setPage(page + 1);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getGenreList();
  }, []);

  const handle = (e) => {
    getGenreList(e.target.value);
  };

  return (
    <>
      <br /> <br />
      <br /> <br />
      <br /> <br />
      <div className='genre_wrap'>
        <div>
          <div
            style={{
              fontSize: '20px',
              paddingBottom: '10px',
              letterSpacing: '50px',
              color: 'gray',
            }}
          >
            평점순
          </div>
          {genreList.map((element, idx) => (
            <>
              {element.id == genre_id ? (
                <div
                  style={{
                    fontSize: '30px',
                    fontWeight: 'bolder',
                    letterSpacing: '50px',
                    color: 'black',
                  }}
                >
                  <span>#</span>
                  {element.genre}
                </div>
              ) : null}
            </>
          ))}
        </div>
        <br />
        {genreInfo.map((element) => (
          <div className='genre_tile' key={element.id}>
            <div className='genre_movie_image'>
              {element.poster_path === null ||
              element.poster_path === undefined ? (
                <img src='/images/none_img.jpg' />
              ) : (
                <img
                  className='poster'
                  src={'https://image.tmdb.org/t/p/w500' + element.poster_path}
                />
              )}
            </div>
            <NavLink
              to={`/detail/${element.id}`}
              key={element.id}
              style={{ textDecoration: 'none' }}
            >
              <div className='genre_movie_title'>{element.title}</div>
            </NavLink>

            <div className='genre_movie_text'>
              <div className='movie_date'>{element.release_date}</div>
              <span className='star_rating'>★</span>
              <span className='movie_rating'>{element.vote_average}</span>
            </div>
          </div>
        ))}
      </div>
      <button className='button_more' onClick={handle}>
        <span className='button_more_text'>MORE</span>
      </button>
    </>
  );
};

export default Genre_vote;
