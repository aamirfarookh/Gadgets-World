

document.querySelector("#signin").addEventListener("click",function(){
    window.location.href = "userLogin.html"
})
document.querySelector("form").addEventListener("submit",signup);

function signup(event){
    event.preventDefault();
    let username = document.querySelector("#username").value;
    let first_name = document.querySelector("#firstname").value;
    let last_name = document.querySelector("#lastname").value;
    let email = document.querySelector("#email").value;
    let phone_number = document.querySelector("#phonenumber").value;
    let address = document.querySelector("#address").value;
    let pass = document.querySelector("#pass").value;
    
    if(username === ""){
        let wrong = document.querySelector("#username");
        wrong.style.borderBottom ="1px solid red";
    }
    if(first_name === ""){
        let wrong = document.querySelector("#firstname");
        wrong.style.borderBottom ="1px solid red";
    }
    if(last_name === ""){
        let wrong = document.querySelector("#lastname");
        wrong.style.borderBottom ="1px solid red";
    }
    if(email === ""){
        let wrong = document.querySelector("#email");
        wrong.style.borderBottom ="1px solid red";
    }
    if(phone_number === ""){
        let wrong = document.querySelector("#phonenumber");
        wrong.style.borderBottom ="1px solid red";
    }
    if(address === ""){
        let wrong = document.querySelector("#address");
        wrong.style.borderBottom ="1px solid red";
    }
    if(pass === ""){
        let wrong = document.querySelector("#pass");
        wrong.style.borderBottom="thin solid red";
    }
    if(username!="" && first_name!="" && last_name!="" && email!="" && phone_number!="" && address!="" && pass != "" ){

        let obj= {
            username: username,
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone_number: phone_number,
            address: address,
            password: pass,
             
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
            window.location.href = "userLogin.html"
        }).catch((error) =>{
            console.log(error);
        })
        
        
    }
}   