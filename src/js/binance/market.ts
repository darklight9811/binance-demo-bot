// Helpers
import request from "../helpers/request.ts";

// Interfaces
import { iAggregateTrades } from "./interfaces/market.ts";

// Types
import { interval } from "./types/market.ts";

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
export async function orderBook (symbol : string, limit? : number) : Promise<Object> {
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
export async function recentTrades (symbol : string, limit? : number) : Promise<Object> {
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
export async function aggregateTrades (symbol : string, options : iAggregateTrades = {}) : Promise<Object> {
	let getoptions = "";

	for (const key in (options as Object)) {
		getoptions += `&${key}=${(options as any)[key]}`;
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
export async function candlesticks (symbol : string, interval : interval, options : iAggregateTrades = {}) : Promise<Object> {
	let getoptions = "";

	for (const key in (options as Object)) {
		getoptions += `&${key}=${(options as any)[key]}`;
	}

	return await request(`klines?symbol=${symbol}&interval=${interval}${getoptions}`);
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
export async function avgPrice (symbol : string) : Promise<Object> {
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
export async function ticker (symbol? : string) : Promise<Object> {
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
export async function tickerPrice (symbol? : string) : Promise<Object> {
	return await request(`ticker/price${symbol ? (`?symbol=${symbol}`):""}`);
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
export async function tickerBook (symbol? : string) : Promise<Object> {
	return await request(`ticker/bookTicker${symbol ? (`?symbol=${symbol}`):""}`);
}