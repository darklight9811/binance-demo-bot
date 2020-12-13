// Helpers
import request from "./src/js/helpers/request.ts";

// Binance
import { credentials } 		from "./src/js/binance/signedRequest.ts";
import signedRequest 		from "./src/js/binance/signedRequest.ts";
import * as general from "./src/js/binance/general.ts";
import * as trades	from "./src/js/binance/trades.ts";
import * as account from "./src/js/binance/account.ts";
import * as wallet 	from "./src/js/binance/wallet.ts";
import * as market 	from "./src/js/binance/market.ts";

// Config
import credentialsdata 	from "./src/config/credentials.js";

// Set request
request.options.baseUrl 		= "https://api.binance.com/api/v3/";
signedRequest.options.baseUrl 	= "https://api.binance.com/api/v3/";
await credentials(credentialsdata.key, credentialsdata.secret);

console.log(await market.avgPrice("BTCUSDT"));
//console.log(await market.candlesticks("BNBBTC", 100));
//console.log(await account.info());
//console.log(await general.exchangeInfo("BNBBTC"));
// console.log(await trades.openOrders("BNBBTC"));
//console.log(await trades.test("BNBBTC", "SELL", "LIMIT", {timeInForce:"GTC",quantity:"0.123",price:"0.123"}));