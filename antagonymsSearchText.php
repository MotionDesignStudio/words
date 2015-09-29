<?php
//Developed on PHP Version 5.6.7-1, mysql 5.5.42, Debian Testing
//homonyms_list_same_spelling_final.txt  homophones_final_union.txt

$theWord = $_POST['theWord'];
$wordListToCheckAgainst = $_POST['wordListToCheckAgainst'];
$theTable = $_POST['theTable'];

//$myfile = fopen('del.txt', "r") or die("Unable to open file!");
$myfile = fopen($wordListToCheckAgainst, "r") or die("Unable to open file!");

$matches = array();
$theWordOrWordSOnEachLine=array();
$patternRemoveSlash = '/\\\\/';
$findMepatterns=array();
//$replaceMe=array();

//This remove forward slashes before apostrophe
$theWordCleaned=preg_replace($patternRemoveSlash, '', $theWord);
//Remove the anchor tags
$theWordCleaned=preg_replace('/<\/?a[^>]*>/','',$theWordCleaned);

//Replace Apostophe And Other Characters
$difficulToManageCharacters = array("'", 'é', 'è', 'â', '-');
$difficulToManageCharactersReplaced = array('XZ1','XZ2','XZ3','XZ4', 'XZ5');

//Search the user input for diffcult chanracters and replace them so PHP methods will play nice
//Below is linked to Javascript for final presentation
$theWordCleaned=str_replace($difficulToManageCharacters, $difficulToManageCharactersReplaced, $theWordCleaned);

while(!feof($myfile)) {
	//Place each word in the array
	//$theWordOrWordSOnEachLine[]=trim(fgets($myfile));
	$theWordOrWordSOnEachLine[]=str_replace($difficulToManageCharacters, $difficulToManageCharactersReplaced, trim(fgets($myfile)));
}

$foundWordsArray=array();
$matches=array();

foreach($theWordOrWordSOnEachLine as $val) { 

	if (preg_match_all('/\b'.$val.'\b/i', $theWordCleaned, $matches)){
		//Add found strings if they are longer than 0 in length to the $foundWordsArray
		foreach ($matches[0] as $value){
			if (strlen($value)>0 ){
				$foundWordsArray[]=$value;
			}
		}

		
	}
} 

$singleWordsArray=array();
$multipleWordsArray=array();
//Search for white space
foreach ($foundWordsArray as $value){
	
	if (preg_match('/\s/',$value)) {
		//echo $value. ' | has white space <br/>';
		$multipleWordsArray[]=$value;
	}else{
		//echo $value. ' | has NO white space <br/>';
		$singleWordsArray[]=$value;
	}
}

//Check if the array of single words exist in the larger string and remove the single words from the array
//This is the array that I will use that contains the larger string to build a link.

foreach ($singleWordsArray as $singleWordsArrayValue){
	
	foreach ($multipleWordsArray as $multipleWordsArrayValue){
		if (preg_match("/\b".$singleWordsArrayValue."\b/",$multipleWordsArrayValue)) {

			//echo $singleWordsArrayValue. ' exists in : '. $multipleWordsArrayValue . '<br/>';
			$key = array_search($singleWordsArrayValue,$foundWordsArray);
			if($key!==false){
			    unset($foundWordsArray[$key]);
			}

		}
	}

}

//var_dump($foundWordsArray);


foreach ($foundWordsArray as $value){
	//echo $value;
	$replaceMe2="<a href='#' onmouseout = 'this.contentEditable = true;' onclick = 'this.contentEditable = false;' class='infoLink".$theTable."'>".$value.'</a>';
	$theWordCleaned=preg_replace("/\b".$value."\b/", $replaceMe2, $theWordCleaned);
}

echo $theWordCleaned;


fclose($myfile);

?>
