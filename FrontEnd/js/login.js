		function id(id){
			return document.getElementById(id);
		}
		function login(form){
			//empty cases.
			if(form.username.value == ""){
				id("note1").textContent="please enter the username";
				form.username.focus();
				return;
			}
			else
				id("note1").textContent="";
			if(form.password.value == ""){
				id("note2").textContent="please enter the password";
				form.password.focus();
				return;
			}
			else
				id("note2").textContent="";
			
			//ajax login check
			var ajax=new XMLHttpRequest();
			ajax.onreadystatechange = function(){
				if(this.readyState == 4 && this.status == 200){
					var check = this.responseText;
					var jdata = JSON.parse(check);
					if(jdata.db_response == "approved"){
						if (jdata.role == "T"){
					window.location.href ="/~lmm8/teacherportal.html";
				}
						else if (jdata.role = "S"){
					window.location.href = "/~lmm8/studentportal.html";
				}
					}
					else if(jdata.db_response == "denied"){
						id("response").textContent="wrong username or password";
						return;
					}
					else{
						id("response").textContent="Error";		
						return;
					}
				}
			}
			ajax.open("POST","https://web.njit.edu/~lmm8/frontendlogin.php");
			ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			ajax.send("user="+form.username.value+"&pass="+form.password.value);
		}
		

