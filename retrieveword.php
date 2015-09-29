<?php
//Developed on PHP Version 5.6.7-1, mysql 5.5.42, Debian Testing

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

//$debuger='';

// Create connection
//$conn = new mysqli($servername, $username, $password, $dataBaseName);
$conn = mysql_connect($servername, $username, $password);

mysql_set_charset('utf8',$conn);  

// Check connection
//if ($conn->connect_error) {


if (! $conn) {
    die("Connection failed: " . $conn->connect_error);
}


if (isset ($theWord)&& isset($theTable)){
	//$sql="SELECT * FROM homonyms";
	$sql="SELECT * FROM ".$theTable. ' WHERE theWord ="'.$theWord.'"';
	$sqlSearchofImportanceWords="SELECT ofImportanceWords FROM ".$theTable. ' WHERE theWord ="'.$theWord.'"';
	//$wordID="SELECT id FROM ".$theTable. ' WHERE theWord ="'.$theWord.'"';
	//SELECT ofImportanceWords FROM homophones where theWord = "it's";

	//$debugSql="SELECT theDefinition FROM homophones where theWord = "can't";";
	//$sql="SELECT * FROM homonyms WHERE theWord ='".$theWord."'";

	mysql_select_db($dataBaseName);
	$result = mysql_query( $sql, $conn );
	$ofImportanceWordsQuery=mysql_query( $sqlSearchofImportanceWords, $conn );
	//$wordIDQuery=mysql_query( $wordID, $conn );
	#$array = mysql_fetch_row($result);

	while ($row=mysql_fetch_array($ofImportanceWordsQuery, MYSQL_ASSOC)){
		//echo "{$row['theWord']} ::  </br>".
		//": {$row['theDefinition']}  </br>";
		$ofImportanceWords="{$row['ofImportanceWords']}";
		//$theDefiniton=": {$row['theDefinition']}  </br>";
		
	}


	while ($row=mysql_fetch_array($result, MYSQL_ASSOC)){
		//echo "{$row['theWord']} ::  </br>".
		//": {$row['theDefinition']}  </br>";
		$theWordFromDatabase="{$row['theWord']}";
		$theDefiniton=": {$row['theDefinition']}  </br>";
		//This grabs the word ID for debbging
		$wordIDNumber="{$row['id']}";
	}

	//This is to handle words that are uppercase that might exist in lowercase in the database
	if ($theDefiniton==""){
		$sql="SELECT * FROM ".$theTable. ' WHERE theWord ="'.strtolower($theWord).'"';
		$sqlSearchofImportanceWords="SELECT ofImportanceWords FROM ".$theTable. ' WHERE theWord ="'.strtolower($theWord).'"';


		mysql_select_db($dataBaseName);
		$result = mysql_query( $sql, $conn );
		$ofImportanceWordsQuery=mysql_query( $sqlSearchofImportanceWords, $conn );

		while ($row=mysql_fetch_array($ofImportanceWordsQuery, MYSQL_ASSOC)){
			$ofImportanceWords="{$row['ofImportanceWords']}";
		
		}

		while ($row=mysql_fetch_array($result, MYSQL_ASSOC)){
			$theWordFromDatabase="{$row['theWord']}";
			$theDefiniton=": {$row['theDefinition']}  </br>";
			//This grabs the word ID for debbging
			$wordIDNumber="{$row['id']}";
		}

	}


	/*
	while ($row=mysql_fetch_array($wordIDQuery, MYSQL_ASSOC)){
		$wordIDNumber="{$row['ofImportanceWords']}";
		//$theDefiniton=": {$row['theDefinition']}  </br>";
		
	}*/
}

//I must remove the redundant word from the variable ofImportanceWords.
$ofImportanceWordsCleaned=preg_replace("/\b".$theWordFromDatabase."\b/", '', $ofImportanceWords);


//I split the string and add the html for each word.
$ofImportanceWordsSplit = preg_split("/[\s,]+/", $ofImportanceWordsCleaned);

foreach ($ofImportanceWordsSplit as $value){
	//if (strlen($value)!=0){
	if ($value!=""){
		$ofImportanceWordsFinalString="<a class='infoLink".$theTable."SubeMenu' href='#'>".$value."</a>". ", ".$ofImportanceWordsFinalString;
	}	
	//$ofImportanceWordsFinalString=sizeof($ofImportanceWordsSplit)." ".$ofImportanceWordsCleaned;
	//$ofImportanceWordsFinalString=$value."/".$ofImportanceWordsFinalString;
}


//$ofImportanceWordsCleaned=preg_replace("/\byou\b/", '', $ofImportanceWords);
//$ofImportanceWordsCleaned=str_replace($theWordFromDatabase, '', $ofImportanceWords);

//$ofImportanceWordsFinalString= preg_replace("/\bXX\b/", ',', $ofImportanceWordsFinalString);

//echo "<div><div id='mainWord'>".$theWordFromDatabase." ::</div> <div id='theDefiniton'>".'ID: '.$wordIDNumber.' '.$theDefiniton."</div><div id='ofImportanceWords'>::: ".substr($ofImportanceWordsFinalString,0,strlen($ofImportanceWordsFinalString)-2)." :::</div> </div>";

echo "<div><div id='mainWord'>".$theWordFromDatabase." ::</div> <div id='theDefiniton'>".$theDefiniton."</div><div id='ofImportanceWords'>::: ".substr($ofImportanceWordsFinalString,0,strlen($ofImportanceWordsFinalString)-2)." :::</div> </div>";

//echo "<div><div id='mainWord'>".$sql." ::</div> <div id='theDefiniton'>".$theWord."</div><div id='ofImportanceWords'>::: ".substr($ofImportanceWordsFinalString,0,strlen($ofImportanceWordsFinalString)-2)." :::</div> </div>";
//echo $theWord;

#echo json_encode($array);

mysql_close($conn);

//print_r($_POST);

?>
