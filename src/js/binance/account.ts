// Helpers
import request from "./signedRequest.ts";

// Interfaces
import { iAggregateTrades } from "./interfaces/market.ts";
import { AccountInterface, TradeInterface } from "./interfaces/account.ts";

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
export async function info () : Promise<AccountInterface> {
   const response = await request(`account`);

   // format response
	if (response.makerCommission) 	response.makerCommission 	/= 10000;
	if (response.takerCommission) 	response.takerCommission 	/= 10000;
	if (response.buyerCommission) 	response.buyerCommission 	/= 10000;
	if (response.sellerComission) 	response.sellerComission 	/= 10000;

	// remove empty balances
	const balances = [];

	for (let i = 0; i < response.balances.length; i++) {
		const balance = response.balances[i];

		if (balance.free !== "0.00000000" || balance.locked !== "0.00000000")
			balances.push(balance);
	}

	response.balances = balances;

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
export async function trades (symbol : string, options : iAggregateTrades = {}) : Promise<TradeInterface[]> {
	let getoptions = "";

	for (const key in options) {
		getoptions += `&${key}=${options[key as keyof iAggregateTrades]}`;
	}

   return await request(`myTrades?symbol=${symbol}${getoptions}`);
}