// Helpers
import request from "./src/js/helpers/request.ts";

// Binance
import { credentials } 	from "./src/js/binance/signedRequest.ts";
import signedRequest 	from "./src/js/binance/signedRequest.ts";

// Config
import credentialsdata 	from "./src/config/credentials.js";

// Binance actions
import { info, trades } from "./src/js/binance/account.ts";

// Set request
request.options.baseUrl 		= "https://api.binance.com/api/v3/";
signedRequest.options.baseUrl 	= "https://api.binance.com/api/v3/";
await credentials(credentialsdata.key, credentialsdata.secret);

console.log(await info(), await trades('BTCUSDT'));