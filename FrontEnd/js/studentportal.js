//GET THE DROP DOWN MENU FOR QUESTIONS
function quizchoices(){
	document.getElementById("sendbutton").innerHTML="";
	document.getElementById("quizarea").innerHTML="";
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
				quizbutton.setAttribute("onclick","createquiz(this.id)");
				quizbutton.innerHTML= "QuizID"+quizid;
				quizpara.appendChild(quizbutton);	
			}
				//document.getElementById("questions").innerHTML = finalstring;					
				}
			}
			ajax.open("POST","https://web.njit.edu/~lmm8/getmadequiz.php");
			ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			ajax.send();
}

function createquiz(id){
//alert(id);
document.getElementById("quizchoicebuttons").innerHTML="";
document.getElementById("sendbutton").innerHTML="";
var quizarea =document.getElementById("quizarea");
quizarea.innerHTML="";
var ajax=new XMLHttpRequest();
	ajax.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			var check = this.responseText;
			var qs = JSON.parse(check);
			//alert(check);
			for (var i=0; i<qs.length; i++){
				var answer = document.createElement("textarea");
				answer.setAttribute("rows","10");
				answer.setAttribute("columns","50");
				var quizquestion = qs[i].Question;
				var qid = qs[i].QID;
				answer.type = "text";
				answer.id = "answer"+(i+1);
				var newp= document.createElement("P");
				newp.id=qid;
				quizarea.appendChild(newp);
				newp.append("Question "+(i+1)+ " : "+quizquestion);
				newp.appendChild(answer);	
			}
				var savebutton = document.createElement("button");
				savebutton.id = id;
				//alert(id);
				savebutton.setAttribute("onclick","saveanswers(this.id);");
				savebutton.innerHTML="Save Answers";				
				var sendbutton = document.createElement("button");
				sendbutton.id = id;
				//alert(id);
				sendbutton.setAttribute("onclick","sendanswers(this.id);");
				sendbutton.innerHTML="SEND QUIZ";
				var newp2 = document.createElement("P");
				document.getElementById("sendbutton").appendChild(newp2);
				newp2.appendChild(savebutton);
				newp2.append("-");
				newp2.appendChild(sendbutton);
				//document.getElementById("questions").innerHTML = finalstring;					
				}
			}
			ajax.open("POST","https://web.njit.edu/~lmm8/getquiz.php");
			ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			ajax.send("quizid="+id);

}

function saveanswers(id){
	var ajax=new XMLHttpRequest();
	var answerarray=[];
	ajax.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			document.getElementById("sendbutton").append(" Answers Saved! ");
			var check = this.responseText;
			//alert(check)
			for (var i=1; i<=3; i++){
				var answer = document.getElementById("answer"+i);
				//alert("answer"+i)
				answerarray[i]=answer.value;
				//alert("answerarray "+answerarray[i]);
			}
		}
	}
			ajax.open("POST","https://web.njit.edu/~lmm8/addtakenquiz.php");
			ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			ajax.send("quizid="+id+"&user=lmm8"+"&answer1="+encodeURIComponent(answer1.value)+"&answer2="+encodeURIComponent(answer2.value)+"&answer3="+encodeURIComponent(answer3.value));
}

function sendanswers(id){
	var ajax=new XMLHttpRequest();
	ajax.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			document.getElementById("sendbutton").append(" Answers Sent! ");			
			var check = this.responseText;
			//alert(check);
			}
	}
			ajax.open("POST","https://web.njit.edu/~lmm8/gradingtest.php");
			ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			ajax.send("quizid="+id+"&user=lmm8");

}

function gradedquiz(){
document.getElementById("sendbutton").innerHTML="";
	document.getElementById("quizarea").innerHTML="";
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
			ajax.open("POST","https://web.njit.edu/~lmm8/getgradedquiz.php");
			ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			ajax.send();
}

function showquiz(id){
document.getElementById("sendbutton").innerHTML="";
	document.getElementById("quizarea").innerHTML="";
	var quizpara = document.getElementById("quizchoicebuttons");
	quizpara.innerHTML="";
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
				columns.innerHTML="<td></td><th>Question</th><th>Answer</th><th>Given Points</th><th>Possible \r\nPoints</th><th>Test Cases</th>";
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
				//Add point value and multiply
				var totalposs=Number(pointsanswer1.innerHTML)+Number(pointsanswer2.innerHTML)+Number(pointsanswer3.innerHTML);
				var totalgivenpoints = Number(scoreanswer1.innerHTML)+Number(scoreanswer2.innerHTML)+Number(scoreanswer3.innerHTML);
				var totalsrow = document.createElement("tr")
				totalsrow.innerHTML="<th>TOTALS</th>";
				var arrowtd = document.createElement("td");
				totalsrow.appendChild(arrowtd)
				arrowtd.append("TeacherComment---->");
				var teachercommenttd=document.createElement("td");
				totalsrow.appendChild(teachercommenttd);
				teachercommenttd.append(qs[15].Teacher_Comment);
				var totalgiventd = document.createElement("td");
				totalgiventd.id="totalgivenpoints";
				totalgiventd.append(totalgivenpoints);
				totalsrow.appendChild(totalgiventd);
				tpara.appendChild(totalsrow);
				var totalposstd = document.createElement("td");
				totalposstd.append(totalposs);
				totalsrow.appendChild(totalposstd)
				totalsrow.innerHTML+="<td></td>";
				
				//document.getElementById("questions").innerHTML = finalstring;					
				}
			}
			ajax.open("POST","https://web.njit.edu/~lmm8/getfinalgradedquiz.php");
			ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			ajax.send("quizid="+id);
}
</script>

