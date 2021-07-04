/* eslint-disable */
import React, { useEffect, useReducer, useState } from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { RedditFeed } from './RedditFeed';

import { getRedditFeed } from '../Utils/api';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { css } from '@emotion/react';

const override = css`
  margin: 0 auto;
  border-color: blue;
  position: absolute;
  left: 45%;
  top: 50%;
`;

function socialFeedReducer(state, action) {
  if (action.type === 'got reddit feed data') {
    return {
      ...state,
      subRedditFeed: action.subRedditFeed,
      redditLoading: false,
    };
  } else if (action.type === 'error') {
    return {
      ...state,
    };
  } else if (action.type === 'no reddit feed') {
    return {
      ...state,
      redditLoading: action.redditLoading,
    };
  } else {
    throw new Error('The action is not supported');
  }
}

export function SocialFeedTwo({ id, twitterName, subRedditUrl }) {
  const [state, dispatch] = useReducer(socialFeedReducer, {
    subRedditFeed: null,
    redditLoading: true,
  });
  useEffect(() => {
    let cancelRequest = false;
    if (subRedditUrl && subRedditUrl !== 'https://www.reddit.com') {
      console.log(subRedditUrl);
      getRedditFeed(subRedditUrl).then((feed) => {
        if (cancelRequest) return;
        dispatch({
          type: 'got reddit feed data',
          subRedditFeed: feed,
        });
      });
    } else {
      dispatch({
        type: 'no reddit feed',
        redditLoading: false,
      });
    }
    return function cleanup() {
      cancelRequest = true;
    };
  }, [subRedditUrl]);

  return (
    <div className="social row">
      {twitterName && (
        <div className="twitter">
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName={twitterName}
            options={{ height: 400 }}
          />
        </div>
      )}

      <>
        <ScaleLoader
          color={'rgb(65, 182, 104)'}
          loading={state.redditLoading}
          css={override}
          size={150}
        />
        {state.subRedditFeed && (
          <RedditFeed feed={state.subRedditFeed} subRedditUrl={subRedditUrl} />
        )}
      </>
    </div>
  );
}
