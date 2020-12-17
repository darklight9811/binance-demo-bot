// Binance
import { openOrders, cancel } 	from "../../binance/trades.ts";

// Interfaces
import { ApplicationInterface } from "../interface.ts";

// Helpers
import { log } 			from "../../helpers/console.ts";
import Logger 			from "../../helpers/log.ts";
import { timestamp } 	from "../../helpers/string.ts";

// Properties
let totalOrdersClosed = 0;

export default async function updateOrders ({config}: ApplicationInterface) {
	const orders = await openOrders(config.pair[0] + config.pair[1]);

	if (orders.length === 0) {
		log("No open orders at the moment");
	}
	else {
		let roundCloseOrder = 0;

		// only close orders if the config sets it
		if (config.closeOrdersTime) {
			for (let i = 0; i < orders.length; i++) {
				const order = orders[i];
				const time 	= new Date(order.updateTime);
				const limit = time.getTime() + (config.closeOrdersTime * 60 * 60 * 1000);
	
				// close old order
				if (limit < (new Date()).getTime()) {
					Logger.general(`${config.pair[0] + config.pair[1]} [${timestamp(undefined, true)}] closing order {${order.orderId}}`);
					const response = await cancel(config.pair[0] + config.pair[1], order.orderId);
					roundCloseOrder++;
				}
			}
		}

		totalOrdersClosed += roundCloseOrder;

		log(`There are ${orders.length - roundCloseOrder} open orders, ${totalOrdersClosed} were closed`);
	}

	return orders;
}
