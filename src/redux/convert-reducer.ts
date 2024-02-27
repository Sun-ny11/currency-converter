import { Dispatch } from "redux"
import { comparisonPare, convertAPI } from "../api/convert-api"

type convertReducerType = comparisonACType
type comparisonACType = ReturnType<typeof comparisonAC>

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
}
export const convertReducer = (state: comparisonPare = initialState, action: convertReducerType): comparisonPare => {
   switch (action.type) {
      case "COMPARISON": {
         return action.payload.resPair
      }

      default:
         return state
   }
}
export const comparisonAC = (resPair: comparisonPare) => {
   return {
      type: "COMPARISON",
      payload: {
         resPair
      }
   } as const
}

export const comparisonTC = (main: string, withIt: string) => async (dispatch: Dispatch) => {
   try {
      let res = await convertAPI.comparisonPair(main, withIt)
      dispatch(comparisonAC(res.data))
   } catch (e) {

   }

}