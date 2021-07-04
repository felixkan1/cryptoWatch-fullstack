/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import { getGoogleNews } from '../Utils/api';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { css } from '@emotion/react';

const override = css`
  margin: 0 auto;
  border-color: blue;
  position: absolute;
  left: 45%;
  top: 50%;
`;
export function GoogleNews({ googleFeed, loading }) {
  return (
    <div className="feed">
      <ScaleLoader
        color={'rgb(65, 182, 104)'}
        loading={loading}
        css={override}
        size={150}
      />
      {googleFeed &&
        googleFeed.map((newsArticle) => {
          return (
            <div className="google-post" key={newsArticle.link}>
              <div>
                <h5>
                  <i>{newsArticle.source}</i>
                </h5>
                <a className="post-title" href={newsArticle.link}>
                  {newsArticle.title}
                </a>
                <p className="post-info">{newsArticle.time}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export const MemoizedGoogleNews = React.memo(GoogleNews);
