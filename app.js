const path = require('path');
const express = require('express');
const videos = require('./src/videos');

const app = express();

app.locals.tools = require('./src/tools');

const host = '127.0.0.1';
const port = 3000;

const publicPath = path.join(__dirname, 'public');
const viewsPath = path.join(__dirname, 'views');

app.use(express.static(publicPath));

app.set('views', viewsPath);
app.set('view engine', 'ejs');

app.use('/', videos);

app.listen(port, host, () => {
  console.log(
    `Server @ http://${host}:${port}/`,
  );
});
