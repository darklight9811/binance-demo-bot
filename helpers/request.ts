import { toAbsolute, concat } from "./url.ts";

const getUrl = (url : string) => {
	return request.options.baseUrl === "" ? toAbsolute(url):toAbsolute(concat(request.options.baseUrl, url));
}

const _get = async (url : string, options? : Object) => {
	const response = await fetch(getUrl(url), {method:"GET",...request.options.headers,...options});
	return await response.json();
};

const _post = async (url : string, data? : Object, options? : Object) => {
	const response = await fetch(getUrl(url), {method:"POST",body:JSON.stringify(data),...request.options.headers,...options});
	return await response.json();
};

const _put = async (url : string, data? : Object, options? : Object) => {
	const response = await fetch(getUrl(url), {method:"PUT",body:JSON.stringify(data),...request.options.headers,...options});
	return await response.json();
};

const _patch = async (url : string, data? : Object, options? : Object) => {
	const response = await fetch(getUrl(url), {method:"PATCH",body:JSON.stringify(data),...request.options.headers,...options});
	return await response.json();
};

const _delete = async (url : string, options? : Object) => {
	const response = await fetch(getUrl(url), {method:"DELETE",...request.options.headers,...options});
	return await response.json();
};

/* Default */

async function request (url : string, options? : Object) {
	return await _get(url, options);
}

/* Authentication methods */
request.options 		= {} as any;
request.options.baseUrl = "";
request.options.headers = {
	headers : {
		"Content-Type":"application/json",
		"Accept":"application/json",
	}
};

/* Available methods */

request.get 	= _get;
request.put 	= _put;
request.post 	= _post;
request.patch	= _patch;
request.delete 	= _delete;

/* Authentication methods */

export default request;