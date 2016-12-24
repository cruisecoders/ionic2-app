import { Loader } from '../../components/loader/loader';
import { APP_CONFIG, AppConfig } from '../../app/app-config';
import { User } from './user';
import { AuthService } from '../../providers/auth-service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PlaceBooking } from '../place-booking/place-booking';

@Component({
    selector: "page-auth-otp",
    templateUrl: "auth-otp.html"
})

export class AuthOTP implements OnInit {

    @ViewChild(Loader)
    private loader: Loader;

    user: User;
    errorMessage: any;

    constructor(private authService: AuthService,
        private navParams: NavParams,
        private navCtrl: NavController,
        @Inject(APP_CONFIG) private config: AppConfig) { }

    submitOTP(user: User): void {
        this.loader.showLoader();
        this.authService.submitOTP(user)
            .subscribe(
            data => {
                this.authService.storeToken(data.token);
                this.authService.storeUserProfile(data.userInfo);
                this.navCtrl.setRoot(PlaceBooking, {
                    //config: this.config.FRESHENUP,
                    title: 'Home'
                });
                this.loader.dismissLoader();
            },
            error => {
                this.errorMessage = <any>error;
                this.loader.errorHandler(this.errorMessage);
                this.loader.dismissLoader();
            });
    }

    regenerateOTP(user: User): void {
        this.loader.showLoader();
        this.authService.regenerateOTP(user)
            .subscribe(
            data => {
                this.loader.dismissLoader();
            },
            error => {
                this.errorMessage = <any>error;
                this.loader.errorHandler(this.errorMessage);
                this.loader.dismissLoader();
            });
    }

    ngOnInit() {
        this.user = this.navParams.data.user;
    }

}