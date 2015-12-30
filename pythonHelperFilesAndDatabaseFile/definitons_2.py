#!/usr/bin/env python3.4

import mysql.connector
from mysql.connector import errorcode

import random
from socket import timeout
import subprocess 
import re
import urllib.request
from bs4 import BeautifulSoup


#Begin Create Database Connection
try:
	cnx = mysql.connector.connect(user='root', password='', host='127.0.0.1', database='words')
	cursor = cnx.cursor()
except mysql.connector.Error as err:
	if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
		print("Something is wrong with your user name or password")
	elif err.errno == errorcode.ER_BAD_DB_ERROR:
		print("Database does not exist")
	else:
		print("WWWTTTFF ",err)
#End Create Database Connection

#This variable stores the word type for the 5th column in the database
#The function insertWordsIntoTheDatabase uses this global variable.
wordType="homographs"

#Insert new words into the databse
def insertWordsIntoTheDatabase(theWord, theDefinition, ofImportanceWords, dictionaryResource):
	#tmp="NULL"
	data = ("NULL", theWord, theDefinition, ofImportanceWords, wordType, dictionaryResource)
	addAWardToTheDatabase = ("INSERT INTO `"+wordType+"`"
				"(`id`,`theWord`,`theDefinition`,`ofImportanceWords`,`wordType`,`dictionaryResource`)"
				"VALUES (%s, %s, %s, %s, %s, %s)")
				#"VALUES (NULL, '"+theWord+"' ,'"+  theDefinition+"' , '"+ofImportanceWords+"', '"+wordType+"') ")
	cursor.execute(addAWardToTheDatabase, data)


#These are the files that store the words I need to add to the database.
#file = open ("homonyms_list_same_spelling_final.txt")
#file = open ("homophones_final_union.txt")
#file = open ("homographs_final_no_slash.txt")
#file = open ("heteronyms_heterophone_final.txt")
#file = open ("antagonyms_final_2.txt")


file = open ("s.txt")

u1="Mozilla/5.0 (X11; Linux x86_64; rv:36.0) Gecko/20100101 Firefox/36.0 Iceweasel/36.0.1"
u2="Mozilla/5.0 (Windows NT 6.1; WOW64; rv:36.0) Gecko/20100101 Firefox/36.0"
u3="Mozilla/5.0 (Windows NT 6.3; rv:36.0) Gecko/20100101 Firefox/36.0"
u4="Mozilla/5.0 (X11; Linux x86_64; rv:17.0) Gecko/20121202 Firefox/17.0 Iceweasel/17.0.1"
u5="Mozilla/5.0 (Windows; U; MSIE 9.0; Windows NT 9.0; en-US)"
u6="Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko"
u7="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A"

#These are strings I would like to remove from my output
thingsToRemoveFromDictionary= re.compile('(\[1913 Webster\]|-->.*)')
replaceApostropheFromDictionary= re.compile('&apos;')
#replaceNewlineFromDictionary= re.compile('&apos;')

#This list stores all the words that were not found in the dictionaries.
failedWordList=[]


listToCheckAgainst=[]
#with open('homophones_compare_against.txt') as inputfile:
with open('emptyTextFile.txt') as inputfile:
    for line in inputfile:
        listToCheckAgainst.append(line.strip().split('\\n'))


def checkIfWordsHaveRelevantPartner (checkThisWord):
	#print("checkIfWordsHaveRelevantPartner :: " + checkThisWord)
	for theword in listToCheckAgainst:
		if re.search('\\b'+checkThisWord.strip()+'\\b', theword[0]):
			#print ("checkThisWord :", checkThisWord.strip())
			print (checkThisWord.strip()," :: ", theword[0])
			#print("checkIfWordsHaveRelevantPartner listToCheckAgainst :: " + checkThisWord)
			return (theword[0])
			break
		#else:
		#	return ("")
			
#print (listToCheckAgainst)


def lastDitchEffortLocallyToFIndWord(whatIsThisWord):
	theDefinitionForDatabase=""
	#tmp=subprocess.Popen(['sdcv', '-n', '-0', '-1', '-u', 'The Collaborative International Dictionary of English v.0.44', whatIsThisWord.strip()], stdout=subprocess.PIPE)
	#tmp=subprocess.Popen(['sdcv', '-n', '-0', '-1', '-u', 'Webster Revised Unabridged Dictionary (1913)', whatIsThisWord.strip()], stdout=subprocess.PIPE)
	tmp=subprocess.Popen(['sdcv', '-n', '-0', '-1', '-u', 'WordNet (r) 1.7', whatIsThisWord.strip()], stdout=subprocess.PIPE)
	(out, err) = tmp.communicate()
	slicetmp=str(out).split('\\n')
	check_1st_line_output=slicetmp[0:1][0]
	theDictionaryResource= slicetmp[1][3:]
	if "Found 1 items" in check_1st_line_output:
		checkIfWordsHaveRelevantPartner (whatIsThisWord)
		#print ("//x Webster Revised Unabridged Dictionary (1913)/ "+whatIsThisWord, end="/n")
		slicetmp=slicetmp[5:len(slicetmp)-2]
		for line in slicetmp:
			#pass
			#cleanOutput=re.
			#print (line.replace("&apos;", "'").strip())
			#print (replaceApostropheFromDictionary.sub("'" ,thingsToRemoveFromDictionary.sub ('', line)))
			cleanOutput= replaceApostropheFromDictionary.sub("'", line)
			cleanOutput= thingsToRemoveFromDictionary.sub("", cleanOutput)
			theDefinitionForDatabase=theDefinitionForDatabase+cleanOutput+'<br/>'
		insertWordsIntoTheDatabase (whatIsThisWord.strip(), theDefinitionForDatabase, checkIfWordsHaveRelevantPartner(whatIsThisWord), theDictionaryResource)
		theDefinitionForDatabase=''
	else:#This will check all the dictionaries
		tmp=subprocess.Popen(['sdcv', '-n', '-0', '-1', whatIsThisWord.strip()], stdout=subprocess.PIPE)
		(out, err) = tmp.communicate()
		slicetmp=str(out).split('\\n')
		check_1st_line_output=slicetmp[0:1][0]
		theDictionaryResource= slicetmp[1][3:]
		#print ("check_1st_line_output : ", check_1st_line_output)

		if "Found 1 items" in check_1st_line_output:
			checkIfWordsHaveRelevantPartner (whatIsThisWord)
			#print ("//x All Dictionaries Limit 1/ "+whatIsThisWord, end="/n")
			#print (theDictionaryResource + "1")
			slicetmp=slicetmp[5:len(slicetmp)-2]
			for line in slicetmp:
				cleanOutput= replaceApostropheFromDictionary.sub("'", line)
				cleanOutput= thingsToRemoveFromDictionary.sub("", cleanOutput)
				theDefinitionForDatabase=theDefinitionForDatabase+cleanOutput+'<br/>'
			insertWordsIntoTheDatabase (whatIsThisWord.strip(), theDefinitionForDatabase, checkIfWordsHaveRelevantPartner(whatIsThisWord), theDictionaryResource)
			theDefinitionForDatabase=''
		elif "Found 2 items" in check_1st_line_output:
			checkIfWordsHaveRelevantPartner (whatIsThisWord)
			#print ("//x All Dictionaries Limit 2/ "+whatIsThisWord, end="/n")
			#print (theDictionaryResource + "2")
			slicetmp=slicetmp[5:len(slicetmp)-2]
			for line in slicetmp:
				cleanOutput= replaceApostropheFromDictionary.sub("'", line)
				cleanOutput= thingsToRemoveFromDictionary.sub("", cleanOutput)
				theDefinitionForDatabase=theDefinitionForDatabase+cleanOutput+'<br/>'
			insertWordsIntoTheDatabase (whatIsThisWord.strip(), theDefinitionForDatabase, checkIfWordsHaveRelevantPartner(whatIsThisWord), theDictionaryResource)
			theDefinitionForDatabase=''
		else:
			failedWordList.append(whatIsThisWord.strip())
			

def startSearch():
	theDefinitionForDatabase=""
	for theword in file.readlines():
		if "'" in theword:#If it has an apostrophe searech Oxford dictionary
			tmp=subprocess.Popen(['sdcv', '-n', '-0', '-1', '-u', 'Oxford (En)', theword.strip()], stdout=subprocess.PIPE)
			(out, err) = tmp.communicate()
			slicetmp=str(out).split('\\n')
			check_1st_line_output=slicetmp[0:1][0]
			theDictionaryResource= slicetmp[1][3:]
			if "Found 1 items" in check_1st_line_output:
				#Search for relevant word if it applies
				checkIfWordsHaveRelevantPartner (theword)
				#print ("//x/ Oxford "+theword, end="/n")
			#I check to make sure I only receive one dictionary entry for the word		
				slicetmp=slicetmp[5:len(slicetmp)-2]
				for line in slicetmp:							
					cleanOutput= replaceApostropheFromDictionary.sub("'", line)
					cleanOutput= thingsToRemoveFromDictionary.sub("", cleanOutput)
					theDefinitionForDatabase=theDefinitionForDatabase+cleanOutput+'<br/>'
				insertWordsIntoTheDatabase (theword.strip(), theDefinitionForDatabase, checkIfWordsHaveRelevantPartner(theword), theDictionaryResource)
				theDefinitionForDatabase=''
			else:
				#print ("Failed : ", theword)
				#failedWordList.append(theword.strip())
				lastDitchEffortLocallyToFIndWord(theword.strip())
		else:
			#print (theword)	
			#tmp=subprocess.Popen(['sdcv', '-n', '-0', '-1', '-u', 'WordNet (r) 1.7', theword.strip()], stdout=subprocess.PIPE)
			tmp=subprocess.Popen(['sdcv', '-n', '-0', '-1', '-u', 'Webster Revised Unabridged Dictionary (1913)', theword.strip()], stdout=subprocess.PIPE)
			(out, err) = tmp.communicate()
			slicetmp=str(out).split('\\n')
			check_1st_line_output=slicetmp[0:1][0]
			theDictionaryResource= slicetmp[1][3:]
			if "Found 1 items" in check_1st_line_output:
				#Search for relevant word if it applies
				#checkIfWordsHaveRelevantPartner (theword)
				#print ("//x/ WordNet "+theword, end="/n")
			#I check to make sure I only receive one dictionary entry for the word		
				slicetmp=slicetmp[6:len(slicetmp)-2]
				for line in slicetmp:
					cleanOutput= replaceApostropheFromDictionary.sub("'", line)
					cleanOutput= thingsToRemoveFromDictionary.sub("", cleanOutput)
					#print (line.replace("&apos;", "'").strip())
					theDefinitionForDatabase=theDefinitionForDatabase+cleanOutput+'<br/>'
				insertWordsIntoTheDatabase (theword.strip(), theDefinitionForDatabase, checkIfWordsHaveRelevantPartner(theword), theDictionaryResource)
				theDefinitionForDatabase=''
			else:
				lastDitchEffortLocallyToFIndWord(theword.strip())



#homonymsFinalFailedList=['monopole']

#homophonesFinalFailedList=["b's", "c's", 'eave', "e's", "Fay's", "Gay's", "hay's", 'Hugh', "Jean's", 'Jim', 'Kay', "Lew's", 'Lou', "Lou's", "May's", 'meatier', 'Mrs.']

#homophonesFinalFailedList2=["no's", 'pearish', 'Phil', 'Pilate', "p's", "q's", 'quai', "Ray's", 'razer', "there's", 'Titon', "t's", "u's", 'vittle', "where's", "who's"]

#homophonesFinalFailedList4=["Ray's", 'razer', "there's", 'Titon', "t's", "u's", 'vittle', "where's", "who's"]

#homophonesFinalFailedListManuallyEnter=['quai', 'Titon']

#homographsFinalFailedList=['attachés', 'chargé', 'chargés', 'exposés', 'housewives', 'Liège', 'lip-read', 'pâté', 'rosé']

#heteronymsFinalFailedList=['epicrisis']

#antagonymsFinalFailedList=['all downhill from here', 'burned up', 'copemate', 'could care less', 'slim chance', 'fought with', "here's an interesting phrasing", 'like never before', 'restrict access to', 'steep learning curve', 'tell me about it', 'to disallow access to', 'watch out for']

#antagonymsFinalFailedList_2=['copemate', 'fought with', "here's an interesting phrasing", 'like never before', 'restrict access to', 'steep learning curve', 'to disallow access to']



#wordsfinalFailedList=["b's", "c's", 'eave', "e's", "Fay's"]


replaceBlanlkSpaceWithPlus= re.compile(' ')


def checkIdiomsTheFreedictionary(listtocheck):
	for i in listtocheck:
		url='http://idioms.thefreedictionary.com/'+replaceBlanlkSpaceWithPlus.sub("+", i)

		#req = urllib.request.Request(url, data=None, headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36'} )

		req = urllib.request.Request(url, data=None, headers={'User-Agent':"u"+str(random.randrange(0,8))} )

		response = urllib.request.urlopen(url)
		the_page = BeautifulSoup(response)
		#print (the_page.prettify(), end="---\n")
		tmp=the_page.find(id="Definition").get_text('\n')
		if "Phrase not found" in tmp:
			failedWordList.append(i)
		elif "Word not found" in tmp:
			failedWordList.append(i)
		elif "not available in the Idioms" in tmp:
			failedWordList.append(i)
		else:
			#print (i)
			#pass
			#print ("\n--"+i+"--\n", end =tmp )
			#print (tmp, end= "\n--"+i+"--\n")
			#print (tmp)
			insertWordsIntoTheDatabase (i, tmp, checkIfWordsHaveRelevantPartner(i), 'http://idioms.thefreedictionary.com/')
			#insertWordsIntoTheDatabase (i.strip(), tmp, checkIfWordsHaveRelevantPartner(i), theDictionaryResource)
		


def checkWordsTheFreedictionary(listtocheck):
	theDefinitionForDatabase=""
	check4Numbers= re.compile('([1-9]\.)')
	for i in listtocheck:
		url='http://thefreedictionary.com/'+replaceBlanlkSpaceWithPlus.sub("+", i)

		#req = urllib.request.Request(url, data=None, headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36'} )

		req = urllib.request.Request(url, data=None, headers={'User-Agent':"u"+str(random.randrange(0,8))} )


		response = urllib.request.urlopen(req)
		the_page = BeautifulSoup(response)

		if 'id="Definition"' in the_page.prettify():
			#print ("//x/ thefreedictionary.com "+i, end="\n")
			tmp=the_page.find(id="Definition").get_text('\n')
			#print ("\n--"+i+"--\n", end =tmp )
				#print (tmp, end= "\n--"+i+"--\n")
			tmp2=tmp.split("\n")
			#print (tmp2)
			""" 
			print (tmp2)
			for line in tmp2:
				if line !="":	
					pass		
					#print (line)
			"""			
			
			hm = [elem for elem in tmp2 if elem not in ("", " ") ]

			counter=0
			while counter < len(hm):
				if not re.search(check4Numbers, hm[counter]) and len(hm[counter]) >3 :
					#print (hm[counter])
					#theDefinitionForDatabase=theDefinitionForDatabase+hm[counter]+'<br/>'
					theDefinitionForDatabase=theDefinitionForDatabase+hm[counter]+'\n'
		
				if re.search(check4Numbers, hm[counter]):
					#print (hm[counter], hm[counter+1])
					#theDefinitionForDatabase=theDefinitionForDatabase+hm[counter]+'<br/>'
					theDefinitionForDatabase=theDefinitionForDatabase+hm[counter]+'\n'
					counter=counter+1
				counter=counter+1
			print ( "\n--"+i+"--\n", end= theDefinitionForDatabase)
			theDefinitionForDatabase=''
			
		else:
			failedWordList.append(i)


replaceApostropheWithPlus= re.compile("'")
thingsToRemoveFromDictionaryDotCom= re.compile('(IPA|Syllables|Cite This Source|Dictionary\.com.*)')

def checkDictionaryDotCom(listtocheck):
	theDefinitionForDatabase=""
	for i in listtocheck:
		url='http://dictionary.reference.com/browse/'+replaceApostropheWithPlus.sub("%27", i)+"?s=t"

		#req = urllib.request.Request(url, data=None, headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36'} )

		req = urllib.request.Request(url, data=None, headers={'User-Agent':"u"+str(random.randrange(0,8))} )

		response = urllib.request.urlopen(req)
		the_page = BeautifulSoup(response)

		if re.search("Did you mean", the_page.get_text()):
			failedWordList.append(i)
		else:
			#print ("//x/ dictionary.reference.com "+i, end="\n")
			tmp=the_page.find(id="source-luna").get_text()
			tmp2=thingsToRemoveFromDictionaryDotCom.sub("", tmp).split("\n") 
			#print ("-\-"+i+"--\n" )
			for line in tmp2:
				if line !="":	
					#pass		
					#print (line)
					theDefinitionForDatabase=theDefinitionForDatabase+line+'<br/>'
					#theDefinitionForDatabase=theDefinitionForDatabase+line+'\n'
			#print ( "\n--"+i+"--\n", end= theDefinitionForDatabase)
			insertWordsIntoTheDatabase (i.strip(), theDefinitionForDatabase, checkIfWordsHaveRelevantPartner(i), 'http://dictionary.reference.com')
			theDefinitionForDatabase=""



#file = open ("homophones_US_final.txt")




#checkIfWordsHaveRelevantPartner ("add", "homophones103_2.txt")

#startSearch()
#print (len(failedWordList), " >> ", failedWordList)

#checkDictionaryDotCom(homographsFinalFailedList)
#checkWordsTheFreedictionary(wordsfinalFailedList)

#checkIdiomsTheFreedictionary(antagonymsFinalFailedList)
#checkIdiomsTheFreedictionary(wordsfinalFailedList)


print ("failedWordList Length : ", len (failedWordList), " failedWordList : ", failedWordList)
#checkDictionaryDotCom(wordsfinalFailedList)

#addAWardToTheDatabase = ("INSERT INTO `homonyms` (`id`,`theWord`,`theDefinition`,`ofImportanceWords`,`wordType`) VALUES (NULL, ' test' ,  'a definition' , 'tetz, tezzz', 'homonym') ")







#insertWordsIntoTheDatabase ('testvariable', 'a def', 'tetz')

#Close database connection
cnx.close()


