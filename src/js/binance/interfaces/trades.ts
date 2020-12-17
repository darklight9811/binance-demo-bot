export interface NewTradeInterface {
	side: string;
	type: string;
	timeInForce? : string,
	quantity? : number | string,
	quoteOrderQty? : number,
	price? : number | string,
	newClientOrderId? : string,
	stopPrice? : number,
	icebergQty? : number,
	newOrderRespType? : string,
}

export interface OpenOrderInterface {
	symbol: string;
	orderId: number;
	orderListId: number;
	clientOrderId: string;
	price: string;
	origQty: string;
	executedQty: string;
	cumulativeQuoteQty: string;
	status: "NEW";
	timeInForce: "GTC";
	type: "LIMIT";
	side: "BUY";
	stopPrice: string;
	icebergQty: string;
	origQuoteOrderQty: string;

	time: number;
	updateTime: number;

	isWorking: boolean;
}