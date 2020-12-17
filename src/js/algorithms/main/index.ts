// Interfaces
import { ApplicationInterface } from "../../bot/interface.ts";

// Methods
import { candlesticks } from "../../binance/market.ts";

// Helpers
import Logger 			from "../../helpers/log.ts";
import { timestamp } 	from "../../helpers/string.ts";
import { clamp } from "../../helpers/number.ts";

export default async function (request: ApplicationInterface) {
	// prepare data
	const curr 		= parseFloat(request.avgPrice.price);
	const fee		= request.account.makerCommission + request.account.buyerCommission;
	const pair 		= request.config.pair[0] + request.config.pair[1];
	const candles 	= await candlesticks(pair, (request.config.scope as string) || "1w");
	const minValue	= parseFloat(request.info.filters.find(item => item.filterType === "MIN_NOTIONAL")?.minNotional as string || "0");
	let ATL: number = Number.POSITIVE_INFINITY;
	let ATH: number = Number.NEGATIVE_INFINITY;
	let AVG 		= 0;

	// loop through all entries
	for (let i = 0; i < candles.length; i++) {
		const candle 	= candles[i];
		const value 	= (parseFloat(candle.open) + parseFloat(candle.close)) / 2;

		AVG += value;

		if (!ATL || value < ATL)
			ATL = value;
		else if (!ATH || value > ATH)
			ATH = value;
	}

	// calculate avg
	AVG 			   /= candles.length;
	ATL			 		= (ATL + AVG) / 2;
	AVG			 		= (ATH + AVG) / 2;
	const upperMargin 	= AVG * (request.config.profit / 100) + fee * (AVG * (request.config.profit / 100));
	const lowerMargin 	= AVG * (request.config.profit / 100) + fee * (AVG * (request.config.profit / 100));

	// visual feedback
	console.log(`\x1b[32m${pair}\x1b[37m info:`);
	console.log(`ATL: ${ATL}`);
	console.log(`ATH: ${ATH}`);
	console.log(`AVG: ${AVG}`);

	// -------------------------------------------------
	// Profit check
	// -------------------------------------------------

	// check profit amount
	if (request.profit > request.config.profit) {
		if (parseFloat(request.balance[request.config.pair[1]].free) > minValue && AVG > curr) {
			const quantity = clamp(parseFloat(request.balance[request.config.pair[1]].free), minValue, request.config.maxBalanceUsage);

			// logs
			console.log(`\nCurrent profit is of ${request.profit}, above the required ${request.config.profit}, buying`);
			Logger.general(`${pair} [${timestamp(undefined, true)}] Buying quantity ${quantity} with price of ${curr}`);
	
			return {
				type: 			"BUY",
				timeInForce: 	"GTC",
				price: 			curr,
				quantity: 		quantity,
			};
		}
		else if (parseFloat(request.balance[request.config.pair[0]].free) > minValue && AVG < curr) {
			const quantity = clamp(parseFloat(request.balance[request.config.pair[0]].free), minValue, request.config.maxBalanceUsage);
			
			// logs
			console.log(`\nCurrent profit is of ${request.profit}, above the required ${request.config.profit}, selling`);
			Logger.general(`${pair} [${timestamp(undefined, true)}] Selling quantity ${quantity} with price of ${curr}`);
	
			return {
				type: 			"SELL",
				timeInForce: 	"GTC",
				price: 			curr,
				quantity: 		quantity,
			};
		}
	}

	// -------------------------------------------------
	// Resistance check
	// -------------------------------------------------

	// buy if below average
	if ((ATL + AVG) / 2 - lowerMargin > curr) {
		// check balance
		if (parseFloat(request.balance[request.config.pair[1]].free) < minValue) {
			console.log(`\nCurrent value of ${curr} is below the buy line that is ${(ATL + AVG) / 2 - lowerMargin}, but you do not have any funds`);
		}
		else {
			const quantity = clamp(parseFloat(request.balance[request.config.pair[1]].free), minValue, request.config.maxBalanceUsage);

			// logs
			console.log(`\nCurrent value of ${curr} is below the buy line that is ${(ATL + AVG) / 2 - lowerMargin}, buying`);
			Logger.general(`${pair} [${timestamp(undefined, true)}] Buying quantity ${quantity} with price of ${curr}`);
	
			return {
				type: 			"BUY",
				timeInForce: 	"GTC",
				price: 			curr,
				quantity: 		quantity,
			};
		}
	}
	// sell if above average
	else if ((ATH + AVG) / 2 + upperMargin < curr) {
		// check balance
		if (parseFloat(request.balance[request.config.pair[0]].free) < minValue) {
			console.log(`\nCurrent value of ${curr} is above the sell line that is ${(ATH + AVG) / 2 + upperMargin}, but you do not have any funds`);
		}
		else {
			const quantity = clamp(parseFloat(request.balance[request.config.pair[0]].free), minValue, request.config.maxBalanceUsage);

			// logs
			console.log(`\nCurrent value of ${curr} is above the sell line that is ${(ATH + AVG) / 2 + upperMargin}, selling`);
			Logger.general(`${pair} [${timestamp(undefined, true)}] Selling quantity ${quantity} with price of ${curr}`);

			return {
				type: 			"SELL",
				timeInForce: 	"GTC",
				price: 			curr,
				quantity: 		quantity,
			};
		}
	}
}
