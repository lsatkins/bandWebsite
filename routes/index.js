const express = require('express');
const router = express.Router();

const dataFile = require('../data/data.json')

let albumsArr = dataFile.albums;

router.get('/', (req, res) => {

    let albumNames = [];

    albumsArr.forEach(album => {
        albumNames = albumNames.concat([album.albumname])
    })
    
    res.render('index', {
        albumNames: albumNames
    })
})

module.exports = router;