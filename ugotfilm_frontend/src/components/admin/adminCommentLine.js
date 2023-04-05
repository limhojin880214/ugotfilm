import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../../commonApi_tmdb/baseUrl';

const AdminCommentLine = (props) => {
  let { comment } = props;
  const { currentPage, num } = useParams();
  const [commentList, setCommentList] = useState([]);

  const getData = async () => {
    await axios
      .get(`${baseUrl}/ad/comment/${currentPage}`)
      .then((response) => {
        setCommentList(response.data.blist);
        comment = commentList;
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  ///댓글 삭제
  const handleDelete = async (e) => {
    e.preventDefault();
    if (!window.confirm('삭제하시겠습니까?')) {
      return false;
    }
    await axios
      .delete(`${baseUrl}/commentmovie/delete/${comment.num}`)
      .then(() => {
        getData();
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <tr>
      <td>{comment.num}</td>
      <td>{comment.title}</td>
      <td>{comment.nickname}</td>
      <td>{comment.subject}</td>
      <td>{comment.reg_date}</td>
      <td>
        <button className='admin_btn' onClick={handleDelete}>
          삭제
        </button>
      </td>
    </tr>
  );
};

export default AdminCommentLine;
