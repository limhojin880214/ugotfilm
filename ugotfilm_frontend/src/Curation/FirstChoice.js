import React, { useState, useEffect } from 'react';

import './fstyle.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../commonApi_tmdb/baseUrl';

const FirstChoice = () => {
  // 화면 표시
  const navigate = useNavigate();

  //화면구성

  // 스킵
  const skipPage = async (e) => {
    navigate('/');
  };

  //장르 정보를 백엔드로 보내기
  // (1)
  const sendMovieGenreInfo1 = async (e) => {
    console.log(
      '장르 정보 백엔드로  ' + document.getElementById('genre1').value
    );
    const data = new FormData();

    //회원정보
    data.append('usercode', localStorage.getItem('usercode'));
    //장르정보
    data.append('genre', document.getElementById('genre1').value);

    await axios
      .post(`${baseUrl}/save/firstchoice`, data)
      .then((response) => {})
      .catch((err) => {
        console.log(err.message);
      });

    const div = document.getElementById('divin1');
    const target = document.getElementById('genre2');
    // div 내   숨겨야할 다른 버튼을 target으로 지정

    div.style.display = 'block';
    // block으로 가서 설정해주고 none으로 가서 div 없애주는 플랜 게시

    target.disabled = true; // 다른 장르버튼 비활성화
    target.hidden = true;
    // 비활성화한 장르버튼 숨기고 "버튼 다시눌러서" if문으로 돌아감

    div.style.display = 'none';
  };

  // (2)
  const sendMovieGenreInfo2 = async (e) => {
    const data = new FormData();

    //회원정보
    data.append('usercode', localStorage.getItem('usercode'));

    //장르정보
    data.append('genre', document.getElementById('genre2').value);

    await axios
      .post(`${baseUrl}/save/firstchoice`, data)
      .then((response) => {})
      .catch((err) => {
        console.log(err.message);
      });

    // div.out?    e.target.value
    const div = document.getElementById('divin1');
    const target = document.getElementById('genre1');
    // div 내   숨겨야할 다른 버튼을 target으로 지정

    div.style.display = 'block';
    // block으로 가서 설정해주고 none으로 가서 div 없애주는 플랜 게시

    target.disabled = true; // 다른 장르버튼 비활성화
    target.hidden = true;
    // 비활성화한 장르버튼 숨기고 "버튼 다시눌러서" if문으로 돌아감

    div.style.display = 'none';
  };

  ////////////////////////////////////////////////////////////////////  1
  // (3)
  const sendMovieGenreInfo3 = async (e) => {
    const data = new FormData();

    //회원정보
    data.append('usercode', localStorage.getItem('usercode'));
    //장르정보
    data.append('genre', document.getElementById('genre3').value);

    await axios
      .post(`${baseUrl}/save/firstchoice`, data)
      .then((response) => {})
      .catch((err) => {
        console.log(err.message);
      });

    const div = document.getElementById('divin2');
    const target = document.getElementById('genre4');
    // div 내   숨겨야할 다른 버튼을 target으로 지정

    div.style.display = 'block';
    // block으로 가서 설정해주고 none으로 가서 div 없애주는 플랜 게시

    target.disabled = true; // 다른 장르버튼 비활성화
    target.hidden = true;
    // 비활성화한 장르버튼 숨기고 "버튼 다시눌러서" if문으로 돌아감

    div.style.display = 'none';
  };

  // (4)
  const sendMovieGenreInfo4 = async (e) => {
    const data = new FormData();

    //회원정보
    data.append('usercode', localStorage.getItem('usercode'));

    //장르정보
    data.append('genre', document.getElementById('genre4').value);

    await axios
      .post(`${baseUrl}/save/firstchoice`, data)
      .then((response) => {})
      .catch((err) => {
        console.log(err.message);
      });

    // div.out?    e.target.value
    const div = document.getElementById('divin2');
    const target = document.getElementById('genre3');
    // div 내   숨겨야할 다른 버튼을 target으로 지정

    div.style.display = 'block';
    // block으로 가서 설정해주고 none으로 가서 div 없애주는 플랜 게시

    target.disabled = true; // 다른 장르버튼 비활성화
    target.hidden = true;
    // 비활성화한 장르버튼 숨기고 "버튼 다시눌러서" if문으로 돌아감

    div.style.display = 'none';
  };

  ////////////////////////////////////////////////////////////////////         2
  // (5)
  const sendMovieGenreInfo5 = async (e) => {
    const data = new FormData();

    //회원정보
    data.append('usercode', localStorage.getItem('usercode'));
    //장르정보
    data.append('genre', document.getElementById('genre5').value);

    await axios
      .post(`${baseUrl}/save/firstchoice`, data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    // div.out?    e.target.value
    const div = document.getElementById('divin3');
    const target = document.getElementById('genre6');
    // div 내   숨겨야할 다른 버튼을 target으로 지정

    div.style.display = 'block';
    // block으로 가서 설정해주고 none으로 가서 div 없애주는 플랜 게시

    target.disabled = true; // 다른 장르버튼 비활성화
    target.hidden = true;
    // 비활성화한 장르버튼 숨기고 "버튼 다시눌러서" if문으로 돌아감

    div.style.display = 'none';

    navigate('/');
  };

  // (6)
  const sendMovieGenreInfo6 = async (e) => {
    const data = new FormData();

    //회원정보
    data.append('usercode', localStorage.getItem('usercode'));

    //장르정보
    data.append('genre', document.getElementById('genre6').value);

    await axios
      .post(`${baseUrl}/save/firstchoice`, data)
      .then((response) => {})
      .catch((err) => {
        console.log(err.message);
      });

    // div.out?    e.target.value
    const div = document.getElementById('divin3');
    const target = document.getElementById('genre5');

    div.style.display = 'block';
    // block으로 가서 설정해주고 none으로 가서 div 없애주는 플랜 게시

    target.disabled = true; // 다른 장르버튼 비활성화
    target.hidden = true;
    // 비활성화한 장르버튼 숨기고 "버튼 다시눌러서" if문으로 돌아감

    div.style.display = 'none';

    navigate('/');
  };

  ////////////////////////////////////////////////////////////////////     3

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className='firstchoice_wrap'>
        <div>
          <div className='firstchoice_title'>원하는 장르를 골라보세요.</div>
          <div id='divin1' className='firstchoice_content'>
            <button
              className='firstchoice_content_btn btn-sm'
              onClick={sendMovieGenreInfo1}
              value='28'
              id='genre1' // 버튼에 대한  id 지정
              style={{ backgroundColor: 'transparent', border: 'none' }}
            >
              <img
                src={'/images/genreim/action2.png'}
                style={{ width: '400px', height: '500px' }}
              />
            </button>

            <button
              className='firstchoice_content_btn btn-sm'
              onClick={sendMovieGenreInfo2}
              value='27'
              id='genre2' // 버튼에 대한  id 지정
              style={{ backgroundColor: 'transparent', border: 'none' }}
            >
              <img
                src={'/images/genreim/horror2.png'}
                style={{ width: '400px', height: '500px' }}
              />
            </button>

            <button
              className='btn btn-skip btn-primary g-2 mt-5'
              onClick={skipPage}
            >
              SKIP
            </button>
          </div>

          <div id='divin2' className='firstchoice_content'>
            <button
              className='firstchoice_content_btn btn-sm'
              onClick={sendMovieGenreInfo3}
              value='35'
              id='genre3' // 버튼에 대한  id 지정
              style={{ backgroundColor: 'transparent', border: 'none' }}
            >
              <img
                src={'/images/genreim/comedy2.png'}
                style={{ width: '400px', height: '500px' }}
              />
            </button>
            <button
              className='firstchoice_content_btn btn-sm'
              onClick={sendMovieGenreInfo4}
              value='53'
              id='genre4'
              style={{ backgroundColor: 'transparent', border: 'none' }}
            >
              <span
                // 'genre4' hidden
                id='ghidden4'
              ></span>

              <img
                src={'/images/genreim/thriller2.png'}
                style={{ width: '400px', height: '500px' }}
              />
            </button>

            <button
              className='btn btn-skip btn-primary g-2 mt-5'
              onClick={skipPage}
            >
              SKIP
            </button>
          </div>

          <div id='divin3' className='firstchoice_content'>
            <button
              className='firstchoice_content_btn btn-sm'
              onClick={sendMovieGenreInfo5}
              value='18'
              id='genre5' // 버튼에 대한  id 지정
              style={{ backgroundColor: 'transparent', border: 'none' }}
            >
              <img
                src={'/images/genreim/drama2.png'}
                style={{ width: '400px', height: '500px' }}
              />
            </button>
            <button
              className='firstchoice_content_btn btn-sm'
              onClick={sendMovieGenreInfo6}
              value='99'
              id='genre6' // 버튼에 대한  id 지정
              style={{ backgroundColor: 'transparent', border: 'none' }}
            >
              <img
                src={'/images/genreim/documentary2.png'}
                style={{ width: '400px', height: '500px' }}
              />
            </button>

            <button
              className='btn btn-skip btn-primary g-2 mt-5'
              onClick={skipPage}
            >
              SKIP
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FirstChoice;
