// Interfaces
import { AccountInterface } from "../binance/interfaces/account.ts";
import { ExchangeInfoInterface } from "../binance/interfaces/general.ts";
import { AvgPriceInterface } from "../binance/interfaces/market.ts";
import { OpenOrderInterface } from "../binance/interfaces/trades.ts";

export default interface OptionsInterface {
	pair : [
		string,
		string,
	],
	algorithm		: (request: ApplicationInterface) => unknown[] | unknown | undefined,
	strategy		: string,
	refreshRate 	: number,
	profit 			: number,
	closeOrdersTime?: number,
	
	// extra configuration
	[key: string]: unknown,
}

export interface ApplicationInterface {
	config: 	OptionsInterface;
	account: 	AccountInterface;
	info: 		ExchangeInfoInterface;
	openOrders: OpenOrderInterface[];
	avgPrice: 	AvgPriceInterface;
	balance: 	Record<string, {free: string, locked: string}>;
	initialSum:	number;
}