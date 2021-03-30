const container = document.getElementById("container");

const getCrypto= async()=>{
    const URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    const response = await fetch(URL);
    const data = await response.json();
    showCrypto(data);
}

getCrypto();


const showCrypto = async (data)=>{
    let card = document.createElement("div");
    card.classList.add("col-span-12","sm:col-span-6", "md:col-span-3", "mb-4")
    data.map(item=>{
        let change = Math.floor(item.price_change_percentage_24h).toFixed(2);
        let volume = Math.floor(item.market_cap);
        card.innerHTML += `
        <div class="flex flex-row bg-white shadow-xl rounded mb-4 p-4">
            <div class="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
                <img src="${item.image}" alt="">
            </div>
            <div class="flex flex-row items-center justify-between flex-grow ml-4">
                <div class="font-bold text-gray-500 w-8">${item.name}</div>
                <div class="font-bold text-gray-500 w-4">${item.symbol}</div>
                <div class="font-bold text-lg w-4">$${item.current_price}</div>
                <div class="font-bold text-lg w-20">$${volume.toLocaleString()}</div>
                <div id="change" class="font-bold text-lg ${color(change)} ">${change}%</div>
            </div>
        </div>
        `

        container.appendChild(card);
    })
  

}

function color(change){
    if(change<0){
        return "red";
    }
    else{
        return "green"
    }
    
}