import axios from 'axios';
import { useEffect, useState } from 'react';
import { json, NavLink } from 'react-router-dom';
import Slider from 'react-slick';
import { baseUrl } from '../commonApi_tmdb/baseUrl';
import BasicCuration from './basic_curation';
import ChoiceCuration from './choice_curation';
import './Curation.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CheckCuration from './check_curation';

const Curation = () => {
  const [check, setCheck] = useState([]);

  const [user, setUser] = useState({
    ageGroup: '',
    gender: '',
  });
  // 전체 기준
  const [basicCuration, setBasicCuration] = useState({
    bestMovie: [{}],
    bestCast: {},
    bestDirector: {},
    bestGenre: {},
  });
  // 유저 기준(성별)
  const [choiceGender, setChoiceGender] = useState({
    curationMovie: [{}],
    curationGenre: {},
    curationDirector: {},
    curationCast: {},
  });
  // 유저 기준(연령)
  const [choiceAge, setChoiceAge] = useState({
    curationMovie: [{}],
    curationGenre: {},
    curationDirector: {},
    curationCast: {},
  });

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

  const data = new FormData();
  data.append('usercode', localStorage.getItem('usercode'));

  const getCuration = async () => {
    await axios
      .post(baseUrl + '/curation', data)
      .then((response) => {
        setUser({
          gender: response.data.user.gender,
          ageGroup: response.data.user.ageGroup,
        });

        setBasicCuration({
          bestCast: response.data.basic_curation.bestCast,
          bestDirector: response.data.basic_curation.bestDirector,
          bestGenre: response.data.basic_curation.bestGenre,
          bestMovie: response.data.basic_curation.bestMovie,
        });

        if (response.data.status !== 404) {
          setChoiceGender({
            curationMovie: response.data.gender_curation.CurationMovie,
            curationGenre: response.data.gender_curation.CurationGenre,
            curationDirector: response.data.gender_curation.CurationDirector,
            curationCast: response.data.gender_curation.CurationCast,
          });
        }

        if (response.data.status !== 404) {
          setChoiceAge({
            curationMovie: response.data.age_curation.CurationMovie,
            curationGenre: response.data.age_curation.CurationGenre,
            curationDirector: response.data.age_curation.CurationDirector,
            curationCast: response.data.age_curation.CurationCast,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const getCheckMovie = async () => {
    await axios
      .post(baseUrl + '/checkMovie', data)
      .then((response) => {
        setCheck(response.data);
      })
      .catch((err) => {
        console.log(err.meesage);
      });
  };

  useEffect(() => {
    getCuration();
    getCheckMovie();
  }, []);

  return (
    <>
      <div className='curation_wrap'>
        <div id='basic_curation' className='basic_curation'>
          <BasicCuration basicCuration={basicCuration} />
        </div>
        <br />
        <br />
        {choiceAge.curationGenre === null ? (
          <></>
        ) : choiceAge.curationCast === null ? (
          <></>
        ) : choiceAge.curationDirector === null ? (
          <></>
        ) : (
          <div className='choice_curation'>
            <ChoiceCuration
              choiceGender={choiceGender}
              choiceAge={choiceAge}
              user={user}
            />
          </div>
        )}

        <br />
        <br />
        <br />
        <div className='basic_curation_wrap'>
          <div
            className='basic_curation_component'
            style={
              check.length > 5 ? null : { height: '500px', overflow: 'hidden' }
            }
          >
            <div className='basic_curation_slide'>
              <div
                className='basic_curation_subject'
                style={{ fontWeight: 'bolder' }}
              >
                우연을 가장한 필연, 지금 이 영화!
              </div>
              <Slider {...settings}>
                {check &&
                  check.map((element, idx) => {
                    return <CheckCuration check={element} key={idx} />;
                  })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Curation;
