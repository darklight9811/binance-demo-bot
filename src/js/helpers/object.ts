export function concat (obj : Object, separator : string = "&") {
	let response = "";

	for (const key in obj) {
		response += `${separator}${key}=${(obj as any)[key]}`
	}

	return response.replace(new RegExp("^" + separator), "");
}