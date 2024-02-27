import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { convertReducer } from "./convert-reducer";
import { ThunkDispatch, thunk } from "redux-thunk";
import { useDispatch } from "react-redux";


const rootReducer = combineReducers({
   convert: convertReducer
})

export const store = legacy_createStore(rootReducer, undefined, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>


export const useAppDispatch = () => useDispatch<AppDispatch>()

// @ts-ignore
window.store = store;