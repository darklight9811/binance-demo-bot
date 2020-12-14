// Helpers
import request from "../helpers/request.ts";

// Interfaces
import { iAggregateTrades, OrderBookInterface, RecentTradesInterface } from "./interfaces/market.ts";
import { AggregateInterface, CandleStickInterface } from "./interfaces/market.ts";
import { AvgPriceInterface, TickerInterface, TickerBookInterface } from "./interfaces/market.ts";

/**
 * Order book
 * 
 * Get the current order book from the specific symbol
 * 
 * Weight: composite
 * 
 * @async
 * @function orderBook
 * @param  {string} symbol 
 * @param  {number} limit? Default 100; max 5000. Valid limits:[5, 10, 20, 50, 100, 500, 1000, 5000]
 * @returns {Promise<Object>}
 */
export async function orderBook (symbol : string, limit? : number) : Promise<OrderBookInterface> {
	return await request(`depth?symbol=${symbol}${limit !== undefined ? ("&limit=" + limit):""}`);
}

/**
 * Recent trades
 * 
 * Get the list of recent trades of current symbol
 * 
 * Weight: 1
 * 
 * @async
 * @function recentTrades
 * @param  {string} symbol
 * @param  {number} limit? Default 500; max 1000.
 * @returns {Promise<Object>}
 */
export async function recentTrades (symbol : string, limit? : number) : Promise<RecentTradesInterface> {
	return await request(`trades?symbol=${symbol}${limit !== undefined ? ("&limit=" + limit):""}`);
}

/**
 * Compressed/Aggregate trades list
 * 
 * Get compressed, aggregate trades. Trades that fill at the time, from the same taker order, with the same price will have the quantity aggregated.
 * 
 * Weight: 1
 * 
 * * If both startTime and endTime are sent, time between startTime and endTime must be less than 1 hour.
 * 
 * * If fromId, startTime, and endTime are not sent, the most recent aggregate trades will be returned.
 * 
 * @async
 * @function aggregateTrades
 * @param  {string} symbol
 * @param  {iAggregateTrades} options?
 * @returns {Promise<Object>}
 */
export async function aggregateTrades (symbol : string, options : iAggregateTrades = {}) : Promise<AggregateInterface[]> {
	let getoptions = "";

	for (const key in options) {
		getoptions += `&${key}=${options[key as keyof iAggregateTrades]}`;
	}

	return await request(`aggTrades?symbol=${symbol}${getoptions}`);
}

/**
 * Kline/Candlestick data
 * 
 * Kline/candlestick bars for a symbol. Klines are uniquely identified by their open time.
 * 
 * Weight: 1
 * 
 * * If startTime and endTime are not sent, the most recent klines are returned.
 * 
 * @async
 * @function candlesticks
 * @param  {string} symbol
 * @param  {interval} interval
 * @param  {iAggregateTrades} options?
 * @returns {Promise<Object>}
 */
export async function candlesticks (symbol : string, interval : string, options : iAggregateTrades = {}) : Promise<CandleStickInterface[]> {
	let getoptions = "";

	for (const key in options) {
		getoptions += `&${key}=${options[key as keyof iAggregateTrades]}`;
	}

	const response = await request(`klines?symbol=${symbol}&interval=${interval}${getoptions}`);

	return response.map((item: (string | number)[]) => ({
		openTime: item[0],
		open: item[1],
		high: item[2],
		low: item[3],
	
		closeTime: item[6],
		close: item[4],
	
		volume: item[5],
		quoteAssetVolume: item[7],
		tradeQty: item[8],
	
		takerBuyBaseAssetVolume: item[9],
		takerBuyQuoteAssetVolume: item[10],
	
		ignore: item[11],
	}));
}

/**
 * Average price
 * 
 * Current average price for a symbol.
 * 
 * Weight: 1
 * 
 * @async
 * @function avgPrice
 * @param  {string} symbol 
 * @returns {Promise<Object>}
 */
export async function avgPrice (symbol : string) : Promise<AvgPriceInterface> {
	return await request(`avgPrice?symbol=${symbol}`);
}

/**
 * 24hr ticker price change statistics
 * 
 * 24 hour rolling window price change statistics. Careful when accessing this with no symbol.
 * 
 * Weight: 1 for a single symbol; 40 when the symbol parameter is omitted
 * 
 * @async
 * @function ticker
 * @param  {string} symbol?
 * @returns {Promise<Object>}
 */
export async function ticker (symbol? : string) : Promise<TickerInterface> {
	return await request(`ticker/24hr${symbol ? (`?symbol=${symbol}`):""}`);
}

/**
 * Symbol price ticker
 * 
 * Latest price for a symbol or symbols.
 * 
 * Weight: 1 for a single symbol; 2 when the symbol parameter is omitted
 * 
 * @async
 * @function tickerPrice
 * @param  {string} symbol?
 * @returns {Promise<Object>}
 */
export async function tickerPrice (symbol? : string) : Promise<string> {
	const response = await request(`ticker/price${symbol ? (`?symbol=${symbol}`):""}`);
	return response.price;
}

/**
 * Symbol order book ticker
 * 
 * Best price/qty on the order book for a symbol or symbols.
 * 
 * Weight: 1 for a single symbol; 2 when the symbol parameter is omitted
 * 
 * @async
 * @function tickerBook
 * @param  {string} symbol?
 * @returns {Promise<Object>}
 */
export async function tickerBook (symbol? : string) : Promise<TickerBookInterface> {
	return await request(`ticker/bookTicker${symbol ? (`?symbol=${symbol}`):""}`);
}