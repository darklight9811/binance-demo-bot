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