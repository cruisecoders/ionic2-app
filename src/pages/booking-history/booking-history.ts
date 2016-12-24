import { Loader } from '../../components/loader/loader';
import { PlaceConfirm } from '../place-confirm/place-confirm';
import { User } from '../auth-form/user';
import { AuthService } from '../../providers/auth-service';
import { APP_CONFIG, AppConfig } from '../../app/app-config';
import { LuggageService } from '../../providers/luggage-service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'booking-history',
  templateUrl: 'booking-history.html'
})

export class BookingHistory implements OnInit {

  @ViewChild(Loader)
  public loader: Loader;

  public showList: boolean = true;
  public title: string;
  public bookingList: any[] = [];
  errorMessage: any;
  public user: User;
  public imgPath: string;

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private luggageService: LuggageService,
    public authService: AuthService,
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
    this.loader.showLoader();
    this.luggageService.getBookingsByUserId(id).subscribe(
      data => {
        this.bookingList = data;
        this.loader.dismissLoader();
      },
      error => {
        this.errorMessage = <any>error;
        this.loader.errorHandler(this.errorMessage);
        this.loader.dismissLoader();
      }
    )
  }

  goToBookingDetail(booking): void {
    this.loader.showLoader();
    this.navCtrl.push(PlaceConfirm, {
      booking: booking,
      title: "Booking : " + booking.id
    });
    this.loader.dismissLoader();
  }
}
