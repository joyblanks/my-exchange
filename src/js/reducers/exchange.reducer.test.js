import expect from 'expect';

import  { exchangeReducer }  from "./exchange.reducer";

describe('exchange reducer', () => {
    it('should return the initial state', () => {
        expect(exchangeReducer(undefined, {})).toEqual({
            base: 'USD',
            wallets: [],
            rates: {},
            fromCurrency: 0,
            toCurrency: 1
        });
    });
});