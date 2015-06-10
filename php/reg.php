<?php
	if(isset($_POST["email"]) && isset($_POST["pswd"]) && isset($_POST["firstname"]) && isset($_POST["lastname"])){
		$email= $_POST["email"];
		$password=$_POST["pswd"];
		$username= $_POST["username"];
		$firstname=$_POST["firstname"];
		$lastname=$_POST["lastname"];
		$birthdate=$_POST["date"];
		$country=$_POST["country"];
		$city=$_POST["city"];
		$gender=$_POST["gender"];
		$servername="127.5.144.130";
		$usernameDb="adminxqlR42v";
		$passwordDb="7GAyPEuyU_cM";
		$salt=rand(10000,1000000000);
		echo "salt=".$salt;
		$saltSha= sha1 ($salt);
		echo "<br>Sha del salto= ".$saltSha."<br>";
		$crypted=crypt($password,$saltSha);
		echo "PasswdCriptata= ".$crypted;
		
		try{
			 $conn = new PDO("mysql:host=$servername;dbname=tesina", $usernameDb, $passwordDb);
			 $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			 echo "<br>Connected successfully"; 
			 $sql="INSERT INTO info(email,username,lastname,firstName,birthDate,city,gender,password,salt)
					VALUES ('$email','$username','$firstname','$lastname','$birthdate','$city','$gender','$crypted','$saltSha')";
			  $conn->exec($sql);
				echo "New record created successfully";
				header("location: ../login.html");
		}
		catch(PDOException $e){
			echo $e;
		}
	}
	else 
		echo "errore";
	
?>
