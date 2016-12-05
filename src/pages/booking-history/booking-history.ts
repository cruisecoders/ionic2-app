import { PlaceConfirm } from '../place-confirm/place-confirm';
import { User } from '../auth-form/user';
import { AuthService } from '../../providers/auth-service';
import { APP_CONFIG, AppConfig } from '../../app/app-config';
import { LuggageService } from '../../providers/luggage-service';
import { Component, Inject, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'booking-history',
  templateUrl: 'booking-history.html'
})

export class BookingHistory implements OnInit {

  public showList: boolean = true;
  public title: string;
  public bookingList: any[] = [];
  errorMessage: any;
  public loading: any;
  public user: User;
  public imgPath: string;

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private luggageService: LuggageService,
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    private alertController: AlertController,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {
    this.imgPath = config.apiImgEndPoint;
  }

  ngOnInit() {
    this.loadUserProfile();
    this.title = this.navParams.data.title;
  }

  ionViewWillEnter() {
    this.getBookingsByUserId(this.user.id);
  }

  loadUserProfile(): void {
    this.user = this.authService.loaduserProfile();
  }

  chooseItem(item: any): void {
  }

  getBookingsByUserId(id): void {
    this.luggageService.getBookingsByUserId(id).subscribe(
      data => {
        this.bookingList = data;
      },
      error => {
        this.errorMessage = <any>error;
        this.errorHandler();
      }
    )
  }

  goToBookingDetail(booking): void {
    this.showLoader();
    this.navCtrl.push(PlaceConfirm, {
      booking: booking,
      title: "Booking : " + booking.id
    });
    this.dismissLoader();
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
