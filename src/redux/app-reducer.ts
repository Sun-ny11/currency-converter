type AppReducerType = setBaseCurrencyType | setTargetCurrencyType | setAmountCurrencyType
type setBaseCurrencyType = ReturnType<typeof setBaseCurrency>
type setTargetCurrencyType = ReturnType<typeof setTargetCurrency>
type setAmountCurrencyType = ReturnType<typeof setAmountCurrency>

export type AppReducerStateType = {
   baseCurrency: string
   targetCurrency: string
   amountCurrency: number
}
const initialState = {
   baseCurrency: "USD",
   targetCurrency: "RUB",
   amountCurrency: 1
}
export const appReducer = (state: AppReducerStateType = initialState, action: AppReducerType): AppReducerStateType => {
   switch (action.type) {
      case "SET-BASE-CURRENCY": {
         return { ...state, baseCurrency: action.payload.base }
      }
      case "SET-TARGET-CURRENCY": {
         return { ...state, targetCurrency: action.payload.target }
      }
      case "SET-AMOUNT-CURRENCY": {
         return { ...state, amountCurrency: action.payload.amount }
      }

      default:
         return state
   }
}
export const setBaseCurrency = (base: string) => {
   return {
      type: "SET-BASE-CURRENCY",
      payload: {
         base
      }
   } as const
}
export const setTargetCurrency = (target: string) => {
   return {
      type: "SET-TARGET-CURRENCY",
      payload: {
         target
      }
   } as const
}
export const setAmountCurrency = (amount: number) => {
   return {
      type: "SET-AMOUNT-CURRENCY",
      payload: {
         amount
      }
   } as const
}
