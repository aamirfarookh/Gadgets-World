    //base Server Url here !!!
    let baseServerUrl = `http://localhost:8080/`;
    //base Server Url here !!!

    let tbody = document.querySelector("tbody");
    let table = document.querySelector(".table");
    let orderSection = document.querySelector(".orders");
    let editBtn = document.getElementById("edit-btn");
    let logoutBtn = document.getElementById("logout-btn");
    let profileImg = document.querySelector(".profile img");
    let ordersData =[]
    // catching edit form elements here
    let editFormSection = document.querySelector(".container");
    let editForm = document.querySelector(".container>form");
    let fnameInput = document.getElementById("fname");
    let lnameInput = document.getElementById("lname");
    let emailInput = document.getElementById("email");
    let imgUrlInput = document.getElementById("img-url");
    let phoneInput = document.getElementById("phone");
    let addressInput = document.getElementById("address");
    // catching edit form elements here

    //catching order-status section elements
	let orderStatusSection = document.querySelector(".order-status");
    let processingDiv = document.querySelector(".order-status>div:nth-child(1)")
	let inTransitDiv = document.querySelector(".order-status>div:nth-child(3)")
	let deliveredDiv = document.querySelector(".order-status>div:nth-child(5)")
	let processingToIntransit = document.querySelector(".order-status>div:nth-child(2)")
	let inTransitToDelivered =document.querySelector(".order-status>div:nth-child(4)")
	let orderNumber;

    //catching elements from profile section
    let profileName = document.getElementById("name-data");
    let profileEmail = document.getElementById("email-data");
    let profilePhone = document.getElementById("phone-data");
    let profileAddress = document.getElementById("address-data");
    //catching elements from profile section

    //function to make row of orders
    function makeRow(status, name, quantity, price) {
		orderNumber = Math.floor(Math.random() * 9999)
      let row = `<tr>
        <td><button class="status-check-btn">Track Status</button></td>
		<td>${orderNumber}</td>
			<td>${name}</td>
				<td>${quantity}</td>
					<td>₹ ${price}</td>
        </tr>`;
      return row;
    }

    //function to render all rows to dom
    function renderRows(data) {
      tbody.innerHTML = "";
      let allRows = data
        .map((ele) => {
          return makeRow(ele.status, ele.name, ele.quantity, ele.price);
        })
        .join("");
      tbody.innerHTML = allRows;
    }

    //function to fetch data from server
    async function fetchorders() {
      try {
        let res = await fetch(`${baseServerUrl}orders`);
        let data = await res.json();
        data.forEach((order)=>{
          if(order.user_id==1){
           ordersData.push(order)
          }
        });
        renderRows(ordersData)
        let statusBtns = document.querySelectorAll(".table button");
        console.log(statusBtns);
        statusBtns.forEach((button,index)=>{
		   button.addEventListener("click",()=>{
			table.innerHTML=""
			orderStatusSection.classList.add("display-flex")
			data.forEach((order,ind)=>{
			if(ind==index){
				if(order.status=="ordered"){
				setInterval(() => {
          processingDiv.style.backgroundColor="orange"
					processingDiv.textContent=`Your order for ${order.name.toUpperCase()} is packed and ready for shipping`
          processingToIntransit.style.backgroundColor="green"
				}, 500);
				}
				
				if(order.status=="in-transit"){
					setInterval(() => {
            processingDiv.style.backgroundColor="orange"
					processingDiv.textContent="Your order has processed and reached reached nearest port"
					processingToIntransit.style.backgroundColor="green"
          processingToIntransit.style.backgroundColor="green"
				}, 1000);
				setInterval(() => {
          inTransitDiv.style.backgroundColor="yellow"
					inTransitDiv.textContent=`Your order for <<${order.name.toUpperCase()}>> will be delivered in next 2 days`
				}, 3000);
				}

				if(order.status=="delivered"){
					setInterval(() => {
            processingDiv.style.backgroundColor="orange"
					processingDiv.textContent="Your order has processed and reached reached nearest port"
					processingToIntransit.style.backgroundColor="green"
				}, 1000);
				setInterval(() => {
          inTransitDiv.style.backgroundColor="yellow"
					inTransitDiv.textContent="Your product has reached it's destination"
					
				},3000);
				setInterval(() => {
          deliveredDiv.style.backgroundColor="green"
					inTransitToDelivered.style.backgroundColor="green"
					deliveredDiv.textContent=`Your order for ${order.name.toUpperCase()} has been delivered`
					
				},5000);



				}
			}
		})
		   })
		})
      } catch (error) {
        console.log(error);
      }
    }

    // calling fetchData and getUserDetails function on window load
    window.addEventListener("load", () => {
      fetchorders();
      getUserDetails();
    });

    // edit profile button event listener
    editBtn.addEventListener("click", () => {
      table.classList.add("display-none");
      editFormSection.classList.add("display-visible");
      window.location.href = "#edit-profile-form";
    });

    //Event listener for edit form and calling postUserData function
    editForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (
        fnameInput.value == "" ||
        lnameInput.value == "" ||
        emailInput.value == "" ||
        imgUrlInput.value == "" ||
        phoneInput.value == "" ||
        addressInput.value == ""
      ) {
        alert("FILL IN ALL THE NECESSARY FEILDS");
      } else {
        postUserData();
      }
    });

    //function for posting data from edit form in server
    async function postUserData() {
      try {
        let res = await fetch(`${baseServerUrl}users/1`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: fnameInput.value,
            last_name: lnameInput.value,
            email: emailInput.value,
            avatar: imgUrlInput.value,
            phone_number: phoneInput.value,
            address: addressInput.value,
          }),
        });
        if (res.ok) {
          alert("DATA SAVED SUCCESSFULLY");
        } else {
          alert(res.message);
        }
      } catch (error) {
        alert(`This Website says:- ${error}`);
      }
    }

    // fetching details of users and rendering them on profile section and form section
    async function getUserDetails() {
      try {
        let res = await fetch(`${baseServerUrl}users/1`);
        let data = await res.json();
        profileImg.src = data.avatar;
        fnameInput.value = data.first_name;
        lnameInput.value = data.last_name;
        emailInput.value = data.email;
        phoneInput.value = data.phone_number;
        addressInput.value = data.address;
        profileName.textContent = `${data.first_name} ${data.last_name}`;
        profileEmail.textContent = data.email;
        profilePhone.textContent = data.phone_number;
        profileAddress.textContent = data.address;
      } catch (error) {}
    }
  
// Logout functionality
 // Event listener for logout  btn
 logoutBtn.addEventListener("click",()=>{
  if(confirm("Are you sure you want to logout?")===true){
      window.location.href= "index.html"
  }
  
});

