import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { responseReducer } from "./response-reducer";
import { ThunkDispatch, thunk } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { requestReducer } from "./request-reducer";


const rootReducer = combineReducers({
   response: responseReducer,
   request: requestReducer,
})

export const store = legacy_createStore(rootReducer, undefined, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()

// @ts-ignore
window.store = store;