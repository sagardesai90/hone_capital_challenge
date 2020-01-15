const https = require("https");
const fetch = require("node-fetch");
require("dotenv").config();

//returns a list of top 10 coins
async function getTopCoins() {
  try {
    let response = await fetch("https://api.coinranking.com/v1/public/markets");
    let items = await response.json();
    const {
      data: { markets }
    } = items;
    let filteredRes = markets.filter(res => res.rank < 10);
    // console.log(filteredRes, "filteredRes");
  } catch (e) {
    console.log(e, "e");
    return e;
  }
}

async function getExchanges() {
  try {
    let response = await fetch(
      "https://api.coinranking.com/v1/public/exchanges"
    );
    let topExchanges = await response.json();
    const {
      data: { exchanges }
    } = topExchanges;
    let filteredRes = exchanges.filter(res => res.rank <= 10);
    // console.log(filteredRes, "filteredRes");
    createRow(filteredRes);
  } catch (e) {
    console.log(e, "e");
    return e;
  }
}

getExchanges();

const createRow = res => {
  let rows = [];
  //   console.log(res, "in createRow");
  for (let i = 0; i < res.length; i++) {
    // let newRow = $("<tr>").append($("<td>").text(res[i].name));
    let newRow = `<td class="data-row">` + res[i].name + `</td>`;
    rows.push(newRow);
  }
  console.log(rows, "rows");
  document.getElementById("table-data").innerHTML = newRow[0];
};
getTopCoins();
