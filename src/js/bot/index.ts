// Interfaces
import OptionsInterface 			from "./interface.ts";
import { AccountInterface } 		from "../binance/interfaces/account.ts";
import { ExchangeInfoInterface } 	from "../binance/interfaces/general.ts";
import { OpenOrderInterface } 		from "../binance/interfaces/trades.ts";
import { AvgPriceInterface } 		from "../binance/interfaces/market.ts";

// Methods
import updateBalance 	from "./functions/updateBalance.ts";
import updateOrders 	from "./functions/updateOrders.ts";
import updateProfit 	from "./functions/updateProfit.ts";

// Binance
import { info } 		from "../binance/account.ts";
import * as wallet 		from "../binance/wallet.ts";
import { exchangeInfo } from "../binance/general.ts";
import { order } 		from "../binance/trades.ts";

// Helpers
import { format } 				from "../helpers/date.ts";
import { clear, print, log } 	from "../helpers/console.ts";
import { avgPrice } from "../binance/market.ts";

// Properties
const properties = {
	account: 	{} as AccountInterface,
	config: 	{} as OptionsInterface,
	info: 		{} as ExchangeInfoInterface,
	openOrders: [] as OpenOrderInterface[],
	avgPrice:	{} as AvgPriceInterface,
	balance:	{} as Record<string, {free: string, locked: string}>,
	initialSum:	0,
};
let canRun 			= true;

async function cycle () {
	// Update screen with latest time
	log(`Latest update at ${format(new Date())}\n`);

	// Check if we can continue trading
	const {balance, avgPrice} = await updateBalance(properties);
	properties.balance 	= balance;
	properties.avgPrice = avgPrice;

	// Update open orders of the pair
	properties.openOrders = await updateOrders(properties);

	// Update profit count
	await updateProfit(properties);

	// update console
	console.clear();
	print();
	clear();
	console.log('');

	// run algorithm
	const newOrders = await properties.config.algorithm(properties);

	if (newOrders) {
		const prepareOrders = Array.isArray(newOrders) ? newOrders:[newOrders];

		// send orders to binance
		for (let i = 0; i < prepareOrders.length; i++) {
			await order(properties.config.pair[0] + properties.config.pair[1], "BUY", "LIMIT", {
				...prepareOrders[i],
			});
		}
	}

	// Renew cycle
	if (canRun)
		// Convert miliseconds refreshRate to seconds
		setTimeout(await cycle, properties.config.refreshRate * 1000);
	else
		console.log("Shutting bot down");
}

// Export methods
export async function run (_options : OptionsInterface) {
	// Validate user
	properties.account = await info();
	if (!properties.account.canTrade) {
		console.warn("Credentials are not valid");
		return;
	}

	// Validate pair
	const { pair } 	= _options;
	properties.info = await exchangeInfo(pair[0] + pair[1]);
	if (!properties.info || !properties.info.isSpotTradingAllowed) {
		console.warn(`${pair[1] + pair[0]} pair is not valid`);
	}

	// Calculate initial sum
	const balance			= (await wallet.balance(pair));
	const avgPriceValue		= await avgPrice(pair[0] + pair[1]);
	const firstPairSum 		= (parseFloat(balance[pair[0]].locked) + parseFloat(balance[pair[0]].free)) * parseFloat(avgPriceValue.price);
	const secondPairSum 	= parseFloat(balance[pair[1]].locked) + parseFloat(balance[pair[1]].free);
	properties.initialSum 	= firstPairSum + secondPairSum;

	// Start bot
	console.log("Starting bot");
	properties.config 	= _options;
	canRun 				= true;
	await cycle();
}

export function stop () {
	canRun = false;
}