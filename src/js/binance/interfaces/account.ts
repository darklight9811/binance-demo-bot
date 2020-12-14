export interface AccountInterface {
	makerCommission: number;
	takerCommission: number;
	buyerCommission: number;
	sellerComission: number;

	canTrade: boolean;
	canWithdraw: boolean;
	canDeposit: boolean;

	updateTime: number;

	accountType: "SPOT" | "MARGIN";
	permissions: [ "SPOT" ];

	balances: {
		asset: string;
		free: string;
		locked: string;
	}[];
}

export interface TradeInterface {
	id: number | string;
	orderId: number | string;

	symbol: string;
	price: string;
	qty: string;
	quoteQty: string;
	commission: string;
	commisionAsset: string;

	time: number;

	isBuyer: boolean;
	isMaker: boolean;
	isBestMatch: boolean;
}
