import axios from 'axios';
import { useEffect, useState } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import { NavLink } from 'react-router-dom';
import TmdbdiscoverUrl from '../commonApi_tmdb/tmdbDiscoverUrl';
import TmdbPerson from '../commonApi_tmdb/tmdbPeople';
import TMDB_KEY from '../commonApi_tmdb/tmdb_key';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const ChoiceCuration = (props) => {
  const { choiceGender, choiceAge, user } = props;

  const userInfo = {
    age: user.ageGroup,
    gender: user.gender,
  };

  const gender = {
    movie: choiceGender.curationMovie,
    genre: choiceGender.curationGenre,
    director: choiceGender.curationDirector,
    cast: choiceGender.curationCast,
  };

  const age = {
    movie: choiceAge.curationMovie,
    genre: choiceAge.curationGenre,
    director: choiceAge.curationDirector,
    cast: choiceAge.curationCast,
  };

  const [genderGenre, setGenderGenre] = useState([]); // 장르 정보(성별)
  const [ageGenre, setAgeGenre] = useState([]); // 장르 정보(연령)
  const [genderDirector, setGenderDirector] = useState([]); // 감독 정보(성별)
  const [ageDirector, setAgeDirector] = useState([]); // 감독 정보(연령)
  const [genderCast, setGenderCast] = useState([]); // 배우 정보(성별)
  const [ageCast, setAgeCast] = useState([]); // 배우 정보(연령)

  // Tmdb API
  const lang = '&language=ko';
  const popular = '&sort_by=popularity.desc';
  const region = '&region=kr';
  const adult = '&include_adult=false';
  const genre_id = '&with_genres=';
  const v_count = '&vote_count.gte=100';
  const page = '&page=1';

  // 장르 인기순
  const getPopList = async () => {
    await axios
      .all([
        axios.get(
          TmdbdiscoverUrl +
            '?api_key=' +
            TMDB_KEY +
            lang +
            region +
            popular +
            adult +
            page +
            genre_id +
            gender.genre.genrecode +
            v_count
        ),
        axios.get(
          TmdbdiscoverUrl +
            '?api_key=' +
            TMDB_KEY +
            lang +
            region +
            popular +
            adult +
            page +
            genre_id +
            age.genre.genrecode +
            v_count
        ),
      ])
      .then(
        axios.spread((res1, res2) => {
          setGenderGenre(res1.data.results);
          setAgeGenre(res2.data.results);
        })
      )
      .catch((err) => {
        console.log(err.message);
      });
  };

  //////////////////////////////////////////////////////

  // 감독 정보
  const getDirector = async () => {
    if (age.director.personcode && gender.director.personcode !== undefined) {
      await axios
        .all([
          axios.get(
            TmdbPerson +
              gender.director.personcode +
              '/movie_credits?api_key=' +
              TMDB_KEY +
              lang
          ),
          axios.get(
            TmdbPerson +
              age.director.personcode +
              '/movie_credits?api_key=' +
              TMDB_KEY +
              lang
          ),
        ])
        .then(
          axios.spread((res1, res2) => {
            setGenderDirector(res1.data.crew);
            setAgeDirector(res2.data.crew);
          })
        )
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  // ///////////////////////////////////////////////////////

  // 배우 정보
  const getCast = async () => {
    if (gender.cast.personcode && age.cast.personcode !== undefined) {
      await axios
        .all([
          axios.get(
            TmdbPerson +
              gender.cast.personcode +
              '/movie_credits?api_key=' +
              TMDB_KEY +
              lang
          ),
          axios.get(
            TmdbPerson +
              age.cast.personcode +
              '/movie_credits?api_key=' +
              TMDB_KEY +
              lang
          ),
        ])
        .then(
          axios.spread((res1, res2) => {
            setGenderCast(res1.data.cast);
            setAgeCast(res2.data.cast);
          })
        )
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    getPopList();
    getDirector();
    getCast();
  }, [choiceGender, choiceAge, user]);

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
    <>
      <div className='basic_curation_wrap'>
        <br id='gender_curation' />
        <br />
        <br />
        <div className='curation_explain'>
          지금 {userInfo.gender}성들이 보는 영화.
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        {/* 성별 베스트 영화 */}
        <div
          className='basic_curation_component'
          style={
            gender.movie.length > 5
              ? null
              : { height: '500px', overflow: 'hidden' }
          }
        >
          <div className='basic_curation_subject'>
            <br />
            <span>
              <span style={{ fontWeight: 'bolder' }}>{userInfo.gender}성</span>
              들이 가장 선호하는 영화는?
            </span>
          </div>
          <br />
          <div className='basic_curation_slide'>
            <Slider {...settings}>
              {gender.movie &&
                gender.movie.map((choice, idx) => {
                  return (
                    <div className='basic_curation_info' key={idx}>
                      <div>
                        {choice.poster_url === null ||
                        choice.poster_url === undefined ? (
                          <img
                            className='basic_curation_img'
                            src='/images/none_img.jpg'
                          />
                        ) : (
                          <img
                            className='basic_curation_img'
                            src={
                              'https://image.tmdb.org/t/p/w500' +
                              choice.poster_url
                            }
                          />
                        )}
                      </div>
                      <NavLink
                        to={`/detail/${choice.moviecode}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <div
                          className='basic_curation_title'
                          style={{ width: '100%' }}
                        >
                          {choice.title}
                        </div>
                      </NavLink>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>

        <br id='gender_genre' />
        <br />
        <hr />

        {/* 성별 선호 장르 */}
        <div className='basic_curation_component'>
          <div className='basic_curation_subject'>
            <br />
            <span>
              <span style={{ fontWeight: 'bolder' }}>{userInfo.gender}성</span>
              들이 가장 선호하는 장르는{' '}
              <span style={{ fontWeight: 'bolder' }}>{gender.genre.name}</span>
              <span>!</span>
            </span>
          </div>
          <br />

          <div className='basic_curation_slide'>
            <Slider {...settings}>
              {genderGenre &&
                genderGenre.map((genre, idx) => {
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
                        <div className='basic_curation_title'>
                          {genre.title}
                        </div>
                      </NavLink>
                    </div>
                  );
                })}
            </Slider>
          </div>

          <div className='basic_curation_btn'>
            <NavLink
              to={`/genre/pop/${gender.genre.genrecode}`}
              key={gender.genre.genrecode}
              value={gender.genre.genrecode}
            >
              <button className='basic_curation_plus_btn'>+</button>
            </NavLink>
          </div>
        </div>

        <br id='gender_director' />
        <br />
        <hr />

        {/* 성별 선호 감독 */}
        <div
          className='basic_curation_component'
          style={
            genderDirector.length > 5
              ? null
              : { height: '500px', overflow: 'hidden' }
          }
        >
          <div className='basic_curation_subject'>
            <br />
            <span>
              <span style={{ fontWeight: 'bolder' }}>{userInfo.gender}성</span>
              들이 가장 선호하는 감독은{' '}
              <span style={{ fontWeight: 'bolder' }}>
                {gender.director.name}
              </span>
              <span>!</span>
            </span>
          </div>
          <br />

          <div className='basic_curation_slide'>
            <Slider {...settings}>
              {genderDirector &&
                genderDirector.map((director, idx) => {
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
        <br id='gender_actor' />
        <br />
        <hr />

        {/* 성별 선호 배우 */}
        <div
          className='basic_curation_component'
          style={
            genderCast.length > 5
              ? null
              : { height: '500px', overflow: 'hidden', paddingBottom: '100px' }
          }
        >
          <div className='basic_curation_subject'>
            <br />
            <span>
              <span style={{ fontWeight: 'bolder' }}>{userInfo.gender}성</span>
              들이 가장 선호하는 배우는{' '}
              <span style={{ fontWeight: 'bolder' }}>{gender.cast.name}</span>
              <span>!</span>
            </span>
          </div>
          <br />
          <div className='basic_curation_slide'>
            <Slider {...settings}>
              {genderCast &&
                genderCast.map((cast, idx) => {
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
                              'https://image.tmdb.org/t/p/w500' +
                              cast.poster_path
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

        {/* 연령별 베스트 영화 */}
        <br id='age_curation' />
        <br />
        <br />
        <div className='curation_explain'>
          지금 {userInfo.age}대들이 보는 영화.
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div
          className='basic_curation_component'
          style={
            age.movie.length > 5
              ? null
              : { height: '500px', overflow: 'hidden' }
          }
        >
          <div className='basic_curation_subject'>
            <span>
              <span style={{ fontWeight: 'bolder' }}>{userInfo.age}대</span>
              들의 마음을 사로잡은 영화는?
            </span>
          </div>
          <div className='basic_curation_slide'>
            <Slider {...settings}>
              {age.movie &&
                age.movie.map((choice, idx) => {
                  return (
                    <div className='basic_curation_info' key={idx}>
                      <div>
                        {choice.poster_url === null ||
                        choice.poster_url === undefined ? (
                          <img
                            className='basic_curation_img'
                            src='/images/none_img.jpg'
                          />
                        ) : (
                          <img
                            className='basic_curation_img'
                            src={
                              'https://image.tmdb.org/t/p/w500' +
                              choice.poster_url
                            }
                          />
                        )}
                      </div>
                      <NavLink
                        to={`/detail/${choice.moviecode}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <div
                          className='basic_curation_title'
                          style={{ width: '100%' }}
                        >
                          {choice.title}
                        </div>
                      </NavLink>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
        <br id='age_genre' />
        <br />
        <hr />

        {/* 연령별 선호 장르 */}
        <div
          className='basic_curation_component'
          style={
            genderCast.length > 5
              ? null
              : { height: '500px', overflow: 'hidden', paddingBottom: '100px' }
          }
        >
          <div className='basic_curation_subject'>
            <br />
            <span>
              <span style={{ fontWeight: 'bolder' }}>{userInfo.age}대</span>
              들의 마음을 사로잡은 장르는 바로{' '}
              <span style={{ fontWeight: 'bolder' }}>{age.genre.name}</span>
              <span>!</span>
            </span>
          </div>
          <br />

          <div className='basic_curation_slide'>
            <Slider {...settings}>
              {ageGenre &&
                ageGenre.map((genre, idx) => {
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
                        <div className='basic_curation_title'>
                          {genre.title}
                        </div>
                      </NavLink>
                    </div>
                  );
                })}
            </Slider>
          </div>

          <div className='basic_curation_btn'>
            <NavLink
              to={`/genre/pop/${age.genre.genrecode}`}
              key={age.genre.genrecode}
              value={age.genre.genrecode}
            >
              <button className='basic_curation_plus_btn'>+</button>
            </NavLink>
          </div>
        </div>
        <br id='age_director' />
        <br />
        <hr />

        {/* 연령별 선호 감독 */}
        <div
          className='basic_curation_component'
          style={
            ageDirector.length > 5
              ? null
              : { height: '500px', overflow: 'hidden' }
          }
        >
          <div className='basic_curation_subject'>
            <br />
            <span>
              <span style={{ fontWeight: 'bolder' }}>{userInfo.age}대</span>의
              마음을 사로잡은 감독,
              <span style={{ fontWeight: 'bolder' }}>{age.director.name}</span>
              <span>의 작품을 만나보세요!</span>
            </span>
          </div>
          <br />
          <div className='basic_curation_slide'>
            <Slider {...settings}>
              {ageDirector &&
                ageDirector.map((director, idx) => {
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
        <br id='age_actor' />
        <br />
        <hr />

        {/* 연령별 선호 배우 */}
        <div
          className='basic_curation_component'
          style={
            ageCast.length > 5 ? null : { height: '500px', overflow: 'hidden' }
          }
        >
          <div className='basic_curation_subject'>
            <br />
            <span>
              <span style={{ fontWeight: 'bolder' }}>{userInfo.age}대</span>의
              마음을 사로잡은 배우,
              <span style={{ fontWeight: 'bolder' }}> {age.cast.name}</span>
              <span>의 작품을 만나보세요!</span>
            </span>
          </div>
          <br />

          <div className='basic_curation_slide'>
            <Slider {...settings}>
              {ageCast &&
                ageCast.map((cast, idx) => {
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
                              'https://image.tmdb.org/t/p/w500' +
                              cast.poster_path
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
    </>
  );
};

export default ChoiceCuration;
