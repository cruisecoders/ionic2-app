import { PlaceConfirm } from '../place-confirm/place-confirm';
import { User } from '../auth-form/user';
import { AuthService } from '../../providers/auth-service';
import { APP_CONFIG, AppConfig } from '../../app/app-config';
import { LuggageService } from '../../providers/luggage-service';
import { Component, Inject, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { PlaceDetail } from '../place-detail/place-detail';

@Component({
  selector: 'booking-history',
  templateUrl: 'booking-history.html'
})

export class BookingHistory implements OnInit {

  public showList: boolean = true;
  public title: string;
  public bookingList: any[] = [];
  public errorMessage: string = '';
  public loading: any;
  public user: User;
  public imgPath: string;

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private luggageService: LuggageService,
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    @Inject(APP_CONFIG) private config: AppConfig,
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
        error => this.errorMessage = <any>error;
      }
    )
  }

  goToBookingDetail(booking): void {
    this.navCtrl.push(PlaceConfirm, {
      booking: booking,
      title: "Booking : " + booking.id
    });
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
