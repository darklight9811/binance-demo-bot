// Interfaces
import { ApplicationInterface } from "../interface.ts";

// Helpers
import { log } from "../../helpers/console.ts";

// properties
let sum	= 0;

export default function updateProfit({config, initialSum, balance, avgPrice}: ApplicationInterface) {
	const [ firstPair, secondPair ] = config.pair;

	// calculate sums
	const firstPairSum 	= (parseFloat(balance[firstPair].locked) + parseFloat(balance[firstPair].free)) * parseFloat(avgPrice.price);
	const secondPairSum = parseFloat(balance[secondPair].locked) + parseFloat(balance[secondPair].free);
	sum 				= firstPairSum + secondPairSum;
	const profit 		= parseFloat((sum - initialSum).toFixed(4));

	// display profit
	if (profit < 0)
		log(`Your current profit is \x1b[31m${profit}\x1b[37m (\x1b[31m${((sum - initialSum) / initialSum).toFixed(2)}%\x1b[37m)`);
	else
		log(`Your current profit is \x1b[32m${profit}\x1b[37m (\x1b[32m${((sum - initialSum) / initialSum).toFixed(2)}%\x1b[37m)`);

	return profit;
}
