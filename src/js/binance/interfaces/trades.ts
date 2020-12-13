export interface newTrade {
	timeInForce? : string,
	quantity? : number | string,
	quoteOrderQty? : number,
	price? : number | string,
	newClientOrderId? : string,
	stopPrice? : number,
	icebergQty? : number,
	newOrderRespType? : string,
}