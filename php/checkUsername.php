<?php 
	
	if(isset($_POST['username']) and $_POST['username']!="")
	{	$username=$_POST['username'];
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
			$sql=" SELECT username
				   FROM info
				   WHERE username = '$username'";
			$result=$con->query($sql);
			if($result->num_rows==0)
				echo "ok";
			else
				echo "no";
		}
	}
	else	
		echo "no";
?>
