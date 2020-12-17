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

	// display fee
	log(`Your trading fee is current ${fee}%\n`);

	// display first coin balance
	log(`\x1b[32m${firstPair}\x1b[37m is worth around ${parseFloat(avgPriceValue.price).toFixed(3)} ${secondPair}`);
	log(`You have ${parseFloat(balance[firstPair].free) + parseFloat(balance[firstPair].locked)} \x1b[32m${firstPair}\x1b[37m (worth around: $${(parseFloat(avgPriceValue.price) * (parseFloat(balance[firstPair].free) + parseFloat(balance[firstPair].locked))).toFixed(3)} \x1b[32m${secondPair}\x1b[37m)`);
	
	// display second coin balance
	log(`You have ${(parseFloat(avgPriceValue.price) * (parseFloat(balance[firstPair].free) + parseFloat(balance[firstPair].locked)) + parseFloat(balance[secondPair].free) + parseFloat(balance[secondPair].locked)).toFixed(3)} \x1b[32m${secondPair}\x1b[37m\n`);

	return {balance, avgPrice: avgPriceValue};
}
