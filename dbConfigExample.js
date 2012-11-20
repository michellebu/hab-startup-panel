// rename this to dbConfig.js after filling in info
databaseOptions = {
  ip : '127.0.0.1', 
  port : 27017, 
  dbName  : 'spongebob',
  collectionName : 'pineapples'
}

for (key in databaseOptions) { exports[key] = databaseOptions[key]; }
