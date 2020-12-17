// Interfaces
import { ApplicationInterface } from "../../bot/interface.ts";

// Methods
import { candlesticks } from "../../binance/market.ts";
import { balance } 		from "../../binance/wallet.ts";

// Helpers
import Logger 			from "../../helpers/log.ts";
import { timestamp } 	from "../../helpers/string.ts";
import { clamp } from "../../helpers/number.ts";

export default async function (request: ApplicationInterface) {
	// prepare data
	const curr 		= request.avgPrice.price;
	const fee		= request.account.makerCommission + request.account.buyerCommission;
	const pair 		= request.config.pair[0] + request.config.pair[1];
	const candles 	= await candlesticks(pair, "1d");
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
	AVG 		/= candles.length;
	const margin = AVG * request.config.profit + fee * (AVG * request.config.profit);

	// visual feedback
	console.log(`\x1b[32m${pair}\x1b[37m info:`);
	console.log(`ATL: ${ATL}`);
	console.log(`ATH: ${ATH}`);
	console.log(`AVG: ${AVG}`);
	console.log(`MARGIN: ${margin}`);

	// buy if below average
	if (AVG - margin > parseFloat(curr)) {
		// check balance
		if (parseFloat(request.balance[request.config.pair[1]].free) < minValue) {
			console.log(`\nCurrent value of ${parseFloat(curr)} is below the buy line that is ${AVG - margin}, but you do not have any funds`);
		}
		else {
			const quantity = clamp(parseFloat(request.balance[request.config.pair[1]].free), minValue, request.config.maxBalanceUsage);

			// logs
			console.log(`\nCurrent value of ${parseFloat(curr)} is below the buy line that is ${AVG - margin}, buying`);
			Logger.general(`${pair} [${timestamp(undefined, true)}] Buying with price of ${curr}`);
	
			return {
				type: 			"BUY",
				timeInForce: 	"GTC",
				price: 			curr,
				quantity: 		quantity,
			};
		}
	}
	// sell if above average
	else if (AVG + margin < parseFloat(curr)) {
		// check balance
		if (parseFloat(request.balance[request.config.pair[0]].free) < minValue) {
			console.log(`\nCurrent value of ${parseFloat(curr)} is above the sell line that is ${AVG + margin}, but you do not have any funds`);
		}
		else {
			const quantity = clamp(parseFloat(request.balance[request.config.pair[0]].free), minValue, request.config.maxBalanceUsage);

			// logs
			console.log(`\nCurrent value of ${parseFloat(curr)} is above the sell line that is ${AVG + margin}, selling`);
			Logger.general(`${pair} [${timestamp(undefined, true)}] Selling with price of ${curr}`);

			return {
				type: 			"SELL",
				timeInForce: 	"GTC",
				price: 			curr,
				quantity: 		quantity,
			};
		}
	}
}
