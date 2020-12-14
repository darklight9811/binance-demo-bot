export interface iAggregateTrades {
	/** ID to get aggregate trades from INCLUSIVE */
	fromId? 	: number,
	/** Timestamp in ms to get aggregate trades from INCLUSIVE */
	startTime? 	: number,
	/** Timestamp in ms to get aggregate trades until INCLUSIVE */
	endTime? 	: number,
	/** Default 500; max 1000. */
	limit? 		: number,
}

export interface OrderBookInterface {
	lastUpdateId: number;
	bids: [string, string][];
	asks: [string, string][];
}

export interface RecentTradesInterface {
	id: number | string;

	price: string;
	qty: string;
	quoteQty: string;

	time: number;

	isBuyerMaker: boolean;
	isBestMatch: boolean;
}

export interface AggregateInterface {
	a: number;
	p: string;
	q: string;
	f: number;
	l: number;
	T: number;
	m: boolean;
	M: boolean;
}

export interface CandleStickInterface {
	openTime: number;
	open: string;

	high: string;
	low: string;

	closeTime: number;
	close: string;

	volume: string;
	quoteAssetVolume: string;
	tradeQty: number;

	takerBuyBaseAssetVolume: string;
	takerBuyQuoteAssetVolume: string;

	ignore: string;
}

export interface AvgPriceInterface {
	mins: number;
	price: string;
}

export interface TickerInterface {
	symbol: string;
	priceChange: string;
	priceChangePercent: string;
	weightedAvgPrice: string;
	prevClosePrice: string;
	lastPrice: string;
	lastQty: string;
	bidPrice: string;
	bidQty: string;
	askPrice: string;
	askQty: string;
	openPrice: string;
	highPrice: string;
	lowPrice: string;
	volume: string;
	quoteVolume: string;
	openTime: number;
	closeTime: number;
	firstId: number;
	lastId: number;
	count: number;
}

export interface TickerBookInterface {
	symbol: string;
	bidPrice: string;
	bidQty: string;
	askPrice: string;
	askQty: string;
}