export default interface iOptions {
	pair : [
		string,
		string
	],
	strategy		: string,
	refreshRate 	: number,
	profit 			: number,
	closeOrdersTime?: number,
	order: {
		extra:number,
		count:number,
	}
}