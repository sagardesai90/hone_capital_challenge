# Hone Capital Challenge

Make a single page web app that returns a data table with relevant data, along with a graph. Also include the ability to segment the data.

## Tech Stack

- Javascript
- CSS
- Express
- Node
- Chart JS
- Particle JS

## Instructuctions

From root, run: `npm run start` or if using VS Code, run a live server.

## Overall Approach

The first things I wanted to do was select the right data source. I initially selected CoinAPI, but came across a 503 error, indicating serverside issues, so decided to go with another API, the Coinranking API.

I knew I wanted to display both the top coins as well as the top exchanges, so decided to look at the following endpoints to get the appropriate results.

```javascript
let response = await fetch("https://api.coinranking.com/v1/public/coins");

let response = await fetch("https://api.coinranking.com/v1/public/exchanges");
```

To create the appropriate table layout, I used a function called createExchangeRow that took in a list of filtered results.

```javascript
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
```

The createExchangeRow functino takes in the response, loops through the data, and plugs in the data to the table data row, and appends that row to the table. I use this same method to populate the Top Coins table, below.

```javascript
const createCoinRow = res => {
  let rows = [];
  for (let i = 0; i < res.length; i++) {
    let row = [];
    let rankRow = `<tr id="table-row"> <td>` + res[i].rank + `</td>`;
    let nameRow = `<td>` + res[i].name + `</td>`;
    let priceRow = `<td>` + res[i].price + `</td>`;
    let symbolRow = `<td>` + res[i].symbol + `</td>`;
    let changeRow = `<td>` + res[i].change + "%" + `</td></tr>`;
    row.push(rankRow);
    row.push(symbolRow);
    row.push(nameRow);
    row.push(priceRow);
    row.push(changeRow);
    rows.push(row);
  }
  for (let i = 0; i < rows.length; i++) {
    document.getElementById("coin-data").innerHTML += rows[i];
  }
};
```

## Graphs

To render graphs, I used Chart.js, which gives developers the ability to create highly customizable and clean graphs.

### Bar Graph

I created a bar graph to display the top coins in the market, using the barGraph, with the /coins results passed in, below.

```javascript
function barGraph(res) {
  var ctx = document.getElementById("graph1");
  let labels = [];
  let prices = [];
  for (let i = 0; i < res.length; i++) {
    labels.push(res[i].name);
    prices.push(res[i].price);
  }

  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Top 10 Coins",
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
```

### Line Graph

To craft the line graph, I passed data from /coins just like in the bar graph example. That function can be found below.

```javascript
function lineGraph(res) {
  let btc;
  let btcHist;
  if (res) {
    btc = res[0];
    const { history } = btc;
    btcHist = history;
  }
  var ctx = document.getElementById("graph2");
  var myLineChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: btcHist,
      datasets: [
        {
          label: "Price of Bitcoin",
          data: btcHist
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false
            }
          }
        ]
      }
    }
  });
}
```

## Particles Background

I used particles.js to create the background. You can find the code for that in the index.html file on line 62, and in the style.css file under #particles-js and partciles-js canvas.
