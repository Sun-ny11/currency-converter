import { Dispatch } from "redux"
import { Currency, comparisonPare, convertAPI } from "../api/convert-api"
import { RequestType, setStatus } from "./error-reducer"

type convertReducerType = comparisonACType | supportedCurrencyACType | setSecondCurrencyType
type comparisonACType = ReturnType<typeof comparisonAC>
type supportedCurrencyACType = ReturnType<typeof supportedCurrencyAC>
type setSecondCurrencyType = ReturnType<typeof setSecondCurrency>


export type convertStateReducerType = comparisonPare & {
   supported_codes: Currency[]
}

const initialState = {
   result: "idle" as RequestType,
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
   ]
}
export const convertReducer = (state: convertStateReducerType = initialState, action: convertReducerType): convertStateReducerType => {
   switch (action.type) {
      case "COMPARISON": {
         return { ...action.payload.resPair, supported_codes: [...state.supported_codes] }
      }
      case "SUPPORTED-CURRENCY": {
         return { ...state, supported_codes: action.payload.supCode }
      }
      case "SET-SECOND-CURRENCY": {
         console.log(state);

         return { ...state, conversion_result: action.payload.second }
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





export const comparisonTC = (base: string, target: string, amount: number) => async (dispatch: Dispatch) => {
   try {
      dispatch(setStatus("loading"))
      let res = await convertAPI.comparisonPair(base, target, amount)
      dispatch(comparisonAC(res.data))
      dispatch(setStatus(res.data.result))

   } catch (e: any) {


   }

}
export const supportedCurrencyTC = () => async (dispatch: Dispatch) => {
   try {
      let res = await convertAPI.fetchSupportedCodes()
      dispatch(supportedCurrencyAC(res.data.supported_codes))
   } catch (e: any) {
      //       console.log(e.response.data.result);

      // dispatch(setStatus(e.result))

      // dispatch(setError("dx"))
   }

}