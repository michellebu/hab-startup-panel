// rename this to dbConfig.js after filling in info
databaseOptions = {
  ip : 'alex.mongohq.com', 
  port : 10096, 
  dbName  : 'foundertalk',
  user : 'michelle',
  password : 'hack', 
  collectionName : 'companies'
}

for (key in databaseOptions) { exports[key] = databaseOptions[key]; }
