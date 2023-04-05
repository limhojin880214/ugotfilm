import { useEffect, useState } from 'react';
import axios from 'axios';
import './Tmdb_style.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Curation from '../Curation/Curation';
import { baseUrl } from '../commonApi_tmdb/baseUrl';
import MainChart from './Main_chart';
import MainSide from './Main_side';

const Tmdb_main = () => {
  const data = new FormData();
  data.append('usercode', localStorage.getItem('usercode'));

  return (
    <div className='main_wrap'>
      <MainChart />
      <MainSide />
      <div className='main_center'>
        <Curation key={localStorage.getItem('usercode')} />
      </div>
    </div>
  );
};

export default Tmdb_main;
