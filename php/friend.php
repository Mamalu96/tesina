<?php 
		session_start();
		$u= $_SESSION['email'];
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
			$sql="SELECT email1,email2,i1.status as S1,i2.status as S2
			FROM friend INNER JOIN info AS i1 ON email1=i1.email INNER JOIN info as i2 ON email2=i2.email WHERE email1='$u' AND i2.status='online' OR email2='$u' AND i1.status='online'";
			$result=$con->query($sql);
			if($result->num_rows!=0){
			while($r= $result->fetch_assoc())
				{	
				 $rows[] = $r;
				}
			echo json_encode($rows);
			}
			else 
				echo "no";
		}
	
?>
