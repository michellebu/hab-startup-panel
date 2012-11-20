var signup = require('./signup.js'),
    githubConfig = require('./githubConfig.js');

function index(req, res) {
  res.render('index.ejs', {
    clientId : githubConfig.clientId,
    scripts : {
      local : [
        "index.js"
      ]
    },
    styles : {
      local : [
        "index.css"
      ]
    }
  });
}

function githubResponse(req, res) {
  signup.storeData(req, function(data) {
    // we don't do much with data right now, but we could if we wanted
    githubSuccess = data !== 'error';
    res.render('redirect.ejs', {
      githubSuccess : githubSuccess
    });
  });
}

function signUpSuccess(req, res) {
  res.render('signup-success.ejs');
}

function signUpFail(req, res) {
  res.render('signup-fail.ejs');
}

exports.index = index;
exports.githubResponse = githubResponse;
exports.signUpSuccess = signUpSuccess;
exports.signUpFail = signUpFail;
