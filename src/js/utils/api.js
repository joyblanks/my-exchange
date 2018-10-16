import { from } from "rxjs";
import { flatMap } from 'rxjs/operators';
import { ENV } from "../constants/action-types";

/**
 * Observable wrapper for Fetch API
 * @param {String} url 
 * @param {HTTP_Options} opts 
 */
const getObservable = (url, opts) => from(fetch(url,opts))
    .pipe(
        flatMap(res => from(res.json()))
    );

/**
 * Api to fetch the exchange rates of multiple currencies
 */
const getExchageRates$ = () => getObservable(`${ENV.EXHANGE_API}&_=${new Date().getTime()}`);

/**
 * Api to fetch multiple wallets and respective balance for the logged in user
 */
const getWallets$ = () => getObservable(ENV.WALLET_API);

/**
 * Export all APIs
 */
export const API = {getExchageRates$, getWallets$};