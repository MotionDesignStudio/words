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

//Search the user inout for diffcult chanracter and replace then so PHP methods will play nice
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

		foreach ($matches[0] as $value){
			if (strlen($value)>0 ){
				$foundWordsArray[]=$value;
			}
		}

	}
} 


//echo preg_replace($findMepatterns, $replaceMe, $theWordCleaned);


//var_dump($foundWordsArray);

/*
print ' cnti : ';
print_r($cnti);
print ' cnt : ';
print_r($cnt);
print ' tmp : ';
print_r($tmp);
print ' $findMepatterns : ';
var_dump($findMepatterns);
print ' $matches : ';
print_r($matches);
print ' $replaceMe : ';
print_r($replaceMe);
*/


foreach ($foundWordsArray as $value){
	//echo $value;
	$replaceMe2="<a href='#' onmouseout = 'this.contentEditable = true;' onclick = 'this.contentEditable = false;' class='infoLink".$theTable."'>".$value.'</a>';
	$theWordCleaned=preg_replace("/\b".$value."\b/", $replaceMe2, $theWordCleaned);
}

//$tmp2=preg_replace("/\bbiweekly\b/", 'XXXX', $text);
echo $theWordCleaned;



fclose($myfile);

?>
