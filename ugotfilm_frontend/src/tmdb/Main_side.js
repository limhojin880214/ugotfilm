import { Link } from 'react-router-dom';
import Genre_btn from './Tmdb_genre';

const MainSide = () => {
  return (
    <div className='MainSideDiv'>
      {/* 전체 회원 취향 */}
      <div>
        <div>
          <a
            href='#basic_curation'
            className='main_side_btn_subject'
            style={{ textDecoration: 'none' }}
          >
            <span className='main_side_btn_subject_txt'>
              - 전체 선호 취향 -
            </span>
          </a>
        </div>
        <br />
        <br />
        <br />
        <div className='main_side_btn'>
          <a href='#whole_genre' style={{ textDecoration: 'none' }}>
            <span className='main_side_btn_title'>GENRE</span>
          </a>
        </div>
        <div className='main_side_btn'>
          <a href='#whole_director' style={{ textDecoration: 'none' }}>
            <span className='main_side_btn_title'>DIRECTOR</span>
          </a>
        </div>
        <div className='main_side_btn'>
          <a href='#whole_actor' style={{ textDecoration: 'none' }}>
            <span className='main_side_btn_title'>ACTOR</span>
          </a>
        </div>
      </div>
      <br />
      <br />
      {/* 성별 취향 */}
      <div>
        <div>
          <a
            href='#gender_curation'
            className='main_side_btn_subject'
            style={{ textDecoration: 'none' }}
          >
            <span className='main_side_btn_subject_txt'>
              - 성별 선호 취향 -
            </span>
          </a>
        </div>
        <br />
        <br />
        <br />
        <div className='main_side_btn'>
          <a href='#gender_genre' style={{ textDecoration: 'none' }}>
            <span className='main_side_btn_title'>GENRE</span>
          </a>
        </div>
        <div className='main_side_btn'>
          <a href='#gender_director' style={{ textDecoration: 'none' }}>
            <span className='main_side_btn_title'>DIRECTOR</span>
          </a>
        </div>
        <div className='main_side_btn'>
          <a href='#gender_actor' style={{ textDecoration: 'none' }}>
            <span className='main_side_btn_title'>ACTOR</span>
          </a>
        </div>
      </div>
      <br />
      <br />

      {/* 연령별 취향 */}
      <div>
        <div>
          <a
            href='#age_curation'
            className='main_side_btn_subject'
            style={{ textDecoration: 'none' }}
          >
            <span className='main_side_btn_subject_txt'>
              - 연령별 선호 취향 -
            </span>
          </a>
        </div>
        <br />
        <br />
        <br />
        <div className='main_side_btn'>
          <a href='#age_genre' style={{ textDecoration: 'none' }}>
            <span className='main_side_btn_title'>GENRE</span>
          </a>
        </div>
        <div className='main_side_btn'>
          <a href='#age_director' style={{ textDecoration: 'none' }}>
            <span className='main_side_btn_title'>DIRECTOR</span>
          </a>
        </div>
        <div className='main_side_btn'>
          <a href='#age_actor' style={{ textDecoration: 'none' }}>
            <span className='main_side_btn_title'>ACTOR</span>
          </a>
        </div>
      </div>
      {/* <Genre_btn /> */}
    </div>
  );
};

export default MainSide;
