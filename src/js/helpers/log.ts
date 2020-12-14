// Packages
import { ensureDirSync } 	from "https://deno.land/std@0.80.0/fs/ensure_dir.ts";
import { join, parse }		from "https://deno.land/std@0.80.0/path/mod.ts";

// Helpers
import { timestamp }	from "./string.ts";

/*
 * Logger is responsible for saving txt files that register every event occurred
 * within catbot
 *
 */
 export default class Logger {

    //-------------------------------------------------
    // Event methods
	//-------------------------------------------------

	public onGeneric (text : string) {
		Logger.general(text);
	}

    //-------------------------------------------------
    // Main methods
	//-------------------------------------------------

	public static general (text : string) {
		Logger.save(`${timestamp()}asds`, `${timestamp(undefined, true)} (date) - ${text}`);
	}

    //-------------------------------------------------
    // Helper methods
	//-------------------------------------------------

	private static async save (pathToSave : string, stringToSave : string) {
		const encoder 	= new TextEncoder();
		const text 		= encoder.encode(stringToSave + "\n");
		const savePath	= join('logs', `${pathToSave}.log`);

		//Make sure the path exists
		ensureDirSync(parse(savePath).dir);

		console.log(parse(savePath).dir);

		//Write to file
		const file = Deno.openSync(savePath, { write:true, create:true, append:true });
		Deno.writeAllSync(file, text);
		Deno.close(file.rid);
	}
}