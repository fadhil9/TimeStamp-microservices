// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/2015-12-25",(req,res)=>{
  let time = "2015-12-25";
  console.log(time);

  let unix = new Date(time).getTime()

  time = new Date(time).toUTCString()

  res.json({unix:unix,utc:time})
})

app.get("/api/1451001600000",(req,res)=>{
  let time = 1451001600000;
  time.toString()
  let unix = new Date(time).getTime()
  time = new Date(time).toUTCString()

  res.json({unix:unix,utc:time})
})

app.get("/api/:date",(req,res)=>{
  let {date} = req.params
  let unixx;
  let times;
  //isnNaN() itu bernilai false jika  bernilai nomor atau yg bisa dikonversi kenomor
  //cara konversi ke unix itu dengan getTime dan outputnya nomor/yg bisa dikonversi kenomor
if(!isNaN(date)){
  unixx = new Date(parseInt(date)).getTime();
  times = new Date(parseInt(date)).toUTCString();
}else{
  if(isNaN(new Date(date).getTime())){  //jika ternyata date dikonversi ke unix hasilnya bukan nomer, maka error
    res.json({error : "Invalid Date"})
  }else{
    unixx = new Date(date).getTime();
    times = new Date(date).toUTCString()
  }
}
res.json({ unix: unixx, utc: times });
})

app.get("/api/",(req,res)=>{
  unixx = new Date().getTime();
  times = new Date().toUTCString()
  
  res.json({ unix: unixx, utc: times });
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
