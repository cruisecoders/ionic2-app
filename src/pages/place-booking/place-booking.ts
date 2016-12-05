import { LuggageService } from '../../providers/luggage-service';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { PlaceDetail } from '../place-detail/place-detail';

@Component({
  selector: 'page-place-booking',
  templateUrl: 'place-booking.html'
})

export class PlaceBooking implements OnInit {

  public showList: boolean = true;
  public title: string;
  public autocompleteItems: any[] = [];
  public placeList: any[] = [];
  public errorMessage: any;
  private config: string;
  public loading: any;

  public autocomplete:  {id:number, name:string } = {id:0, name : ""};

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private luggageService: LuggageService,
    public loadingCtrl: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.config = this.navParams.data.config;
    this.title = this.navParams.data.title;
  }

/*  ionViewWillEnter() {
    if(this.autocomplete.name != ""){
      this.getPlacesByCityAndPlaceType(this.autocomplete, this.config);
    }
  }*/

  chooseItem(item: any): void {
    this.autocomplete = item;
    this.showList = false;
    this.getPlacesByCityAndPlaceType(item, this.config);
  }

  dismiss(): void {
    this.autocomplete.name = '';
    this.showList = false;
  }

  updateSearch(): void {
    if (this.autocomplete.name == '') {
      this.autocompleteItems = [];
      return;
    }
    this._setPlacePredictions();
  }

  _setPlacePredictions(): void {
    this.showList = true;
    this.luggageService.getCityByTag(this.autocomplete.name).subscribe(
      data => {
        this.autocompleteItems = data;
      },
      error => {
        this.errorMessage = <any>error;
        this.errorHandler();
      }
    )
  }

  getPlacesByCityAndPlaceType(city: any, placeType: string): void {
    this.showLoader();
    this.luggageService.getPlacesByCityAndPlaceType(city, placeType).subscribe(
      data => {
        this.placeList = data;
        this.dismissLoader();
      },
      error => {
        this.errorMessage = <any>error;
        this.errorHandler();
        this.dismissLoader();
      }
    )
  }

  goToPlaceDetail(event): void {
    this.navCtrl.push(PlaceDetail, {
      place: event.place,
      config: this.config
    });
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
