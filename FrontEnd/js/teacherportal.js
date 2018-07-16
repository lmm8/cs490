
//GET THE DROP DOWN MENU FOR QUESTIONS
function choices(){
	document.getElementById("addquestion").innerHTML = ""
	document.getElementById("questions").innerHTML = ""
	document.getElementById("questionchoicebuttons").innerHTML = ""
	document.getElementById("questionchoice").innerHTML = ""
	document.getElementById("previewtest").innerHTML = ""
	document.getElementById("previewtestbuttons").innerHTML = ""
	var diffstring = '<select id="difficulty">\r\n<option value="all">All</option>\r\n<option value="e">Easy</option>\r\n<option value="m">Medium</option>\r\n<option value="h">Hard</option>\r\n<select> <select id="type">\r\n<option value="all">All</option>\r\n<option value="Conditionals">Conditionals</option>\r\n<option value="Strings">Strings</option>\r\n<option value="Lists">Lists</option>\r\n<select><input id="search" type="text" placeholder="Sort"></input"><button onclick="show()">Show</button>';

	document.getElementById("questionbuttons").innerHTML = diffstring;
}

	function choices2(){
	//alert("inchoices2");
	document.getElementById("addquestion").innerHTML = ""
	document.getElementById("questions").innerHTML = ""
	document.getElementById("questionchoicebuttons").innerHTML = ""
	document.getElementById("questionchoice").innerHTML = ""
	document.getElementById("previewtest").innerHTML = ""
	document.getElementById("questionbuttons").innerHTML = ""
	document.getElementById("previewtestbuttons").innerHTML = ""
	var diffstring = '<select id="difficulty">\r\n<option value="all">All</option>\r\n<option value="e">Easy</option>\r\n<option value="m">Medium</option>\r\n<option value="h">Hard</option>\r\n<select> <select id="type">\r\n<option value="all">All</option>\r\n<option value="Conditionals">Conditionals</option>\r\n<option value="Strings">Strings</option>\r\n<option value="Lists">Lists</option>\r\n<select><input id="search" type="text" placeholder="Sort"></input"> <button onclick="show2()">Show</button>';

	document.getElementById("questionchoicebuttons").innerHTML = diffstring;
}

//get the elements to show the questions
function show(){
	document.getElementById("addquestion").innerHTML = ""
	var diffbox = document.getElementById("difficulty");
	
	var diff=(diffbox.options[diffbox.selectedIndex].value);
	var qtypebox = document.getElementById("type");
	var qtype=(qtypebox.options[qtypebox.selectedIndex].value);
	var searchbar = document.getElementById("search");
	var lookfor = searchbar.value;
	//alert(lookfor);
	qbank(diff,qtype,lookfor);

} 

function show2(){
	//alert("inhere");
	document.getElementById("addquestion").innerHTML = ""
	var diffbox = document.getElementById("difficulty");
	
	var diff=(diffbox.options[diffbox.selectedIndex].value);
	var qtypebox = document.getElementById("type");
	var qtype=(qtypebox.options[qtypebox.selectedIndex].value);
	var searchbar = document.getElementById("search");
	var lookfor = searchbar.value;
	//alert(lookfor);
	qbank2(diff,qtype,lookfor);

} 

//SHOW THE QUESTIONS
function qbank(diff,qtype,lookfor){
	//alert(diff + qtype);
	document.getElementById("questions").innerHTML = ""
	document.getElementById("addquestion").innerHTML = ""
	var ajax=new XMLHttpRequest();
			ajax.onreadystatechange = function(){
				if(this.readyState == 4 && this.status == 200){
					var check = this.responseText;
					var qs = JSON.parse(check);
					var finalstring = "<br>";
					for (var i=0; i<qs.length; i++){
						//var para = document.createElement("P");
						//var t = document.createTextNode(qs[i].Question);
						//para.appendChild(t);
						//para.setAttribute('id','p'+i);
						//document.body.appendChild(para); 
						var question = qs[i].Question
						finalstring = finalstring.concat(question);
						finalstring = finalstring.concat("<br><br>");
					}
				document.getElementById("questions").innerHTML = finalstring;					
				}
			}
			ajax.open("POST","https://web.njit.edu/~lmm8/frontendquestion.php");
			ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			ajax.send("difficulty="+diff+"&type="+qtype+"&search="+lookfor);
}

//sorting for questions
function qbank2(diff,qtype,lookfor){
	//alert(diff + qtype);
	//alert("inqbank2");
  document.getElementById("questionchoice").innerHTML = "";
	document.getElementById("questions").innerHTML = ""
	document.getElementById("addquestion").innerHTML = ""
	var ajax=new XMLHttpRequest();
			ajax.onreadystatechange = function(){
				if(this.readyState == 4 && this.status == 200){
					var check = this.responseText;
					var qs = JSON.parse(check);
					//var finalstring = "<br>";
					for (var i=0; i<qs.length; i++){
						//var para = document.createElement("P");
						//var t = document.createTextNode(qs[i].Question);
						//para.appendChild(t);
						//para.setAttribute('id','p'+i);
						//document.body.appendChild(para); 
						var question = qs[i].Question
						var questionid = qs[i].QID
						//alert(question);
						createchoices(question,questionid);
						//finalstring = finalstring.concat(question);
						//finalstring = finalstring.concat("<br><br>");
					}
				//document.getElementById("questions").innerHTML = finalstring;					
				}
			}
			ajax.open("POST","https://web.njit.edu/~lmm8/frontendquestion.php");
			ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			ajax.send("difficulty="+diff+"&type="+qtype+"&search="+lookfor);
}
//ADD THE CHOICES FOR THE TEST
function createchoices(question,questionid){
//alert(question);
var left = document.getElementById("questionchoice");
var right = document.getElementById("previewtestbuttons");
right.innerHTML="";
//left.innerHTML="";
var checkbox = document.createElement("input")
checkbox.type="checkbox";
checkbox.id= questionid;
checkbox.value=question;
checkbox.setAttribute("onclick","addtotest(this.value,this.id,this.checked)");
var para = document.createElement("P");
left.appendChild(para);
para.appendChild(checkbox);
para.append(question);
var button = document.createElement("button")
	button.setAttribute("onclick","sendquiz()");
	button.innerHTML="Send Quiz";
right.appendChild(button);
right.append(" Total Points : ");
var pointspara= document.createElement("P");
pointspara.id="pointspara";
right.append(pointspara);

}
//SEND QUIZ TO DB
function sendquiz(){
	var para = document.getElementById("previewtest");
	var b=[];
	var qid=[];
	var points1=Number(document.getElementById("points1").value);
	var points2=Number(document.getElementById("points2").value);
	var points3=Number(document.getElementById("points3").value);
	//alert(points1);
	var c = para.children;
		for(var i=0;i<c.length;i++){
		 	b[i] = c[i].children;
			qid[i]=b[i][0].id;
			//alert(qid[i]);
		}
	var ajax=new XMLHttpRequest();
	ajax.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			var check = this.responseText;
			document.getElementById("previewtestbuttons").append("Quiz Added");
		}
				
				//alert(check);					
	}
	ajax.open("POST","https://web.njit.edu/~lmm8/frontendaddquiz.php");
	ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	ajax.send("qid1="+qid[0]+"&qid2="+qid[1]+"&qid3="+qid[2]+"&status=M"+"&points1="+points1+"&points2="+points2+"&points3="+points3);
}

//ADD TO TEST PREVIEW AREA
function addtotest(question,qid,checked){
	var right = document.getElementById("previewtest");
	if(checked == true){
		var para = document.createElement("P");
		para.id="paraq"+String(qid);
		var button = document.createElement("button")
		button.id=qid
		button.setAttribute("onclick","removethis(this.id)");
		button.innerHTML="Remove";
		right.appendChild(para);
		para.appendChild(button);
		para.append(question);
		para.append("\n")
		var pointinput = document.createElement("Input");
		pointinput.id= "points"+String(right.childElementCount);
		//alert(right.childElementCount);
		pointinput.setAttribute("placeholder", "point value");
		pointinput.setAttribute("onchange", "showpoints()");
		para.append(pointinput);
	}	
	else
		removethis(qid);
}

//showpoints
function showpoints(){
	var preview= document.getElementById("pointspara");
	var count = document.getElementById("previewtest").childElementCount;
	preview.innerHTML="";
	var totalvalue=0;
		for (var i=1; i<=count; i+=1){
		var points = document.getElementById("points"+String(i));
		totalvalue = Number(totalvalue) + Number(points.value);
		}
	preview.innerHTML=String(totalvalue);
	}
//LEFT OFF HERE
//REMOVE THE TEST PREVIEW AREA

function removethis(qid){
	//alert(qid);
	var right = document.getElementById("previewtest");
	var paratodelete = document.getElementById("paraq"+String(qid));
	//alert("paraq"+String(qid));
	paratodelete.parentNode.removeChild(paratodelete);
}

//ADD THE QUESTION TEXT AREA
function addquestion(){
	var newline = document.createElement("br");
	document.getElementById("questionbuttons").innerHTML ="";
	document.getElementById("questions").innerHTML = ""
	document.getElementById("addquestion").innerHTML = ""
	document.getElementById("questionchoicebuttons").innerHTML = ""
	document.getElementById("questionchoice").innerHTML = ""
	document.getElementById("previewtest").innerHTML = ""
	document.getElementById("previewtestbuttons").innerHTML = ""
	var addquestionblock = document.getElementById("addquestion");
	addquestionblock.append("Function Name:  ");

	//Create the function name box
	var functioninput = document.createElement('input');
	functioninput.type ='text';
	functioninput.id = "functionname";
	addquestionblock.append(functioninput);
	addquestionblock.appendChild(newline);
	addquestionblock.appendChild(newline);
	
	//ARGUMENTS-----------
	var newp= document.createElement("P");
	addquestionblock.appendChild(newp);
	newp.append("Arguments (up to 4):  ");
	
	//Create the argument select line
	var argumentsselect = document.createElement('select');
	argumentsselect.id ="argumentsselect";
	argumentsselect.setAttribute("onchange","changetext()");
	newp.append(argumentsselect);



	for (var i = 1; i <5; i++) {
    var argoption = document.createElement("option");
    argoption.value = i;
    argoption.text = i;
    argumentsselect.appendChild(argoption);
	}

	//where the arguments texts will go
	var parguments = document.createElement("P");
	parguments.id = "numberofarguments"
	addquestionblock.append(parguments);

	changetext();
	//WHAT DOES IT DO-----------
	var newp6= document.createElement("P");
	addquestionblock.appendChild(newp6);
	newp6.append("The functions purpose (ex:'adds two numbers'):  ");
	var whatitdoes = document.createElement('input');
	whatitdoes.id ="whatitdoes";
	newp6.append(whatitdoes);

	//WHAT DOES IT Return-----------
	var newp8= document.createElement("P");
	addquestionblock.appendChild(newp8);
	newp8.append("What is the name of the variable this return?");
	var returnvariable = document.createElement('input');
	returnvariable.id ="returnvariable";
	newp8.append(returnvariable);
	
	//TEST CASES-----------
	var newp2= document.createElement("P");
	addquestionblock.appendChild(newp2);
	newp2.append("Test Cases (up to 5):  ");

	//test case select
	var testselect = document.createElement('select');
	testselect.id ="testselect";
	testselect.setAttribute("onchange","changetesttext()");
	newp2.appendChild(testselect);

	for (var i = 1; i <=5; i++) {
    var argoption = document.createElement("option");
    argoption.value = i;
    argoption.text = i;
    testselect.appendChild(argoption);
	}

	var targuments = document.createElement("P");
	targuments.id = "numberoftests"
	addquestionblock.appendChild(targuments);


	var table = document.createElement("TABLE");
	table.id = "testtable";
	targuments.appendChild(table);
	changetesttext();

	//DIFFICULTY----------
	var newp3= document.createElement("P");
	addquestionblock.appendChild(newp3);
	newp3.append("Difficulty:  ");

	//test case select
	var diffselect = document.createElement('select');
	diffselect.id ="diffselect";
	newp3.appendChild(diffselect);
	var diffoption1 = document.createElement("option");
	var diffoption2 = document.createElement("option");
	var diffoption3 = document.createElement("option");
    diffoption1.value = "e";
    diffoption1.text = "Easy";
    diffselect.appendChild(diffoption1);
    diffoption2.value = "m";
    diffoption2.text = "Meduim";
    diffselect.appendChild(diffoption2);
    diffoption3.value = "h";
    diffoption3.text = "Hard";
    diffselect.appendChild(diffoption3);

//TYPE-------------
	var newp4= document.createElement("P");
	addquestionblock.appendChild(newp4);
	newp4.append("Type of Question:  ");

	var typeselect = document.createElement('select');
	typeselect.id ="typeselect";
	newp4.appendChild(typeselect);
	var typeoption1 = document.createElement("option");
	var typeoption2 = document.createElement("option");
	var typeoption3 = document.createElement("option");
    typeoption1.value = "Conditionals";
    typeoption1.text = "Conditionals";
    typeselect.appendChild(typeoption1);
    typeoption2.value = "Lists";
    typeoption2.text = "Lists";
    typeselect.appendChild(typeoption2);
    typeoption3.value = "Strings";
    typeoption3.text = "Strings";
    typeselect.appendChild(typeoption3);


	//Preview Question && SendQuestion

	var newp5= document.createElement("P");
	newp5.id="preview";
	addquestionblock.appendChild(newp5);
	newp5.innerHTML='<button onclick="preview()">Preview</button><button onclick="sendquestion()">Send Question</button>';

	var newp7= document.createElement("P");
	newp7.id="qpreview";
	addquestionblock.appendChild(newp7);
}

//show a preview before q is submitted
function preview(){
//write a function named(), uses argumets (), does this(), and returns this()
	document.getElementById("qpreview").innerHTML="";
	var testcasestring=[];
	var argumentstring = "";
	var argumentarray = [];
	var functionname = document.getElementById("functionname").value;
	var argumentnumber= document.getElementById("argumentsselect").value;
	for(var i=0; i<argumentnumber;i++){
		var argument = document.getElementById("string"+i);
		argumentarray[i]= argument.value;
		if(i<argumentnumber-1)
			argumentstring = argumentstring.concat(argumentarray[i]+ ",");
		else
			argumentstring= argumentstring.concat(argumentarray[i]);
	}
	//alert(argumentstring);
	var testcases = document.getElementById("testselect").value;
	var testcasearray = Create2DArray(testcases);
	for(var x=0; x<testcases;x++){
			testcasestring[x]="";
			for(var i=0; i<=argumentnumber;i++){
				var testindex ="tdtext"+String(x)+String(i);
				//alert(testindex);
				var test = document.getElementById(testindex).value;
				//alert(test);
				testcasearray[x][i]= String(test);
				if (i!=testcases)
					testcasestring[x]=testcasestring[x].concat(test+",");
				else
					testcasestring[x]=testcasestring[x].concat(" Output : " +test)
			}		
	}
	var whatitdoes = document.getElementById("whatitdoes").value;
	var returnvariablename = document.getElementById("returnvariable").value;
	var questionstring = "Write a function named " + functionname + ",  that takes arguments("+ argumentstring + "), " + whatitdoes + ", and returns a variable named " + returnvariablename+ ".";
	//alert(questionstring);
	//alert(testcasestring[0]);
	document.getElementById("qpreview").append(questionstring);
}

//SEND QUESTION and all its info to DB
function sendquestion(){
	var testcasestring=[];
	var argumentstring = "";
	var argumentarray = [];
	var difficulty = document.getElementById("diffselect").value;
	var questiontype = document.getElementById("typeselect").value;
	var functionname = document.getElementById("functionname").value;
	var argumentnumber= document.getElementById("argumentsselect").value;
	for(var i=0; i<argumentnumber;i++){
		var argument = document.getElementById("string"+i);
		argumentarray[i]= argument.value;
		if(i<argumentnumber-1)
			argumentstring = argumentstring.concat(argumentarray[i]+ ",");
		else
			argumentstring= argumentstring.concat(argumentarray[i]);
	}
	//alert(argumentstring);
	var testcases = document.getElementById("testselect").value;
	var testcasearray = Create2DArray(testcases);
	for(var x=0; x<testcases;x++){
			testcasestring[x]="";
			for(var i=0; i<=argumentnumber;i++){
				var testindex ="tdtext"+String(x)+String(i);
				var test = document.getElementById(testindex).value;
				testcasearray[x][i]= test;
				if (i<testcases-1)
					testcasestring[x]=testcasestring[x].concat(test+",");
				else if(i<testcases)
					testcasestring[x]=testcasestring[x].concat(test +";");
				else 
				testcasestring[x]=testcasestring[x].concat(test)
			}		
	}
	var whatitdoes = document.getElementById("whatitdoes").value;
	var returnvariablename = document.getElementById("returnvariable").value;
	var questionstring = "Write a function named " + functionname + ",  that takes arguments("+ argumentstring + "), " + whatitdoes + ", and returns a variable named " + returnvariablename+ ".";
	//alert(questionstring);
	//alert(testcasestring[0]);
	//document.getElementById("qpreview").append(questionstring);

var ajax=new XMLHttpRequest();
			ajax.onreadystatechange = function(){
				if(this.readyState == 4 && this.status == 200){
					var check = this.responseText;
					document.getElementById("qpreview").innerHTML="Question Added!";
				}
			}
			ajax.open("POST","https://web.njit.edu/~lmm8/frontendaddquestion.php");
			ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			ajax.send("question="+questionstring+"&function="+functionname+"&arguments="+argumentstring+"&test1="+encodeURIComponent(testcasestring[0])+"&test2="+encodeURIComponent(testcasestring[1])+"&test3="+encodeURIComponent(testcasestring[2])+"&type="+questiontype+"&difficulty="+difficulty);

}

//2DARRAY for the test cases
function Create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}

//change number of text boxes for arguments
function changetext(){
	var parguments = document.getElementById("numberofarguments")
	parguments.innerHTML = "";
	var iargs = (document.getElementById("argumentsselect").value);
	for (var x=0; x <iargs; x++) {
    var argtext = document.createElement("input");
		argtext.id= "string"+x;
    parguments.appendChild(argtext);
	}
}

//Change the test select text
function changetesttext(){
	var targuments = document.getElementById("testtable")
	targuments.innerHTML = "";
	var iargs = document.getElementById("testselect").value;
	var nargs = document.getElementById("argumentsselect").value;
	var title = document.createElement("tr");
	targuments.appendChild(title);
	//creating display for arguments
	for(var y=0; y<=nargs; y++){
			var titletext = document.createElement("td");
    	if(y!=nargs)
				titletext.append("Input");
			else
				titletext.append("Output");
			title.appendChild(titletext);
		}

	for (var x=0; x <iargs; x++) {
    var targtext = document.createElement("tr");
		targtext.id= "testrow"+x
    targuments.appendChild(targtext);
		for(var i=0; i<=nargs; i++){
			var tr= document.getElementById("testrow"+i);
			var tdargtext = document.createElement("td");
			tdargtext.id= "testcolumn"+x+i;
    	targtext.appendChild(tdargtext);
			var tdtext= document.createElement("input");
			tdtext.type = "text";
			tdtext.id= "tdtext"+x+i;
			tdargtext.appendChild(tdtext);
		}
	}
}

//show quiz buttons that were taken
function showtaken(){
	document.getElementById("questionbuttons").innerHTML ="";
	document.getElementById("questions").innerHTML = ""
	document.getElementById("addquestion").innerHTML = ""
	document.getElementById("questionchoicebuttons").innerHTML = ""
	document.getElementById("questionchoice").innerHTML = ""
	document.getElementById("previewtest").innerHTML = ""
	document.getElementById("previewtestbuttons").innerHTML = ""
	var quizpara = document.getElementById("quizchoicebuttons");
	quizpara.innerHTML="";
	var ajax=new XMLHttpRequest();
	ajax.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			var check = this.responseText;
			var qs = JSON.parse(check);
			for (var i=0; i<qs.length; i++){
				var quizbutton = document.createElement("Button");
				var quizid = qs[i].QuizID
				quizbutton.id = quizid;
				quizbutton.setAttribute("onclick","showquiz(this.id)");
				quizbutton.innerHTML= "QuizID"+quizid;
				quizpara.appendChild(quizbutton);	
			}
				//document.getElementById("questions").innerHTML = finalstring;					
				}
			}
			ajax.open("POST","https://web.njit.edu/~lmm8/showtakenquiz.php");
			ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			ajax.send();
}

//Display quiz for test taker
function showquiz(id){
	//clearing
	document.getElementById("questionbuttons").innerHTML ="";
	document.getElementById("questions").innerHTML = ""
	document.getElementById("addquestion").innerHTML = ""
	document.getElementById("questionchoicebuttons").innerHTML = ""
	document.getElementById("questionchoice").innerHTML = ""
	document.getElementById("previewtest").innerHTML = ""
	document.getElementById("previewtestbuttons").innerHTML = ""
	var questions = document.getElementById("questions");	
	var ajax=new XMLHttpRequest();
	ajax.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			var check = this.responseText;
			//alert(check);
			var qs = JSON.parse(check);
			//alert(qs[1]);
				var tpara = document.createElement("Table");
				tpara.setAttribute("border","1");			
				questions.appendChild(tpara);
				var columns = document.createElement("tr");
				columns.innerHTML="<td></td><th>Question</th><th>Answer</th><th>% Correct</th><th>Possible \r\nPoints</th><th>Test Cases</th><th>Given Points</th><th>Adjust Points</th>";
				tpara.appendChild(columns);
				var trtable1 = document.createElement("tr");
				var th1 = document.createElement("th");
				th1.innerHTML="Question 1";
				trtable1.appendChild(th1);
				trtable1.id="Questionrow1";
				tpara.appendChild(trtable1);
				var tdtable1 = document.createElement("td");
				tdtable1.id ="Question1";
				tdtable1.innerHTML="";
				trtable1.appendChild(tdtable1);
				tdtable1.append(qs[0].Question1);
				var tdtableanswer1 = document.createElement("td");
				tdtableanswer1.setAttribute("class","testcase");
				tdtableanswer1.id ="Answercolumn1";
				tdtableanswer1.innerHTML="";
				trtable1.appendChild(tdtableanswer1);
				tdtableanswer1.append(qs[1].Answer1.replace(": ",":\r\n\t"));
				var scoreanswer1 = document.createElement("td");
				scoreanswer1.id ="score1";
				scoreanswer1.innerHTML="";
				trtable1.appendChild(scoreanswer1);
				scoreanswer1.append(qs[2].Score1);
				var pointsanswer1 = document.createElement("td");
				pointsanswer1.id ="points1";
				pointsanswer1.innerHTML="";
				trtable1.appendChild(pointsanswer1);
				pointsanswer1.append(qs[3].Points1);
				var commentanswer1 = document.createElement("td");
				commentanswer1.setAttribute("class","testcase");
				commentanswer1.id ="comment1";
				commentanswer1.innerHTML="";
				trtable1.appendChild(commentanswer1);
				commentanswer1.append(qs[4].Comment1.replace(/~/g,"\r\n"));
				var givenpoints1 = (Number(scoreanswer1.innerHTML)*Number(pointsanswer1.innerHTML))/100;
				var  givenpointstd1 = document.createElement("td");
				givenpointstd1.id="givenpoints1";
				trtable1.appendChild(givenpointstd1);
				givenpointstd1.append(givenpoints1);
				var adjustpoints1 = document.createElement("td");

				var plusbutton1 = document.createElement("button");
				plusbutton1.id=Number(givenpointstd1.innerHTML);
				plusbutton1.setAttribute("onclick", "addq1(this.id)")
				plusbutton1.innerHTML="+";
				adjustpoints1.append(plusbutton1)
				var subbutton1 = document.createElement("button");
				subbutton1.id=Number(givenpointstd1.innerHTML);
				subbutton1.setAttribute("onclick", "subq1(this.id)")
				subbutton1.innerHTML="-";
				adjustpoints1.append(subbutton1)
				trtable1.appendChild(adjustpoints1);
				//Add point value and multiply
				//2nd row
				var trtable2 = document.createElement("tr");
				trtable2.id="Questionrow2";
				var th2 = document.createElement("th");
				th2.innerHTML="Question 2";
				trtable2.appendChild(th2);
				tpara.appendChild(trtable2);
				var tdtable2 = document.createElement("td");
				tdtable2.id ="Question2";
				tdtable2.innerHTML="";
				trtable2.appendChild(tdtable2);
				tdtable2.append(qs[5].Question2);
				var tdtableanswer2 = document.createElement("td");
				tdtableanswer2.setAttribute("class","testcase");
				tdtableanswer2.id ="Answercolumn2";
				tdtableanswer2.innerHTML="";
				trtable2.appendChild(tdtableanswer2);
				tdtableanswer2.append(qs[6].Answer2.replace(": ",":\r\n\t"));
				var scoreanswer2 = document.createElement("td");
				scoreanswer2.id ="score2";
				scoreanswer2.innerHTML="";
				trtable2.appendChild(scoreanswer2);
				scoreanswer2.append(qs[7].Score2);
				var pointsanswer2 = document.createElement("td");
				pointsanswer2.id ="points2";
				pointsanswer2.innerHTML="";
				trtable2.appendChild(pointsanswer2);
				pointsanswer2.append(qs[8].Points2);
				var commentanswer2 = document.createElement("td");
				commentanswer2.setAttribute("class","testcase");
				commentanswer2.id ="comment2";
				commentanswer2.innerHTML="";
				trtable2.appendChild(commentanswer2);
				commentanswer2.append(qs[9].Comment2.replace(/~/g,"\r\n"));
				var givenpoints2 = (Number(scoreanswer2.innerHTML)*Number(pointsanswer2.innerHTML))/100;
				var  givenpointstd2 = document.createElement("td");
				givenpointstd2.id="givenpoints2";
				trtable2.appendChild(givenpointstd2);
				givenpointstd2.append(givenpoints2);
				var adjustpoints2 = document.createElement("td");

				var plusbutton2 = document.createElement("button");
				plusbutton2.id=Number(givenpointstd2.innerHTML);
				plusbutton2.setAttribute("onclick", "addq2(this.id)")
				plusbutton2.innerHTML="+";
				adjustpoints2.append(plusbutton2)
				var subbutton2 = document.createElement("button");
				subbutton2.id=Number(givenpointstd2.innerHTML);
				subbutton2.setAttribute("onclick", "subq2(this.id)")
				subbutton2.innerHTML="-";
				adjustpoints2.append(subbutton2)
				trtable2.appendChild(adjustpoints2);
				//Add point value and multiply
				//Add point value and multiply
				//row3
				var trtable3 = document.createElement("tr");
				trtable3.id="Questionrow3";
				var th3 = document.createElement("th");
				th3.innerHTML="Question 3";
				trtable3.appendChild(th3);
				tpara.appendChild(trtable3);
				var tdtable3 = document.createElement("td");
				tdtable3.id ="Question3";
				tdtable3.innerHTML="";
				trtable3.appendChild(tdtable3);
				tdtable3.append(qs[10].Question3);
				var tdtableanswer3 = document.createElement("td");
				tdtableanswer3.setAttribute("class","testcase");
				tdtableanswer3.id ="Answercolumn3";
				tdtableanswer3.innerHTML="";
				trtable3.appendChild(tdtableanswer3);
				tdtableanswer3.append(qs[11].Answer3.replace(": ",":\r\n\t"));
				var scoreanswer3 = document.createElement("td");
				scoreanswer3.id ="score3";
				scoreanswer3.innerHTML="";
				trtable3.appendChild(scoreanswer3);
				scoreanswer3.append(qs[12].Score3);
				var pointsanswer3 = document.createElement("td");
				pointsanswer3.id ="points3";
				pointsanswer3.innerHTML="";
				trtable3.appendChild(pointsanswer3);
				pointsanswer3.append(qs[13].Points3);
				var commentanswer3 = document.createElement("td");
				commentanswer3.setAttribute("class","testcase");
				commentanswer3.id ="comment3";
				commentanswer3.innerHTML="";
				trtable3.appendChild(commentanswer3);
				commentanswer3.append(qs[14].Comment3.replace(/~/g,"\r\n"));
				var givenpoints3 = (Number(scoreanswer3.innerHTML)*Number(pointsanswer3.innerHTML))/100;
				var  givenpointstd3 = document.createElement("td");
				givenpointstd3.id="givenpoints3";
				trtable3.appendChild(givenpointstd3);
				givenpointstd3.append(givenpoints3);

				var adjustpoints3 = document.createElement("td");

				var plusbutton3 = document.createElement("button");
				plusbutton3.id=Number(givenpointstd3.innerHTML);
				plusbutton3.setAttribute("onclick", "addq3(this.id)")
				plusbutton3.innerHTML="+";
				adjustpoints3.append(plusbutton3)
				var subbutton3 = document.createElement("button");
				subbutton3.id=Number(givenpointstd1.innerHTML);
				subbutton3.setAttribute("onclick", "subq3(this.id)")
				subbutton3.innerHTML="-";
				adjustpoints3.append(subbutton3)
				trtable3.appendChild(adjustpoints3);
				//Add point value and multiply
				//Add point value and multiply
				var totalposs=Number(pointsanswer1.innerHTML)+Number(pointsanswer2.innerHTML)+Number(pointsanswer3.innerHTML);
				var totalgivenpoints = givenpoints1+givenpoints2+givenpoints3;
				var totalsrow = document.createElement("tr")
				totalsrow.innerHTML="<th>TOTALS</th><td></td><td></td><td></td>";
				var totalposstd = document.createElement("td");
				totalposstd.append(totalposs);
				totalsrow.appendChild(totalposstd)
				totalsrow.innerHTML+="<td></td>";
				var totalgiventd = document.createElement("td");
				totalgiventd.id="totalgivenpoints";
				totalgiventd.append(totalgivenpoints);
				totalsrow.appendChild(totalgiventd);
				tpara.appendChild(totalsrow);
				var buttonplace = document.getElementById("sendbutton");
				var button = document.createElement("button");
				button.id=id;
				button.setAttribute("onclick","releasegrades(this.id)");
				button.innerHTML="Release Grade";
				buttonplace.appendChild(button);
				var teachercomment=document.createElement("textarea");
				teachercomment.setAttribute("rows","5");
				teachercomment.setAttribute("cols","50");
				teachercomment.id="teachercomment";				
				questions.appendChild(teachercomment);
				//document.getElementById("questions").innerHTML = finalstring;					
				}
			}
			ajax.open("POST","https://web.njit.edu/~lmm8/frontendgettakenquiz.php");
			ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			ajax.send("quizid="+id);
}

//release test for grading
function releasegrades(id){
	var points1=Number(document.getElementById("givenpoints1").innerHTML);
	var points2=Number(document.getElementById("givenpoints2").innerHTML);
	var points3=Number(document.getElementById("givenpoints3").innerHTML);
	var teachercomment=document.getElementById("teachercomment");
	var totalpoints = points1+points2+points3;
	//alert(teachercomment.value);

	var ajax=new XMLHttpRequest();
			ajax.onreadystatechange = function(){
				if(this.readyState == 4 && this.status == 200){
					var check = this.responseText;
					document.getElementById("sendbutton").append("Quiz Released");
				}
				
				//alert(check);					
			}
			ajax.open("POST","https://web.njit.edu/~lmm8/releasegrades.php");
			ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			ajax.send("quizid="+id+"&points1="+points1+"&points2="+points2+"&points3="+points3+"&grade="+totalpoints+"&teachercomment="+teachercomment.value);
}

//add from score using button
function addq1(score){
	var totalgiven=document.getElementById("totalgivenpoints");
	var buttonnum = document.getElementById(score);
	var thisscore = document.getElementById("givenpoints1");
	var maxposs = Number(document.getElementById("points1").innerHTML);
	var currentscore= Number(thisscore.innerHTML);

if(currentscore < maxposs){
		thisscore.innerHTML=String(currentscore+1);
		buttonnum.id=currentscore+1;
		totalgiven.innerHTML=Number(totalgiven.innerHTML)+1;
	
	}

}

//subtract from score using button
function subq1(score){
	var totalgiven=document.getElementById("totalgivenpoints");
	var buttonnum = document.getElementById(score);
	var thisscore = document.getElementById("givenpoints1");
	var maxposs = Number(document.getElementById("points1").innerHTML);
	var currentscore= Number(thisscore.innerHTML);

	if(currentscore > 0){
		thisscore.innerHTML=String(currentscore-1);
		buttonnum.id=currentscore-1;
		totalgiven.innerHTML=Number(totalgiven.innerHTML)-1;
	}
}

//add from score using button
function addq2(score){
	var totalgiven=document.getElementById("totalgivenpoints");
	var buttonnum = document.getElementById(score);
	var thisscore = document.getElementById("givenpoints2");
	var maxposs = Number(document.getElementById("points2").innerHTML);
	currentscore= Number(thisscore.innerHTML);

	if(currentscore < maxposs){
		thisscore.innerHTML=String(currentscore+1);
		buttonnum.id=currentscore+1;
		totalgiven.innerHTML=Number(totalgiven.innerHTML)+1;
	}
}

//subtract from score using button
function subq2(score){
	var totalgiven=document.getElementById("totalgivenpoints");
	var buttonnum = document.getElementById(score);
	var thisscore = document.getElementById("givenpoints2");
	var maxposs = Number(document.getElementById("points2").innerHTML);
	var currentscore= Number(thisscore.innerHTML);

if(currentscore > 0){
		thisscore.innerHTML=String(currentscore-1);
		buttonnum.id=currentscore-1;
		totalgiven.innerHTML=Number(totalgiven.innerHTML)-1;
	}
}

//add from score using button
function addq3(score){
	var totalgiven=document.getElementById("totalgivenpoints");
	var buttonnum = document.getElementById(score);
	var thisscore = document.getElementById("givenpoints3");
	var maxposs = Number(document.getElementById("points3").innerHTML);
	var currentscore= Number(thisscore.innerHTML);

if(currentscore < maxposs){
		thisscore.innerHTML=String(currentscore+1);
		buttonnum.id=currentscore+1;
		totalgiven.innerHTML=Number(totalgiven.innerHTML)+1;
	}
}

//subtract from score using button
function subq3(score){
	var totalgiven=document.getElementById("totalgivenpoints");
	var buttonnum = document.getElementById(score);
	var thisscore = document.getElementById("givenpoints3");
	var maxposs = Number(document.getElementById("points3").innerHTML);
	var currentscore= Number(thisscore.innerHTML);

	if(currentscore > 0){
		thisscore.innerHTML=String(currentscore-1);
		buttonnum.id=currentscore-1;
		totalgiven.innerHTML=Number(totalgiven.innerHTML)-1;
	}
}
//end javascript

