
import { combineReducers } from 'redux';
import { exchangeReducer } from './exchange.reducer';
/**
 * the initial state of the app
 */
export const initialState = {
    base: 'USD',
    wallets: [],
    rates: {},
    fromCurrency: 0,
    toCurrency: 1
};

/**
 * Export all combined reducers for the App
 */
export default combineReducers({
    exchangeReducer: exchangeReducer
});

