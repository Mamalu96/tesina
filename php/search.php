<?php
	if(isset($_GET['data']) and $_GET['data']!=""){
		$data=$_POST['data'];
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
			$sql="SELECT email,username
			FROM info
			WHERE email='$data' OR username LIKE '$data%'";
			$result=$con->query($sql);
			if($result->num_rows!=0){
			while($r= $result->fetch_assoc())
				{	
				 echo $r['email'];
				}
		}
	}
?>