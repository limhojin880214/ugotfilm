import 'd3-transition';
import { select } from 'd3-selection';

import ReactWordcloud from 'react-wordcloud';
import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../commonApi_tmdb/baseUrl';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import { useNavigate } from 'react-router-dom';

const Wordcloud = () => {
  const navigator = useNavigate();
  const [words, setWords] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get(baseUrl + `/mypage/wordcloud/${localStorage.getItem('usercode')}`)
      .then((response) => {
        let data = [];
        response.data.aList.map((word, index) => {
          const parse = {
            text: word.name,
            value: word.count,
            id: word.genrecode,
          };

          data.push(parse);
        });

        setWords(data);
      });
  };

  function getCallback(callback) {
    return function (word, event) {
      const isActive = callback !== 'onWordMouseOut';
      const element = event.target;
      const text = select(element);
      text
        .on('click', () => {
          if (isActive) {
            navigator(`/genre/pop/${word.id}`, '_blank');
          }
        })
        .transition()
        .attr('background', 'blue')
        .attr('font-size', 20)
        .attr('font-size', isActive ? '300%' : '100%')
        .attr('text-decoration', isActive ? 'underline' : 'none');
    };
  }

  const callbacks = {
    getWordColor: (word) => (word.count > 5 ? 'blue' : 'green'),
    getWordTooltip: (word) => `${word.text} 추천 영상`,
    onWordClick: getCallback('onWordClick'),
    onWordMouseOut: getCallback('onWordMouseOut'),
    onWordMouseOver: getCallback('onWordMouseOver'),
  };

  return (
    <div>
      <div style={{ height: '100%', width: '100%' }}>
        <ReactWordcloud callbacks={callbacks} words={words} />
      </div>
    </div>
  );
};

export default Wordcloud;
