const express = require('express');
const router = express.Router();

const fs = require('fs');

const feedback = require('../data/feedback.json');

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.get('/contactUs', (req, res) => {
    
    res.render('contactUs')
})

router.get('/api', (req, res) => {
    
    res.json(feedback)
})

router.post('/api', (req, res) => {
    
    let {name, title, message} = req.body;

    feedback.unshift(req.body)

    fs.writeFile('data/feedback.json', JSON.stringify(feedback), 'utf8', err => {

        if(err){
            res.status(444).send(err)
        }
    })

    res.json(feedback);
    console.log(feedback);
})
router.delete('/api/:index', (req, res) => {

    let {index} = req.params;

    feedback.splice(index, 1);

    fs.writeFile('data/feedback.json', JSON.stringify(feedback), 'utf8', err => {
        if(err){
            res.status(445).send(err)
        }
        res.json(feedback);
        
    })
    
})

module.exports = router;
