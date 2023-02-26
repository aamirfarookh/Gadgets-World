let baseServerUrl = `http://localhost:8080/`
    let form = document.querySelector("form");
    let usernameInput = document.getElementById("username");
    let passwordInput = document.getElementById("password");
    let formSection = document.querySelector(".form");
    let admin_name = localStorage.getItem("admin-name")

    //function to fetch admin data and authenticate login
    async function fetchAdminData(){
     try {
        let res = await fetch(`${baseServerUrl}admin-data`);
        let data = await res.json();
        data.forEach((admin)=>{
            if(admin.username==usernameInput.value && admin.password==passwordInput.value){
                setInterval(() => {
                    window.location.href="admin_dash.html"
                }, 3000);
                formSection.innerHTML = `<div class="lds-facebook"><div></div><div></div><div></div></div>`;  
               localStorage.setItem("admin-name",admin.fullname)
            
        }
        else{
            setTimeout(() => {
                alert("PLEASE ENTER CORRECT DETAILS")
                window.location.href="admin_login.html"
                }, 4000);

                formSection.innerHTML = `<div class="lds-facebook"><div></div><div></div><div></div></div>`;  
            
        }
        })
     } catch (error) {
        
     }
    }

    // login form submit event listener
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        fetchAdminData()
    })