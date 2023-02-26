let baseServerUrl =`http://localhost:8080/`
let admin_name = localStorage.getItem("admin-name");
let adminNameInput = document.getElementById("admin-name");
adminNameInput.innerHTML =`<strong>Welcome, ${admin_name}</strong>`
let tbody = document.querySelector("tbody");
let sortFilter = document.getElementById("price-sort")
let statusFilter = document.getElementById("status-filter");
let searchForm = document.getElementById("search-form");
let searchInput = document.getElementById("search")
let ordersData=[]

async function fetchAllOrders(){
    try {
        let res = await fetch(`${baseServerUrl}orders`);
        let data = await res.json();
        ordersData =data
         renderRows(data)
        
    } catch (error) {
        
    }
}

function makeRow(order_id,user_id,product_name,quantity,price,status){
 let row = `<tr>
<td>${order_id}</td>
<td>${user_id}</td>
<td>${product_name}</td>
<td>${quantity}</td>
<td>${price}</td>
<td>${status}</td>

</tr>`;
return row;
}

function renderRows(data){
let allrows=data.map((order)=>{
return makeRow(order.id,order.user_id,order.name,order.quantity,order.price,order.status.toUpperCase())
}).join("");
tbody.innerHTML=allrows
}


// event listener to fetch and render orders on window load
window.addEventListener("load",()=>{
   fetchAllOrders()
})

// event listener for Sort
sortFilter.addEventListener("change",()=>{
if(sortFilter.value==""){
    fetchAllOrders()
}
else if(sortFilter.value=="asc"){
    let ascSorted = ordersData.sort((a,b)=>a.price-b.price)
    renderRows(ascSorted)
}
else if(sortFilter.value=="desc"){
    let descSorted = ordersData.sort((a,b)=>b.price-a.price)
    renderRows(descSorted)
}

})

// event listener to filter data according to status
statusFilter.addEventListener("change",()=>{
if(statusFilter.value==""){
    fetchAllOrders()
}
else if(statusFilter.value=="ordered"){
    let orderedData = ordersData.filter((order)=>{
        if(order.status=="ordered"){
            return true
        }
        else{
            return false
        }
    })
    renderRows(orderedData)
}
else if(statusFilter.value=="in-transit"){
        let inTransitData = ordersData.filter((order)=>{
            if(order.status=="in-transit"){
                return true
            }
            else{
                return false
            }
        })
        renderRows(inTransitData)


}
else if(statusFilter.value=="delivered"){
    let inTransitData = ordersData.filter((order)=>{
        if(order.status=="delivered"){
            return true
        }
        else{
            return false
        }
    })
    renderRows(inTransitData)
}

})

//searchForm event listener
searchForm.addEventListener("submit",()=>{
    event.preventDefault();
    let searchedData = ordersData.filter((order)=>{
        if(order.name.toLowerCase().includes(searchInput.value.toLowerCase())){
            return true
        }
        else{
            return false
        }
    })
    renderRows(searchedData)
})


