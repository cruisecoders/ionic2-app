import { APP_CONFIG, AppConfig } from '../../app/app-config';
import { User } from './user';
import { AuthService } from '../../providers/auth-service';
import { Component, Inject, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { PlaceBooking } from '../place-booking/place-booking';

@Component({
    selector: "page-auth-otp",
    templateUrl: "auth-otp.html"
})

export class AuthOTP implements OnInit {

    user: User;
    errorMessage: any;
    public loading: any;

    constructor(private authService: AuthService,
        private navParams: NavParams,
        private navCtrl: NavController,
        public loadingCtrl: LoadingController,
        @Inject(APP_CONFIG) private config: AppConfig) { }

    submitOTP(user: User): void {
        this.showLoader();
        this.authService.submitOTP(user)
            .subscribe(
            data => {
                this.authService.storeToken(data.token);
                this.authService.storeUserProfile(data.userInfo);
                this.navCtrl.setRoot(PlaceBooking, {
                    config: this.config.FRESHENUP,
                    title: 'Freshen up Booking'
                });
                this.dismissLoader();
            },
            error => error => {
                this.errorMessage = <any>error;
                this.dismissLoader();
            });
    }

    regenerateOTP(user: User): void {
        this.showLoader();
        this.authService.regenerateOTP(user)
            .subscribe(
            data => {
                this.dismissLoader();
            },
            error => error => {
                this.errorMessage = <any>error;
                this.dismissLoader();
            });
    }

    ngOnInit() {
        this.user = this.navParams.data.user;
    }

    private showLoader() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    }

    private dismissLoader() {
        this.loading.dismiss();
    }

}