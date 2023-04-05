import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from '../../commonApi_tmdb/baseUrl';
import './login.css';

const JoinForm = () => {
  const navigator = useNavigate();
  const [member, setMember] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    birth: 1900,
    gender: '남',
    authRole: 'ROLE_MEMBER',
  });

  //오류메세지
  const message = {
    username: '영문+숫자 조합으로 4~12자로 입력하세요.',
    password: '영어+숫자+특수문자 조합으로 8~12자 안으로 입력하세요.',
    passwordConfirm: '비밀번호가 일치하지 않습니다.',
    nickname: '영어, 한글, 숫자 상관없이 2~7자 안으로 입력하세요.',
    authRole: 'ROLE_MEMBER',
  };

  //유효성
  const [effect, setEffect] = useState({
    username: false,
    password: false,
    passwordConfirm: false,
    nickname: false,
  });

  //출생년도 option을 위한 for문
  const birthYear = () => {
    const result = [];
    for (let i = 1900; i <= 2023; i++) {
      result.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }

    return result;
  };

  const onSubmit = async (e) => {
    if (
      effect.username &&
      effect.password &&
      effect.nickname &&
      effect.passwordConfirm
    ) {
      alert('회원이 되신 것을 환영합니다.');

      e.preventDefault();
      await axios
        .post(`${baseUrl}/join`, member, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
          setMember({
            username: '',
            password: '',
            nickname: '',
            birth: '',
            gender: '남',
            authRole: 'ROLE_MEMBER',
          });
        })
        .then((response) => {
          navigator('/');
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      alert('가입조건이 맞지 않습니다.');
      return false;
    }
  };

  //정규식
  const userValidChk = (target) => {
    // check user name
    if (target !== 'submit' && target === 'username') {
      const idRegExp = /^(?=.*[a-z])(?=.*\d)[a-z0-9]{4,12}$/;
      if (!idRegExp.test(member.username)) {
        setEffect({ ...effect, username: false });
        return { valid: false, where: 'username' };
      } else {
        idck();
      }
    }

    // check password
    if (target !== 'submit' && target === 'password') {
      const pwRegExp =
        /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/;
      if (!pwRegExp.test(member.password)) {
        setEffect({ ...effect, password: false });
        return { valid: false, where: 'password' };
      } else {
        setEffect({ ...effect, password: true });
      }
    }

    // check passwordConfirm
    if (target !== 'submit' && target === 'passwordConfirm') {
      if (member.password !== member.passwordConfirm) {
        setEffect({ ...effect, passwordConfirm: false });
        return { valid: false, where: 'passwordConfirm' };
      } else {
        setEffect({ ...effect, passwordConfirm: true });
      }
    }

    // check nickname
    if (target !== 'submit' && target === 'nickname') {
      const nicknameRegExp = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,7}$/;
      if (!nicknameRegExp.test(member.nickname)) {
        setEffect({ ...effect, nickname: false });
        return { valid: false, where: 'nickname' };
      } else {
        nicknameck();
      }
    }

    return true;
  };

  const handleValueChange = (e) => {
    member[e.target.name] = e.target.value;
    userValidChk(e.target.name);
  };

  const idck = async (e) => {
    const formData = new FormData();
    formData.append('username', member.username);

    const idcheck = await axios.post(`${baseUrl}/idck`, formData);
    if (idcheck.data === 0) {
      setEffect({ ...effect, username: true });
    } else {
      setEffect({ ...effect, username: false });
      return { valid: false, where: 'username' };
    }
  };

  const nicknameck = async (e) => {
    const formData = new FormData();
    formData.append('nickname', member.nickname);

    const idcheck = await axios.post(`${baseUrl}/nicknameck`, formData);
    if (idcheck.data === 0) {
      setEffect({ ...effect, nickname: true });
    } else {
      setEffect({ ...effect, nickname: false });
      return { valid: false, where: 'nickname' };
    }
  };

  return (
    <div className='join_form_wrap'>
      {/* 왼쪽: 기존회원은 로그인 */}
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
          <span>
            기존 회원이라면
            <button className='existing_user_login_btn'>
              <Link
                className='existing_user_login_text'
                to='/login'
                style={{ textDecoration: 'none' }}
              >
                <span className='go_existing_login'>로그인</span>
              </Link>
            </button>
          </span>
          <span className='existing_user_login_text'>해주세요.</span>
        </div>
      </div>

      {/* 오른쪽: 회원가입 폼 */}
      <div className='join_form_container'>
        <form onSubmit={onSubmit}>
          <div className='join_form_title'>CREATE NEW ACCOUNT.</div>
          <div className='form-group mb-1'>
            <div className='flex'>
              {/* 아이디 */}
              <div className='join_form_text'>USERNAME</div>
              <input
                type='text'
                className='form-control join_form_input'
                name='username'
                placeholder='영문+숫자 조합 4~12자'
                required
                onChange={handleValueChange}
              />
            </div>
            {/* 유효성체크 */}
            {effect.username ? (
              <span id='idMsg' style={{ color: 'green' }}>
                사용가능한 아이디입니다.
              </span>
            ) : (
              <span id='idMsg' style={{ color: 'red' }}>
                {/* {message.username} */}
              </span>
            )}

            {!effect.username && member.username.length > 0 && (
              <span id='idMsg' style={{ color: 'red' }}>
                {message.username}
              </span>
            )}
          </div>
          <div className='form-group mb-1'>
            {/* 비밀번호 */}
            <div className='join_form_text'>PASSWORD</div>
            <input
              type='password'
              className='form-control join_form_input'
              name='password'
              placeholder='영어+숫자+특수문자 조합 8~12자'
              onChange={handleValueChange}
              required
            />
            {!effect.password && member.password.length > 0 && (
              <span id='idMsg' style={{ color: 'red' }}>
                {message.password}
              </span>
            )}
          </div>
          <div className='form-group mb-1'>
            {/* 비밀번호 확인 */}
            <div className='join_form_text'>PASSWORD CHECK</div>
            <input
              type='password'
              className='form-control join_form_input'
              name='passwordConfirm'
              placeholder='비밀번호를 다시 입력해주세요.'
              onChange={handleValueChange}
            />
            {effect.passwordConfirm ? (
              <span id='idMsg' style={{ color: 'green' }}>
                비밀번호가 일치합니다.
              </span>
            ) : (
              <span id='idMsg' style={{ color: 'red' }}>
                {/* {message.passwordConfirm} */}
              </span>
            )}

            {!effect.passwordConfirm && member.passwordConfirm.length > 0 && (
              <span id='idMsg' style={{ color: 'red' }}>
                {message.passwordConfirm}
              </span>
            )}
          </div>
          <span></span>
          <div className='form-group mb-1'>
            {/* 닉네임 */}
            <div className='join_form_text'>NICKNAME</div>
            <div>
              <input
                type='nickname'
                className='form-control join_form_input'
                name='nickname'
                placeholder='영어, 한글, 숫자 무관 2~7자'
                onChange={handleValueChange}
                required
              />
            </div>

            {!effect.nickname && member.nickname.length > 0 && (
              <span id='idMsg' style={{ color: 'red' }}>
                {message.nickname}
              </span>
            )}
          </div>
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
          <div className='form-group'>
            <div className='join_form_text'>
              GENDER
              <div className='gender_input_box' onChange={handleValueChange}>
                <label className='form-group'>
                  <input
                    className='gender_input'
                    type='radio'
                    name='gender'
                    value='남'
                    defaultChecked={true}
                    required
                  />
                  남
                </label>
                <label className='form-group'>
                  <input
                    className='gender_input'
                    type='radio'
                    name='gender'
                    value='여'
                  />
                  여
                </label>
              </div>
            </div>
          </div>
          <div className='login_btn_box'>
            <button type='submit' className='login_btn_box_style'>
              가입 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinForm;
