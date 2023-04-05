import { Link } from 'react-router-dom';

const TableRow = (props) => {
  const { board, currentPage } = props;

  return (
    <tr className='table_row_wrap'>
      <td style={{ height: '40px' }} className='table_row_num'>
        {board.num}
      </td>
      <td style={{ height: '40px' }}>
        {board.re_level > 0 ? (
          <>
            <img
              src='/images/level.gif'
              width={20 * board.re_level}
              height='15'
            />
            <img src='/images/re.gif' />
          </>
        ) : null}
        <Link
          to={`/board/view/${currentPage}/${board.num}`}
          style={{ textDecoration: 'none' }}
        >
          <span className='table_row_subject'>{board.subject}</span>
        </Link>
      </td>
      <td style={{ height: '40px' }} className='table_row_nickname'>
        {board.nickname}
      </td>
      <td style={{ height: '40px' }} className='table_row_readcount'>
        {board.readcount}
      </td>
    </tr>
  );
};

export default TableRow;
