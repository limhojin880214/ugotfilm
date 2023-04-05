import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../commonApi_tmdb/baseUrl';

const PasswordModify = () => {
  const navigator = useNavigate();
  //비밀번호 수정
  const [inputs, setInputs] = useState({
    password: '',
    passwordConfirm: '',
  });

  const { password } = inputs;

  //오류메세지
  const message = {
    password: '영어, 숫자, 특수문자 조합 8~12자',
    passwordConfirm: '비밀번호가 일치하지 않습니다.',
  };

  //유효성
  const [effect, setEffect] = useState({
    password: false,
    passwordConfirm: false,
  });

  const onSubmit = async (e) => {
    // const result = userValidChk("submit");
    // if (!result.valid) {
    //   alert("비밀번호가 변경되었습니다!");
    // }
    if (effect.password && effect.passwordConfirm) {
      alert('성공');
      e.preventDefault();
      const formData = new FormData();
      formData.append('usercode', localStorage.getItem('usercode'));
      formData.append('password', inputs.password);
      console.log(password);

      await axios
        .put(`${baseUrl}/pwmodify`, formData, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
          console.log(response);
          navigator('/update');
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      alert('실패');
      return false;
    }
  };

  //정규식
  const userValidChk = (target) => {
    // check password
    if (target !== 'submit' && target === 'password') {
      const pwRegExp =
        /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/;
      if (!pwRegExp.test(inputs.password)) {
        setEffect({ ...effect, password: false });
        return { valid: false, where: 'password' };
      } else {
        setEffect({ ...effect, password: true });
      }
    }

    //check passwordconfirm
    if (target !== 'submit' && target === 'passwordConfirm') {
      if (inputs.password !== inputs.passwordConfirm) {
        setEffect({ ...effect, passwordConfirm: false });
        return { valid: false, where: 'passwordConfirm' };
      } else {
        setEffect({ ...effect, passwordConfirm: true });
      }
    }
    return true;
  };

  const handleValueChange = (e) => {
    inputs[e.target.name] = e.target.value;
    userValidChk(e.target.name);
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigator('/mypage');
  };

  return (
    <div className='join_form_wrap'>
      {/* 왼쪽: 로고 */}
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
            <button className='existing_user_login_btn' onClick={handleBack}>
              <span className='go_existing_login'>마이페이지</span>
            </button>
          </div>
        </div>
      </div>

      {/* 오른쪽: 비밀번호 수정 */}
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

        <form onSubmit={onSubmit}>
          <div className='form-group mb-1'>
            <div className='join_form_text'>PASSWORD</div>
            <input
              type='password'
              className='form-control join_form_input'
              name='password'
              placeholder='영어, 숫자, 특수문자 조합 8~12자'
              onChange={handleValueChange}
              required
            />

            {!effect.password && inputs.password.length > 0 && (
              <span id='idMsg' style={{ color: 'gray', fontSize: '15px' }}>
                {message.password}
              </span>
            )}
          </div>

          <div className='form-group mb-1'>
            <div className='join_form_text'>PASSWORD CHECK</div>
            <input
              type='password'
              className='form-control join_form_input'
              name='passwordConfirm'
              placeholder='비밀번호 확인'
              onChange={handleValueChange}
            />
            {effect.passwordConfirm ? (
              <span id='idMsg' style={{ color: 'gray', fontSize: '15px' }}>
                비밀번호가 일치합니다.
              </span>
            ) : (
              <span id='idMsg' style={{ color: 'red' }}></span>
            )}

            {!effect.passwordConfirm && inputs.passwordConfirm.length > 0 && (
              <span
                id='idMsg'
                style={{
                  color: 'gray',
                  fontSize: '15px',
                  paddingBottom: '30px',
                }}
              >
                {message.passwordConfirm}
              </span>
            )}
          </div>
          <div className='login_btn_box' style={{ marginTop: '50px' }}>
            <button type='submit' className='login_btn_box_style'>
              수정 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModify;
