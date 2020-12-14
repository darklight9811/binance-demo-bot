export function format (d: Date) {
	// date
	const day = ('0' + d.getDate()).slice(-2);
	const month = ('0'+(d.getMonth()+1)).slice(-2);
	const year = d.getFullYear();

	// time
	const hour = ('0' + d.getHours()).slice(-2);
	const minutes = ('0' + d.getMinutes()).slice(-2);
	const seconds = ('0' + d.getSeconds()).slice(-2);

	return `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`;
}