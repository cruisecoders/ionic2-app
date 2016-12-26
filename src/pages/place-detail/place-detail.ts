import { Loader } from '../../components/loader/loader';
import { PlaceLuggageForm } from '../../components/place-details/place-luggage-form/place-luggage-form';
import { PlaceConfirm } from '../place-confirm/place-confirm';
import { LuggageService } from '../../providers/luggage-service';
import { AuthService } from '../../providers/auth-service';
import { User } from '../auth-form/user';
import { APP_CONFIG, AppConfig } from '../../app/app-config';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'place-detail.html'
})
export class PlaceDetail implements OnInit {

  @ViewChild(PlaceLuggageForm)
  public placeLuggageForm: PlaceLuggageForm;

  @ViewChild(Loader)
  public loader: Loader;

  public place: any = {};
  public imgPath: string;
  public user: User;
  public dateLabel: string;
  public guestMsg: string;
  public roomLeftMsg: string;
  public booking: {};
  public errorMessage: any;

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    @Inject(APP_CONFIG) private config: AppConfig,
    private authService: AuthService,
    private luggageService: LuggageService,
    private viewCtrl: ViewController
  ) { this.imgPath = config.apiImgEndPoint; }

  ngOnInit() {
    this.place = this.navParams.data.place;
    this.changeLabelMsgs();
    this.loadUserProfile();
  }

  changeLabelMsgs(): void {
    if (this.navParams.data.config == this.config.FRESHENUP) {
      this.dateLabel = "Check-in Date";
      this.guestMsg = "Guest to take freshen up";
      this.roomLeftMsg = "Only " + this.place.rooms[0].reservedRooms + " rooms left";
    } else if (this.navParams.data.config == this.config.LUGGAGE) {
      this.dateLabel = "Luggage Booking Date";
      this.guestMsg = "Keep your luggage safely";
      this.roomLeftMsg = "Only " + this.place.rooms[0].reservedRooms + " places left";
    }
  }

  loadUserProfile(): void {
    this.user = this.authService.loaduserProfile();
  }

  getId(): number {
    return this.place.id;
  }

  dateChangedEvent(event): void {
    this.loader.showLoader();
    this.luggageService.getPlaceByIdAndOnDate(this.place.id, event.onDate).subscribe(
      data => {
        console.log("success");
        console.log(data);
        if (data == null || data == undefined || Object.keys(data).length === 0) {
          this.loader.manualErrorHandler("Hotel is not available on "+event.onDate.slice(0, 10));
          this.placeLuggageForm.notifyChild(false);
          this.loader.dismissLoader();
        } else {
          this.place = data;
          this.changeLabelMsgs();
          this.placeLuggageForm.notifyChild(true);
          this.loader.dismissLoader();
        }

      },
      error => {
        this.errorMessage = <any>error;
        this.loader.errorHandler(this.errorMessage);
        this.loader.dismissLoader();
      }
    )
  }

  confirmBooking(event): void {
    this.loader.showLoader();

    let guestName: string = this.user.firstName;
    let guestNumber: number = this.user.number;

    if (event.updatedUser.name != '' && event.updatedUser.number != 0) {
      guestName = event.updatedUser.name;
      guestNumber = event.updatedUser.number;
    }

    this.booking = {
      userId: this.user.id,
      guestName: guestName,
      number: guestNumber,
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
