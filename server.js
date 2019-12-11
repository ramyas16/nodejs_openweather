const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const request = require('request');

//let apiKey = '';
const apiKey = '63855042a80c734254b1a1280897e5fd';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));



//pp.post('/', function (req, res) {
 //   res.render('index');
  //  console.log(req.body.city);
  //})


  app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${apiKey}`
  request(url, function (err, response, body) {
      if(err){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weather = JSON.parse(body)
        if(weather.main == undefined){
          res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
          let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
          res.render('index', {weather: weatherText, error: null});
        }
      }
    });
  })


  app.get('/', function (req, res) {
    res.render('index', {weather: null, error: null});
  })
  


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.set('view engine', 'ejs');


