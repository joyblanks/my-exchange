import { CURRENCY } from "../constants/action-types";
import { Actions } from "../action-creators";
import { API } from "../utils/api";
import { ofType } from "redux-observable";
import { switchMap, map, takeUntil, mergeMap, tap, catchError } from 'rxjs/operators';
import { timer, of } from "rxjs";

/**
 * Epic: The poller for getting the exchange rates polls every 10s
 * Note : you can remove the commented line to see rates fluctuate for testing
 * @param {Observable<Action>} action$ 
 */
const getExchangeRates = (action$) => action$
    .pipe(
        ofType(CURRENCY.UPDATE),
        switchMap(() => timer(0, 10000)),
        takeUntil(action$.pipe(ofType(CURRENCY.STOP_UPDATE))),
        switchMap(() => API.getExchageRates$()),
        tap(data => {
            //For Testing
            //data.rates.GBP = Math.random();
            return data;
        }),
        mergeMap( data => of(
            Actions.receiveExchangeRates(data),
            Actions.setExchangeRates(data)
        )),
        catchError(error => of({
            type: 'ERROR',
            error
        }))
    );

/**
 * Epic: Load multiple wallets/currencies for an account
 * @param {Observable<Action>} action$ 
 */
const loadWallets = (action$) => action$
    .pipe(
        ofType(CURRENCY.LOAD),
        switchMap(() => API.getWallets$()),
        map(Actions.receiveWallets),
        catchError(error => of({
            type: 'ERROR',
            error
        }))
    );

/**
 * Epic: change the currency/wallet for both send/receive
 * @param {Observable<Action>} action$ 
 */
const changeCurrency = (action$) => action$
    .pipe(
        ofType(CURRENCY.CHANGE),
        map(Actions.changedCurrency),
        catchError(error => of({
            type: 'ERROR',
            error
        }))
    );

/**
 * Epic: convert currency for checking balance
 * @param {Observable<Action>} action$ 
 */
const convertCurrency = (action$) => action$
    .pipe(
        ofType(CURRENCY.CONVERT),
        map(Actions.convertedCurrency),
        catchError(error => of({
            type: 'ERROR',
            error
        }))
    );

/**
 * Export all epics for this Exchange module
 */
export const exchangeEpics = {
    getExchangeRates, 
    loadWallets,
    changeCurrency,
    convertCurrency
}
