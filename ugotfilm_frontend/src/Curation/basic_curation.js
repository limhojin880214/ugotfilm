import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import TmdbdiscoverUrl from '../commonApi_tmdb/tmdbDiscoverUrl';
import TmdbPerson from '../commonApi_tmdb/tmdbPeople';
import TMDB_KEY from '../commonApi_tmdb/tmdb_key';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BasicCuration = (props) => {
  const { basicCuration } = props;

  const best = {
    movie: basicCuration.bestMovie,
    genre: basicCuration.bestGenre,
    director: basicCuration.bestDirector,
    cast: basicCuration.bestCast,
  };

  const [genreList, setGenreList] = useState([]); // 장르 정보
  const [directorInfo, setDirectorInfo] = useState([]); // 감독 정보
  const [castInfo, setCastInfo] = useState([]); // 배우 정보

  // Tmdb API
  const lang = '&language=ko';
  const popular = '&sort_by=popularity.desc';
  const region = '&region=kr';
  const adult = '&include_adult=false';
  const genre_id = '&with_genres=';
  const v_count = '&vote_count.gte=100';
  const page = '&page=1';

  // 장르 인기순
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
          best.genre.genrecode +
          v_count
      )
      .then((response) => {
        setGenreList(response.data.results);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //////////////////////////////////////////////////////

  // 감독 정보
  const getDirector = async () => {
    if (best.director.personcode !== undefined) {
      await axios
        .get(
          TmdbPerson +
            best.director.personcode +
            '/movie_credits?api_key=' +
            TMDB_KEY +
            lang
        )
        .then((response) => {
          setDirectorInfo(response.data.crew);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  ///////////////////////////////////////////////////////

  // 배우 정보
  const getCast = async () => {
    if (best.cast.personcode !== undefined) {
      await axios
        .get(
          TmdbPerson +
            best.cast.personcode +
            '/movie_credits?api_key=' +
            TMDB_KEY +
            lang
        )
        .then((response) => {
          setCastInfo(response.data.cast);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    getPopList();
    getDirector();
    getCast();
  }, [basicCuration]);

  const settings = {
    dots: false, // 캐러셀의 점을 보여줄 것 인지
    infinite: true, // 마지막장 다음에 첫장이 나오게 할 지
    speed: 500, // 다음 컨텐츠 까지의 속도
    autoplay: true, // 자동으로 재생할지
    arrows: true, // 좌,우 버튼
    centerMode: true, // 현재 컨텐츠 가운데 정렬
    autoplaySpeed: 2000, // 자동 캐러셀 속도
    slidesToShow: 5, // 한 화면에 몇개의 사진을 동시에 보여줄지
    slidesToScroll: 1,
    draggable: true, // 드래그
  };

  return (
    <div id='whole_movie' className='basic_curation_wrap'>
      <br />
      <br />
      <br />
      <div id='whole_user' className='curation_explain'>
        지금 사람들이 보는 영화.
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* 베스트 영화 */}
      <div
        className='basic_curation_component'
        style={
          best.movie.length > 5
            ? null
            : { height: '500px', overflow: 'hidden', paddingBottom: '100px' }
        }
      >
        <div className='basic_curation_subject'>아직도 안 보셨나요?</div>
        <br />
        <div className='basic_curation_slide'>
          <Slider {...settings}>
            {best.movie &&
              best.movie.map((best, idx) => {
                return (
                  <div className='basic_curation_info' key={idx}>
                    <div>
                      {best.poster_url === null ||
                      best.poster_url === undefined ? (
                        <img
                          className='basic_curation_img'
                          src='/images/none_img.jpg'
                        />
                      ) : (
                        <img
                          className='basic_curation_img'
                          src={
                            'https://image.tmdb.org/t/p/w500' + best.poster_url
                          }
                        />
                      )}
                    </div>
                    <NavLink
                      to={`/detail/${best.moviecode}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <div
                        className='basic_curation_title'
                        style={{ width: '100%' }}
                      >
                        {best.title}
                      </div>
                    </NavLink>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
      <br id='whole_genre' />
      <br />
      <hr />
      {/* 추천 장르 영화 */}
      <div className='basic_curation_component'>
        <div className='basic_curation_subject'>
          <br />
          <span>지금은 </span>
          <span style={{ fontWeight: 'bolder' }}>{best.genre.name} </span>
          <span>장르가 대세!</span>
        </div>
        <br />

        <div className='basic_curation_slide'>
          <Slider {...settings}>
            {genreList &&
              genreList.map((genre, idx) => {
                return (
                  <div className='basic_curation_info' key={idx}>
                    <div>
                      {genre.poster_path === null ||
                      genre.poster_path === undefined ? (
                        <img
                          className='basic_curation_img'
                          src='/images/none_img.jpg'
                        />
                      ) : (
                        <img
                          className='basic_curation_img'
                          src={
                            'https://image.tmdb.org/t/p/w500' +
                            genre.poster_path
                          }
                        />
                      )}
                    </div>

                    <NavLink
                      to={`/detail/${genre.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <div className='basic_curation_title'>{genre.title}</div>
                    </NavLink>
                  </div>
                );
              })}
          </Slider>
        </div>

        <div className='basic_curation_btn'>
          <NavLink
            to={`/genre/pop/${best.genre.genrecode}`}
            key={best.genre.genrecode}
            value={best.genre.genrecode}
            style={{ textDecoration: 'none' }}
          >
            <button className='basic_curation_plus_btn'>+</button>
          </NavLink>
        </div>
      </div>
      <br id='whole_director' />
      <br />
      <hr />
      {/* 추천 감독 영화 */}
      <div
        className='basic_curation_component'
        style={
          directorInfo.length > 5
            ? null
            : { height: '500px', overflow: 'hidden' }
        }
      >
        <div className='basic_curation_subject'>
          <br />
          <span>
            모두가 주목하는 감독
            <span style={{ fontWeight: 'bolder' }}> {best.director.name}</span>
            의 작품을 만나보세요!
          </span>
        </div>
        <br />
        <div className='basic_curation_slide'>
          <Slider {...settings}>
            {directorInfo &&
              directorInfo.map((director, idx) => {
                return (
                  <div className='basic_curation_info' key={idx}>
                    <div>
                      {director.poster_path === null ||
                      director.poster_path === undefined ? (
                        <img
                          className='basic_curation_img'
                          src='/images/none_img.jpg'
                        />
                      ) : (
                        <img
                          className='basic_curation_img'
                          src={
                            'https://image.tmdb.org/t/p/w500' +
                            director.poster_path
                          }
                        />
                      )}
                    </div>
                    <NavLink
                      to={`/detail/${director.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <div className='basic_curation_title'>
                        {director.title}
                      </div>
                    </NavLink>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
      <br id='whole_actor' />
      <br />
      <hr />
      {/* 추천 배우 영화 */}
      <div
        id='whole_actor'
        className='basic_curation_component'
        style={
          castInfo.length > 5
            ? null
            : { height: '500px', overflow: 'hidden', marginBottom: '100px' }
        }
      >
        <div className='basic_curation_subject'>
          <br />
          <span>
            모두가 주목하는 배우
            <span style={{ fontWeight: 'bolder' }}> {best.cast.name}</span>의
            작품을 만나보세요!
          </span>
        </div>
        <br />
        <div className='basic_curation_slide'>
          <Slider {...settings}>
            {castInfo &&
              castInfo.map((cast, idx) => {
                return (
                  <div className='basic_curation_info' key={idx}>
                    <div>
                      {cast.poster_path === null ||
                      cast.poster_path === undefined ? (
                        <img
                          className='basic_curation_img'
                          src='/images/none_img.jpg'
                        />
                      ) : (
                        <img
                          className='basic_curation_img'
                          src={
                            'https://image.tmdb.org/t/p/w500' + cast.poster_path
                          }
                        />
                      )}
                    </div>
                    <NavLink
                      to={`/detail/${cast.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <div className='basic_curation_title'>{cast.title}</div>
                    </NavLink>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default BasicCuration;
