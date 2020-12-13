// Helpers
import request from "./src/js/helpers/request.ts";

// Binance
import { credentials } 	from "./src/js/binance/signedRequest.ts";
import signedRequest 	from "./src/js/binance/signedRequest.ts";

// Config
import credentialsdata 	from "./src/config/credentials.js";
import botdata			from "./src/config/bot.js";

// Bot
import { run } from "./src/js/bot/index.ts";

// Interfaces
import iOptions from "./src/js/bot/interface.ts";

// Set request
request.options.baseUrl 		= "https://api.binance.com/api/v3/";
signedRequest.options.baseUrl 	= "https://api.binance.com/api/v3/";
await credentials(credentialsdata.key, credentialsdata.secret);

// Start bot
await run(botdata as unknown as iOptions);