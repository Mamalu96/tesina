<?php session_start();
$user=$_SESSION['email'];
$id=$_POST['data'];
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
			$sql="SELECT * FROM request
			where idRequest='$id'";
			$result=$con->query($sql);
			$row= $result->fetch_assoc();
			$friend=$row['frm'];
			$sql="INSERT INTO friend (email1,email2) VALUES ('$friend','$user')";
			$result=$con->query($sql);
			$sql="DELETE FROM request where idRequest='$id'";
			$result=$con->query($sql);
		}
?>