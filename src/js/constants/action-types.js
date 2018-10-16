
/**
 * App Constants
 */
export const CURRENCY = {
    UPDATE: 'UPDATE_RATES',
    STOP_UPDATE: 'STOP_UPDATE',
    RATES_RECEIVED: 'RATES_RECEIVED',
    LOAD: 'LOAD_WALLET',
    WALLETS_RECEIVED: 'WALLETS_RECEIVED',
    CHANGE: 'CURRENCY_CHANGE',
    CHANGED: 'CURRENCY_CHANGED',
    CONVERT: 'CURRENCY_CONVERT',
    CONVERTED: 'CURRENCY_CONVERTED',
    SETRATES: 'SETRATES'
};

/**
 * Environment Constants
 */
const PROD_ENV = {
    IS_PROD: true,
    WALLET_API: '/wallets.json',
    EXHANGE_API: 'https://openexchangerates.org/api/latest.json?app_id=8dba75b60a87447fb676147584c7c9fb'
};

const DEV_ENV = {
    IS_PROD: false,
    WALLET_API: '/wallets.json?',
    EXHANGE_API: '/latest.json?'
}


export const ENV = {...process.env.NODE_ENV === 'production' ? PROD_ENV : DEV_ENV};
