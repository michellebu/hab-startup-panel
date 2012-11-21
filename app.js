var express = require('express'),
    app =  express.createServer(),
    router = require('./router.js');

app.use(express.bodyParser());

app.use(express.static(__dirname + '/static'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs'); 
app.use(express.static(__dirname + "/static"));

app.get('/', router.index);

app.get('/auth', router.githubResponse);
app.get('/signup-success', router.signUpSuccess);
app.get('/signup-fail', router.signUpFail);

app.listen(process.env.PORT || 8000);
