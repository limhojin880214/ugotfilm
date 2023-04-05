import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { baseUrl } from '../../commonApi_tmdb/baseUrl';
import './mypage.css';
import { useNavigate } from 'react-router-dom';
// import Wordcloud from './wordcloud';

import 'd3-transition';
import { select } from 'd3-selection';
import ReactWordcloud from 'react-wordcloud';

const MyPage = () => {
  const navigator = useNavigate();
  const [wordcloud, setWordclud] = useState([]);
  const [director, setDirector] = useState([]);
  const [cast, setCast] = useState([]);
  const [genre, setGenre] = useState([]);
  const [dtitle, setDtitle] = useState();
  const [ctitle, setCtitle] = useState();
  const [gtitle, setGtitle] = useState();

  const getData = async (e) => {
    const formData = new FormData();
    formData.append('usercode', localStorage.getItem('usercode'));
    await axios
      .post(`${baseUrl}/mypage`, formData)
      .then((response) => {
        //워드클라우드 같이
        let wordclouddata = [];

        //BEST감독
        let directordata = [];
        response.data.bestDirector.map((data, index) => {
          let num = index;
          if (num === 0) {
            setDtitle(data.name);
          }
          directordata.push(data);
          const parse = {
            text: data.name,
            value: data.count,
            id: `person/${data.personcode}`,
          };
          if (index < 11) {
            wordclouddata.push(parse);
          }
        });
        setDirector(directordata);

        //BEST배우
        let castdata = [];
        response.data.bestCast.map((data, index) => {
          // console.log(data);
          let num = index;
          if (num == 0) {
            setCtitle(data.name);
          }
          castdata.push(data);
          const parse = {
            text: data.name,
            value: data.count,
            id: 'person/' + data.personcode,
          };
          if (index < 11) {
            wordclouddata.push(parse);
          }
        });
        setCast(castdata);
        // console.log(ctitle);

        //BEST장르
        let genredata = [];
        response.data.bestGenre.map((data, index) => {
          // console.log(data);
          let num = index;
          if (num == 0) {
            setGtitle(data.name);
          }
          genredata.push(data);
          const parse = {
            text: data.name,
            value: data.count,
            id: 'genre/pop/' + data.genrecode,
          };
          if (index < 11) {
            wordclouddata.push(parse);
          }
        });
        setGenre(genredata);
        // gtitle = response.data.bestGenreTitle;

        //워드클라우드
        setWordclud(wordclouddata);
      })

      .catch((err) => {
        console.log(err.message);
      });
  };

  function getCallback(callback) {
    return function (word, event) {
      const isActive = callback !== 'onWordMouseOut';
      const element = event.target;
      const text = select(element);
      text
        .on('click', () => {
          if (isActive) {
            navigator(`/${word.id}`);
          }
        })
        .transition()
        .attr('font-size', isActive ? '300%' : '100%');
      // .attr('text-decoration', isActive ? 'underline' : 'none');
    };
  }

  const callbacks = {
    // getWordColor: (word) => (word.count > 20 ? 'blue' : word.count > 10 ? 'red' : 'green'),
    getWordTooltip: (word) => `${word.text} 추천 영상`,
    onWordClick: getCallback('onWordClick'),
    onWordMouseOut: getCallback('onWordMouseOut'),
    onWordMouseOver: getCallback('onWordMouseOver'),
  };

  const options = {
    colors: [
      '#c7888d',
      '#d39499',
      '#e0a0a5',
      '#edacb1',
      '#fab8bd',
      '#ffc5c9',
      '#ffd1d6',
    ],
    enableTooltip: false,
    deterministic: false,
    fontFamily: 'impact',
    fontSizes: [35, 65],
    fontStyle: 'normal',
    fontWeight: 'normal',
    padding: 1,
    rotations: 3,
    rotationAngles: [0],
    scale: 'sqrt',
    spiral: 'archimedean',
    transitionDuration: 1000,
  };
  const size = [860, 100];

  useEffect(() => {
    console.log('useEffect 실행');
    getData();
  }, []);

  return (
    <div className='user_contents_wrap'>
      <div className='user_contents user_profile'>
        {/* 홈으로 아이콘 */}
        <div className='user_profile_menu' alt='profile_menu'>
          <NavLink to='/'>
            <img
              className='user_profile_menu_icon'
              src='/images/home.png'
              alt='홈'
            />
          </NavLink>

          {/* 회원정보 아이콘 */}

          <NavLink to='/update'>
            <img
              className='user_profile_menu_icon'
              src='/images/edit.png'
              alt='회원정보'
            />
          </NavLink>
        </div>
        <div>
          <img className='user_profile_icon' src='/images/popcorn.png' />
          <div className='user_name'>
            <span>{localStorage.getItem('nickname')}</span>님의 취향 분석
          </div>
        </div>
      </div>
      {/* 영화 선호 태그 */}
      <div className='user_contents user_tag'>
        <br />
        <h2
          style={{
            fontWeight: 'bolder',
            letterSpacing: '10px',
            color: 'white',
          }}
        >
          #영화선호태그
        </h2>
        <div className='best_one' style={{ color: 'white' }}>
          <span>{localStorage.getItem('nickname')}</span>
          님이 선호하는 태그입니다.
          <br />
          <br />
          {/* <Wordcloud /> */}
          {wordcloud === null ? null : (
            <div style={{ height: '250px', width: '100%' }}>
              <ReactWordcloud
                callbacks={callbacks}
                words={wordcloud}
                options={options}
                size={size}
              />
            </div>
          )}
        </div>
      </div>
      {/* 선호배우 */}
      <div className='user_contents user_actor'>
        <br />
        <h2 style={{ fontWeight: 'bolder', letterSpacing: '10px' }}>
          #선호배우
        </h2>
        <div className='best_one'>
          <span>{localStorage.getItem('nickname')}</span>님이 가장 선호하는
          배우는 <span>{ctitle}</span>
          입니다.
        </div>
        <div className='user_actor_list'>
          {cast &&
            cast.map((element, idx) => (
              <div className='list_intro' key={idx}>
                <NavLink
                  to={`/person/${element.personcode}`}
                  style={{ textDecoration: 'none' }}
                >
                  <span>
                    {element.profile_url == null ||
                    element.profile_url == undefined ? (
                      <img className='list_img' src='/images/none_img.jpg' />
                    ) : (
                      <img
                        className='list_img'
                        src={`https://image.tmdb.org/t/p/w500/${element.profile_url}`}
                      />
                    )}
                  </span>
                  <div className='person_data'>
                    <span className='actor_name'>{element.name}</span>
                  </div>
                  <br />
                </NavLink>
              </div>
            ))}
        </div>
      </div>
      {/* 선호감독 */}
      <div className='user_contents user_director'>
        <br />
        <h2 style={{ fontWeight: 'bolder', letterSpacing: '10px' }}>
          #선호감독
        </h2>
        <div className='best_one'>
          <span>{localStorage.getItem('nickname')}</span>님이 가장 선호하는
          감독은 <span>{dtitle}</span>
          입니다.
        </div>

        <div className='user_actor_list'>
          {director &&
            director.map((element, idx) => (
              <div className='list_intro' key={idx}>
                <NavLink
                  to={`/person/${element.personcode}`}
                  style={{ textDecoration: 'none' }}
                >
                  <span>
                    {element.profile_url == null ||
                    element.profile_url == undefined ? (
                      <img className='list_img' src='/images/none_img.jpg' />
                    ) : (
                      <img
                        className='list_img'
                        src={`https://image.tmdb.org/t/p/w500/${element.profile_url}`}
                      />
                    )}
                  </span>
                  <div className='person_data'>
                    <span className='actor_name'>{element.name}</span>
                    <br />
                  </div>
                </NavLink>
              </div>
            ))}
        </div>
      </div>

      {/* 선호장르 */}
      <div className='user_contents user_genre'>
        <div className='user_genre_list'>
          <br />
          <h2 style={{ fontWeight: 'bolder', letterSpacing: '10px' }}>
            #선호장르
          </h2>
          <div className='best_one'>
            <span>{localStorage.getItem('nickname')}</span>님이 가장 선호하는
            장르는 <span>{gtitle}</span>
            입니다.
          </div>
          <div className='list_top_box'>
            {genre &&
              genre.map((element, idx) => (
                <div className='list_top3' key={idx}>
                  <NavLink
                    to={`/genre/pop/${element.personcode}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div className='list_top3_name'>{element.name}</div>
                  </NavLink>
                  <span className='list_top3_count'>
                    {element.count}
                    <span>편</span>
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
