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
export async function info () : Promise<any> {
   const response = await request(`account`);

   // format response
	if (response.makerCommission) 	response.makerCommission 	/= 10000;
	if (response.takerCommission) 	response.takerCommission 	/= 10000;
	if (response.buyerComission) 	response.buyerComission 	/= 10000;
	if (response.sellerComission) 	response.sellerComission 	/= 10000;

	return response;
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