var https = require('https'),
    qs = require('querystring'),
    dbConfig = require('./dbConfig'),
    mongodb = require('mongodb'),
    server = new mongodb.Server(dbConfig.ip, dbConfig.port),
    db = new mongodb.Db(dbConfig.dbName, server, {}),
    githubConfig = require('./githubConfig'),
    collection;

db.open(function(){
  collection = db.collection(dbConfig.collectionName);
  collection.createIndex('login', { unique : true , dropDups: true}, function() {}); // unique github usernames
});

https.globalAgent.options.secureProtocol = 'SSLv3_method';
function storeData(req, callback) {
  var code = req.query.code,
      postData = qs.stringify({
        client_id : githubConfig.clientId,
        client_secret : githubConfig.clientSecret,
        code : code
      }),
      postOptions = {
        host : 'github.com',
        path : '/login/oauth/access_token',
        method : 'POST',
        headers: {
          'Content-Length': postData.length
        }
      };
      
  // get an access token
  var accessTokenRequest = https.request(postOptions, function(res) {
    res.setEncoding('utf8');
    var data = '';
    res.on('data', function(chunk) {
      data += chunk;
    });

    res.on('end', function() {
      var parsedData = qs.parse(data);
          accessToken = parsedData.access_token,
          getData = qs.stringify({
            access_token : accessToken 
          }),
          getOptions = {
            host : 'api.github.com',
            path : '/user?' + getData
          };
      https.get(getOptions, function(res) {
        var data = '';
        res.on('data', function (chunk) {
          data += chunk;
        });
        res.on('end', function() {
          var jsonData = JSON.parse(data);
          collection.insert(jsonData, { safe : true }, function() {
            callback(jsonData);
          });
        });
      });
    });
  });

  accessTokenRequest.on('error', function(e) {
    console.log("Issue getting github access token: ", e);
    callback('error');
  });

  accessTokenRequest.write(postData);
  accessTokenRequest.end();
}

exports.storeData = storeData;
