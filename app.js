const express = require('express');
let app = express();
let PORT = 3000;

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(require('./routes/index'));
app.use(require('./routes/albums'));
app.use(require('./routes/album'));
app.use(require('./routes/contactUs'));

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})