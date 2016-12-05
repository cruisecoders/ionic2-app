import { PlaceConfirm } from '../place-confirm/place-confirm';
import { LuggageService } from '../../providers/luggage-service';
import { AuthService } from '../../providers/auth-service';
import { User } from '../auth-form/user';
import { APP_CONFIG, AppConfig } from '../../app/app-config';
import { Component, Inject, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'place-detail.html'
})
export class PlaceDetail implements OnInit {

  public place: any = {};
  public imgPath: string;
  public user: User;
  public dateLabel: string;
  public guestMsg: string;
  public roomLeftMsg: string;
  public booking: {};
  public errorMessage: any;
  public loading: any;

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    @Inject(APP_CONFIG) private config: AppConfig,
    private authService: AuthService,
    private luggageService: LuggageService,
    public loadingCtrl: LoadingController,
    private alertController: AlertController,
    private viewCtrl: ViewController
  ) { this.imgPath = config.apiImgEndPoint; }

  ngOnInit() {
    this.place = this.navParams.data.place;
    if (this.navParams.data.config == this.config.FRESHENUP) {
      this.dateLabel = "Check-in Date";
      this.guestMsg = "Guest to take freshen up";
      this.roomLeftMsg = "Only " + this.place.reservedRooms + " rooms left";
    } else if (this.navParams.data.config == this.config.LUGGAGE) {
      this.dateLabel = "Luggage Booking Date";
      this.guestMsg = "Keep your luggage safely";
      this.roomLeftMsg = "Only " + this.place.reservedRooms + " places left";
    }
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.user = this.authService.loaduserProfile();
  }

  getId(): number {
    return this.place.id;
  }

  confirmBooking(event): void {
    this.showLoader();

    this.booking = {
      userId: this.user.id,
      number: this.user.number,
      payment: { paymentMode: this.config.COD, rateType: event.rate.type, payAmount: event.rate.rate, payStatus: this.config.Pending },
      place: this.place,
      bookingDate: event.date,
      bookingActivity: this.config.Checkin_Date_Pending
    }

    this.luggageService.submitBooking(this.booking).subscribe(
      data => {
        //this.navCtrl.pop();

        this.navCtrl.push(PlaceConfirm, {
          booking: data,
          config: this.navParams.data.config,
          title: "Booked Successfully : " + data.id
        }).then(() => {
          // first we find the index of the current view controller:
          const index = this.viewCtrl.index;
          // then we remove it from the navigation stack
          this.navCtrl.remove(index);
        });
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
      this.showAlert("Ooops", "Something Wrong. Please try again.");
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
