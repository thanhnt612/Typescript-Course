import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { type } from '@testing-library/user-event/dist/type';
import { ACCESSTOKEN, http, settings, USER_LOGIN } from '../../utils/config';
import { DispatchType } from '../configStore';
import { UserLogin } from '../../pages/Login/Login';

export interface UserProfile {
    ordersHistory: OrdersHistory[];
    email: string;
    name: string;
    password: null;
    gender: boolean;
    phone: string;
    facebookId: string;
    deleted: boolean;
    avatar: string;
}


export interface OrdersHistory {
    orderDetail: OrderDetail[];
    id: number;
    date: Date;
    status: null;
    email: string;
    alias: string;
}

export interface OrderDetail {
    name: string;
    alias: string;
    shortDescription: string;
    quantity: number;
    price: number;
    image: string;
    description: string;
}

type UserLoginResult = {
    email: string;
    accessToken: string;
}

export type UserState = {
    userLogin?: UserLoginResult | null | undefined,
    userProfile?: UserProfile | null | undefined,
}
const initialState: UserState = {
    userLogin: settings.getStorageJson(USER_LOGIN),
    userProfile: null
}

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        setUserLoginAction: (state: UserState, action: PayloadAction<UserLoginResult>) => {
            state.userLogin = action.payload
        },
        setUserProfileAction: (state: UserState, action: PayloadAction<UserProfile>) => {
            state.userProfile = action.payload
        }
    }
});

export const { setUserLoginAction, setUserProfileAction } = userReducer.actions

export default userReducer.reducer

export const getProfileApi = () => {
    return async (dispatch: DispatchType) => {
        const result = await http.post('/api/users/getprofile');
        const action: PayloadAction<UserProfile> = setUserProfileAction(result.data.content);
        dispatch(action)
    }
}

export const loginApi = (userLogin: UserLogin) => {
    return async (dispatch: DispatchType) => {
        const result = await http.post('/api/Users/signin', userLogin);
        const action: PayloadAction<UserLoginResult> = setUserLoginAction(result.data.content);
        await dispatch(action);
        //Sau đó lưu thông tin vào localstore và dispatch lại profile
        settings.setStorageJson(USER_LOGIN, result.data.content);
        settings.setStorage(ACCESSTOKEN, result.data.content.accessToken);
        settings.setCookie(ACCESSTOKEN, result.data.content.accessToken, 30);
        //dispatch profile
        dispatch(getProfileApi());
    }
}