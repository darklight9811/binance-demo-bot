// Helpers
import request from "./helpers/request.ts";

// Binance
import { credentials } 		from "./binance/signedRequest.ts";
import signedRequest 		from "./binance/signedRequest.ts";
import * as general from "./binance/general.ts";
import * as trades	from "./binance/trades.ts";
import * as account from "./binance/account.ts";
import * as wallet 	from "./binance/wallet.ts";
import * as market 	from "./binance/market.ts";

// Config
import credentialsdata 	from "./config/credentials.js";

// Set request
request.options.baseUrl 		= "https://api.binance.com/api/v3/";
signedRequest.options.baseUrl 	= "https://api.binance.com/api/v3/";
await credentials(credentialsdata.key, credentialsdata.secret);

console.log(await market.candlesticks("BNBBTC", 100));
//console.log(await account.info());
//console.log(await general.exchangeInfo("BNBBTC"));
// console.log(await trades.openOrders("BNBBTC"));
console.log(await trades.test("BNBBTC", "SELL", "LIMIT", {timeInForce:"GTC",quantity:"0.123",price:"0.123"}));