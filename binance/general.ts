// Helpers
import request from "../helpers/request.ts";

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
export async function exchangeInfo (symbol? : string) : Promise<Object> {
	const response = await request("exchangeInfo");

	if (symbol)
		return response.symbols.filter((value : any) => value.symbol === symbol)[0];
	else
		return response;
}