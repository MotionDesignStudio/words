<?php


$servername = "127.0.0.1";
$username = "root";
$password = "";
$dataBaseName="modenet_words";
$theWord = $_POST['theWord'];
$theTable = $_POST['theTable'];
$theDefiniton="";
$ofImportanceWords="XXXX";
$theWordFromDatabase="";
$wordIDNumber='';

// Create connection
//$conn = new mysqli($servername, $username, $password, $dataBaseName);
$conn = mysql_connect($servername, $username, $password);


// Check connection
//if ($conn->connect_error) {


if (! $conn) {
    die("Connection failed: " . $conn->connect_error);
}


if (isset ($theWord)&& isset($theTable)){
	//$sql="SELECT * FROM homonyms";
	$sql="SELECT * FROM ".$theTable. ' WHERE theWord ="'.$theWord.'"';
	
	//SELECT ofImportanceWords FROM homophones where theWord = "it's";

	#$sql="SELECT * FROM homonyms WHERE theWord ='Adam'";
	//$sql="SELECT * FROM homonyms WHERE theWord ='".$theWord."'";

	mysql_select_db($dataBaseName);
	$result = mysql_query( $sql, $conn );
	
	#$array = mysql_fetch_row($result);


	while ($row=mysql_fetch_array($result, MYSQL_ASSOC)){
		//echo "{$row['theWord']} ::  </br>".
		//": {$row['theDefinition']}  </br>";
		$theWordFromDatabase="{$row['theWord']}";
		$theDefiniton="{$row['theDefinition']}  </br>";
		//This grabs the word ID for debbging
		$wordIDNumber="{$row['id']}";
		
	}
}


echo "::: ".$theWordFromDatabase." ::: <br/>".$theDefiniton;
//echo "ID ".$wordIDNumber."::: ".$theWordFromDatabase." ::: ".$theDefiniton;



#echo json_encode($array);

mysql_close($conn);

//print_r($_POST);

?>
