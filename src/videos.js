const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const express = require('express');

const router = express.Router();

/**
 * Calls a function and catches runtime errors.
 * @param {function} fn
 */
function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

/**
 * Reads data from JSON (ASYNC)
 */
async function readVideos() {
  const file = await readFile('./videos.json');
  const json = JSON.parse(file);
  return json;
}

/**
 * Handler for the main page
 * @param {object} req Request object
 * @param {object} res Respond object
 */
async function list(req, res) {
  const json = await readVideos();
  const title = 'Vídeoleigan';
  const {
    videos,
    categories,
  } = json;
  res.render('videos', { title, videos, categories });
}

/**
 * Searches for a video with the id = id
 * @param {Number} id Id for video being looked for
 * @param {object} videos A list of video objects
 */
async function findVideo(id, videos) {
  let videoFound;
  const numId = Number(id);
  videos.forEach((video) => {
    if (video.id === numId) {
      videoFound = video;
    }
  });
  if (videoFound) {
    return videoFound;
  }
  return false;
}

/**
 * Handler that shows the page with a video
 * @param {object} req Request object
 * @param {object} res Respond object
 * @param {object} next
 */
async function showVideo(req, res, next) {
  const { slug } = req.params;
  if (slug !== 'video') {
    return next();
  }
  const { id } = req.query;

  const json = await readVideos();
  const { videos } = json;
  const video = await findVideo(id, videos);

  if (!video) {
    return next();
  }

  const { title } = video;

  res.render('video', { title, video, videos });
  return '';
}

router.get('/', catchErrors(list));
router.get('/:slug', catchErrors(showVideo));

module.exports = router;
