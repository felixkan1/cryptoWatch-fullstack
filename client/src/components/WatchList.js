/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import { Coinlist } from './Coinlist';
export function WatchList() {
  const watchList = useSelector((state) => state.watchList);

  return (
    <div>
      <h1>Watch List</h1>
      {watchList.map((coin) => {
        return <Coinlist key={coin} id={coin} />;
      })}
    </div>
  );
}
