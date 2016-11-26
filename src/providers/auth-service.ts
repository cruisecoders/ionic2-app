import { CoreService } from './core-service';
import { APP_CONFIG, AppConfig } from '../app/app-config';
import { User } from '../pages/auth-form/user';
import { Inject, Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Storage } from '@ionic/storage';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

    public userProfile: User;
    authtoken: any;
    api: string;
    storage: Storage = new Storage();

    constructor(private http: Http, @Inject(APP_CONFIG) config: AppConfig, private coreService: CoreService) {
        this.api = config.apiEndpoint;
    }

    public loaduserProfile(): User {
        return this.userProfile;
    }

    public login(user: User): Observable<User> {
        return this.coreService.getResource('login', this.getURLSearchParams("number", user.number + ""));
    }

    public signup(user: User): Observable<User> {
        return this.coreService.getResource('signup', this.getURLSearchParams("number", user.number + ""));
    }

    public submitOTP(user: User): Observable<any> {
        return this.coreService.postResource('submitOtp', user);
    }

    public regenerateOTP(user: any): any {
        return this.coreService.getResource('regenerateOTP', this.getURLSearchParams("number", user.number + ""));
    }

    public logout(): void {
        this.storage.remove('id_token');
        this.storage.remove('userInfo');
        this.userProfile = null;
        this.authtoken = null;
    }

    public storeToken(token: string): void {
        this.storage.set("id_token", token);
        this.authtoken = token;
    }

    public storeUserProfile(user: User): void {
        this.storage.set("userInfo", user);
        this.userProfile = user;
    }

    private getURLSearchParams(key: string, value: string): URLSearchParams {
        let params = new URLSearchParams();
        params.set(key, value);
        return params;
    }


    //TODO incomplete method
    public isAuthorized(): any {
        let isAuth = tokenNotExpired('id_token', this.authtoken);
        console.log("is auth " + isAuth);
        // this.storage.get('id_token').then(
        //     data =>{
        //     isAuth = tokenNotExpired("id_token", data);
        //     console.log(isAuth);
        // });
        // console.log(isAuth);
        return isAuth;
    }

}