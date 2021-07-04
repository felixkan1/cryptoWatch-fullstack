/* eslint-disable */
import React, { useState, useContext } from 'react';
import ThemeContext from '../context/theme';

export function Converter({ price, id }) {
  const [coins, setCoins] = useState('');
  const [usd, setUsd] = useState('');
  const theme = useContext(ThemeContext);

  const handleChange = (evt) => {
    if (evt.target.id === 'coin') {
      //changed coin value
      setCoins(evt.target.value);
      setUsd(evt.target.value * price);
    } else {
      setUsd(evt.target.value);
      setCoins(evt.target.value / price);
    }

    if (evt.target.value === '') {
      setUsd('');
      setCoins('');
    }
  };
  return (
    <div className={`converter-${theme}`}>
      <div className="convert-currency">
        {id.charAt(0).toUpperCase() + id.slice(1)}
        <input
          dir="rtl"
          type="text"
          id="coin"
          placeholder="0"
          autoComplete="off"
          value={coins}
          onChange={handleChange}
          maxlength="12"
        />
      </div>
      <div className="convert-currency">
        USD($)
        <input
          dir="rtl"
          type="text"
          id="usd"
          placeholder="0"
          autoComplete="off"
          value={usd}
          onChange={handleChange}
          maxlength="12"
        />
      </div>
    </div>
  );
}
