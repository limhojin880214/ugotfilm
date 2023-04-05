import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../../commonApi_tmdb/baseUrl';
import PageNavigation from '../board/page_nav';
import AdminCommentLine from './adminCommentLine';

const AdminComment = () => {
  const [commentList, setCommentList] = useState([]);
  const [pv, setPv] = useState({ currentPage: 1 });
  const { currentPage } = useParams();

  useEffect(() => {
    getData(currentPage ? currentPage : 1);
  }, []);

  const getData = async (currentPage) => {
    await axios.get(baseUrl + '/ad/comment/' + currentPage).then((response) => {
      setCommentList(response.data.aList);
      setPv(response.data.pv);
    });
  };

  return (
    <div className='adminmember_wrap'>
      <br />
      <br />
      <div className='adminmember_list'>- COMMENT LIST -</div>
      <table className='adminmember_table'>
        <thead>
          <tr>
            <th>작성번호</th>
            <th>영화제목</th>
            <th>작성자</th>
            <th>작성내용</th>
            <th>작성일</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {commentList &&
            commentList.map((comment, idx) => {
              return (
                <AdminCommentLine
                  comment={comment}
                  currentPage={currentPage}
                  key={comment.num}
                />
              );
            })}
        </tbody>
      </table>
      {pv ? (
        <PageNavigation
          currentPage={pv.currentPage}
          startPage={pv.startPage}
          endPage={pv.endPage}
          blockPage={pv.blockPage}
          totalPage={pv.totalPage}
          getList={getData}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default AdminComment;
