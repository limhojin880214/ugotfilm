import { Link } from 'react-router-dom';
import './layout.css';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer_content'>
        <div className='footer_left'>
          <div className='footer_ugf'>
            <img className='footer_logo' src='/images/ugf_logo2.png' />
          </div>
          <div className='footer_project_team'>
            <div className='footer_project_info'>ABOUT US</div>
            <div className='footer_project_info_txt'>
              <span>제작자</span>
              <span> | </span>
              <span>임호진, 김수현, 박정민, 엄지찬, 이준혁, 최인찬</span>
            </div>
            <div
              className='footer_copyright'
              style={{
                textAlign: 'left',
                fontWeight: 'bolder',
              }}
            >
              Copyright ⓒ U Got Film
            </div>
          </div>
        </div>
        <div className='footer_right'>
          <div className='footer_notice_board'>
            <Link
              className='footer_notice_board_txt'
              to='board'
              style={{ textDecoration: 'none' }}
            >
              공지사항
            </Link>
          </div>

          <div className='footer_sns_box' style={{ paddingTop: '20px' }}>
            <span>
              <img className='footer_sns_box_img' src='/images/facebook.png' />
            </span>
            <span>
              <img className='footer_sns_box_img' src='/images/instagram.png' />
            </span>
            <span>
              <img className='footer_sns_box_img' src='/images/twitter.png' />
            </span>
            <span>
              <img className='footer_sns_box_img' src='/images/youtube.png' />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
