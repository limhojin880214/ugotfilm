import axios from 'axios';
import { useEffect, useState } from 'react';
import TmdbPerson from '../commonApi_tmdb/tmdbPeople';
import TMDB_KEY from '../commonApi_tmdb/tmdb_key';
import Cast from './Tmdb_credit_cast';
import Crew from './Tmdb_credit_crew';

const Credit = (props) => {
  const lang = '&language=ko';
  const { id, department } = props;

  // 출연 및 연출 정보
  const [castInfo, setCastInfo] = useState([]);
  const [crewInfo, setCrewInfo] = useState([]);

  // 크레딧 정보
  const getPersonCredit = async () => {
    await axios
      .get(TmdbPerson + id + '/movie_credits?api_key=' + TMDB_KEY + lang)
      .then((response) => {
        let castdata = [];
        response.data.cast.map((data, index) => {
          const parse = {
            id: data.id,
            title: data.title,
            poster_path: data.poster_path,
            vote_average: data.vote_average,
          };
          castdata.push(parse);
        });
        const castres = castdata.reduce((acc, v) => {
          return acc.find((x) => x.id === v.id) ? acc : [...acc, v];
        }, []);
        setCastInfo(castres);

        let crewdata = [];
        response.data.crew.map((data, index) => {
          const parse = {
            id: data.id,
            title: data.title,
            poster_path: data.poster_path,
            vote_average: data.vote_average,
          };
          crewdata.push(parse);
        });
        const crewres = crewdata.reduce((acc, v) => {
          return acc.find((x) => x.id === v.id) ? acc : [...acc, v];
        }, []);
        setCrewInfo(crewres);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect((e) => {
    getPersonCredit();
  }, []);

  return (
    <div>
      <div>
        {department === 'Acting' ? (
          <div className='cast'>
            <div className='cast_detail_subject'>출연 작품</div>
            <div className='cast_detail_movie'>
              {castInfo &&
                castInfo.map((e, idx) => {
                  return <Cast cast={e} key={idx} />;
                })}
            </div>
          </div>
        ) : (
          <div className='cast'>
            <div className='cast_detail_subject'>연출 작품</div>
            <div className='cast_detail_movie'>
              {crewInfo &&
                crewInfo.map((e, idx) => {
                  return <Crew crew={e} key={idx} />;
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Credit;
