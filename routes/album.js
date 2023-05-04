const express = require('express');
const router = express.Router();

const dataFile = require('../data/data.json');
let albumsArr = dataFile.albums;

router.get('/album/:albumID', (req, res) => {
    
    let shortName = req.params.albumID;

    let album;

    albumsArr.forEach(albumObj => {

        if(albumObj.shortname === shortName){

            album = albumObj;
        }
        console.log(album);
    })
    res.render('album', {
        album: album,
        pageTitle: `Arctic Monkeys -- ${album.name}`
    })
})

module.exports = router;