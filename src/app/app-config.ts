import { OpaqueToken } from '@angular/core';

export let APP_CONFIG = new OpaqueToken('app.config');

export interface AppConfig {
    apiEndpoint: string;
    apiImgEndPoint: string;
    LUGGAGE: string;
    FRESHENUP: string;
    COD: string;
    Paytm: string;
    Pending: string;
    Confirmed: string;
    Checkin_Date_Pending: string;
    Checkin_Date_Cancelled: string;
}

export const API_CONFIG: AppConfig = {
    apiEndpoint: 'http://localhost:8080/api/',
    LUGGAGE: "LUGGAGE",
    FRESHENUP: "FRESHENUP",
    apiImgEndPoint: 'http://localhost:8080/static/images/',
    COD: "COD",
    Paytm: "Paytm",
    Pending: "Pending",
    Confirmed: "Confirmed",
    Checkin_Date_Pending: "Checkin_Date_Pending",
    Checkin_Date_Cancelled: "Checkin_Date_Cancelled"
};