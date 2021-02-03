/**
 * Middleware for 404 not found
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
function notFoundHandler(req, res, next) { // eslint-disable-line
  const title = 'Síða fannst ekki';
  const message = 'Þetta er ekki síðan sem þú leitar að...';
  res.status(404).render('error', { title, message });
}

/**
 * Middleware for error handling.
 * @param {object} err
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
function errorHandler(err, req, res, next) { // eslint-disable-line
  const title = 'Villa kom upp';
  const message = 'Það kom upp villa, villtu vinsamlegast hætta þessu..';
  res.status(500).render('error', { title, message });
}

const path = require('path');
const express = require('express');
const videos = require('./src/videos');

const publicPath = path.join(__dirname, 'public');
const viewsPath = path.join(__dirname, 'views');

const app = express();
app.locals.tools = require('./src/tools');

const host = '127.0.0.1';
const port = 3000;

app.use(express.static(publicPath));
app.use('/', videos);

app.set('views', viewsPath);
app.set('view engine', 'ejs');

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, host, () => {
  console.log(
    `Server @ http://${host}:${port}/`,
  );
});
