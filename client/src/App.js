/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { handleInitialData } from './actions/home';
import './App.css';
import { ThemeProvider } from './context/theme';
import { Search } from './components/Search';
import { Currency } from './components/Currency';
import { Nav } from './components/Nav';

import { About } from './components/About';
import { WatchList } from './components/WatchList';

function App() {
  const [theme, setTheme] = useState('dark');
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.coins === null);

  const toggleTheme = () => {
    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    dispatch(handleInitialData());
    callApi()
      .then((res) => console.log({ response: res.express }))
      .catch((err) => console.log(err));
  }, [dispatch]);

  const callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  return (
    <Router>
      <ThemeProvider value={theme}>
        <LoadingBar showFastActions />
        <div className={`container ${theme}`}>
          <Nav toggleTheme={toggleTheme} />
          {loading === true ? null : (
            <div className="content">
              <Route path="/" exact>
                <Search />
              </Route>
              <Route path="/currency/:id" exact>
                <Currency />
              </Route>
              <Route path="/about" exact>
                <About />
              </Route>
              <Route path="/watchlist" exact>
                <WatchList />
              </Route>
            </div>
          )}
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
