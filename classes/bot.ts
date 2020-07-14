// Interfaces
import iOptions from "./interface.ts";

// Binance
import { info } 	from "../binance/account.ts";
import * as wallet 	from "../binance/wallet.ts";
import { exchangeInfo } from "../binance/general.ts";
import { openOrders } from "../binance/trades.ts";

// Properties
let canRun 		= true;
let options 	: iOptions;
let pairInfo	: any = {};
let balance 	: any = {};
let orders		: any = [];

// Methods
async function updateBalance () {
	const pairs = await wallet.balance(options.pair);

	balance[options.pair[0]] = pairs[options.pair[0]];
	balance[options.pair[1]] = pairs[options.pair[1]];
}

async function updateOrders () {
	orders = await openOrders(options.pair[1] + options.pair[0]);
}

async function cycle () {
	// Check if we can continue trading
	await updateBalance();

	// Update open orders of the pair
	await updateOrders();

	console.log(options, pairInfo,  balance);

	return;


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
	const _pairInfo : any 	= await exchangeInfo(pair[1] + pair[0]);
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