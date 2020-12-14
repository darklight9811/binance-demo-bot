export default {
	pair: [
		// Profit pair
		"BTC",
		// Target to get profit
		"USDT"
	],

	// display currency
	currency: "BRL",

	// Strategy,
	strategy: "long", // [long, short]

	// Close order if it's been open more than x hours
	closeOrdersTime: 4,

	// In seconds
	refreshRate: 2,

	// Take profit
	profit: 0.15,

	// Extra order
	order: {
		extra:1,
		count:2,
	}
};