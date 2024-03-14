import { Dispatch } from "redux"
import { Currency, comparisonPare, convertAPI } from "../api/convert-api"
import { handleError } from "../utils/handle-error"

type convertReducerType = comparisonACType | supportedCurrencyACType | setSecondCurrencyType | setErrorMessageType
type comparisonACType = ReturnType<typeof comparisonAC>
type supportedCurrencyACType = ReturnType<typeof supportedCurrencyAC>
type setSecondCurrencyType = ReturnType<typeof setSecondCurrency>
type setErrorMessageType = ReturnType<typeof setErrorMessage>


export type convertStateReducerType = comparisonPare & {
   supported_codes: Currency[]
   error: string | null,
}

const initialState = {
   result: "",
   documentation: "",
   terms_of_use: "",
   time_last_update_unix: 0,
   time_last_update_utc: "",
   time_next_update_unix: 0,
   time_next_update_utc: "",
   base_code: "",
   target_code: "",
   conversion_rate: 0,
   conversion_result: 0,
   supported_codes: [
      ["", ""],
   ],
   error: null
}
export const responseReducer = (state: convertStateReducerType = initialState, action: convertReducerType): convertStateReducerType => {
   switch (action.type) {
      case "COMPARISON": {
         return { ...action.payload.resPair, supported_codes: [...state.supported_codes], error: state.error }
      }
      case "SUPPORTED-CURRENCY": {
         return { ...state, supported_codes: action.payload.supCode }
      }
      case "SET-SECOND-CURRENCY": {
         return { ...state, conversion_result: action.payload.second }
      }
      case "SET-ERROR-MESSAGE": {
         return { ...state, error: action.payload.message }
      }
      default:
         return state
   }
}
export const comparisonAC = (resPair: comparisonPare) => {
   return {
      type: "COMPARISON",
      payload: {
         resPair,
      }
   } as const
}
export const supportedCurrencyAC = (supCode: Currency[]) => {
   return {
      type: "SUPPORTED-CURRENCY",
      payload: {
         supCode,
      }
   } as const
}
export const setSecondCurrency = (second: number) => {
   return {
      type: "SET-SECOND-CURRENCY",
      payload: {
         second
      }
   } as const
}
export const setErrorMessage = (message: string) => {
   return {
      type: "SET-ERROR-MESSAGE",
      payload: {
         message
      }
   } as const
}




export const comparisonTC = (base: string, target: string, amount: number) => async (dispatch: Dispatch) => {
   try {
      let res = await convertAPI.comparisonPair(base, target, amount)
      dispatch(comparisonAC(res.data))
   } catch (e: any) {
      console.log(e);

      handleError(e, dispatch)
   }

}
export const supportedCurrencyTC = () => async (dispatch: Dispatch) => {
   try {
      let res = await convertAPI.fetchSupportedCodes()
      dispatch(supportedCurrencyAC(res.data.supported_codes))
   } catch (e: any) {
      handleError(e, dispatch)
   }

}