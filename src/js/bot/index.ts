// Interfaces
import iOptions from "./interface.ts";

// Binance
import { info } 				from "../binance/account.ts";
import * as wallet 				from "../binance/wallet.ts";
import { exchangeInfo } 		from "../binance/general.ts";
import { openOrders, cancel } 	from "../binance/trades.ts";
import { avgPrice } 			from "../binance/market.ts";

// Helpers
import { format } from "../helpers/date.ts";
import Logger from "../helpers/log.ts";

// Properties
let fee			: number;
let options 	: iOptions;
let canRun 					= true;
let pairInfo	: any 		= {};
let balance 	: any 		= {};
let orders		: any 		= [];
let cacheConsole: string[] 	= [];

// Display properties
let totalOrdersClosed = 0;

// Methods
async function updateBalance () {
	const account					= await info();
	const pairs 					= await wallet.balance(options.pair);
	const [ firstPair, secondPair ] = options.pair;
	const price						= await avgPrice(firstPair + secondPair);

	fee = account.makerCommission + account.buyerCommission;

	// update balance for later usage
	balance[firstPair] 	= pairs[firstPair].free;
	balance[secondPair] = pairs[secondPair].free;

	// display balance
	cacheConsole.push(`Your trading fee is current ${fee}%\n`);
	cacheConsole.push(`\x1b[32m${firstPair}\x1b[37m is worth ${price.price} ${secondPair}%`);
	cacheConsole.push(`You have ${balance[firstPair]} \x1b[32m${firstPair}\x1b[37m (worth: $${parseFloat(price.price) * balance[firstPair]} \x1b[32m${secondPair}\x1b[37m)\n`);
}

async function updateOrders () {
	orders = await openOrders(options.pair[0] + options.pair[1]);

	if (orders.length === 0) {
		cacheConsole.push("No open orders at the moment");
	}
	else {
		let roundCloseOrder = 0;

		// only close orders if the config sets it
		if (options.closeOrdersTime) {
			for (let i = 0; i < orders.length; i++) {
				const order = orders[i];
				const time 	= new Date(order.updateTime);
				const limit = time.getTime() + (options.closeOrdersTime * 60 * 60 * 1000);
	
				// close old order
				if (limit < (new Date()).getTime()) {
					Logger.general(`closing order {${order.orderId}}`);
					await cancel(options.pair[0] + options.pair[1], order.orderId);
					roundCloseOrder++;
				}
			}
		}

		totalOrdersClosed += roundCloseOrder;

		cacheConsole.push(`There are ${orders.length - roundCloseOrder} open orders, ${orders.length - totalOrdersClosed} were closed`);
	}

	console.log('\n');
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
	if (!(await info()).canTrade) {
		console.warn("Credentials are not valid");
		return;
	}

	// Validate pair
	const { pair } 			= _options;
	const _pairInfo 		= await exchangeInfo(pair[0] + pair[1]);
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