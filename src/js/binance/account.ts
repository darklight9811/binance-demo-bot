// Helpers
import request from "./signedRequest.ts";

// Interfaces
import { iAggregateTrades } from "./interfaces/market.ts";

/**
* Account information
* 
* Get current account information.
* 
* Weight: 5
* 
* @async
* @function info
* @returns {Promise<Object>}
*/
export async function info () : Promise<Object> {
   return await request(`account`);
}

/**
* Account trade list
* 
* Get trades for a specific account and symbol.
* 
* Weight: 5
*
* * If fromId is set, it will get orders >= that fromId. Otherwise most recent orders are returned.
* 
* @async
* @function trades
* @param  {number} symbol 
* @param  {iAggregateTrades} options?
* @returns {Promise<Object>}
*/
export async function trades (symbol : string, options : iAggregateTrades = {}) : Promise<Object> {
	let getoptions = "";

	for (const key in (options as Object)) {
		getoptions += `&${key}=${(options as any)[key]}`;
	}

   return await request(`myTrades?symbol=${symbol}${getoptions}`);
}