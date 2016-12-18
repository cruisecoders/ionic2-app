import { APP_CONFIG, AppConfig } from '../../app/app-config';
import { User } from './user';
import { AuthService } from '../../providers/auth-service';
import { Component, Inject, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
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
        @Inject(APP_CONFIG) private config: AppConfig,
        private alertController: AlertController) { }

    submitOTP(user: User): void {
        this.showLoader();
        this.authService.submitOTP(user)
            .subscribe(
            data => {
                this.authService.storeToken(data.token);
                this.authService.storeUserProfile(data.userInfo);
                this.navCtrl.setRoot(PlaceBooking, {
                    //config: this.config.FRESHENUP,
                    title: 'Home'
                });
                this.dismissLoader();
            },
            error => {
                this.errorMessage = <any>error;
                this.errorHandler();
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
            error => {
                this.errorMessage = <any>error;
                this.errorHandler();
                this.dismissLoader();
            });
    }

    ngOnInit() {
        this.user = this.navParams.data.user;
    }

    showAlert(title: string, subtitle: string): void {
        let alert = this.alertController.create({
            title: title,
            subTitle: subtitle,
            buttons: ['OK']
        });
        alert.present();
    }

    private errorHandler() {
        if (this.errorMessage.data != undefined) {
            this.showAlert("Ooops", this.errorMessage.data);
        } else {
            this.showAlert("Ooops", "Please check your internet connection");
        }
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