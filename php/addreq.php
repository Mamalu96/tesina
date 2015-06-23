<?php 
 	$friend=$_POST['data'];
 	$usr=$_SESSION['email'];

 	$srv="localhost";
	$usr="root";
	$psw="";
	$db="tesina";
	$con=new mysqli($srv,$usr,$psw,$db);
		if($con->connect_error){
			die("connection failed" . $con->connect_error);	
			echo "error2";
		}
		else{
			$sql="INSERT INTO request (frm,tousr,type,r) values ('$usr','$friend','f','unread')";
			$result=$con->query($sql);
		}

?>