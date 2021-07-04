/* eslint-disable */
import React, { useContext } from 'react';
import ThemeContext from '../context/theme';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { css } from '@emotion/react';

const overrideInfo = css`
  margin: 0 auto;
  border-color: blue;
  position: relative;
  left: 45%;
  top: 140px;
`;

export function CoinInfo({ coinData, loading }) {
  const theme = useContext(ThemeContext);
  if (!coinData) {
    return (
      <div className={`coin-stat-${theme}`}>
        <ScaleLoader
          color={'rgb(65, 182, 104)'}
          loading={loading}
          css={overrideInfo}
          size={150}
        />
      </div>
    );
  }

  const {
    market_data: {
      market_cap,
      price_change_24h_in_currency,
      high_24h,
      low_24h,
      circulating_supply,
    },
    market_cap_rank,
  } = coinData;

  return (
    <div className={`coin-stat-${theme}`}>
      <h2>Coin Statistics</h2>
      <p>
        Market Cap Rank <b>#{market_cap_rank}</b>
      </p>
      <p>
        Market Cap <b>${numberWithCommas(market_cap.usd)}</b>
      </p>
      <p>
        Circulating Supply <b>{numberWithCommas(circulating_supply)}</b>
      </p>
      <p>
        Price Change 24h $
        <b>${numberWithCommas(price_change_24h_in_currency.usd.toFixed(2))}</b>
      </p>
      <p>
        24h High/24h Low{' '}
        <b>
          ${numberWithCommas(high_24h.usd)}/ <br /> $
          {numberWithCommas(low_24h.usd)}
        </b>
      </p>
    </div>
  );
}

function numberWithCommas(x) {
  if (x <= 1) {
    return x;
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
