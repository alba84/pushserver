var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var FCM = require('fcm-push');
var serverKey = 'AAAAIxzy3rA:APA91bGxaBFOwsF0c7Xnt1Xzs6yfvP0ADknN7sA056GeYnI3kYUochj9lcS9KdqRv1s3p8nQVtZEg_cbqWpu7a3mmlggYdPa2O6zw2wnrseNX94SJHwylDlJRS0qnUAyJguOKjTMg912';
var fcm = new FCM(serverKey);
var port = 3000;

//parse json
app.use(bodyParser.json())

app.post('/sendPush', function(req, res) {

	console.log(req.body.data);

	var message = {
    	to: req.body.token, // required fill with device token or topics
    	collapse_key: req.body.collapseKey, 
    	data: {},
    	notification: {
    	    title: req.body.title,
    	    body: req.body.message
    	}
	};

	req.body.data.forEach(function(item, i, arr) {
		for (var prop in item) {
	        message.data[prop] = item[prop];
	    }
	})

	fcm.send(message, function(err, response){
	    if (err) {
	        console.log("Something has gone wrong!" + err);
	        res.status(500);
	        res.send();
	    } else {
	        console.log("Successfully sent with response: ", response);
	        res.json(req.body);
	    }
	});
  
});

console.log("server lisen on port : " + port)
app.listen(port);