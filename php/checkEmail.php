<?php 
	
	if(isset($_POST['email']) && $_POST["email"]!="")
	{	$email=$_POST['email'];
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
			$sql=" SELECT email
				   FROM info
				   WHERE email = '$email'";
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
