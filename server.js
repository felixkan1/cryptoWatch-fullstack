const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const googleNewsScraper = require('google-news-scraper');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//api calls
app.get('/googleNews/:id', async (req, res) => {
  const coin = req.params.id;
  const articles = await googleNewsScraper({
    searchTerm: `${coin} crypto`,
    prettyURLs: false,
    timeframe: '24h',
    puppeteerArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  res.json(articles);
});

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.listen(port, () => `Server running on port ${port}`);
