const url = "https://2024-03-06.currency-api.pages.dev/v1/currencies/";
let dropdown = document.querySelectorAll(".select select");

const btn = document.querySelector("button");
const from=document.querySelector(".from select");
const to=document.querySelector(".to select");
let msg=document.querySelector(".msg-container")


for (let select of dropdown){
    for (code in countryList){
        let newopt= document.createElement("option");
        newopt.innerText = code;
        newopt.value = code;
        select.append(newopt);
        if(select.name==="from" && code==="INR")
            newopt.selected="selected";
        else if(select.name==="to" && code==="USD")
            newopt.selected="selected";
    }
    select.addEventListener("change",(evt)=>{
        update(evt.target);
    })
}

const update=(el)=>{
    currcode = el.value;
    let countrycode = countryList[currcode];
    let new_imgsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = el.parentElement.querySelector("img");
    img.src = new_imgsrc
}

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    exchange_rate();
})

const exchange_rate=async()=>{let amount = document.querySelector("input");
    let amt = amount.value;
    if(amt===""||amt<1){
        amt = 1;
        amount.value = "1";
    }
    const new_url = `${url}/${from.value.toLowerCase()}.json`;
    let response = await fetch(new_url);
    let data = await response.json();
    let final_amt = (data[from.value.toLowerCase()][to.value.toLowerCase()]*parseInt(amt)).toFixed(5);
    msg.innerText = `${amt} ${from.value} = ${final_amt} ${to.value}`
}

window.addEventListener("load",()=>{
    exchange_rate();
}
)