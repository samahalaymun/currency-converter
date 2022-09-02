const dropList=document.querySelectorAll(".drop-list select");
const getBtn=document.querySelector("form button");
const fromCurrency=document.querySelector(".from select");
const toCurrency=document.querySelector(".to select");
const exchangeRateDiv=document.querySelector(".exchange-rate");
const exchangeBtn=document.querySelector(".icon");
for (let i = 0; i < dropList.length; i++) {
   
    for(currency_code in country_code){
        let selected;
        if(i == 0){
            selected = currency_code == "USD" ? "selected" :"";
        }else if(i == 1){
            selected = currency_code == "NPR" ? "selected" :"";
        }
        let optionTag=`<option value="${currency_code}"${selected}>${currency_code}</option>`
        dropList[i].insertAdjacentHTML("beforeend",optionTag);
    }
    dropList[i].addEventListener("change",e=>{
        loadFlage(e.target);
    })
    
}

function loadFlage(element){
    for(code in country_code){
        if(code == element.value){
            let imgTag=element.parentElement.querySelector("img");
            let countryCode=country_code[code].toLocaleLowerCase();
            imgTag.src=`https://flagcdn.com/w40/${countryCode}.png`
        }
    }
}
getBtn.addEventListener("click",(e)=>{
  e.preventDefault();
  getExchangeRate()
});
window.addEventListener("load",()=>{
    getExchangeRate()
  });
function getExchangeRate(){
    const amount =document.querySelector(".amount input");
    let amountVal=amount.value;
    if(amountVal == "" || amountVal == "0"){
        amount.value="1";
        amountVal=1;

    }
    console.log(fromCurrency.value)
     let url=`https://v6.exchangerate-api.com/v6/e80ebd34a0f0dc7edcbad199/latest/${fromCurrency.value}`;
     exchangeRateDiv.innerHTML="Getting Exchange Rate ..."
    fetch(url).then(response=>response.json()).then(result=>{
         console.log(result) 
        let exchangeRate=result.conversion_rates[toCurrency.value];
        let exchangeAmount=(exchangeRate * amountVal).toFixed(2);
        exchangeRateDiv.innerHTML=`${amountVal} ${fromCurrency.value} = ${exchangeAmount} ${toCurrency.value}`
        
    }).catch(()=>{
        exchangeRateDiv.innerHTML="Something went wrong ... "
    })

}

exchangeBtn.addEventListener("click",()=>{
    let temp=fromCurrency.value;
    fromCurrency.value=toCurrency.value;
    toCurrency.value=temp;
    loadFlage(fromCurrency)
    loadFlage(toCurrency)
    getExchangeRate()

})

