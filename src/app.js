const express = require('express');
const redis = require('redis');
const app = express();

//Provide DNS name/IP address and port
const client = redis.createClient({
  host: 'my-redis-server',
  port: 6379
});
const serverPort = process.env.SERVERPORT;

app.get('/', (req, res) => {

  //Read key from the database
  client.get('visitors', (err, visitors) => {

    //Convert the value into integer
    var currVisits = parseInt(visitors);

    //If visitors is not present in database then initilize 1
    if(isNaN(currVisits)) {
      currVisits = 1;
    }

    //Send the response back to the user
    res.send('You are visitor: ' + currVisits);

    //Increment and save the new value to the database
    client.set('visitors', currVisits + 1);
  });

});

app.listen(serverPort, () => {
  console.log('node basic started on port ', serverPort);
});
