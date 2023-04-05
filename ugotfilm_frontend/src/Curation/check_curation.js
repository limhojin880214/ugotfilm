import { NavLink } from 'react-router-dom';

const CheckCuration = (props) => {
  const { check } = props;

  return (
    <>
      <div className='basic_curation_info'>
        {check.poster_url === null || check.poster_url === undefined ? (
          <img className='basic_curation_img' src='/images/none_img.jpg' />
        ) : (
          <img
            className='basic_curation_img'
            src={'https://image.tmdb.org/t/p/w500' + check.poster_url}
            width='200'
          />
        )}

        <NavLink
          to={`/detail/${check.moviecode}`}
          key={check.moviecode}
          style={{ textDecoration: 'none' }}
        >
          <div className='basic_curation_title'>{check.title}</div>
        </NavLink>
      </div>
    </>
  );
};

export default CheckCuration;
