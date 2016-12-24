import { Loader } from '../../components/loader/loader';
import { LuggageService } from '../../providers/luggage-service';
import { AuthService } from '../../providers/auth-service';
import { User } from '../auth-form/user';
import { APP_CONFIG, AppConfig } from '../../app/app-config';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    templateUrl: 'place-confirm.html'
})
export class PlaceConfirm implements OnInit {

    @ViewChild(Loader)
    public loader: Loader;

    public imgPath: string;
    public user: User;
    public dateLabel: string;
    public guestMsg: string;
    public roomLeftMsg: string;
    public booking: { place: any };
    public errorMessage: any;
    public cancelActivity: string;
    public freshenupType: string;
    public luggageType: string;
    public title: string;

    constructor(
        private navParams: NavParams,
        private navCtrl: NavController,
        @Inject(APP_CONFIG) private config: AppConfig,
        private authService: AuthService,
        private luggageService: LuggageService
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
        this.loader.showLoader();
        this.luggageService.cancelBooking(this.booking).subscribe(
            data => {
                this.title = "Booking Cancelled : " + data.id;
                this.booking = data;
                this.loader.dismissLoader();
            },
            error => {
                this.errorMessage = <any>error;
                this.loader.errorHandler(this.errorMessage);
                this.loader.dismissLoader();
            }
        );
    }
}
