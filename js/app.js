
var id="";
$(document).ready(function(){
	
	 $.ajax({
		 type: "POST",
		 url:"php/getSessionid.php",
		 success: function(sessionId){
		 	  console.log(sessionId);
              var id=sessionId;
			  var mySDP="";
			  var description;
			  var pc_config = {“iceServers”: [{“url”: “stun:stun.l.google.com:19302″},
			  {“url”:”turn:admin@ec2-52-26-176-174.us-west-2.compute.amazonaws.com“, “credential”:"admin"}]};
			  var pc= null;
			  var candidate={};
			  var i=0;
			  var remote= {};
			  var remoteVideo = {};
			  var friend=0;
			  var peer=0;
// FUNCTION START()
			  function start(fr){
			  			peer=fr;
			   			pc= new RTCPeerConnection(pc_config);
			   			pc.onaddstream= function(event){

     				 		console.log("addremote");
     				 		var video2= document.getElementById("remotevideo");
     				 		attachMediaStream(video2,event.stream);
     				 	}
			   			pc.onicecandidate= function(event) {
    				    	if(event.candidate) {
        						console.log(event.candidate);
        						socket.emit('relay', {to: fr,
        										candidate: event.candidate,
        										email: sessionId,
        										type: 'candidate'
        						})
       					 	} else { pc.onicecandidate = null; }
       					};
			  			if (getUserMedia) {
   							getUserMedia ( { audio: true, video:true },function (stream){
      										var localVideo= document.getElementById("localVideo");
											attachMediaStream(localVideo,stream);
											localVideo.play();
											pc.addStream(stream); 
       										pc.createOffer(function(offer){

													pc.setLocalDescription(

														new RTCSessionDescription(offer),
														function(){
															console.log(offer.sdp);
															mySDP=offer;
															sendOffer();
														},function(err){
															error(err);
														})

											},function(err){
														error(err);
											}
											,constraints)// close create offer

       									}
      									,function(err){
      											error(err)
      									}
							);// close get user media
						} else {
   								console.log("getUserMedia not supported");
						};
				};// close start
			  var socket = io('http://ec2-52-26-176-174.us-west-2.compute.amazonaws.com:8080/'); // initialize WebSocket

			  socket.emit('autentication',description={ email: id}); // Autenticate the client
                        socket.on('message', function(data){
 						console.log(data.servermessage + " " + data.number);
			  });
//RELAY CALL
			  socket.on('relay',function(data){
	 		       
	 		       if(data.type=="offer"){

	 		       		bootbox.dialog({
	 		       			message: "Calling from " + data.email,
	 		       				  buttons: {
   									 success: {
     								 	label: "Accept!",
      									className: "btn-success",
      									callback: function() {
        										answ(data);
      									}
   									},
    								danger: {
     			 						label: "Refuse",
     			 						className: "btn-danger",
      									callback: function() {
       			 							alert("no");
      									}
    								}
	 		       				}	
	 		       		});
	 		       	}

	 		       	else if(data.type=='answer'){
	 		       		console.log(data.sdp.sdp);
	 		       		var answer= new RTCSessionDescription(data.sdp);
	 		       		pc.setRemoteDescription(answer,function(){alert("ok");},function(){alert("no");});
	 		       	}
	 		        if (data.type=='candidate'){ // store the candidate
	 		       		console.log(data.candidate);
	 		       		candidate[i]= data.candidate;
	 		       		i=i+1;
	 		       }
			});
			function sendOffer(){
				to=peer;
				console.log(peer);
				socket.emit('relay',{ 
							type: 'offer',
							email : id,
							sdp: mySDP,
							to: to
							}
			);
			};




		function answ( data ){
	 		       		friend = friend+1;
	 		       		remote[friend] = new RTCPeerConnection(pc_config);
	 		       		//
			  	   		console.log(data.email);	
	 		       		SDP= data.sdp;
	 		       	
	 		       		remote[friend].onaddstream= function(event){
     				 			console.log("addremote");
     				 			remoteVideo[friend] = document.createElement('video');
     				 			document.body.appendChild(remoteVideo[friend]);
     				 	 		attachMediaStream(remoteVideo[friend],event.stream);
     				 	}

	 		       		var offer= new RTCSessionDescription(SDP);
	 		       		
	 		       		remote[friend].onicecandidate= function(event) {
    				    	if(event.candidate) {
        							console.log(event.candidate);
       						} else { remote[friend].onicecandidate = null; }
     				 	};

	 		       		remote[friend].setRemoteDescription(offer,function(){
	 		       				for (j=0; j<i; j++){ // Store the remote iceCandidate 
	 		       						remote[friend].addIceCandidate(new RTCIceCandidate(candidate[j]));
	 		       				}
	 		       				getUserMedia ( { audio: true, video:true },
      								function(stream) {
      									var video= document.getElementById("localVideo");
										attachMediaStream(video,stream);
										video.play();
										remote[friend].addStream(stream); 
       									remote[friend].createAnswer(function(answer){
	 		       							remote[friend].setLocalDescription( new RTCSessionDescription(answer),
	 		       								function(){
	 		       										console.log(data.email + sessionId);
	 		       										socket.emit('relay',{
	 		       											email: sessionId,
	 		       											to: data.email,
	 		       											sdp: answer,
	 		       											type: 'answer'
	 		       										});
	 		       								},
	 		       								function(err){
	 		       										error(err);
	 		       								}); // close the setLocalDescription
	 		       						},function(err){
	 		       								error(err);
	 		       						},constraints); // close the create answer
									}
      								,function(err){
      										error(err)
      								}
							);
	 		       			},function(){alert("get user media is not supported");}); // close the get user media
				}
				$("#showFriend").click(function(){
					$.ajax({
						type: "POST",
						url:"php/friend.php",
						success : function(row){
							if(row!= "no"){
								var obj = JSON.parse(row);
								var a= 0;
								bootbox.dialog({
									title: "Friends Online",
  									message: "<ul  id='list' class='list-group'>" + 
    								  "</ul>"
    							});

								while(obj[a]){
								//alert(obj[a].email1);
									if(obj[a].email1 == sessionId){
										$("#list").append("<a href='#' class='list-group-item'>"+ obj[a].email2+"</a>")
										console.log("1");
									}
									else {
										$("#list").append("<a href='#' class='list-group-item'>"+ obj[a].email1+"</a>")
										console.log("2");
									}
									a= a+1;
									$("a").click(function(e){
										var fr = $(e.target).text();
										console.log(fr);
										bootbox.hideAll();
										start(fr);
									});
								}
							} else {
								alert("no friend online");
							}
					}
					})
				});
				
		 }//CLOSE SUCCESS AJAX
	 });
});//CLOSE DOCUMENT.getready



