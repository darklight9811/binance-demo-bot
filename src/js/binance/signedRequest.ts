// Packages
import { hmac } from "https://denopkg.com/chiefbiiko/hmac/mod.ts";

// Helpers
import { toAbsolute, concat } from "../helpers/url.ts";

// Binance
import { serverTime } from "./general.ts";

let _credentials = {
	key: "",
	secret: (value: string) => value
};

/**
* Set current credentials
* 
* Set the current user key and secret for future API calls
* 
* @function credentials
* @param  {string} key 
* @param  {string} secret
*/
export function credentials(key: string, secret: string): void {
	_credentials = {
		key,
		//secret:"e95d87da249b3e2ffa6725e3c6ac324daec67da5535fa676279e82184ebce960"
		secret: (value: string) => {
			return hmac("sha256", secret, value, "utf8", "hex") as string;
		}
	};
}

/* Helpers */

const getUrl = async (url: string) => {
	const _serverTime = await serverTime();
	let _url = request.options.baseUrl === "" ? toAbsolute(url) : toAbsolute(concat(request.options.baseUrl as string, url));
	_url += (/\?/.exec(_url) ? "&" : "?") + `timestamp=${_serverTime}`;
	_url += `&signature=${_credentials.secret(_url.split("?")[1])}`;

	return _url;
}

const getOptions = (options: Record<string, unknown> = {}) => {
	let _options = { ...request.options.headers as Record<string, unknown> };
	(_options.headers as Record<string, unknown>)["X-MBX-APIKEY"] = _credentials.key;
	_options = { ..._options, ...options };

	return _options;
}

/* Request options */

const _get = async (url: string, options?: Record<string, unknown>) => {
	const response = await fetch(await getUrl(url), { method: "GET", ...getOptions(options) });
	return await response.json();
};

const _post = async (url: string, data?: Record<string, unknown>, options?: Record<string, unknown>) => {
	const response = await fetch(await getUrl(url), { method: "POST", body: JSON.stringify(data), ...getOptions(options) });
	return await response.json();
};

const _put = async (url: string, data?: Record<string, unknown>, options?: Record<string, unknown>) => {
	const response = await fetch(await getUrl(url), { method: "PUT", body: JSON.stringify(data), ...getOptions(options) });
	return await response.json();
};

const _patch = async (url: string, data?: Record<string, unknown>, options?: Record<string, unknown>) => {
	const response = await fetch(await getUrl(url), { method: "PATCH", body: JSON.stringify(data), ...getOptions(options) });
	return await response.json();
};

const _delete = async (url: string, options?: Record<string, unknown>) => {
	const response = await fetch(await getUrl(url), { method: "DELETE", ...getOptions(options) });
	return await response.json();
};

/* Default */

async function request(url: string, options?: Record<string, unknown>) {
	return await _get(url, options);
}

/* Authentication methods */
request.options = {} as Record<string, unknown>;
request.options.baseUrl = "";
request.options.headers = {
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json",
	}
};

/* Available methods */

request.get = _get;
request.put = _put;
request.post = _post;
request.patch = _patch;
request.delete = _delete;

/* Authentication methods */

export default request;