import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { baseUrl } from '../commonApi_tmdb/baseUrl';
import TmdbUrl from '../commonApi_tmdb/tmdbUrl';
import TMDB_KEY from '../commonApi_tmdb/tmdb_key';
import MovieComment from '../components/movie/movie_comment';
import './Tmdb_style.css';

const MovieDetail = () => {
  //화면에 보여줄 내용
  const [movieInfo, setMovieInfo] = useState([]);
  const [genre, setGenre] = useState([]);
  const [castInfo, setCastInfo] = useState([]);
  const [crewInfo, setCrewInfo] = useState([]);

  //한줄평
  const [commentList, setCommentList] = useState([]);
  //정보 저장
  //영화용DTO
  const MovieDTO = useRef({
    id: 0,
    title: '',
    poster: '',
  });
  //감독용DTO
  const CrewDTO = useRef({
    id: 0,
    job: '',
    name: '',
    profile: '',
  });

  //백엔드로 보내는 감독 정보(String)
  let director = '';
  //백엔드로 보내는 영화 정보(String)
  let movie = '';
  //백엔드로 보내는 장르들 정보(String)
  let genrelist = '';
  //백엔드로 보내는 배우들 정보(String)
  let castlist = '';

  const { movie_id } = useParams();
  const lang = '&language=ko';

  //영화, 장르
  const getMovieInfo = async () => {
    await axios
      .get(TmdbUrl + '/' + movie_id + '?api_key=' + TMDB_KEY + lang)
      .then((response) => {
        //화면 구성을 위한 set
        setGenre(response.data.genres);
        setMovieInfo(response.data);

        //영화정보 DTO에 저장
        MovieDTO.id = response.data.id;
        MovieDTO.title = response.data.title;
        MovieDTO.poster = response.data.poster_path;

        //영화정보 저장
        movie = JSON.stringify(MovieDTO);
        //장르 정보 저장
        genrelist = JSON.stringify(response.data.genres);

        //영화, 장르 정보 보내기
        sendMovieInfo();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //감독, 배우
  const getCreditInfo = async () => {
    await axios
      .get(
        TmdbUrl + '/' + movie_id + '/credits' + '?api_key=' + TMDB_KEY + lang
      )
      .then((response) => {
        // 배우들 화면을 구성하기 위한 set
        setCastInfo(response.data.cast);

        //감독 정보 버장
        for (let i = 0; i < response.data.crew.length; i++) {
          //화면 구성을 위한 감독 정보 저장
          if (response.data.crew[i].job === 'Director') {
            //감독 화면을 구성하기 위한 set
            setCrewInfo({
              id: response.data.crew[i].id,
              name: response.data.crew[i].name,
              profile: response.data.crew[i].profile_path,
            });
            //감독 정보 DTO에 저장
            CrewDTO.id = response.data.crew[i].id;
            CrewDTO.name = response.data.crew[i].name;
            CrewDTO.profile = response.data.crew[i].profile_path;
            CrewDTO.job = response.data.crew[i].known_for_department;

            //감독 정보 저장
            director = JSON.stringify(CrewDTO);
          }
        }

        //배우들 정보 DTO에 저장
        let castdate = [];
        for (let i = 0; i < response.data.cast.length; i++) {
          const parse = {
            id: response.data.cast[i].id,
            name: response.data.cast[i].name,
            profile: response.data.cast[i].profile_path,
            job: response.data.cast[i].known_for_department,
          };
          castdate.push(parse);
        }

        //백엔드로 보내는 배우들 정보 저장
        castlist = JSON.stringify(castdate);

        //감독, 배우 정보 보내기
        sendCrewInfo();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //화면구성
  useEffect(() => {
    getMovieInfo();
    getCreditInfo();
    getData();
  }, []);

  //영화, 장르 정보를 백엔드로 보내기
  const sendMovieInfo = async () => {
    const data = new FormData();

    //회원정보
    data.append('usercode', localStorage.getItem('usercode'));
    //영화정보
    data.append('movie', movie);
    //장르정보
    data.append('genrelist', genrelist);

    await axios
      .post(`${baseUrl}/save/detail/movieinfo`, data)
      .then((response) => {})
      .catch((err) => {
        console.log(err.message);
      });
  };

  //감독, 배우 정보를 백엔드로 보내기
  const sendCrewInfo = async () => {
    const data = new FormData();

    //회원정보
    data.append('usercode', localStorage.getItem('usercode'));
    //감독정보
    data.append('director', director);
    //배우정보
    data.append('castlist', castlist);

    await axios
      .post(`${baseUrl}/save/detail/creditinfo`, data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const getData = async () => {
    await axios
      .get(`${baseUrl}/commentmovie/${movie_id}`)
      .then((response) => {
        setCommentList(response.data.blist);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //댓글 작성
  const [textareas, setTextareas] = useState({ subject: '' });
  const { subject } = textareas;

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('writer', localStorage.getItem('usercode'));
    formData.append('subject', subject);
    //답변글이면...
    if (movie_id !== undefined) {
      formData.append('pnum', movie_id);
      formData.append('num', movie_id);
    }

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };

    await axios
      .post(`${baseUrl}/commentmovie/write`, formData, config)
      .then((response) => {
        setTextareas({
          subject: '',
        });
        getData();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    setTextareas({ ...textareas, ...nextState });
  };
  return (
    <>
      <div className='detail_wrap'>
        {/* 영화정보: 포스터, 제목, 줄거리, 장르, 개봉일 */}
        <div className='movie_detail'>
          {movieInfo.poster_path === null ||
          movieInfo.poster_path === undefined ? (
            <img className='poster_img' src='./images/none_img.jpg' />
          ) : (
            <img
              className='poster_img'
              src={'https://image.tmdb.org/t/p/w500' + movieInfo.poster_path}
              width='300'
            />
          )}

          <div className='movie_detail_text'>
            <div className='movie_title_box'>
              <img className='movie_title_img' src='/images/clapperboard.png' />
              <span className='movie_title'>{movieInfo.title}</span>
            </div>
            <div className='movie_overview'>{movieInfo.overview}</div>
            <div className='movie_genre'>
              <span className='outline_title'>장르</span>
              {genre.map((element, idx) => (
                <span className='outline_content' key={idx}>
                  {/* {element.id} */}
                  {element.name}
                </span>
              ))}
            </div>
            <div className='release_date'>
              <span className='outline_title'>개봉일</span>
              <span className='outline_content'>{movieInfo.release_date}</span>
            </div>
          </div>
        </div>
        {/* 감독 */}
        <div className='detail_box' style={{ overflow: 'hidden' }}>
          <div className='detail_title'>감독</div>
          <div className='detail_content'>
            {crewInfo.profile === null || crewInfo.profile === undefined ? (
              <img className='crew_img' src='/images/none_img.jpg' />
            ) : (
              <img
                className='crew_img'
                src={'https://image.tmdb.org/t/p/w500' + crewInfo.profile}
              />
            )}
            <Link
              to={`/person/${crewInfo.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className='crew_name'>{crewInfo.name}</div>
            </Link>
          </div>
        </div>
        {/* 출연배우 */}{' '}
        <div className='detail_box'>
          <div className='detail_title'>배우</div>
          {castInfo.map((cast, idx) => (
            <div className='detail_content' key={idx}>
              {cast.profile_path === null || cast.profile_path === undefined ? (
                <img className='crew_img' src='/images/none_img.jpg' />
              ) : (
                <img
                  className='crew_img'
                  src={'https://image.tmdb.org/t/p/w500' + cast.profile_path}
                />
              )}
              <Link
                key={idx}
                // className='actor_wrap'
                to={`/person/${cast.id}`}
                style={{ textDecoration: 'none' }}
              >
                <div className='crew_name'>{cast.name}</div>
              </Link>
            </div>
          ))}
        </div>
        {/* 댓글부분 */}
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className='detail_comment'>
          <hr />
          <table className='table'>
            <tbody>
              {commentList &&
                commentList.map((comment) => {
                  return (
                    <MovieComment
                      board={comment}
                      num={movie_id}
                      key={comment.num}
                    />
                  );
                })}
            </tbody>
          </table>
          <div>
            <form onSubmit={onSubmit}>
              <div className='detail_comment_write_box'>
                <div>
                  <img
                    src='/images/user.png'
                    style={{
                      width: '30px',
                      height: '30px',
                      float: 'left',
                      marginRight: '20px',
                    }}
                  />
                  <textarea
                    className='detail_comment_textarea'
                    name='subject'
                    value={subject}
                    onChange={handleValueChange}
                    placeholder='댓글을 입력하세요.'
                    style={{ resize: 'none' }}
                  ></textarea>
                </div>
                <div className='detail_comment_btn_box'>
                  <input
                    type='submit'
                    className='detail_comment_btn'
                    value='  ✈  '
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
