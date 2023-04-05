import React from 'react';

const PageNavigation = (props) => {
  const { currentPage, startPage, endPage, blockPage, totalPage, getList } =
    props;

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='pagination_wrap'>
      <nav aria-label='...'>
        <ul className='pagination'>
          <li className={startPage <= 1 ? 'page-item disabled' : 'page-item'}>
            <a
              className='page-link'
              style={{ backgroundColor: 'rgb(198, 197, 197)', color: 'black' }}
              onClick={() => getList(startPage - blockPage)}
            >
              &laquo;
            </a>
          </li>
          {pageNumbers.map((pnum, idx) => (
            <li
              className={currentPage === pnum ? 'page-item active' : null}
              aria-current={currentPage === pnum ? 'page' : null}
              key={pnum}
            >
              <a onClick={() => getList(pnum)}>
                <span className='page-link'>{pnum}</span>
              </a>
            </li>
          ))}

          <li
            className={
              endPage >= totalPage ? 'page-item  disabled' : 'page-item'
            }
          >
            <a
              className='page-link'
              style={{ backgroundColor: 'rgb(198, 197, 197)', color: 'black' }}
              onClick={() => getList(startPage + blockPage)}
            >
              &raquo;
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PageNavigation;
