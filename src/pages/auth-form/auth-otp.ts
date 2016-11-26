import { User } from './user';
import { AuthService } from '../../providers/auth-service';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LuggageBooking } from '../luggage-booking/luggage-booking';

@Component({
    selector: "page-auth-otp",
    templateUrl: "auth-otp.html"
})

export class AuthOTP implements OnInit {

    user: User;
    errorMessage: any;

    constructor(private authService: AuthService,
        private navParams: NavParams,
        private navCtrl: NavController) { }

    submitOTP(user: User): void {
        this.authService.submitOTP(user)
            .subscribe(
            data => {
                this.authService.storeToken(data.token);
                this.authService.storeUserProfile(data.userInfo);
                this.navCtrl.setRoot(LuggageBooking);
            },
            error => this.errorMessage = <any>error);
    }

    regenerateOTP(user: User): void {
        this.authService.regenerateOTP(user)
            .subscribe(
            data => {
                console.log("OTP is regenerated");
                console.log(data);
            },
            error => this.errorMessage = <any>error);
    }

    ngOnInit() {
        this.user = this.navParams.data.user;
    }

}