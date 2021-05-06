const express = require('express');
const Twitter = require('twit');

const PORT = process.env.PORT || 3000; 

const app = express();
const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});


 
app.use(require('cors')());
app.use(require('body-parser').json());

//See timeline of my tweet
app.get('/home_timeline', (req, res) => {
  const params = { tweet_mode: 'extended', count: 10 };
 
  client
    .get(`statuses/home_timeline`, params)
    .then(timeline => {
       
      res.send(timeline);
    })
    .catch(error => {
    res.send(error);
  }); 
});

//Get tweets of user
app.get('/user_timeline', (req, res) => {
  const params = { tweet_mode: 'extended', exclude_replies: true, count: 10, screen_name: req.query.user };
  
  client
    .get(`statuses/user_timeline`, params)
    .then(timeline => {
       
      res.send(timeline);
    })
    .catch(error => {
    res.send(error);
  });
});

//Post tweets
app.post('/post_tweet', (req, res) => {
  const tweet = req.body;

    client
      .post(`statuses/update`, tweet)
      .then(tweeting => {
         
        res.send(tweeting);
      })
 
     .catch(error => {
      res.send(error);
    });
});

app.listen(PORT);

module.exports = app;