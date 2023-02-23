let baseServerUrl = `http://localhost:8080/`;
let searchForm = document.getElementById("search-form");
let searchInput = document.getElementById("search-input");
let mainSection = document.querySelector(".content");
let userBtn= document.getElementById("user-profile");
let cartBtn = document.getElementById("cart-btn");
let logoutBtn = document.getElementById("logout-btn")
let productsData = [];

// Search bar functionality
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (searchInput.value == "") {
    mainSection.innerHTML = null;
    mainSection.innerHTML = `<div style="width:80vw;"><h1>Please type something to search !!</h1></div>`;
  } else {
    fetchProducts(searchInput.value);
  }
});

// Event listener for user profile btn
userBtn.addEventListener("click",()=>{
    window.location.href = "profile.html"
})

// Event listener for cart btn
 cartBtn.addEventListener("click",()=>{
    window.location.href = "cart.html"
 })

 // Event listener for logout  btn
logoutBtn.addEventListener("click",()=>{
    if(confirm("Are you sure you want to logout?")===true){
        window.location.href= "index.html"
    }
    
})

// function to fetch products from server and render products to DOM
async function fetchProducts(searchInput) {
  try {
    let request = await fetch(`${baseServerUrl}mobiles`);
    let response = await request.json();
    console.log(response);
    productsData = response;
    renderCardList(productsData);
    let filtered = productsData.filter((ele) => {
      if (ele.title.toLowerCase().includes(searchInput.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    });
    if (filtered.length > 0) {
        mainSection.innerHTML = `<div class="lds-facebook"><div></div><div></div><div></div></div>`;
      setTimeout(() => {
        renderCardList(filtered.slice(0, 4));
      }, 3000);

      
    } else {
      mainSection.innerHTML = `<div class="lds-facebook"><div></div><div></div><div></div></div>`;
      setTimeout(() => {
        mainSection.innerHTML = `<div style="width:80vw; margin:auto;"><h1>No items match your search !!</h1></div>`;
      }, 2000);
    }
  } catch (error) {
    console.log(error);
  }
}

// function to make a card for searched item
function card(img, title, brand, price, rating) {
  let card = `<div class="card">
<div class="card-item"><img src ="https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9iaWxlJTIwcGhvbmV8ZW58MHx8MHx8&w=1000&q=80"/></div>
<div class="card-item">
<h2>${title}</h2>
  <h4>${brand}</h4>
  <p><strong>PRICE:</strong> ${price}<p>
  <p><strong>RATING:</strong> ${rating} /5<p>
  <button id="cartBtn">SEE ALL PRODUCTS</button>
</div>
</div>`;
  return card;
}

// function to make card listing 
function renderCardList(data) {
  mainSection.innerHTML = "";
  let cardList = `<div class="card-list">${data
    .map((ele) => {
      return card(
        ele.image,
        ele.title.slice(0, 30),
        ele.brand.toUpperCase(),
        ele.price,
        ele.rating
      );
    })
    .join("")}</div>`;
  mainSection.innerHTML = cardList;
}

