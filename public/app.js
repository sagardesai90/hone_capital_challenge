//returns a list of top 10 coins
async function getTopMarkets() {
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

async function getTopCoins() {
  try {
    let response = await fetch("https://api.coinranking.com/v1/public/coins");
    let items = await response.json();
    // console.log(items, "items");
    const {
      data: { coins }
    } = items;
    let filterRes = coins.filter(res => res.rank <= 10);
    // console.log(filterRes, "top coins");
    createCoinRow(filterRes);
    chartRender(filterRes);
  } catch (e) {
    console.log(e);
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
    createExchangeRow(filteredRes);
  } catch (e) {
    console.log(e, "e");
    return e;
  }
}

getExchanges();

const createExchangeRow = res => {
  let rows = [];
  for (let i = 0; i < res.length; i++) {
    let row = [];
    let rankRow = `<tr id="table-row"> <td>` + res[i].rank + `</td>`;
    let nameRow = `<td>` + res[i].name + `</td>`;
    let marketShareRow = `<td>` + res[i].marketShare + `</td></tr>`;
    row.push(rankRow);
    row.push(nameRow);
    row.push(marketShareRow);
    rows.push(row);
  }
  for (let i = 0; i < rows.length; i++) {
    document.getElementById("exchange-data").innerHTML += rows[i];
  }
};

const createCoinRow = res => {
  let rows = [];
  for (let i = 0; i < res.length; i++) {
    let row = [];
    let rankRow = `<tr id="table-row"> <td>` + res[i].rank + `</td>`;
    let nameRow = `<td>` + res[i].name + `</td>`;
    let marketShareRow = `<td>` + res[i].price + `</td></tr>`;
    let symbolRow = `<td>` + res[i].symbol + `</td>`;
    row.push(rankRow);
    row.push(symbolRow);
    row.push(nameRow);
    row.push(marketShareRow);
    rows.push(row);
  }
  for (let i = 0; i < rows.length; i++) {
    document.getElementById("coin-data").innerHTML += rows[i];
  }
};

function chartRender(res) {
  var ctx = document.getElementById("graph1");
  console.log(res, "res in chart");
  let labels = [];
  let prices = [];
  for (let i = 0; i < res.length; i++) {
    labels.push(res[i].name);
    prices.push(res[i].price);
  }
  console.log(prices, "prices");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Price",
          data: prices,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
}
getTopMarkets();
getTopCoins();
