let cacheConsole = [] as unknown[];

export const log = (value: unknown) => cacheConsole.push(value);
export const clear = () => cacheConsole = [];
export const print = () => cacheConsole.forEach(i => console.log(i));