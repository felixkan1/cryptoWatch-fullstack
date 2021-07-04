/* eslint-disable */
import React, { useEffect, useReducer, useState } from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { RedditFeed } from './RedditFeed';
import { GoogleNews } from './GoogleNews';
import { getGoogleNews, getRedditFeed } from '../Utils/api';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { css } from '@emotion/react';

const override = css`
  margin: 0 auto;
  border-color: blue;
  position: absolute;
  left: 45%;
  top: 100%;
`;

function socialFeedReducer(state, action) {
  if (action.type === 'got reddit feed data') {
    return {
      ...state,
      subRedditFeed: action.subRedditFeed,
      redditLoading: false,
    };
  } else if (action.type === 'got google feed data') {
    return {
      ...state,
      googleNewsFeed: action.googleNewsFeed,
      googleLoading: false,
    };
  } else if (action.type === 'errer') {
    return {
      ...state,
    };
  } else {
    throw new Error('The action is not supported');
  }
}

export function SocialFeed({ id, twitterName, subRedditUrl }) {
  const [socialFeed, setSocialFeed] = useState('reddit');
  const [state, dispatch] = useReducer(socialFeedReducer, {
    subRedditFeed: null,
    redditLoading: true,
    googleNewsFeed: null,
    googleLoading: true,
  });
  useEffect(() => {
    let mounted = true;
    if (subRedditUrl) {
      getRedditFeed(subRedditUrl).then((feed) => {
        if (mounted) {
          dispatch({
            type: 'got reddit feed data',
            subRedditFeed: feed,
          });
        }
      });
    }
    return function cleanup() {
      mounted = false;
    };
  }, [subRedditUrl]);

  useEffect(() => {
    let mounted = true;
    getGoogleNews(id).then((feed) => {
      if (mounted) {
        dispatch({
          type: 'got google feed data',
          googleNewsFeed: feed,
        });
      }
    });
    return function cleanup() {
      mounted = false;
    };
  }, [id]);

  const handleChangeSocialFeed = (id) => {
    setSocialFeed(id);
  };

  return (
    <div className="coin-social-feed">
      <div className="social-display">
        <div>Social Feed</div>
        <button
          onClick={() => handleChangeSocialFeed('twitter')}
          className={`btn-clear ${socialFeed === 'twitter' ? 'active' : ''}`}
        >
          Twitter
        </button>
        <button
          onClick={() => handleChangeSocialFeed('reddit')}
          className={`btn-clear ${socialFeed === 'reddit' ? 'active' : ''}`}
        >
          Reddit
        </button>
        <button
          onClick={() => handleChangeSocialFeed('google')}
          className={`btn-clear ${socialFeed === 'google' ? 'active' : ''}`}
        >
          Google News
        </button>
      </div>
      {socialFeed === 'twitter' && twitterName && (
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName={twitterName}
          options={{ height: 400 }}
        />
      )}
      {socialFeed === 'reddit' && (
        <>
          <ScaleLoader
            color={'rgb(95,158,160)'}
            loading={state.redditLoading}
            css={override}
            size={150}
          />
          {state.subRedditFeed && (
            <RedditFeed
              feed={state.subRedditFeed}
              subRedditUrl={subRedditUrl}
            />
          )}
        </>
      )}
      {socialFeed === 'google' && (
        <>
          <ScaleLoader
            color={'rgb(95,158,160)'}
            loading={state.googleLoading}
            css={override}
            size={150}
          />
          {state.googleNewsFeed && <GoogleNews feed={state.googleNewsFeed} />}
        </>
      )}
    </div>
  );
}
