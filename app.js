var express = require('express'),
    app = express();
    router = require('./router.js');

app.listen(80);

var engine = require('ejs-locals');
app.engine('ejs', engine);

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs'); 
app.use(express.static(__dirname + "/static"));

app.get('/', router.index);

app.get('/github-response', router.githubResponse);
app.get('/signup-success', router.signUpSuccess);
app.get('/signup-fail', router.signUpFail);
