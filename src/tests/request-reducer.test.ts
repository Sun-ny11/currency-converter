import { requestReducer, setBaseCurrency, setTargetCurrency, setAmountCurrency, AppReducerStateType } from '../redux/request-reducer';
import { beforeEach, expect, test } from 'vitest'

let initialState: AppReducerStateType;

beforeEach(() => {
   initialState = {
      baseCurrency: 'USD',
      targetCurrency: 'RUB',
      amountCurrency: 1,
   };
});

test('should handle SET-BASE-CURRENCY action', () => {
   const action = setBaseCurrency('EUR');
   const newState = requestReducer(initialState, action);

   expect(newState.baseCurrency).toEqual('EUR');
   expect(newState.targetCurrency).toEqual('RUB');
   expect(newState.amountCurrency).toEqual(1);
});

test('should handle SET-TARGET-CURRENCY action', () => {
   const action = setTargetCurrency('GBP');
   const newState = requestReducer(initialState, action);

   expect(newState.baseCurrency).toEqual('USD');
   expect(newState.targetCurrency).toEqual('GBP');
   expect(newState.amountCurrency).toEqual(1);
});

test('should handle SET-AMOUNT-CURRENCY action', () => {
   const action = setAmountCurrency(10);
   const newState = requestReducer(initialState, action);

   expect(newState.baseCurrency).toEqual('USD');
   expect(newState.targetCurrency).toEqual('RUB');
   expect(newState.amountCurrency).toEqual(10);
});

test('should return the same state for unknown action types', () => {
   const action = { type: 'UNKNOWN_ACTION' } as any;
   const newState = requestReducer(initialState, action);

   expect(newState).toEqual(initialState);
});
