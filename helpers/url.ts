export function toAbsolute (url : string) {
	if (url === "")
		return "";
	else if (/^(http|https|www|\w+\.\w)/.exec(url))
		return url;
	
	return `http://${url}`;
}

export function concat (...args : string[]) {
	return args.reduce((previous, current) =>
		previous.replace(/(\\|\/)$/, "") + "/" + current.replace(/^(\/|\\)/, "")
	, "").replace(/^\//, "");
}

export function params (url : string) {

	return "";
}