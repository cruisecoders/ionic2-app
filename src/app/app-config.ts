import { OpaqueToken } from '@angular/core';

export let APP_CONFIG = new OpaqueToken('app.config');

export interface AppConfig {
    apiEndpoint: string;
}

export const API_CONFIG: AppConfig = {
    apiEndpoint: 'http://localhost:8080/api/',
};