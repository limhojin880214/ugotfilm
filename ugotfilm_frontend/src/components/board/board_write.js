import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { baseUrl } from '../../commonApi_tmdb/baseUrl';
import './board.css';

const BoardWrite = () => {
  const [inputs, setInputs] = useState({
    writer: '',
    subject: '',
    content: '',
    filename: null,
  });

  const navigator = useNavigate();

  const { currentPage, num, ref, re_step, re_level } = useParams();
  const { writer, subject, content, filename } = inputs;

  const handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    setInputs({ ...inputs, ...nextState });
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    setInputs({ ...inputs, filename: e.target.files[0] });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('writer', localStorage.getItem('usercode'));
    formData.append('subject', subject);
    formData.append('content', content);
    //답변글이면...
    if (num !== undefined) {
      formData.append('num', num);
      formData.append('ref', ref);
      formData.append('re_step', re_step);
      formData.append('re_level', re_level);
      formData.append('currentPage', currentPage);
    }

    if (filename !== null) {
      formData.append('filename', filename);
    }

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };

    await axios
      .post(`${baseUrl}/board/write`, formData, config)
      .then((response) => {
        setInputs({
          writer: '',
          subject: '',
          content: '',
          filename: null,
        });
        navigator(`/board/list/${currentPage ? currentPage : 1}`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  ////////////////////////////////////
  return (
    <div className='board_writing_wrap'>
      <br />
      <br />
      <br />
      <div className='notice_board'>
        <img className='notice_board_img' src='/images/notice.png' />
        <div className='notice_board_title'>공지 게시판</div>
      </div>

      <form onSubmit={onSubmit}>
        <table>
          <tbody>
            <tr className='board_writing_tr'>
              <td className='board_writing_text'>글쓴이</td>
              <td>
                <input
                  className='board_writing_input'
                  type='text'
                  name='writer'
                  size='10'
                  maxLength='10'
                  value={localStorage.getItem('username')}
                  onChange={handleValueChange}
                />
              </td>
            </tr>

            <tr className='board_writing_tr'>
              <td className='board_writing_text'>제목</td>
              <td>
                <input
                  className='board_writing_input'
                  type='text'
                  name='subject'
                  size='40'
                  value={subject}
                  placeholder={num !== undefined ? '답변' : null}
                  onChange={handleValueChange}
                />
              </td>
            </tr>

            <tr className='board_writing_tr'>
              <td className='board_writing_text'>내용</td>
              <td>
                <textarea
                  className='board_writing_input'
                  name='content'
                  rows='13'
                  cols='40'
                  value={content}
                  onChange={handleValueChange}
                  style={{ resize: 'none' }}
                ></textarea>
              </td>
            </tr>

            <tr className='board_writing_tr'>
              <td className='board_writing_text'>첨부파일</td>
              <td>
                <input
                  className='board_writing_input'
                  type='file'
                  name='filename'
                  id='filepath'
                  onChange={handleFileChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className='board_writing_btn'>
          <Link
            className='board_view_btn'
            to={`/board/list/${currentPage ? currentPage : 1}`}
            style={{ margin: '5px', textDecoration: 'none' }}
          >
            리스트
          </Link>
          <input
            type='submit'
            className='board_view_btn'
            value='등록'
            style={{ margin: '5px' }}
          />
        </div>
      </form>
    </div>
  );
};

export default BoardWrite;
