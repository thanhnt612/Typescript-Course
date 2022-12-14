import axios from "axios";
import { createBrowserHistory } from "history";
export const USER_LOGIN = "userLogin";
export const ACCESSTOKEN = "accessToken";

export const history = createBrowserHistory()

export const settings = {
    setStorageJson: (name: string, data: any): void => {
        data = JSON.stringify(data);
        localStorage.setItem(name, data);
    },
    setStorage: (name: string, data: string): void => {
        localStorage.setItem(name, data);
    },
    getStorageJson: (name: string): any | undefined => {
        if (localStorage.getItem(name)) {
            const dataStore: string | undefined | null = localStorage.getItem(name);
            if (typeof dataStore == 'string') {
                const data = JSON.parse(dataStore);
                return data
            }
            return undefined;
        }
        return; //undefined
    },
    getStore: (name: string): string | null | undefined => {
        if (localStorage.getItem(name)) {
            const data: string | null | undefined = localStorage.getItem(name);
            return data;
        }
        return; //undefined
    },
    setCookieJson: (name: string, value: any, days: number): void => {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        value = JSON.stringify(value);
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },
    getCookieJson: (name: string): any => {
        var nameEQ = name + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)
                return JSON.parse(c.substring(nameEQ.length, c.length));
        }
        return null;
    },
    setCookie: (name: string, value: any, days: number): void => {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },
    getCookie: (name: string): string | null => {
        var nameEQ = name + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },
    eraseCookie: (name: string): void => {
        document.cookie =
            name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    },
};
//Setup h???ng s???, 1 s??? h??m x??? l?? chung, ...
export const TOKEN_CYBERSOFT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIyMC8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzkyNzA0MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3OTQxODAwMH0.S7l5kogAVJjRW8mjJ5gosJraYq5ahYjrBwnMJAaGxlY";

export const http = axios.create({
    baseURL: "https://shop.cyberlearn.vn", //t???t c??? c??c h??m khi g???i api ?????u s??? d???ng domain n??y
    timeout: 30000, //n???u request m???t 5 ph??t m?? kh??ng nh???n ???????c k???t qu??? th?? hu??? request
});

//C???u h??nh cho request: Client g???i api ?????n server

http.interceptors.request.use(
    (config) => {
        config.headers = {
            ...config.headers,
            TokenCybersoft: TOKEN_CYBERSOFT,
            Authorization: "Bearer " + settings.getStore(ACCESSTOKEN),
        };
        return config;
    },
    (err) => {
        console.log(err);
        return Promise.reject(err);
    }
);

//c???u h??nh cho response: Server s??? tr??? d??? li???u v??? cho client
http.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        //Th???t b???i c???a t???t c??? request s??? d???ng http s??? tr??? v??o ????y
        console.log(error);
        if (error.response?.status === 401) {
            history.push("/login");
        }
        if (error.response?.status === 400 || error.response?.status === 404) {
            history.push("/");
        }
        return Promise.reject(error);
    }
);