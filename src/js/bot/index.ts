// Interfaces
import iOptions from "./interface.ts";

// Binance
import { info } 				from "../binance/account.ts";
import * as wallet 				from "../binance/wallet.ts";
import { exchangeInfo } 		from "../binance/general.ts";
import { openOrders, cancel } 	from "../binance/trades.ts";

// Helpers
import { format } from "../helpers/date.ts";

// Properties
let options 	: iOptions;
let canRun 		: boolean	= true;
let pairInfo	: any 		= {};
let balance 	: any 		= {};
let orders		: any 		= [];
let cacheConsole: string[] 	= [];

// Methods
async function updateBalance () {
	const pairs 					= await wallet.balance(options.pair);
	const [ firstPair, secondPair ] = options.pair;

	balance[firstPair] 	= pairs[firstPair].free;
	balance[secondPair] = pairs[secondPair].free;

	// display balance
	cacheConsole.push(`\x1b[32m${firstPair}\x1b[37m: ${balance[firstPair]} (worth: )`);
}

async function updateOrders () {
	orders = await openOrders(options.pair[0] + options.pair[1]);

	if (orders.length === 0) {
		cacheConsole.push("No open orders at the moment");
	}
	else {
		let ordersClosed = 0;

		if (options.closeOrdersTime) {
			for (let i = 0; i < orders.length; i++) {
				const order = orders[i];
				const time 	= new Date(order.updateTime);
				const limit = time.getTime() + (options.closeOrdersTime * 60 * 60 * 1000);
	
				// close old order
				if (limit < (new Date()).getTime()) {
					await cancel(options.pair[0] + options.pair[1], order.orderId);
					ordersClosed += 1;
				}
			}
		}

		cacheConsole.push(`${ordersClosed} orders were closed and ${orders.length - ordersClosed} were kept open`);
	}
}

async function cycle () {
	// Update screen with latest time
	cacheConsole.push(`Latest update at ${format(new Date())}\n`);

	// Check if we can continue trading
	await updateBalance();

	// Update open orders of the pair
	await updateOrders();

	// update console
	console.clear();
	cacheConsole.forEach(i => console.log(i));
	cacheConsole = [];

	// Renew cycle
	if (canRun)
		// Convert miliseconds refreshRate to seconds
		setTimeout(await cycle, options.refreshRate * 1000);
	else
		console.log("Shutting bot down");
}

// Export methods
export async function run (_options : iOptions) {
	// Validate user
	if (!((await info()) as any).canTrade) {
		console.warn("Credentials are not valid");
		return;
	}

	// Validate pair
	const { pair } 			= _options;
	const _pairInfo : any 	= await exchangeInfo(pair[0] + pair[1]);
	if (!_pairInfo || !_pairInfo.isSpotTradingAllowed) {
		console.warn(`${pair[1] + pair[0]} pair is not valid`);
	}

	// Start bot
	console.log("Starting bot");
	options 	= _options;
	pairInfo 	= _pairInfo;
	canRun 		= true;
	await cycle();
}

export function stop () {
	canRun = false;
}