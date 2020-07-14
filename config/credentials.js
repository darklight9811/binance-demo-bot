// Packages
import { config } 	from "https://deno.land/x/dotenv/mod.ts";

export default {
	"key"		: config().BINANCE_API_KEY,
	"secret"	: config().BINANCE_API_SECRET
}