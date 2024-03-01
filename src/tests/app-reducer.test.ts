// import { AppReducerStateType, appReducer, setBaseCurrency } from "../redux/app-reducer";

// let initialState: AppReducerStateType

// beforeEach(() => {
//    initialState = {
//       baseCurrency: 'USD',
//       targetCurrency: 'RUB',
//       amountCurrency: 1
//    };
// })


// test('should handle SET-BASE-CURRENCY action', () => {
//    const action = setBaseCurrency('EUR');
//    const newState = appReducer(initialState, action);

//    expect(newState.baseCurrency).toEqual('EUR');
//    expect(newState.targetCurrency).toEqual('RUB');
//    expect(newState.amountCurrency).toEqual(1);
// });