var http=require('http'),io = require('socket.io');
var mysql=require('mysql');
var clients={}; //Array client connected 
// Create a Socket.IO instance, passing server
var conn = mysql.createConnection({ // DB data login
host: 'localhost',
user: 'root',
password : '',
database : 'tesina'
});
conn.connect(); // connection to DB
var socket = io.listen(8080); // listen on port 8080 (80 mysql)
// Add a connect listener
console.log("SERVER STARTED");
socket.on('connection', function(client){
	var i=0 ;// Number of messages
	console.log("#CONNECTED SOMEONE");
	//HANDLER EVENT ON AUTENTICATION
	client.on('autentication',function(data){ // Add a username to listener
		var username=data.email;
		
		var query=conn.query('UPDATE info SET status="online" WHERE email="'+username+'"',function(err){// CHANGE ONLINE STATUS WHEN SOMEONE AUTENTICATE
			if(err)
			console.log(err);		
			console.log("update status online "+ username);
		});
		
		clients[username]=client; //insert the username json?
		console.log("#Arrivato un usr "+ username);
		
		var interval = setInterval(function() { // intervall
				i=i+1;
				clients[username].send({servermessage:'ServerMessage:',number:i});
			},5000);

		client.on('relay',function(data){
				console.log(username + "is  "+data.type+ " " + data.to);
				var buff= data; // INSERISCI NEL DB LA RICHIESTA
				clients[data.to].emit('relay',buff);			
	       });
		
	    client.on('disconnect', function() { // DISCONNECT HANDLER
				clearInterval(interval);
				var query=conn.query('UPDATE info SET status="offline" WHERE email="'+username+'"',function(err){// CHANGE OFFLINE STATUS WHEN SOMEONE AUTENTICATE
								if(err)
								console.log(err);
								console.log("update status offline"+ username);		
							});
				console.log('Got disconnect!');
				delete clients[username];
		});
	});
});
