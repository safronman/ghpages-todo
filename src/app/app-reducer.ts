import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../Login/auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

//status === 'loading' крутилку показываем в остальных нет

const initialState = {
    status: 'loading' as RequestStatusType,
    error: 'ERROR' as string | null,
    isInitialized: false
}
export type InitialStateType = typeof initialState
export const appReducer = (state: InitialStateType = initialState, action:
    ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return {...state}
    }
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-IS-INITIALIZED', isInitialized} as const)

export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
            dispatch(setAppInitializedAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            dispatch(setAppStatusAC('failed'))
        }
    })
        .finally(() => {
            dispatch(setAppInitializedAC(true))
        })
}

export type SetAppError = ReturnType<typeof setAppErrorAC>
export type SetAppStatus = ReturnType<typeof setAppStatusAC>
export type SetAppInitialized = ReturnType<typeof setAppInitializedAC>

type ActionsType = SetAppError | SetAppStatus | SetAppInitialized