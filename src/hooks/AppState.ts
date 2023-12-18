import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppState} from "@/store/AppState";

export const useAppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector