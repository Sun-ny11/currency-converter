
export type RequestType = "idle" | "loading" | "succeeded" | "error"

export type InitialStateType = {
   isInitialized: boolean
   status: RequestType
   error: string | null
}
export type ActionAppType = setStatusType | setErrorType | setIsInitializedType
export type setStatusType = ReturnType<typeof setStatus>
export type setErrorType = ReturnType<typeof setError>
export type setIsInitializedType = ReturnType<typeof setIsInitialized>

const initialState: InitialStateType = {
   isInitialized: false,
   status: "idle",
   error: null 
}
export const errorReducer = (state: InitialStateType = initialState, action: ActionAppType): InitialStateType => {
   switch (action.type) {
      case "SET-STATUS": {
         return { ...state, status: action.payload.status };
      }
      case "SET-ERROR": {
         return { ...state, error: action.payload.error };
      }
      case "SET-IS-INITIALIZED":{
         return { ...state, isInitialized: action.payload.status };
      }
      default:
         return state;;
   }
}

export const setStatus = (status: RequestType) => {
   return {
      type: "SET-STATUS",
      payload: {
         status
      }
   } as const
}
export const setError = (error: string | null) => {
   return {
      type: "SET-ERROR",
      payload: {
         error
      }
   } as const
}
export const setIsInitialized = (status: boolean) => {
   return {
      type: "SET-IS-INITIALIZED",
      payload: {
         status
      }
   } as const
}