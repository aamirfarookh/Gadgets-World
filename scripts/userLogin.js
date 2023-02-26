
document.querySelector("#signup").addEventListener("click",function(){
    // event.preventDefault();
    window.location.href = "userSignup.html"
})
document.querySelector("form").addEventListener("submit",signin);

function signin(event){
    event.preventDefault();
    let user_name = document.querySelector("#username").value;
    let pass = document.querySelector("#pass").value;
    if(user_name === ""){
        let wrong = document.querySelector("#username");
        wrong.style.borderBottom ="1px solid red";
    }
    if(pass === ""){
        let wrong = document.querySelector("#pass");
        wrong.style.borderBottom="thin solid red";
    }
    if(user_name != "" && pass != ""){
       
        let login_req = fetch("http://localhost:8080/users")
        .then((res) =>{
            return res.json();
        }).then((data) =>{
            // console.log(data);
            data.forEach((ele) =>{
                if(ele.username == user_name && ele.password == pass){
                    alert("you are successfully logged in");
                   console.log(ele.id)
                    // let userId = localStorage.getItem("user_id") || "";
                    localStorage.setItem("user_id",ele.id);
                    window.location.href = "mainpage.html";
                } else if(ele.username !== user_name && ele.password !== pass){
                    alert("Wrong credentials")
                     window.location.href = "userLogin.html";
                }
            })
            
        }).catch((error) =>{
            console.log(error);
        })
    }
}
    








    