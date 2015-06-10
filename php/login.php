<?php
	if(isset($_POST["email"]) && isset($_POST["password"])){
		$email=$_POST["email"];
		$password=$_POST["password"];
		$servername="localhost";
		$username="root";
		$passwordDb="";
		try{
		$conn = new PDO("mysql:host=$servername;dbname=tesina", $username, $passwordDb);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$sql="SELECT password,email,salt
			  FROM info
			  where email='$email'";
			  $stmt= $conn->prepare($sql);//prepare the query before execute
			  $stmt->execute();//execute the query
			  $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
			  $row =$stmt->fetchObject();
			  //aggiungi se le trova maggiore 0 altrimenti non esiste utente
			  echo "PASSWORD DB ".$row->password ."<br> " ;
			  echo "PASSWORD inserita ". $password. "<br> " ;
			  $salt=$row->salt;
			  $regPaswd=$row->password;
			  
			  $crypted= crypt($password,$salt);//crypt the input password and salt
			  echo "PASSWORD generata per il confronto ". $crypted ."<br>";
			  if($crypted==$regPaswd ){
				session_start();
				$_SESSION["autenticated"]= true;
				$_SESSION["email"]=$email;
				echo $_SESSION["email"] ."<br>";
				echo $_SESSION["autenticated"] ."<br>";
				header("location: ../home.html");
			  }
			  else 
				  echo "<br>Nope";
		}
		catch(PDOException $e){
			echo $e->getMessage();
		}
	}

?>
