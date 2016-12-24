import { Loader } from '../../components/loader/loader';
import { AuthOTP } from './auth-otp';
import { NavController } from 'ionic-angular';
import { User } from './user';
import { AuthService } from '../../providers/auth-service';
import { Component, ViewChild } from '@angular/core';
import 'rxjs/add/operator/catch';


@Component({
    selector: "page-auth-form",
    templateUrl: "auth-form.html"
})

export class AuthForm {

    @ViewChild(Loader)
    public loader: Loader;

    switch: string = 'login';
    user: User = new User();
    errorMessage: any;

    constructor(private authService: AuthService,
        private navCtrl: NavController,
        ) { }

    login(user: User): void {
        this.loader.showLoader();
        this.authService.login(user)
            .subscribe(
            user => {
                this.loader.dismissLoader();
                if (user.numberExist) {
                    this.goToOTP(user);
                } else {
                    this.loader.showAlert("Ooops", "Number is not registered. Please Signup");
                    this.switch = "signup";
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.loader.errorHandler(this.errorMessage);
                this.loader.dismissLoader();
            }

            );
    }

    signup(user: User): void {
        this.loader.showLoader();
        this.authService.signup(user)
            .subscribe(
            user => {
                this.loader.dismissLoader();
                if (user.numberExist) {
                    this.loader.showAlert("Ooops", "Number is already registered. Please Login");
                    this.switch = "login";
                } else {
                    this.goToOTP(this.user);
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.loader.errorHandler(this.errorMessage);
                this.loader.dismissLoader();
            });
    }

    goToOTP(user: User): void {
        this.navCtrl.push(AuthOTP, {
            user: user
        });
    }

}