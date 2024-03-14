import { Dispatch } from "redux"
import { setErrorMessage } from "../redux/response-reducer"

export const handleError = (e: any, dispatch: Dispatch) => {
   if (e.code === "ERR_BAD_REQUEST") {
      dispatch(setErrorMessage(e.response.data["error-type"]))
   } else if (e.code === "ERR_NETWORK") {
      dispatch(setErrorMessage(e.message))
   } else {
      dispatch(setErrorMessage(e.message))
   }
}