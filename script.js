const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let dropdwon = document.querySelectorAll("#select");
let btn = document.querySelector(".btn");
let formCurr = document.querySelector(".form");
let toCurr = document.querySelector(".to");
let exchange = document.querySelector("#exchange")

for (let i = 0; i < dropdwon.length; i++) {
      //add country list
      for (let corlist in countryList) {
            let newOption = document.createElement("option");
            newOption.innerHTML = corlist;
            newOption.value = corlist;

            if (dropdwon[i].name === "form" && corlist === "USD") {
                  newOption.selected = "selected";
            } else if (dropdwon[i].name === "to" && corlist === "INR") {
                  newOption.selected = "selected";
            }

            dropdwon[i].append(newOption);
      }
      // updataflag
      dropdwon[i].addEventListener("change", (ev) => {
            updataflag(ev.target)
      })
}


let updataflag = (element) => {
      let currntCode = element.value;
      let imgcode = countryList[currntCode];
      let imgSrc = `https://flagsapi.com/${imgcode}/flat/64.png`;
      let selectImg = element.parentElement.querySelector("img");
      selectImg.src = imgSrc;
}

btn.addEventListener("click", async (e) => {
      e.preventDefault();
      let input = document.querySelector("#input")
      let inputValue = input.value
      if (inputValue == "" || inputValue < 1) {
            inputValue = 1;
            input.value = "1";
      }

      let URL = `${BASE_URL}/${formCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

      let respos = await fetch(URL);
      let data = await respos.json();

      let rate = data[toCurr.value.toLowerCase()]
      let finalAmount = input.value * rate;
      exchange.innerHTML = `${inputValue} ${formCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`

});