// Interfaces
import { ApplicationInterface } from "../../bot/interface.ts";

// Methods
import { candlesticks } from "../../binance/market.ts";

export default async function (request: ApplicationInterface) {
	const pair 		= request.config.pair[0] + request.config.pair[1];
	const candles 	= await candlesticks(pair, "1w");
	let ATL: number = Number.POSITIVE_INFINITY;
	let ATH: number = Number.NEGATIVE_INFINITY;
	let AVG = 0;

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
	AVG /= candles.length;

	// visual feedback
	console.log(`\x1b[32m${pair}\x1b[37m info:`);
	console.log(`ATL: ${ATL}`);
	console.log(`ATH: ${ATH}`);
	console.log(`AVG: ${AVG}`);
}