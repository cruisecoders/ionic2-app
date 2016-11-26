import { AuthOTP } from './auth-otp';
import { AlertController, NavController } from 'ionic-angular';
import { User } from './user';
import { AuthService } from '../../providers/auth-service';
import { Component } from '@angular/core';


@Component({
    selector: "page-auth-form",
    templateUrl: "auth-form.html"
})

export class AuthForm {

    switch: string = 'login';
    user: User = new User();
    errorMessage: any;

    constructor(private authService: AuthService,
        private navCtrl: NavController,
        private alertController: AlertController) { }

    login(user: User): void {
        this.authService.login(user)
            .subscribe(
            user => {
                if (user.numberExist) {
                    this.goToOTP(user);
                } else {
                    this.showAlert("Ooops", "Number is not registered. Please Signup");
                    this.switch = "signup";
                }
            },
            error => this.errorMessage = <any>error);
    }

    signup(user: User): void {
        this.authService.signup(user)
            .subscribe(
            user => {
                if (user.numberExist) {
                    this.showAlert("Ooops", "Number is already registered. Please Login");
                    this.switch = "login";
                } else {
                    this.goToOTP(this.user);
                }
            },
            error => this.errorMessage = <any>error);
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

}