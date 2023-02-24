let baseServerUrl = `http://localhost:8080/`
let paymentForm = document.getElementById("payment-form");
let cartData=[]
let orders=[]
// cart total section elements
let totalBill = 0;
let subTotal = document.getElementById("sub-total");
let totalDiv = document.querySelector(".total")
let tax = document.getElementById("tax");
let discount = document.getElementById("discount");
let grandTotal = document.getElementById("grand-total");
let otpPopup = document.querySelector(".otp-popup")
let otp= Math.floor(Math.random()*10000);
let otpConfirmBtn = document.getElementById("confirm-otp-btn");
let otpInput = document.getElementById("otp-input");
let logoutBtn = document.getElementById("logout-btn");
let paymentFormBtn = document.getElementById("payment-btn")



// function to fetch orders of user
// async function fetchOrderData(){
//   try {
//     let res = await fetch(`${baseServerUrl}orders`);
//     let data = await res.json();
//     data.forEach((order)=>{
//         if(order.user_id==1){
//             orders.push(order)
//         }
//     });
//     console.log(orders)
//   } catch (error) {
    
//   }
  
// };
// fetchOrderData()



//function to fetch Cart data
async function fetchCartData(){
    try {
    let res = await fetch(`${baseServerUrl}cart`);
    let data = await res.json(); 
    cartData = data
     totalBill = data.reduce((acc,ele)=>{
    //   orders.push(ele)
        amt = ele.price*ele.quantity;
        return acc + amt
    },0);
    // console.log(orders)
    if(totalBill==0){
      totalDiv.innerHTML = `<h2>YOUR CART IS EMPTY!!</h2>`
      paymentFormBtn.disabled=true;
      
    }else{
      subTotal.textContent = "₹ " + totalBill +"/-";
    tax.textContent = "₹ " + Math.round((totalBill*10)/100) +"/-";
    grandTotal.textContent = "₹ " + (totalBill + Math.round((totalBill*10)/100))+"/-";
    }
    
    } catch (error) {
        
    }
   
   
}



// calling fetchCartData on window load
window.addEventListener("load",()=>{
    fetchCartData()
 
})



// payment Btn functionality
paymentFormBtn.addEventListener("click",(e)=>{
e.preventDefault();
alert(`Your OTP for this transaction is ${otp}`)
setTimeout(() => {
    paymentForm.innerHTML="";
    otpPopup.classList.add("display-visible")
}, 2000);
paymentForm.innerHTML =  `<div class="lds-facebook"><div></div><div></div><div></div></div>`;
for(let i=0;i<cartData.length;i++){
    cartData[i].status="ordered"
    cartData[i].user_id =1
}

for(let i=0;i<cartData.length;i++){
    fetch(`${baseServerUrl}orders`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(cartData[i])

    })
    .then((res)=>{
        console.log(res)
    })
}
})



// Event listener for logout  btn
logoutBtn.addEventListener("click",()=>{
if(confirm("Are you sure you want to logout?")===true){
    window.location.href= "index.html"
}

});



// OTP confirm btn functionality
otpConfirmBtn.addEventListener("click",()=>{

if(otpInput.value==otp){
    setTimeout(() => {
       otpPopup.innerHTML=`<div><h1>Your order has been successfully placed</h1>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxRVMCr-Y1JPd_xh4euyjPZ8FQ4KnENw4uh6VpcjPIXg&s" alt="">
        <a href="dashboard.html">BACK TO HOME</a>
        </div>` 
    }, 1000);
    otpPopup.innerHTML=`<div class="lds-facebook"><div></div><div></div><div></div></div>`; 
    setTimeout(() => {
        for(let i=0;i<cartData.length;i++){
        fetch(`${baseServerUrl}cart/${cartData[i].id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((res)=>{
            console.log(res)
        })
    }
    cartData=[]
    }, 2000);
}
else{
    setTimeout(() => {
       otpPopup.innerHTML=`<h1>OOPS!! You have entered a wrong OTP</h1>` 
    }, 2000);
    otpPopup.innerHTML=`<div class="lds-facebook"><div></div><div></div><div></div></div>`;
}

})