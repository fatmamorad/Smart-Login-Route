var user={
        userName:"",
        email:"",
        password:"",
      }
var Name = document.getElementById("Name");
var Email = document.getElementById("email");
var Password = document.getElementById("password");
if(localStorage.getItem("Users"))
  var UserList=JSON.parse(localStorage.getItem("Users"))
else{
  var UserList=[]
}

if(localStorage.getItem("UserNAme")){
  var UserNAme=(localStorage.getItem("UserNAme"))
  window.open("Home.html")
   document.getElementById("username").innerHTML+=UserNAme
}
else{
  var UserNAme=""
  window.open("index.html")
}
console.log(UserNAme)
function SignIn(){
    var  NameValue=Name.value ;
    var  EmailValue=Email.value ;
    var  PasswordValue=Password.value ;
    var userisexist=false
    var error=validation("Name")|validation("email")|validation("password")
  
  if(validation("Name")&&validation("email")&&validation("password")){
   
    for (var index = 0; index < UserList.length; index++) {
      console.log(UserList[index].email)
    
         if(UserList[index].email===EmailValue){
             userisexist=true;
         }
    }
    if(userisexist){
      console.log(userisexist)
      document.getElementById("loginInfo").innerHTML="User Is Already Exsist"
    }
    else{
      document.getElementById("loginInfo").innerHTML=""
      user={
        userName:NameValue,
        email:EmailValue,
        password:PasswordValue,
      }
      UserList.push(user)
      console.log(UserList)
      localStorage.setItem("Users",JSON.stringify(UserList))
      window.open("Login.html","_self")
    }
  }
  else{
   document.getElementById("loginInfo").innerHTML="InValid Data"
  }
  
}

// ناقص انه يتشك ع الباسورد
function SignUp(){
    var  NameValue="" ;
    var  EmailValue=Email.value ;
    var  PasswordValue=Password.value ;
    var userisexist=false
    for (var index = 0; index < UserList.length; index++) {
      console.log(UserList[index].email)
    
         if(UserList[index].email===EmailValue){
             NameValue=UserList[index].userName
             userisexist=true;
         }
    }
    if(!userisexist){
    
      document.getElementById("loginInfo").innerHTML="User Is Not Already Exsist"
    }
    else{
      document.getElementById("loginInfo").innerHTML=""
  
      localStorage.setItem("UserNAme",NameValue)
      window.open("Home.html","_self")
      document.getElementById("username").innerHTML+=UserNAme
    }
  
}



function validation(id){
  console.log(id)
  var testStrin=document.getElementById(id).value;
  console.log(testStrin)
  regex={
    Name:/^[\w]{3,15}/,
    email:/^[a-zA-Z0-9._%+-]+@gmail\.com$/,
    password:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%#*?&]{8,}$/,
  }
  if(regex[id].test(testStrin)){;
     document.getElementById(`${id}Error`).innerHTML=""
      return true;
  }
  else{
    console.log(`${id}Error`)
     document.getElementById(`${id}Error`).innerHTML=`Invalid ${id}`
    return false
  }

}
function SignOut(){
   localStorage.removeItem("UserNAme")
   window.open("Login.html","_self")
}