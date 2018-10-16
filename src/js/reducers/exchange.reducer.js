import { CURRENCY } from '../constants/action-types';
import { initialState } from './index';

/**
 * the reducer for the exchange window
 * @param {Object} state 
 * @param {Object} action 
 */
export const exchangeReducer = (state = initialState, action) => {
    switch(action.type){
        case CURRENCY.WALLETS_RECEIVED:
            return {...state, wallets: [...state.wallets, ...action.wallets]}
        case CURRENCY.RATES_RECEIVED:
            return { ...state, rates: action.rates };
        case CURRENCY.CHANGED:
            let exchangeObj = {...state.exchange};
            if(action.payload.fromCurrency !== undefined){
                const fromCurrencySym = state.wallets.find(wallet => action.payload.fromCurrency===wallet.id).currency;
                const from = state.rates[fromCurrencySym];
                exchangeObj = {...exchangeObj, from, fromCurrencySym};
            } else if(action.payload.toCurrency !== undefined){
                const toCurrencySym = state.wallets.find(wallet => action.payload.toCurrency===wallet.id).currency;
                const to = state.rates[toCurrencySym];
                exchangeObj = {...exchangeObj, to, toCurrencySym};
            }
            return {...state, ...action.payload, exchange: exchangeObj};
        case CURRENCY.CONVERTED:
            const {type, ...exchange} = action;
            return {...state, exchange };
        case CURRENCY.SETRATES:
            if(state.exchange){
                const from = action.rates[state.exchange.fromCurrencySym];
                const to = action.rates[state.exchange.toCurrencySym];
                return {...state, exchange: {...state.exchange, from, to} } ;
            } else return state;
        default:
            return state;
    }
};

