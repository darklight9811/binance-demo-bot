export function format (date: Date) {
	const year 	= date.getFullYear();
	const month = date.getMonth();
	const day 	= date.getDate();

	const hour		= date.getHours();
	const minutes 	= date.getMinutes();
	const seconds 	= date.getSeconds();
	
	return `${hour}:${minutes}:${seconds} ${day}/${month + 1}/${year}`;
}