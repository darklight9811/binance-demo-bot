// Helpers
import request from "../helpers/request.ts";

// Interfaces
import { ExchangeInfoInterface } from "./interfaces/general.ts";

/**
 * Ping
 * 
 * Test connectivity to the Rest API.
 * 
 * @async
 * @function ping
 * @returns {Promise<boolean>} Boolean with server status
 */
export async function ping () : Promise<boolean> {
	return typeof (await request("ping")) === "object";
}

/**
 * Server time
 * 
 * Test connectivity to the Rest API and get the current server time.
 * 
 * @async
 * @function serverTime
 * @returns {Promise<number>} Current server time
 */
export async function serverTime () : Promise<number> {
	return (await request("time")).serverTime;
}

/**
 * Exchange information
 * 
 * Current exchange trading rules and symbol information
 * 
 * @async
 * @function exchangeInfo
 * @returns Promise
 */
export async function exchangeInfo <T extends string | undefined = undefined> (symbol? : T): Promise<T extends string ? ExchangeInfoInterface:ExchangeInfoInterface[]> {
	const response = await request("exchangeInfo") as {symbols: ExchangeInfoInterface[]};

	if (symbol)
		return response.symbols.find((value) => value.symbol === symbol) as ExchangeInfoInterface;
	else
		return response.symbols;
}