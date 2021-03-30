const container = document.getElementById("container");

const getCrypto= async()=>{
    const URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    const response = await fetch(URL);
    const data = await response.json();
    showCrypto(data);
        
    
}

getCrypto();

let card = document.createElement("div");
const showCrypto = async (data)=>{
    
    card.classList.add("col-span-12","sm:col-span-6", "md:col-span-3", "mb-4","sas")
    data.map(item=>{
        let change = Math.floor(item.price_change_percentage_24h).toFixed(2);
        let volume = Math.floor(item.market_cap);
        card.innerHTML += `
        <div class="flex flex-row bg-white shadow-xl rounded mb-4 p-4">
            <div class="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
                <img src="${item.image}" alt="">
            </div>
            <div class="dp flex flex-row items-center justify-between flex-grow ml-4">
                <div class="font-bold text-gray-500 w-8">${item.name}</div>
                <div class="font-bold text-gray-500 w-4">${item.symbol}</div>
                <div class="font-bold text-lg w-4">$${item.current_price.toLocaleString()}</div>
                <div class="font-bold text-lg w-20">$${volume.toLocaleString()}</div>
                <div id="change" class="font-bold text-lg ${color(change)} ">${change}%</div>
            </div>
           
        </div>
        <div class="show none bg-white shadow-xl rounded -mt-5 mb-4 p-4 h-36" >
            <div class="flex ml-16 justify-between flex-row   items-center">
                <div class="high flex flex-col items-center mr-16">
                    <div class="text-lg py-2 border-b text-gray-500">24H High</div>
                    <div class="text-xl font-bold">$${item.high_24h.toLocaleString()} </div>
                </div>
                <div class="low flex flex-col items-center mr-16 ">
                    <div class="text-lg py-2 border-b text-gray-500">24H Low</div>
                    <div class="text-xl font-bold">$${item.low_24h.toLocaleString()} </div>
                </div>
                <div class="market_cap flex flex-col items-center mr-16 ">
                    <div class="text-lg py-2 border-b text-gray-500">Market Rank</div>
                    <div class="text-xl font-bold">${item.market_cap_rank} </div>
                </div>
                <div class="ath flex flex-col items-center mr-16 ">
                    <div class="text-lg py-2 border-b text-gray-500">All Time High</div>
                    <div class="text-xl font-bold">${item.ath.toLocaleString()} </div>
                </div>
                <div class="total_volume flex flex-col items-center mr-16 ">
                    <div class="text-lg py-2 border-b text-gray-500">Trading Volume</div>
                    <div class="text-xl font-bold">$${item.total_volume.toLocaleString()} </div>
                </div>

            </div>
        </div>
        `

        container.appendChild(card);
    })
}

card.addEventListener("click",(e)=>{
    

    if(e.target.classList.contains("dp")){
        e.target.parentElement.nextElementSibling.classList.toggle("block");
    }


    
    
})

function color(change){
    if(change<0){
        return "red";
    }
    else{
        return "green"
    }
    
}