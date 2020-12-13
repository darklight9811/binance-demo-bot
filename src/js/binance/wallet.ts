// Binance
import { info } from "./account.ts";

export async function balance (symbol? : string | string[]) {
	const wallet = ((await info()) as any).balances;
	let value : any;

	if (!symbol)
		value = wallet.filter((value : any) => (!!/[1-9]+/.exec(value.free) && !!/[1-9]+/.exec(value.locked)));
	else if (typeof symbol === "object")
		value = wallet.filter((value : any) => symbol.includes(value.asset));
	else
		value = wallet.filter((value : any) => value.asset === symbol)[0];

	return value.reduce((prev : any, {asset, free, locked} : any) => {
		prev[asset] = {free,locked};

		return prev;
	}, {});
}