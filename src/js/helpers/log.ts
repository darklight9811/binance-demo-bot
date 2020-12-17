// Packages
import { ensureDirSync } 	from "https://deno.land/std@0.80.0/fs/ensure_dir.ts";
import { join, parse }		from "https://deno.land/std@0.80.0/path/mod.ts";

// Helpers
import { timestamp }	from "./string.ts";

// -------------------------------------------------
// Helper methods
// -------------------------------------------------

async function save (pathToSave : string, stringToSave : string) {
	const encoder 	= new TextEncoder();
	const text 		= encoder.encode(stringToSave + "\n");
	const savePath	= join(Deno.cwd(), 'logs', `${pathToSave}.log`);

	//Make sure the path exists
	ensureDirSync(parse(savePath).dir);

	//Write to file
	const file = Deno.openSync(savePath, { write:true, create:true, append:true });
	await Deno.writeAll(file, text);
	Deno.close(file.rid);
}

// -------------------------------------------------
// Export
// -------------------------------------------------

 export default {
	general: async (text : string) => {
		await save(`${timestamp()}`, text);
	},

	log: async (pathToSave : string, stringToSave : string) => {
		await save(pathToSave, stringToSave);
	}
}