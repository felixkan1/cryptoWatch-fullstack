/* eslint-disable */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center',
  },
};

export default function Loading({ text = 'Loading', speed = 50 }) {
  const [content, setContent] = useState(text);

  useEffect(() => {
    const id = window.setInterval(() => {
      setContent((content) => {
        return content === `${text}...` ? text : `${content}.`;
      });
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed]);

  return <h1 style={styles.content}>{content}</h1>;
}

Loading.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number,
};
