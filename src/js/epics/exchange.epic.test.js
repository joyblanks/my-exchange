import { TestScheduler } from 'rxjs/testing';
import { exchangeEpics }  from './exchange.epic';
import { CURRENCY } from '../constants/action-types';


const testScheduler = new TestScheduler((actual, expected) => {
    // somehow assert the two objects are equal
    // e.g. with chai `expect(actual).deep.equal(expected)`
  });

describe('exchange epics', () => {
    it('should get the exchange rates', (cb) => {
        testScheduler.run(({ hot, cold, expectObservable }) => {
            const action$ = hot('-a', {
              a: { type: CURRENCY.UPDATE, base: 'USD' }
            });
            const state$ = null;
            
            const output$ = exchangeEpics.getExchangeRates(action$, state$);
          
            expectObservable(output$).toBe('---a', {
              a: {
                type: CURRENCY.RATES_RECEIVED,
              }
            });
          });          
    });
});
