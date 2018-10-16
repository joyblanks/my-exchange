import { CURRENCY } from '../constants/action-types'

//For polling rates
const getExchangeRates = (base) => ({base, type: CURRENCY.UPDATE});
const stopPollingRates = () => ({type: CURRENCY.STOP_UPDATE});
const receiveExchangeRates = (payload) => ({...payload, type: CURRENCY.RATES_RECEIVED});

//For fetching wallet initial balance
const loadWallets = () => ({type: CURRENCY.LOAD});
const receiveWallets = (payload) => ({...payload, type: CURRENCY.WALLETS_RECEIVED});

//For changing currency in view
const changeCurrency = (where, id) => ({payload: {[where]:id}, type: CURRENCY.CHANGE});
const changedCurrency = (payload) => ({...payload, type: CURRENCY.CHANGED});

//For exhanging in between currency in view
const convertCurrency = (payload) => ({...payload, type: CURRENCY.CONVERT});
const convertedCurrency = (payload) => ({...payload, type: CURRENCY.CONVERTED});

//Ticker for Rate live conversion
const setExchangeRates = (payload) => ({...payload, type: CURRENCY.SETRATES});

/**
 * Export all actions for the module exchange
 */
export const ExchangeActions = {
    getExchangeRates,
    stopPollingRates,
    receiveExchangeRates,

    loadWallets,
    receiveWallets,

    changeCurrency,
    changedCurrency,

    convertCurrency,
    convertedCurrency,
    setExchangeRates
}