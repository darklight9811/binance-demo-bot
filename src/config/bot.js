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
	strategy: main,

	// Close order if it's been open more than x hours
	closeOrdersTime: 4,

	// In seconds
	refreshRate: 2,

	// Take profit
	profit: 1,

	// The quantity the bot is allowed to use from the account balance
	maxBalanceUsage: 0.005,

	// Properties related to main algorithm
	scope: "1d"
};