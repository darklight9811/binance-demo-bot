export interface ExchangeInfoInterface {
	symbol: string;
	status: "TRADING";

	baseAsset: string;
	baseAssetPrecision: number;

	quoteAsset: string;
	quotePrecision: number;
	quoteAssetPrecision: number;

	baseCommissionPrecision: number;
	quoteCommissionPrecision: number;

	orderTypes: ("LIMIT" | "LIMIT_MAKER" | "MARKET" | "STOP_LOSS_LIMIT" | "TAKE_PROFIT_LIMIT")[];

	icebergAllowed: boolean;
	ocoAllowed: boolean;
	quoteOrderQtyMarketAllowed: boolean;
	isSpotTradingAllowed: boolean;
	isMarginTradingAllowed: boolean;

	filter: {
		filterType: string;
		[key: string]: string | number;
	}[];

	permissions: ("SPOT" | "MARGIN")[];
}