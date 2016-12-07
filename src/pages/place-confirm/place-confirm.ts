import { LuggageService } from '../../providers/luggage-service';
import { AuthService } from '../../providers/auth-service';
import { User } from '../auth-form/user';
import { APP_CONFIG, AppConfig } from '../../app/app-config';
import { Component, Inject, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';

@Component({
    templateUrl: 'place-confirm.html'
})
export class PlaceConfirm implements OnInit {

    public imgPath: string;
    public user: User;
    public dateLabel: string;
    public guestMsg: string;
    public roomLeftMsg: string;
    public booking: { place: any };
    public errorMessage: any;
    public cancelActivity: string;
    public loading: any;
    public freshenupType: string;
    public luggageType: string;
    public title: string;

    constructor(
        private navParams: NavParams,
        private navCtrl: NavController,
        @Inject(APP_CONFIG) private config: AppConfig,
        private authService: AuthService,
        private luggageService: LuggageService,
        public loadingCtrl: LoadingController,
        private alertController: AlertController
    ) {
        this.imgPath = config.apiImgEndPoint;
        this.cancelActivity = config.Checkin_Date_Cancelled;
        this.freshenupType = config.FRESHENUP;
        this.luggageType = config.LUGGAGE;
    }

    ngOnInit() {
        this.booking = this.navParams.data.booking;
        this.title = this.navParams.data.title;
        this.loadUserProfile();
    }

    loadUserProfile(): void {
        this.user = this.authService.loaduserProfile();
    }

    cancelBooking(event): void {
        this.showLoader();
        this.luggageService.cancelBooking(this.booking).subscribe(
            data => {
                this.title = "Booking Cancelled : " + data.id;
                this.booking = data;
                this.dismissLoader();
            },
            error => {
                this.errorMessage = <any>error;
                this.errorHandler();
                this.dismissLoader();
            }
        );
    }

    private errorHandler() {
        if (this.errorMessage.data != undefined) {
            this.showAlert("Ooops", this.errorMessage.data);
        } else {
            this.showAlert("Ooops", "Please check your internet connection");
        }
    }

    showAlert(title: string, subtitle: string): void {
        let alert = this.alertController.create({
            title: title,
            subTitle: subtitle,
            buttons: ['OK']
        });
        alert.present();
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
