import axios from 'axios';
import { useState } from 'react';
import Tmdb_main from './Tmdb_main';
import TMDB_KEY from '../commonApi_tmdb/tmdb_key';
import Search_Movie from './Search_movie';
import Genre_btn from './Tmdb_genre';
import TmdbSearchMovieUrl from '../commonApi_tmdb/tmdbSearchMovieUrl';
import Search_people from './Search_person';
import TmdbSearchPeopleUrl from '../commonApi_tmdb/tmdbSearchPersonUrl';
import './Movie_general.css';
import Curation from '../Curation/Curation';

const Movie = () => {
  const [searchMovieList, setSearchMovieList] = useState([]);
  const [searchPeople, setSearchPeople] = useState([]);
  const [input, setInput] = useState('');
  const lang = '&language=ko';

  // 영화 검색 or 사람 검색 옵션
  const [searchType, setSearchType] = useState('movie_search');

  const onSelect = (e) => {
    setSearchType(e.target.value);
  };

  ////////////////////////////////////////////////////////////////////////

  // 영화 검색
  const getSearchList = async () => {
    await axios
      .get(
        TmdbSearchMovieUrl +
          '?api_key=' +
          TMDB_KEY +
          lang +
          '&query=' +
          input +
          '&include_adult=false'
      )
      .then((response) => {
        setInput(input);
        setSearchMovieList(response.data.results);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleInputMovie = (e) => {
    e.preventDefault();
    setInput(e.target.value);
    setSearchMovieList('');
  };

  ////////////////////////////////////////////////////////////////////////

  // 사람 검색
  const getPeopleList = async () => {
    await axios
      .get(
        TmdbSearchPeopleUrl +
          '?api_key=' +
          TMDB_KEY +
          lang +
          '&query=' +
          input +
          '&include_adulte=false'
      )
      .then((response) => {
        setInput(input);
        setSearchPeople(response.data.results);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleInputPeople = (e) => {
    e.preventDefault();
    setInput(e.target.value);
    setSearchPeople('');
  };

  const searchMv = async (e) => {
    e.preventDefault();
    if (searchType === 'movie_search') {
      getSearchList();
    } else if (searchType === 'people_search') {
      getPeopleList();
    }
  };

  return (
    <div className='movie_general_wrap'>
      <div className='genre_btn_div'>{input === '' ? <Genre_btn /> : null}</div>
      <form onSubmit={searchMv}>
        <div className='search_wrap'>
          <div className='search_box'>
            <select
              className='search_option'
              value={searchType}
              onChange={onSelect}
            >
              <option value='movie_search'>영화</option>
              <option value='people_search'>배우 및 감독</option>
            </select>{' '}
            {searchType === 'movie_search' ? (
              <>
                <input
                  className='search_content'
                  type='text'
                  required={true}
                  placeholder='  검색어를 입력해주세요.'
                  onChange={handleInputMovie}
                  value={input}
                />
              </>
            ) : null}
            {searchType === 'people_search' ? (
              <>
                <input
                  className='search_content'
                  type='text'
                  required={true}
                  placeholder='  검색어를 입력해주세요.'
                  onChange={handleInputPeople}
                  value={input}
                />
              </>
            ) : null}
          </div>
        </div>
      </form>
      <br />

      {input === '' ? (
        <Tmdb_main />
      ) : searchType === 'movie_search' ? (
        <>
          <br /> <br />
          <br /> <br />
          <div className='movieList'>
            <div className='search_result_text_box'>
              <span>
                <span>[</span>{' '}
                <span className='search_result_input'>{input}</span>{' '}
                <span>]</span>
              </span>
              <span className='search_result_text'>
                에 대한 검색 결과입니다.
              </span>
            </div>
            <br /> <br />
            <div>
              {searchMovieList &&
                searchMovieList.map((movie, idx) => {
                  return <Search_Movie movie={movie} key={idx} />;
                })}
            </div>
          </div>
        </>
      ) : (
        <>
          <br /> <br />
          <br /> <br />
          <div className='movieList'>
            <div className='search_result_text_box'>
              <span>
                <span>[</span>{' '}
                <span className='search_result_input'>{input}</span>{' '}
                <span>]</span>
              </span>
              <span className='search_result_text'>
                에 대한 검색 결과입니다.
              </span>
            </div>
            <br /> <br />
            <div>
              {searchPeople &&
                searchPeople.map((people, idx) => {
                  return <Search_people people={people} key={idx} />;
                })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Movie;
