import axios from 'axios';
import { useState } from 'react';
import { baseUrl } from '../../commonApi_tmdb/baseUrl';

const AdminMemberUpdate = (props) => {
  const [inputs, setInputs] = useState({
    usercode: props.usercode,
    authRole: props.authRole,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      !window.confirm(
        (inputs.authRole === 'ROLE_ADMIN'
          ? '관리자'
          : inputs.authRole === 'ROLE_MANAGER'
          ? '매니저'
          : inputs.authRole === 'ROLE_MEMBER'
          ? '일반회원으'
          : '탈퇴회원으') + '로 수정하시겠습니까?'
      )
    ) {
      return false;
    }

    await axios
      .put(`${baseUrl}/ad/mem/update/`, inputs, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        setInputs({
          usercode: 0,
          authRole: 'ROLE_MEMBER',
        });
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleValueChange = (e) => {
    inputs[e.target.name] = e.target.value;
  };

  return (
    <div>
      <div>
        <form onSubmit={onSubmit}>
          <input type='hidden' name='usercode' value={inputs.usercode} />
          <select
            name='authRole'
            id='authRole'
            defaultValue={inputs.authRole}
            onChange={handleValueChange}
          >
            <option id='choice' disabled='disabled'>
              ==선택==
            </option>
            <option value='ROLE_LEAVE'>탈퇴</option>
            <option value='ROLE_MEMBER'>일반 회원</option>
            <option value='ROLE_MANAGER'>매니저</option>
            <option value='ROLE_ADMIN'>관리자</option>
          </select>
          <button className='admin_btn' type='submit' value='수정'>
            수정
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminMemberUpdate;
