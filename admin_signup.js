let baseServerUrl = `http://localhost:8080/`
let form = document.querySelector("form");
let fullnameInput = document.getElementById("full-name");
let usernameInput = document.getElementById("username");
let passwordInput = document.getElementById("password");
let formSection = document.querySelector(".form");

//function to fetch admin data and authenticate login
async function postAdminData(){
 try {
    formSection.innerHTML = `<div class="lds-facebook"><div></div><div></div><div></div></div>`;  
    alert("New admin added successfully to database")
    window.location.href="admin_dash.html"
    let res = await fetch(`${baseServerUrl}admin-data`,{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            username: usernameInput.value,
            fullname: fullnameInput.value,
             password: passwordInput.value
        })
    });
    console.log(res)
   
   
            // setInterval(() => {
            //     
            //     
            // }, 3000); 
        
  
    }
  catch (error) {
    
 }
}


// add admin on form submit
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    postAdminData()
})