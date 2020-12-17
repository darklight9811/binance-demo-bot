// Helpers
import request from "./signedRequest.ts";

// Interfaces
import { NewTradeInterface, OpenOrderInterface } from "./interfaces/trades.ts";
import { iAggregateTrades } from "./interfaces/market.ts";

/**
* New order
* 
* Send in a new order.
* 
* Weight: 1
* 
* @async
* @function order
* @param {string} symbol
* @param {string} side
* @param {string} type
* @param {NewTradeInterface} options?
* @returns {Promise<Record<string, unknown>>}
*/
export async function order (symbol : string, options? : NewTradeInterface) : Promise<Record<string, unknown>> {
	let getoptions = "";

	for (const key in options) {
		getoptions += `&${key}=${options[key as keyof NewTradeInterface]}`;
	}

   return await request.post(`order?symbol=${symbol}${getoptions}`);
}

/**
* Test new order
* 
* Test new order creation and signature/recvWindow long. Creates and validates a new order but does not send it into the matching engine.
* 
* Weight: 1
* 
* @async
* @function test
* @param {string} symbol
* @param {string} side
* @param {string} type
* @param {NewTradeInterface} options?
* @returns {Promise<Record<string, unknown>>}
*/
export async function test (symbol : string, side : string, type : string, options? : NewTradeInterface) : Promise<Record<string, unknown>> {
	let getoptions = "";

	for (const key in options) {
		getoptions += `&${key}=${options[key as keyof NewTradeInterface]}`;
	}

   return await request.post(`order/test?symbol=${symbol}&side=${side}&type=${type}${getoptions}`);
}

/**
* Query order
* 
* Check an order's status.
* 
* Weight: 1
* 
* @async
* @function query
* @param {string} symbol
* @param {number} orderId
* @returns {Promise<Record<string, unknown>>}
*/
export async function query (symbol : string, orderId : number) : Promise<Record<string, unknown>> {
   return await request.get(`order/test?symbol=${symbol}&orderId=${orderId}`);
}

/**
* Cancel order
* 
* Cancel an active order.
* 
* Weight: 1
* 
* @async
* @function cancel
* @param {string} symbol
* @param {number} orderId
* @returns {Promise<Record<string, unknown>>}
*/
export async function cancel (symbol : string, orderId : number) : Promise<Record<string, unknown>> {
   return await request.delete(`order?symbol=${symbol}&orderId=${orderId}`);
}

/**
* Cancel All Open Orders on a Symbol
* 
* Cancels all active orders on a symbol. This includes OCO orders.
* 
* Weight: 1
* 
* @async
* @function cancelAll
* @param {string} symbol
* @returns {Promise<Record<string, unknown>>}
*/
export async function cancelAll (symbol : string) : Promise<Record<string, unknown>> {
   return await request.delete(`order?symbol=${symbol}`);
}

/**
* Current open orders
* 
* Get all open orders on a symbol. Careful when accessing this with no symbol.
* 
* Weight: 1 for a single symbol; 40 when the symbol parameter is omitted
* 
* @async
* @function openOrders
* @param {string} symbol?
* @returns {Promise<Record<string, unknown>>}
*/
export async function openOrders (symbol? : string) : Promise<OpenOrderInterface[]> {
   return await request.get(`openOrders${symbol ? `?symbol=${symbol}`:""}`);
}

/**
* All orders
* 
* Get all account orders; active, canceled, or filled.
* 
* Weight: 5 with symbol
*
* * If orderId is set, it will get orders >= that orderId. Otherwise most recent orders are returned.
*
* * For some historical orders cummulativeQuoteQty will be < 0, meaning the data is not available at this time.
* 
* @async
* @function allOrders
* @param {string} symbol
* @returns {Promise<Record<string, unknown>>}
*/
export async function allOrders (symbol : string, options? : iAggregateTrades) : Promise<Record<string, unknown>> {
	let getoptions = "";

	for (const key in options) {
		getoptions += `&${key}=${options[key as keyof iAggregateTrades]}`;
	}

   return await request.get(`allOrders?symbol=${symbol}${getoptions}`);
}