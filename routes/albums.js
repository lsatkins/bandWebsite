const express = require('express');
const router = express.Router();

const dataFile = require('../data/data.json');
let albumsArr = dataFile.albums;

router.get('/albums', (req, res) => {
    
    res.render('albums', {
        albums: albumsArr,
        pageTitle: "Arctic Monkeys Albums"
    })
})

module.exports = router;