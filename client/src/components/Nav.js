/* eslint-disable */

import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import ThemeContext from '../context/theme';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

export function Nav({ toggleTheme }) {
  const theme = useContext(ThemeContext);
  return (
    <div className="menu">
      <nav className={theme}>
        <NavLink to="/" exact activeClassName="chosen">
          Home
        </NavLink>
        <NavLink to="/watchlist" exact activeClassName="chosen">
          Watch List
        </NavLink>
        <NavLink to="/about" exact activeClassName="chosen">
          About
        </NavLink>
      </nav>
      <DarkModeSwitch
        style={{
          position: 'relative',
          left: '-50px',
          top: '25px',
        }}
        checked={theme === 'dark'}
        onChange={toggleTheme}
        size={40}
      />
    </div>
  );
}
