// Interfaces
import { ApplicationInterface } from "../interface.ts";

// Helpers
import { log } from "../../helpers/console.ts";

// properties
let sum	= 0;

export default function updateProfit({config, initialSum, balance}: ApplicationInterface) {
	const [ firstPair, secondPair ] = config.pair;

	// calculate sums
	sum 			= parseFloat(balance[secondPair].locked) + parseFloat(balance[secondPair].free);
	const profit 	= sum - initialSum;

	// display profit
	if (profit < 0)
		log(`Your current profit is \x1b[31m${profit}\x1b[37m`);
	else
		log(`Your current profit is \x1b[32m${profit}\x1b[37m`);
}
