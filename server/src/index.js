const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const serverless = require('serverless-http')
const app = express();
const port = 5000;
var cors = require('cors');
const router = express.Router()
const route = require('./routes');
const db = require('./config/db');

//Connect to db
db.connect();

// app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(cors());


// app.use(methodOverride('_method'));

app.use(express.json());


//Routes init
route(app);

app.use('/.netlify/functions/index', route);
// router.get('/', (req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/html'})
//     res.end()
// })

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;
module.exports.handler = serverless(app);
