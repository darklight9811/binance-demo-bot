// Algorithms
import main from "../js/algorithms/main/index.ts";

export default {
	pair: [
		// Profit pair
		"BTC",
		// Target to get profit
		"USDT"
	],

	// algorithm to calculate orders
	algorithm: main,

	// Strategy,
	strategy: "long", // [long, short]

	// Close order if it's been open more than x hours
	closeOrdersTime: 4,

	// In seconds
	refreshRate: 2,

	// Take profit
	profit: 0.15,
};