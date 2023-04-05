import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from '../../commonApi_tmdb/baseUrl';

const UserUpdate = () => {
  const navigator = useNavigate();
  const [initUser, setInitUser] = useState({});
  const [inputs, setInputs] = useState({
    nickname: '',
    birth: 0,
    gender: '',
  });

  const { nickname, birth, gender } = inputs;

  //오류메세지
  const message = {
    // nickname: '영어, 한글, 숫자 무관 2~7자',
    authRole: 'ROLE_MEMBER',
  };

  //유효성
  const [effect, setEffect] = useState({
    nickname: false,
  });

  //출생년도 option을 위한 for문
  const birthYear = () => {
    const result = [];
    for (let i = 1900; i <= 2023; i++) {
      {
        initUser.birth === i
          ? result.push(
              <option value={i} key={i} selected={true}>
                {i}
              </option>
            )
          : result.push(
              <option value={i} key={i}>
                {i}
              </option>
            );
      }
    }
    return result;
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const formData = new FormData();
    formData.append('usercode', localStorage.getItem('usercode'));
    await axios
      .post(`${baseUrl}/update/`, formData)
      .then((response) => {
        setInitUser(response.data);
        setInputs(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await axios
      .put(`${baseUrl}/update`, inputs, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        setInputs({
          nickname: '',
          birth: '',
          gender: '남',
        });
        setInitUser({});
      })
      .then((response) => {
        const result = userValidChk('submit');
        if (!result.valid) {
          alert('수정완료!');
          navigator('/mypage');
          localStorage.setItem('nickname', nickname);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //정규식
  const userValidChk = (target) => {
    // check nickname
    if (target !== 'submit' && target === 'nickname') {
      const nicknameRegExp = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,7}$/;
      if (!nicknameRegExp.test(inputs.nickname)) {
        setEffect({ ...effect, nickname: false });
        return { valid: false, where: 'nickname' };
      } else {
        nicknameck();
      }
    }

    return true;
  };

  const handleValueChange = (e) => {
    inputs[e.target.name] = e.target.value;
    userValidChk(e.target.name);
  };

  const nicknameck = async (e) => {
    const formData = new FormData();
    formData.append('nickname', inputs.nickname);
    formData.append('usercode', localStorage.getItem('usercode'));

    const idcheck = await axios.post(`${baseUrl}/nicknameck`, formData);
    console.log('nickname : ' + idcheck.data);
    if (idcheck.data === 0) {
      console.log('사용가능');
      setEffect({ ...effect, nickname: true });
      console.log(effect);
    } else {
      console.log('사용불가');
      setEffect({ ...effect, nickname: false });
      return { valid: false, where: 'nickname' };
    }
  };

  const handleLeave = async (e) => {
    if (!window.confirm('탈퇴하시겠습니까?')) {
      return false;
    }
    e.preventDefault();
    const formData = new FormData();
    formData.append('usercode', localStorage.getItem('usercode'));

    await axios
      .put(`${baseUrl}/leave`, formData)
      .then(() => {
        console.log('탈퇴 완료');
        localStorage.removeItem('Authorizaton');
        localStorage.removeItem('username');
        localStorage.removeItem('nickname');
        localStorage.clear();
        window.location.replace('/');
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const handleChnagePassword = (e) => {
    if (!window.confirm('비밀번호 수정하시겠습니까?')) {
      return false;
    }
    console.log('비밀번호 수정');
    navigator('/pwmodify');
  };

  const handleReset = (e) => {
    e.preventDefault();
    setInputs(initUser);
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigator('/mypage');
  };

  return (
    <div className='join_form_wrap'>
      {/* 왼쪽: 마이페이지, 비밀번호 수정, 탈퇴 버튼 */}
      <div className='existing_user_login_box'>
        <div className='join_form_title'>
          <div style={{ fontSize: '15px', padding: '30px 0 30px 0' }}>
            <span style={{ color: 'black' }}>U</span>{' '}
            <span style={{ color: 'black' }}>G</span>OT{' '}
            <span style={{ color: 'black' }}>F</span>ILM
          </div>
          <div>
            <div className='logo_text'>
              <span style={{ color: 'black' }}>우</span>연을
              <div>
                <span style={{ color: 'black' }}>가</span>장한
              </div>
              <div>
                <span style={{ color: 'black' }}>필</span>연
              </div>
            </div>
          </div>
        </div>
        <img className='join_form_img' src='/images/join_image.gif' />

        <div className='existing_user_login_text'>
          <div>
            <button
              className='existing_user_login_btn'
              onClick={handleChnagePassword}
            >
              <span className='go_existing_login'>비밀번호 수정</span>
            </button>
          </div>
          <div>
            <button className='existing_user_login_btn' onClick={handleBack}>
              <span className='go_existing_login'>마이페이지</span>
            </button>
          </div>
          <div>
            <button className='existing_user_login_btn' onClick={handleLeave}>
              <span className='go_existing_login'>탈퇴</span>
            </button>
          </div>
        </div>
      </div>

      {/* 오른쪽: 회원정보수정 */}
      <div className='join_form_container'>
        <div className='join_form_title' style={{ paddingTop: '100px' }}>
          <span style={{ fontSize: '20px' }}>
            <span style={{ color: 'black', letterSpacing: '10px' }}>
              {localStorage.getItem('nickname')}
            </span>
            <span>님의</span>
          </span>
          <div style={{ fontSize: '25px', letterSpacing: '15px' }}>
            회원 정보 수정.
          </div>
        </div>

        <form id='update' onSubmit={onSubmit}>
          <div className='join_form_text' style={{ paddingTop: '50px' }}>
            NICKNAME
          </div>
          <div className='form-group mt-1'>
            <input
              type='nickname'
              className='form-control join_form_input'
              name='nickname'
              placeholder='영어,한글,숫자 무관 2~7자'
              defaultValue={nickname}
              onChange={handleValueChange}
              required
              maxLength={7}
            />
          </div>
          {!effect.nickname && inputs.nickname.length > 0 && (
            <span id='idMsg' style={{ color: 'gray' }}>
              {message.nickname}
            </span>
          )}

          <div className='form-group'>
            <div className='join_form_text'>
              BIRTH
              <select
                className='birth_select'
                name='birth'
                onChange={handleValueChange}
                required
              >
                {birthYear()}
              </select>
            </div>
          </div>

          {/* 성별 정보 수정 다시 체크 */}
          {/* <div className='form-group'>
            <div className='join_form_text'>
              GENDER
              <div className='gender_input_box' onChange={handleValueChange}>
                {initUser.gender === '남' ? (
                  <>
                    <label className='form-group'>
                      <input
                        type='radio'
                        name='gender'
                        className='gender_input'
                        value='남'
                        defaultChecked={true}
                        required
                      />
                      남
                    </label>
                    <label className='form-group'>
                      <input
                        type='radio'
                        name='gender'
                        className='gender_input'
                        value='여'
                      />
                      여
                    </label>
                  </>
                ) : (
                  <>
                    <label className='form-group'>
                      <input
                        type='radio'
                        name='gender'
                        className='gender_input'
                        value='남'
                        required
                      />
                      남
                    </label>
                    <label className='form-group'>
                      <input
                        type='radio'
                        name='gender'
                        className='gender_input'
                        value='여'
                        defaultChecked={true}
                      />
                      여
                    </label>
                  </>
                )}
              </div>
            </div>
          </div> */}

          <div className='login_btn_box' style={{ marginTop: '50px' }}>
            <button type='submit' className='login_btn_box_style'>
              수정
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserUpdate;
