// Binance
import * as wallet 	from "../../binance/wallet.ts";
import { avgPrice }	from "../../binance/market.ts";

// Interfaces
import { ApplicationInterface } from "../interface.ts";

// Helpers
import { log } from "../../helpers/console.ts";

export default async function updateBalance ({config, account} : ApplicationInterface) {
	const pairs 					= await wallet.balance(config.pair);
	const [ firstPair, secondPair ] = config.pair;
	const avgPriceValue				= await avgPrice(firstPair + secondPair);
	const fee 						= account.makerCommission + account.buyerCommission;
	const balance 					= {} as Record<string, {free: string, locked: string}>;

	// update balance for later usage
	balance[firstPair] 	= pairs[firstPair];
	balance[secondPair] = pairs[secondPair];

	// display balance
	log(`Your trading fee is current ${fee}%\n`);
	log(`\x1b[32m${firstPair}\x1b[37m is worth around ${avgPriceValue.price} ${secondPair}`);
	log(`You have ${balance[firstPair].free} \x1b[32m${firstPair}\x1b[37m (worth: $${parseFloat(avgPriceValue.price) * (parseFloat(balance[firstPair].free) + parseFloat(balance[firstPair].locked))} \x1b[32m${secondPair}\x1b[37m)\n`);

	return {balance, avgPrice: avgPriceValue};
}
