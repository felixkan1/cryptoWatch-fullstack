/* eslint-disable */
import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { handleToggleWatch } from '../actions/watchList';
import { MemoizedHistoryChart } from './HistoryChart';
import { getGoogleNews } from '../Utils/api';
import { SocialFeedTwo } from './SocialFeedTwo';
import { CoinInfo } from './CoinInfo';
import { Converter } from './Converter';
import { MemoizedGoogleNews } from './GoogleNews';
import { getHistoriacalData, getCoinData, getRedditFeed } from '../Utils/api';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { Tooltip } from './Tooltip';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { css } from '@emotion/react';

const overrideChart = css`
  margin: 0 auto;
  border-color: blue;
  position: absolute;
  left: 45%;
  top: 35%;
`;

function coinReducer(state, action) {
  if (action.type === 'initial data') {
    return {
      ...state,
      coinPrice: action.coinPrice,
      price: action.price,
      image: action.image,
      priceChange: action.priceChange,
      loading: action.loading,
      twitterName: action.twitterName,
      subRedditUrl: action.subRedditUrl,
      coinData: action.coinData,
    };
  } else if (action.type === 'change time') {
    return {
      ...state,
      selected: action.selected,
    };
  } else if (action.type === 'error') {
    return {
      ...state,
    };
  } else {
    throw new Error('The action is not supported');
  }
}

export function Currency() {
  const { id } = useParams();
  const coin = id.charAt(0).toUpperCase() + id.slice(1);
  const [state, dispatch] = useReducer(coinReducer, {
    coinPrice: {},
    price: null,
    loading: true,
    selected: 'day',
    twitterName: '',
    subRedditUrl: '',
    coinData: null,
  });
  const [pageState, setPageState] = useState('overview');
  const [googleFeed, setGoogleFeed] = useState(null);
  const [googleLoading, setGoogleLoading] = useState(true);

  const watchList = useSelector((state) => state.watchList);
  const dispatchRedux = useDispatch();

  //use effect to get coin information
  useEffect(() => {
    Promise.all([
      getHistoriacalData(id, '1'),
      getHistoriacalData(id, '7'),
      getHistoriacalData(id, '30'),
      getHistoriacalData(id, '365'),
      getHistoriacalData(id, '1095'),
      getCoinData(id),
    ]).then((data) => {
      const [day, week, month, year, threeYears, coinData] = data;

      const {
        links,
        market_data: {
          current_price: { usd },
          price_change_percentage_24h,
        },
        image,
      } = coinData;

      dispatch({
        type: 'initial data',
        coinPrice: {
          day: day.prices,
          week: week.prices,
          month: month.prices,
          year: year.prices,
          threeYears: threeYears.prices,
        },
        image: image.small,
        coinData: coinData,
        price: usd,
        priceChange: price_change_percentage_24h,
        loading: false,
        twitterName:
          links.twitter_screen_name === 'btc'
            ? 'bitcoin'
            : links.twitter_screen_name,
        subRedditUrl: links.subreddit_url,
      });
    });
  }, []);

  useEffect(() => {
    let cancelRequest = false;
    getGoogleNews(id).then((news) => {
      if (cancelRequest) return;
      setGoogleFeed(news);
      setGoogleLoading(false);
    });
    return function cleanup() {
      cancelRequest = true;
    };
  }, [id]);

  const handleChangeTime = (time) => {
    dispatch({
      type: 'change time',
      selected: time,
    });
  };

  const handleWatch = (evt, id) => {
    evt.preventDefault();
    dispatchRedux(handleToggleWatch(id));
  };

  const handleChangePageState = (page) => {
    setPageState(page);
  };

  return (
    <div>
      <div className="title">
        <div className="coin-name">
          {state.image && <img src={state.image} alt="coin" />}

          <h1>{coin}</h1>
          <Tooltip
            text={
              watchList.includes(id)
                ? 'Remove from Watch List'
                : 'Add to Watch List'
            }
          >
            <button
              className={`star-button cur ${watchList.includes(id)}`}
              onClick={(evt) => handleWatch(evt, id)}
            >
              {watchList.includes(id) ? <AiFillStar /> : <AiOutlineStar />}
            </button>
          </Tooltip>
        </div>
        <div className="coin-price">
          <h1>
            {state.price && `$${numberWithCommas(state.price)}`}&nbsp;&nbsp;
            <span style={{ color: state.priceChange < 0 ? 'red' : 'green' }}>
              {state.priceChange && `${state.priceChange.toFixed(2)}%`}
            </span>
          </h1>
        </div>
      </div>
      <div className="coin-nav">
        <button
          className={`btn-clear ${pageState === 'overview' ? 'active' : ''}`}
          onClick={() => handleChangePageState('overview')}
        >
          Overview
        </button>
        <button
          className={`btn-clear ${pageState === 'social' ? 'active' : ''}`}
          onClick={() => handleChangePageState('social')}
        >
          Social
        </button>
        {/* <button
          className={`btn-clear ${pageState === 'news' ? 'active' : ''}`}
          onClick={() => handleChangePageState('news')}
        >
          News
        </button> */}
      </div>
      <div className="coin-info">
        {pageState === 'overview' && (
          <div className="coin-graph">
            <div className="day-buttons">
              <button
                className={`btn-clear ${
                  state.selected === 'day' ? 'active' : ''
                }`}
                onClick={() => handleChangeTime('day')}
              >
                1D
              </button>
              <button
                className={`btn-clear ${
                  state.selected === 'week' ? 'active' : ''
                }`}
                onClick={() => handleChangeTime('week')}
              >
                7D
              </button>
              <button
                className={`btn-clear ${
                  state.selected === 'month' ? 'active' : ''
                }`}
                onClick={() => handleChangeTime('month')}
              >
                1M
              </button>
              <button
                className={`btn-clear ${
                  state.selected === 'year' ? 'active' : ''
                }`}
                onClick={() => handleChangeTime('year')}
              >
                1Y
              </button>
              <button
                className={`btn-clear ${
                  state.selected === 'threeYears' ? 'active' : ''
                }`}
                onClick={() => handleChangeTime('threeYears')}
              >
                3Y
              </button>
            </div>
            <ScaleLoader
              color={'rgb(65, 182, 104)'}
              loading={state.loading}
              css={overrideChart}
              size={150}
            />

            {!state.loading && (
              <MemoizedHistoryChart
                coin={coin}
                data={state.coinPrice[state.selected]}
                selected={state.selected}
              />
            )}
          </div>
        )}
        {pageState === 'overview' && (
          <div className="coin-info-feed">
            <CoinInfo coinData={state.coinData} loading={state.lading} />
            <Converter price={state.price} id={id} />
          </div>
        )}

        {pageState === 'social' && (
          <SocialFeedTwo
            id={id}
            twitterName={state.twitterName}
            subRedditUrl={state.subRedditUrl}
          />
        )}

        {pageState === 'news' && (
          <MemoizedGoogleNews googleFeed={googleFeed} loading={googleLoading} />
        )}
      </div>
    </div>
  );
}

function numberWithCommas(x) {
  if (x <= 1) {
    return x;
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
