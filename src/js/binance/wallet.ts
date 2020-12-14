// Binance
import { info } from "./account.ts";

export async function balance (symbol? : string | string[]) {
	const wallet = (await info()).balances;
	let value : unknown;

	if (!symbol)
		value = wallet.filter((value) => (!!/[1-9]+/.exec(value.free) && !!/[1-9]+/.exec(value.locked)));
	else if (typeof symbol === "object")
		value = wallet.filter((value) => symbol.includes(value.asset));
	else
		value = wallet.filter((value) => value.asset === symbol)[0];

	return (value as typeof wallet).reduce((prev, {asset, free, locked}) => {
		prev[asset] = {free,locked};

		return prev;
	}, {} as Record<string, {free: string, locked: string}>);
}