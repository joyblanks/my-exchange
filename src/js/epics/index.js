import { combineEpics } from 'redux-observable';
import { exchangeEpics } from './exchange.epic';
/**
 * combine Epics to export
 */
export const rootEpic = combineEpics(
    exchangeEpics.getExchangeRates, 
    exchangeEpics.loadWallets,
    exchangeEpics.changeCurrency,
    exchangeEpics.convertCurrency
);
