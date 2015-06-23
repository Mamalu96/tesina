<?php
session_start();
$user=$_SESSION['email'];

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
			Where tousr='$user'";
			$result=$con->query($sql);
			if($result->num_rows!=0){
			while($r= $result->fetch_assoc())
				{	
				 $rows[] = $r;
				}
				echo json_encode($rows);
			}
			else {
				echo "none";
			}
		}

?>