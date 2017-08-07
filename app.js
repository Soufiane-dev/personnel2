'use strict';

var express = require('express'),
app = express(),
    session = require('express-session');
 // app server
var bodyParser = require('body-parser'); // parser for post requests
var Conversation = require('watson-developer-cloud/conversation/v1'); // watson sdk


app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

//////////////////////////////index begin
app.use(function(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});


// Authentication and Authorization Middleware
var auth = function(req, res, next) {
  if (req.session && req.session.user === "Cihm3ak" && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};



// Login endpoint
app.get('/login', function (req, res) {
	var username = req.query.username;
	var pswd = req.query.pswd;
  if (!username || !pswd) {
    res.send('login failed');
  } else if(username === "Cihm3ak" && pswd === "cihm3ak**2017") {
    req.session.user = username;
    req.session.admin = true;
    res.redirect('/conversation');
  }
});

// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  //res.sendFile(__dirname+"/public/logout.html");
  res.redirect('/');
});

// Get content endpoint
app.get("/conversation", auth, function (request, response){
    response.sendFile(__dirname+"/public/conversation.html");
})

//////////////////index end



var conversation = new Conversation({
  version_date: Conversation.VERSION_DATE_2017_04_21
});

app.post('/api/message', function(req, res) {
  var workspace = process.env.WORKSPACE_ID || '<workspace-id>';
  if (!workspace || workspace === '<workspace-id>') {
    return res.json({
      'output': {
        'text': 'The workspace_id is needed'
      }
    });
  }
  var payload = {
    workspace_id: workspace,
    context: req.body.context || {},
    input: req.body.input || {}
  };

  // Send the input to the conversation service
  conversation.message(payload, function(err, data) {
    if (err) {
      return res.status(err.code || 500).json(err);
    }
    return res.json(updateMessage(payload, data));
  });
});


function updateMessage(input, response) {
  var responseText = null;
  if (!response.output) {
    response.output = {};
  } else {
    return response;
  }
  response.output.text = responseText;
  return response;
}

module.exports = app;
