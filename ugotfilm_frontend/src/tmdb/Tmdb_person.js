import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../commonApi_tmdb/baseUrl';
import TmdbPerson from '../commonApi_tmdb/tmdbPeople';
import TMDB_KEY from '../commonApi_tmdb/tmdb_key';
import Credit from './Tmdb_credit';
import './Tmdb_style.css';

const Person = () => {
  const lang = '&language=ko';
  //현재 페이지에 보이는 인물 ID
  const { person_id } = useParams();

  // 인물 정보
  const [personInfo, setPersonInfo] = useState([]);
  const [personName, setPersonName] = useState([]); // 영문 및 한글 이름 저장용

  //인물정보 DTO
  const PersonDTO = useRef({
    id: 0,
    job: '',
    name: '',
    profile: '',
  });

  //백엔드로 보내는 감독 정보(String)
  let person = '';

  const getPersonInfo = async () => {
    await axios
      .get(TmdbPerson + person_id + '?api_key=' + TMDB_KEY + lang)
      .then((response) => {
        //화면 구성을 위한 set
        setPersonInfo(); 
        setPersonName();
        setPersonInfo(response.data);
        setPersonName(response.data.name);

        //인물 정보 DTO에 저장
        PersonDTO.id = response.data.id;
        PersonDTO.job = response.data.known_for_department;
        PersonDTO.name = response.data.name;
        PersonDTO.profile = response.data.profile_path;
        
        //인물정보 저장
        person = JSON.stringify(PersonDTO);
        //인물 정보 보내기
        sendAllDTO();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const sendAllDTO = async () => {
    console.log('인물 정보 백엔드로');
    const usercode = localStorage.getItem('usercode');
    const data = new FormData();
    //회원정보
    data.append('usercode', usercode);
    //인물 직업 정보(감독 or 배우)
    data.append('person', person);

    await axios
      .post(`${baseUrl}/save/person`, data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //화면구성
  useEffect(() => {
    getPersonInfo();
  }, []);

  return (
    <>
      <div className="person_detail_wrap">
        <div className="person_detail_profile">
          <div className="person_detail_subject">
            <img className="person_title_img" src="/images/celebrity.png" />
            인물 정보
          </div>
          <div className="person_detail_img">
            {personInfo.profile_path === null || personInfo.profile_path === undefined ? (
              <img src="/images/none_img.jpg" width="200" />
            ) : (
              <img
                src={
                  'https://image.tmdb.org/t/p/w500' + personInfo.profile_path
                }
                width="300"
              />
            )}
          </div>
          <div className="person_detail_text">
            <div className="person_detail_department">
              <p>-{personInfo.known_for_department}-</p>
            </div>
            <div className="person_detail_name">
              <span className="person_detail_name">{personName}</span>
            </div>
            <div className="person_detail_birth">
              <span>출생 {personInfo.birthday}</span>
              {personInfo.deathday !== null ? (
                <span>
                  <span> ~ </span>사망 {personInfo.deathday}
                </span>
              ) : null}
            </div>
          </div>
        </div>
        <div className="person_detail_credit_wrap">
          <Credit
            id={person_id}
            key={person_id}
            department={personInfo.known_for_department}
          />
        </div>
      </div>
    </>
  );
};

export default Person;
