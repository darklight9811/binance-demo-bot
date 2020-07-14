export default interface iOptions {
	pair : [
		string,
		string
	],
	refreshRate : number,
	profit 		: number,
	order: {
		extra:number,
		count:number,
	}
}