const symbol = 'btcusdt'

function init() {
  createCircle('price')
  createCircle('spread')
}

function createCircle(id) {
  const prototype = document.getElementsByClassName('prototype_19')[0]
  const circle = document.createElement('div')
  circle.classList.add('circle')
  circle.id = id
  prototype.appendChild(circle)
}

function changeCircleSize(number, id) {
  const circle = document.getElementById(id)
  circle.style.width = number + 'px'
  circle.style.height = number + 'px'
}

function convertPriceToPixels(price) {
  return price / 100
}

function convertSpreadToPixels(spread) {
  // 0.010000000002037268
  // 1.4499999999970896
  // 0.01*500 = 5
  // 1.44*500 = 720
  return spread * 500
  // return Math.floor(spread * 200)
}

document.addEventListener('DOMContentLoaded', () => {
  init()

  // https://binance-docs.github.io/apidocs/spot/en/#aggregate-trade-streams
  //
  // {
  //   e: 'aggTrade', // Event type
  //   E: 123456789, // Event time
  //   s: 'BNBBTC', // Symbol
  //   a: 12345, // Aggregate trade ID
  //   p: '0.001', // Price
  //   q: '100', // Quantity
  //   f: 100, // First trade ID
  //   l: 105, // Last trade ID
  //   T: 123456785, // Trade time
  //   m: true, // Is the buyer the market maker?
  //   M: true // Ignore
  // }

  const aggTradeSocket = new WebSocket(
    `wss://stream.binance.com:9443/ws/${symbol}@aggTrade`
  )

  aggTradeSocket.onmessage = (event) => {
    console.log('Price: ', parseFloat(JSON.parse(event.data).p))
    const number = convertPriceToPixels(parseFloat(JSON.parse(event.data).p))
    changeCircleSize(number, 'price')
  }

  // https://binance-docs.github.io/apidocs/spot/en/#individual-symbol-book-ticker-streams
  //
  // {
  //   u: 400900217, // order book updateId
  //   s: 'BNBUSDT', // symbol
  //   b: '25.35190000', // best bid price
  //   B: '31.21000000', // best bid qty
  //   a: '25.36520000', // best ask price
  //   A: '40.66000000' // best ask qty
  // }

  const bookTickerSocket = new WebSocket(
    `wss://stream.binance.com:9443/ws/${symbol}@bookTicker`
  )

  bookTickerSocket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    const a = parseFloat(data.a)
    const b = parseFloat(data.b)
    const spread = a - b

    console.log('Spread: ', spread)

    const number = convertSpreadToPixels(spread)
    changeCircleSize(number, 'spread')
  }
})
