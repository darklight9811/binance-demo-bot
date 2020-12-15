// Interfaces
import { AccountInterface } from "../binance/interfaces/account.ts";
import { ExchangeInfoInterface } from "../binance/interfaces/general.ts";
import { AvgPriceInterface, OrderBookInterface } from "../binance/interfaces/market.ts";
import { OpenOrderInterface } from "../binance/interfaces/trades.ts";

export default interface iOptions {
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
	config: 	iOptions;
	account: 	AccountInterface;
	info: 		ExchangeInfoInterface;
	openOrders: OpenOrderInterface[];
	avgPrice: 	AvgPriceInterface;
}