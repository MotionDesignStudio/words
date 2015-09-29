//# means id
//. means class

//homonyms_list_same_spelling_final.txt  homophones_final_union.txt

//This tests sending the words for lookup in the database.
$(document).ready(function(){

	//This initiliazes the tooltips
	$(function() {
    		$( document ).tooltip();
	});


	//Default Message
	var categoryCopy="This web application is intended to help writers understand the distinction among homonyms, homophones, homographs, heteronyms and antagonyms. <div id='homonymsDescription'>hom·o·nym : 1. each of two or more words having the same spelling but different meanings and origins (e.g. pole, light or lay) </div> <div id='homophonesDescription'>ho·mo·phone: each of two or more words having the same pronunciation but different meanings, origins, or spelling, (e.g., new or knew).</div> <div id='homographsDescription'>hom·o·graph: each of two or more words spelled the same but not necessarily pronounced the same and which have different meanings and origins (e.g., bow or august). </div> <div id='heteronymsDescription'>het·er·o·nym: 1. each of two or more words that are spelled identically but have different sounds and meanings, such as tear meaning 'rip' and tear meaning 'liquid from the eye.' 2. each of two or more words that are used to refer to the identical thing in different geographical areas of a speech community, such as candy/sweets, dress/frock, truck/lorry, elevator/lift or pop/soda/soft drink. </div>  <div id='antagonymsDescription'>antagonym: Many words have several definitions, like bill. In some cases, however, those definitions are conflicting. With bill, for example, it refers to a debt in one instance and an asset in another. These are called auto-antonyms. (They are also called 'contronyms,' 'antagonyms,' 'self-antonyms,' 'self-contradicting words,' and 'janus words. (e.g., against, left or bi-weekly)') </div>";

	var theCopyText="..:: TYPE OR PASTE TEXT HERE ::..";
	//var theCopyText="c like e's c's no's";
	var mainWordCopy="Searched Word ::";
	var ofImportanceWordsCopy="Other Words of Importance ::";
	var theDefinitonCopy="Definitions Will Appear Here";

	var aboutCopy='Gaining proficiency in English challenges native speakers and E.S.L. (English as a Second Language) students, alike. It has many subtle rules which have very few predictable patterns as well as words that have overlapping spelling and pronunciation, yet divergent meanings. Some words have opposing sets of meaning.  This makes it difficult to master. This software attempts to assist those interested in improving their knowledge of these subtleties.<br/><br/>This has been a solo project. To improve upon this, the backing of a community of language enthusiasts is needed. The larger a database of words, definitions and examples will add greatly to this project and its usability.<br/><br/>The project&#39;s source can be found here.  < LINK ><br/><br/>If you can augment these categories or discover any errata please contact <div  id="linkNameContact"> <a href="#" class="contactMenu">Lex Peters.</a> </div>';

	var contactCopy='Lex Peters<br/>https://motiondesigntechnology.wordpress.com/';

	//This sets the div containing the copy editable
	document.getElementById("theCopyId").contentEditable='true'; 

	

	$( function() { 
		$(document).on('click', '.infoLinkhomonyms', function(){
			wordToSearchFor=$(this).text();	
			//$('#div_1 , #div_2').html('<img src="ajax-loader.gif" />'); // placeholder
			$('#theDefiniton').html('<div class="centeredPreLoader"><img src="ajax-loader.gif"  height="42" width="42" /> </div>');
			$(".centeredPreLoader").css({left:$('#theDefiniton').width()/2-21, top:$('#theDefiniton').height()/2-21});
			
			$.ajax( {
				url : 'retrieveword.php', // your ajax file
				type : 'post',
				data : {theWord: wordToSearchFor, theTable: "homonyms"},				
				success : function( resp ) {
					$('#mainWord').html($('#mainWord' , resp).html());
					$('#theDefiniton').html($('#theDefiniton' , resp).html());
					$('#ofImportanceWords').html($('#ofImportanceWords' , resp).html());
					//alert("Data: " + data + "\nStatus: " + status);
				}
			}); 
			   return false; 
		});
	});



	$( function() { 
		$(document).on('click', '.infoLinkhomophones', function(){
			wordToSearchFor=$(this).text();	
			//$('#div_1 , #div_2').html('<img src="ajax-loader.gif" />'); // placeholder
			$('#theDefiniton').html('<div class="centeredPreLoader"><img src="ajax-loader.gif"  height="42" width="42" /> </div>');
			$(".centeredPreLoader").css({left:$('#theDefiniton').width()/2-21, top:$('#theDefiniton').height()/2-21});
			$.ajax( {
				url : 'retrieveword.php', // your ajax file
				type : 'post',
				data : {theWord: wordToSearchFor, theTable: "homophones"},				
				success : function( resp ) {
					$('#mainWord').html($('#mainWord' , resp).html());
					$('#theDefiniton').html($('#theDefiniton' , resp).html());
					$('#ofImportanceWords').html($('#ofImportanceWords' , resp).html());
					//alert(resp);
				}
			});
			   return false;
		});
	});


	$( function() { 
		$(document).on('click', '.infoLinkheteronyms', function(){
			wordToSearchFor=$(this).text();	
			//$('#div_1 , #div_2').html('<img src="ajax-loader.gif" />'); // placeholder
			$('#theDefiniton').html('<div class="centeredPreLoader"><img src="ajax-loader.gif"  height="42" width="42" /> </div>');
			$(".centeredPreLoader").css({left:$('#theDefiniton').width()/2-21, top:$('#theDefiniton').height()/2-21});
			$.ajax( {
				url : 'retrieveword.php', // your ajax file
				type : 'post',
				data : {theWord: wordToSearchFor, theTable: "heteronyms"},				
				success : function( resp ) {
					$('#mainWord').html($('#mainWord' , resp).html());
					$('#theDefiniton').html($('#theDefiniton' , resp).html());
					$('#ofImportanceWords').html($('#ofImportanceWords' , resp).html());
					//alert("Data: " + data + "\nStatus: " + status);
				}
			});
			   return false;
		});
	});



	$( function() { 
		$(document).on('click', '.infoLinkantagonyms', function(){
			wordToSearchFor=$(this).text();	
			//$('#div_1 , #div_2').html('<img src="ajax-loader.gif" />'); // placeholder
			$('#theDefiniton').html('<div class="centeredPreLoader"><img src="ajax-loader.gif"  height="42" width="42" /> </div>');
			$(".centeredPreLoader").css({left:$('#theDefiniton').width()/2-21, top:$('#theDefiniton').height()/2-21});
			$.ajax( {
				url : 'retrieveword.php', // your ajax file
				type : 'post',
				data : {theWord: wordToSearchFor, theTable: "antagonyms"},				
				success : function( resp ) {
					$('#mainWord').html($('#mainWord' , resp).html());
					$('#theDefiniton').html($('#theDefiniton' , resp).html());
					$('#ofImportanceWords').html($('#ofImportanceWords' , resp).html());
					//alert("Data: " + data + "\nStatus: " + status);
				}
			});
			   return false;
		});
	});




	$( function() { 
		$(document).on('click', '.infoLinkhomographs', function(){
			wordToSearchFor=$(this).text();	
			//$('#div_1 , #div_2').html('<img src="ajax-loader.gif" />'); // placeholder
			$('#theDefiniton').html('<div class="centeredPreLoader"><img src="ajax-loader.gif"  height="42" width="42" /> </div>');
			$(".centeredPreLoader").css({left:$('#theDefiniton').width()/2-21, top:$('#theDefiniton').height()/2-21});
			$.ajax( {
				url : 'retrieveword.php', // your ajax file
				type : 'post',
				data : {theWord: wordToSearchFor, theTable: "homographs"},				
				success : function( resp ) {
					$('#mainWord').html($('#mainWord' , resp).html());
					$('#theDefiniton').html($('#theDefiniton' , resp).html());
					$('#ofImportanceWords').html($('#ofImportanceWords' , resp).html());
					//alert("Data: " + data + "\nStatus: " + status);
				}
			});
			   return false;
		});
	});



	$( function() { 
		$(document).on('click', '.infoLinkhomophonesSubeMenu', function(){
			wordToSearchFor=$(this).text();	
			//$('#div_1 , #div_2').html('<img src="ajax-loader.gif" />'); // placeholder
			$('#theDefiniton').html('<div class="centeredPreLoader"><img src="ajax-loader.gif"  height="42" width="42" /> </div>');
			$(".centeredPreLoader").css({left:$('#theDefiniton').width()/2-21, top:$('#theDefiniton').height()/2-21});
						
			$.ajax( {
				url : 'ofImportanceWords.php', // your ajax file
				type : 'post',
				data : {theWord: wordToSearchFor, theTable: "homophones"},				
				success : function( resp ) {
					//alert("Data: " + resp );
					$('#theDefiniton').html(resp);
					
				}
			});
			   return false; 
		});
	});


//// Bellow are the main menu choices

	$(function(){
		$(document).on('click', '.homonymsMenu', function(){
			wordToSearchFor=$("#theCopyId").html();
			$("#theDefiniton").html("");
			$("#ofImportanceWords").html("");
			$("#mainWord").html("");

			//This is where you place the loading image
			//$('#theCopyId').html('<img src="ajax-loader.gif" class="centeredPreLoader" height="42" width="42" />');
			//$('#div_1 , #div_2').html('<img src="ajax-loader.gif" />');
			$('#theCopyId').html('<div class="centeredPreLoader"><img src="ajax-loader.gif"  height="42" width="42" /> </div>');
			$(".centeredPreLoader").css({left:$('#theCopyId').width()/2-21, top:$('#theCopyId').height()/2-21});
			
			
			/*
			$("#theCopyId").html("");
			//Load the script for the screen loader			
			$.getScript( "AngleIncidenceReflectionWords.js", function( data, textStatus, jqxhr ) {
			 	console.log( data ); // Data returned
			 	console.log( textStatus ); // Success
			 	console.log( jqxhr.status ); // 200
			 	console.log( "Load was performed." );
			});
			*/			
			
			$.post("searchtext.php",{theWord: wordToSearchFor, theTable: "homonyms", wordListToCheckAgainst:"homonyms_list_same_spelling_final.txt"},
				function(data, status){
       				//alert("Data: " + data + "\nStatus: " + status);
				//$("#theCopyId").html(data);
				//This is client side shenanigans because php would not handle apostrophes properly
				$("#theCopyId").html(removeStrangeCharacters(data));
				$('#theCopyId').find('a').addClass('homonymsLinks');
				resetToDefaultMessage();
   	 		}); 
  		});
	});




	$(function(){
		$(document).on('click', '.homophonesMenu', function(){
			wordToSearchFor=$("#theCopyId").html();
			$("#theDefiniton").html("");
			$("#ofImportanceWords").html("");
			$("#mainWord").html("");
			//$(theCanvas).remove();
   			//alert(wordToSearchFor);
			//This is where you place the loading image
			$('#theCopyId').html('<div class="centeredPreLoader"><img src="ajax-loader.gif"  height="42" width="42" /> </div>');
			$(".centeredPreLoader").css({left:$('#theCopyId').width()/2-21, top:$('#theCopyId').height()/2-21});

			$.post("searchtext.php",{theWord: wordToSearchFor, theTable: "homophones", wordListToCheckAgainst:"homophones_final_union.txt"},
				function(data, status){
				//alert(data);
				//$("#testOutput").html(data);
				//$("#theCopyId").html(data);
				//This is client side shenanigans because php would not handle apostrophes properly
				//$("#theCopyId").html(data.replace(/XZ1/g, "'"));
				$("#theCopyId").html(removeStrangeCharacters(data));
				
				//$("#testOutput").html('');
				$('#theCopyId').find('a').addClass('homophonesLinks');
				resetToDefaultMessage();
   	 		});
  		});
	});


	$(function(){
		$(document).on('click', '.homographsMenu', function(){
			wordToSearchFor=$("#theCopyId").html();
			$("#theDefiniton").html("");
			$("#ofImportanceWords").html("");
			$("#mainWord").html("");
			//This is where you place the loading image
			$('#theCopyId').html('<div class="centeredPreLoader"><img src="ajax-loader.gif"  height="42" width="42" /> </div>');
			$(".centeredPreLoader").css({left:$('#theCopyId').width()/2-21, top:$('#theCopyId').height()/2-21});

			$.post("searchtext.php",{theWord: wordToSearchFor, theTable: "homographs", wordListToCheckAgainst:"homographs_final_no_slash.txt"},
				function(data, status){
				//This is client side shenanigans because php would not handle apostrophes properly
				$("#theCopyId").html(removeStrangeCharacters(data));
				//$("#theCopyId").html(data);
				//$("#testOutput").html(data);
				//$("#testOutput").html('');
				//alert (data);
				$('#theCopyId').find('a').addClass('homographsLinks');
				resetToDefaultMessage();
   	 		});
  		});
	});



	$(function(){
		$(document).on('click', '.heteronymsMenu', function(){
			wordToSearchFor=$("#theCopyId").html();
			$("#theDefiniton").html("");
			$("#ofImportanceWords").html("");
			$("#mainWord").html("");
			//This is where you place the loading image
			$('#theCopyId').html('<div class="centeredPreLoader"><img src="ajax-loader.gif"  height="42" width="42" /> </div>');
			$(".centeredPreLoader").css({left:$('#theCopyId').width()/2-21, top:$('#theCopyId').height()/2-21});

			$.post("searchtext.php",{theWord: wordToSearchFor, theTable: "heteronyms", wordListToCheckAgainst:"heteronym_heterophone_final.txt"},
				function(data, status){
				$("#theCopyId").html(removeStrangeCharacters(data));
				//$("#theCopyId").html(data);
				//$("#testOutput").html("");
				//alert (data);
				$('#theCopyId').find('a').addClass('heteronymsLinks');
				resetToDefaultMessage();
   	 		});
  		});
	});



	$(function(){
		$(document).on('click', '.antagonymsMenu', function(){
			wordToSearchFor=$("#theCopyId").html();
			//$("#theDefiniton a").css('color','white');
			//$( "#theDefiniton" ).css( "color", "green" );
			$("#theDefiniton").html("");
			$("#ofImportanceWords").html("");
			$("#mainWord").html("");
			//This is where you place the loading image
			$('#theCopyId').html('<div class="centeredPreLoader"><img src="ajax-loader.gif"  height="42" width="42" /> </div>');
			$(".centeredPreLoader").css({left:$('#theCopyId').width()/2-21, top:$('#theCopyId').height()/2-21});

			$.post("antagonymsSearchText.php",{theWord: wordToSearchFor, theTable: "antagonyms", wordListToCheckAgainst:"antagonyms_final_2.txt"},
				function(data, status){
				//This is client side shenanigans because php would not handle apostrophes properly
				$("#theCopyId").html(removeStrangeCharacters(data));
				//$("#theCopyId").html(data);
				//$("#testOutput").html(data);
				//alert (data);
				$('#theCopyId').find('a').addClass('antagonymsLinks');
				resetToDefaultMessage();
   	 		});
  		});
	});


	//This checks to make sure the copy box contains a default message and reset everything if the user deletes all the copy
/*
	$( "#theCopyId" ).keyup(function() {
		checkStringLength=$(this).text();
		if (checkStringLength==''){
			$('#theCopyId').hide();
			$('#theCopyId').html(theCopyText).fadeTo(500, 1);
			resetToDefaultMessage();
		}
	});
	*/

	
	//Check if div was clicked and if default message is there it will clear it and set time for 5 seconds before a new message is typed
	$("#theCopyId").click(function(evt){  
	    if(evt.target.tagName == 'DIV' )
		if (document.getElementById('theCopyId').textContent == theCopyText){
			$('#theCopyId').html('');
			setTimeout(function(){timerResetDefaultMessage()},5000);
		}
		
		if (document.getElementById('theCopyId').textContent == ''){
			setTimeout(function(){timerResetDefaultMessage()},5000);
		}
	});

	//This function will reset the main div awaiting copy to the default message if nothing is typed within it.
	function timerResetDefaultMessage (){
		if (document.getElementById('theCopyId').textContent == ''){
			$('#theCopyId').html(theCopyText).fadeTo(500, 1);
		}
	}


	//Begin Top Menu Special Effects
	$( "#homonymsMenuColorBlock" ).mouseover(function() {
		$( "#homonymsMenuContainer" ).show( 500 );
		$('#homophonesMenuContainer').hide(500);
		$('#homographsMenuContainer').hide(500);
		$('#heteronymsMenuContainer').hide(500);
		$('#antagonymsMenuContainer').hide(500);
	});

	$( "#homophonesMenuColorBlock" ).mouseover(function() {
		$( "#homophonesMenuContainer" ).show( 500 );
		$('#homonymsMenuContainer').hide(500);
		$('#homographsMenuContainer').hide(500);
		$('#heteronymsMenuContainer').hide(500);
		$('#antagonymsMenuContainer').hide(500);
	});

	$( "#homographsMenuColorBlock" ).mouseover(function() {
		$( "#homonymsMenuContainer" ).hide( 500 );
		$('#homophonesMenuContainer').hide(500);
		$('#homographsMenuContainer').show(500);
		$('#heteronymsMenuContainer').hide(500);
		$('#antagonymsMenuContainer').hide(500);
	});

	$( "#heteronymsMenuColorBlock" ).mouseover(function() {
		$( "#homonymsMenuContainer" ).hide( 500 );
		$('#homophonesMenuContainer').hide(500);
		$('#homographsMenuContainer').hide(500);
		$('#heteronymsMenuContainer').show(500);
		$('#antagonymsMenuContainer').hide(500);
	});

	$( "#antagonymsMenuColorBlock" ).mouseover(function() {
		$( "#homonymsMenuContainer" ).hide( 500 );
		$('#homophonesMenuContainer').hide(500);
		$('#homographsMenuContainer').hide(500);
		$('#heteronymsMenuContainer').hide(500);
		$('#antagonymsMenuContainer').show(500);
	});




	//Hide main menu choices onload
	$(window).load(function () {
		//Set default messages
		document.getElementById("theCopyId").innerHTML = theCopyText;
		resetToDefaultMessage();
		//Hide the top menu choice onload
		$( "#homonymsMenuContainer" ).hide( 2000 );
		$('#homophonesMenuContainer').hide(3000);
		$('#homographsMenuContainer').hide(4000);
		$('#heteronymsMenuContainer').hide(5000);
		$('#antagonymsMenuContainer').hide(6000);
		$('#theCopyId').height($( window ).height()*.3);
	});


	function resetToDefaultMessage(){
		//document.getElementById("theCopyId").innerHTML = theCopyText;
		document.getElementById("mainWord").innerHTML = mainWordCopy;
		document.getElementById("ofImportanceWords").innerHTML = ofImportanceWordsCopy;
		document.getElementById("theDefiniton").innerHTML = theDefinitonCopy;
   		//$( '#theCopyId' ).draggable().resizable();
		//$('#testOutput').draggable().resizable();
	}

	//This will reset the size of theCopyId to match the orientation of the smart phone
	$(window).on("orientationchange",function(){
		//alert("The orientation has changed!");
		$('#theCopyId').height($( window ).height()*.3);
	}); 

	/*
	$(function()
	{
		//$('#theCopyId').jScrollPane({showArrows: true});
		$('.scroll-pane').jScrollPane();
	});
	*/

	//About Copy
	$( function() { 
		$(document).on('click', '#aboutMenu', function(){
			wordToSearchFor=$(this).text();	
			$('#theCopyId').html(aboutCopy);
			resetToDefaultMessage();
		});
	});

	//Contact Copy
	$( function() { 
		$(document).on('click', '.contactMenu', function(){
			wordToSearchFor=$(this).text();	
			$('#theCopyId').html(contactCopy);
			resetToDefaultMessage();
		});
	});

	//Categories Copy
	$( function() { 
		$(document).on('click', '.categoryMenu', function(){
			wordToSearchFor=$(this).text();	
			$('#theCopyId').html(categoryCopy);
			resetToDefaultMessage();
		});
	});


	var removeStrangeCharactersArray= new Array ('XZ1','XZ2','XZ3','XZ4', 'XZ5');
	var removeStrangeCharactersArrayWith= new Array ("'", 'é', 'è', 'â', '-');
	function removeStrangeCharacters (theString){
		var newStringToReturn=theString;
		for (var i = 0, len = removeStrangeCharactersArray.length; i < len; i++) {
			var re = new RegExp (removeStrangeCharactersArray[i], 'g');
			newStringToReturn=newStringToReturn.replace(re, removeStrangeCharactersArrayWith[i]);
		}
		return newStringToReturn;
	}
	

	/*
	function wordListSelectFunction (){
		var x = document.getElementById("wordListSelect").value;
		alert ("x");
	}
	*/
	

	$( "#wordListSelect" ).change(function() {
		var selectedCategory = document.getElementById("wordListSelect").value;
		var selectedIndexToAvoid= document.getElementById("wordListSelect").selectedIndex;
	  	//alert( y );
		if (selectedIndexToAvoid!=0){
			//alert(selectedCategory);
			//Clear the text field
			$('#theCopyId').html('');
			//Call php and populate the text field with the word in that category 

			
			$.post("retrieveList.php",{wordListToCheckAgainst:selectedCategory},
				function(data, status){
       				//alert("Data: " + data + "\nStatus: " + status);
				$("#theCopyId").html(data);
				//This is client side shenanigans because php would not handle apostrophes properly
				//$("#theCopyId").html(removeStrangeCharacters(data));
				//$('#theCopyId').find('a').addClass('homonymsLinks');
				resetToDefaultMessage();
   	 		}); 
			



		}	
	});
	
	//This loads the help video
	/*	
	$( function() { 
		$(document).on('click', '#helpVideo', function(){
			// placeholder
			$('#theCopyId').html('<div class="centeredPreLoaderVideo"><img src="helpVideos/finalHelp.gif"  height="420" width="380" /> </div>');
			//$(".centeredPreLoader").css({left:$('#theDefiniton').width()/2-21, top:$('#theDefiniton').height()/2-21});
		});
	});

	*/

	/*
	lightbox.option({
      		'resizeDuration': 200,
      		'wrapAround': true
    	})
	*/


});





