

document.querySelector("#signin").addEventListener("click",function(){
    window.location.href = "userLogin.html"
})
document.querySelector("form").addEventListener("submit",signup);

function signup(event){
    event.preventDefault();
    let name = document.querySelector("#name").value;
    let email = document.querySelector("#email").value;
    let pass = document.querySelector("#pass").value;
    let username = document.querySelector("#username").value;
    if(username === ""){
        let wrong = document.querySelector("#username");
        wrong.style.borderBottom ="1px solid red";
    }
    if(name === ""){
        let wrong = document.querySelector("#name");
        wrong.style.borderBottom ="1px solid red";
    }
    if(email === ""){
        let wrong = document.querySelector("#email");
        wrong.style.borderBottom ="1px solid red";
    }
    if(pass === ""){
        let wrong = document.querySelector("#pass");
        wrong.style.borderBottom="thin solid red";
    }
    if(email!="" && pass != "" && name != "" && username != ""){

        let obj= {
            username: username,
            "full-name": name,
            password: pass,
            email: email,  
        }
        let signupReq = fetch("http://localhost:8080/users",{
            method : "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(obj)
        }).then((res) =>{
            return res.json();
        }).then((data) =>{
            console.log(data);
            alert("You can Sign in now");
            // window.location.href = "userLogin.html";
        }).catch((error) =>{
            console.log(error);
        })
        // let userData = JSON.parse(localStorage.getItem("userDetails")) || [];
        // let obj = {
        //     name : name,
        //     email : email,
        //     password : pass
        // };

        // userData.push(obj);
        // localStorage.setItem("userDetails",JSON.stringify(userData));
        
    }
}   