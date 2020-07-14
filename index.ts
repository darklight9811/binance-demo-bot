// Helpers
import request from "./helpers/request.ts";

// Binance
import { credentials } 	from "./binance/signedRequest.ts";
import signedRequest 	from "./binance/signedRequest.ts";

// Config
import credentialsdata 	from "./config/credentials.js";
import botdata			from "./config/bot.js";

// Bot
import { run } from "./classes/bot.ts";

// Interfaces
import iOptions from "./classes/interface.ts";

// Set request
request.options.baseUrl 		= "https://api.binance.com/api/v3/";
signedRequest.options.baseUrl 	= "https://api.binance.com/api/v3/";
await credentials(credentialsdata.key, credentialsdata.secret);

// Start bot
await run(botdata as iOptions);