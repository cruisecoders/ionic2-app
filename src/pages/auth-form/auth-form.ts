import { AuthOTP } from './auth-otp';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { User } from './user';
import { AuthService } from '../../providers/auth-service';
import { Component } from '@angular/core';
import 'rxjs/add/operator/catch';


@Component({
    selector: "page-auth-form",
    templateUrl: "auth-form.html"
})

export class AuthForm {

    switch: string = 'login';
    user: User = new User();
    errorMessage: any;
    public loading: any;

    constructor(private authService: AuthService,
        private navCtrl: NavController,
        public loadingCtrl: LoadingController,
        private alertController: AlertController) { }

    login(user: User): void {
        this.showLoader();
        this.authService.login(user)
            .subscribe(
            user => {
                this.dismissLoader();
                if (user.numberExist) {
                    this.goToOTP(user);
                } else {
                    this.showAlert("Ooops", "Number is not registered. Please Signup");
                    this.switch = "signup";
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.errorHandler();
                this.dismissLoader();
            }

            );
    }

    signup(user: User): void {
        this.showLoader();
        this.authService.signup(user)
            .subscribe(
            user => {
                this.dismissLoader();
                if (user.numberExist) {
                    this.showAlert("Ooops", "Number is already registered. Please Login");
                    this.switch = "login";
                } else {
                    this.goToOTP(this.user);
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.errorHandler();
                this.dismissLoader();
            });
    }

    showAlert(title: string, subtitle: string): void {
        let alert = this.alertController.create({
            title: title,
            subTitle: subtitle,
            buttons: ['OK']
        });
        alert.present();
    }

    goToOTP(user: User): void {
        this.navCtrl.push(AuthOTP, {
            user: user
        });
    }

    private errorHandler() {
        if (this.errorMessage.data != undefined) {
            this.showAlert("Ooops", this.errorMessage.data);
        } else {
            this.showAlert("Ooops", "Something Wrong. Please try again.");
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