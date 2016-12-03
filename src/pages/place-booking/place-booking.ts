import { APP_CONFIG, AppConfig } from '../../app/app-config';
import { LuggageService } from '../../providers/luggage-service';
import { Component, Inject, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
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
  public errorMessage: string = '';
  private config: string;
  public loading: any;

  public autocomplete = {
    query: ''
  };

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private luggageService: LuggageService,
    public loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.config = this.navParams.data.config;
    this.title = this.navParams.data.title;
  }

  chooseItem(item: any): void {
    this.autocomplete.query = item.name;
    this.showList = false;
    this.getPlacesByCityAndPlaceType(item, this.config);
  }

  dismiss(): void {
    this.autocomplete.query = '';
    this.showList = false;
  }

  updateSearch(): void {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    this._setPlacePredictions();
  }

  _setPlacePredictions(): void {
    this.showList = true;
    this.luggageService.getCityByTag(this.autocomplete.query).subscribe(
      data => {
        this.autocompleteItems = data;
      },
      error => {
        error => this.errorMessage = <any>error;
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
        error => {
          this.errorMessage = <any>error;
          this.dismissLoader();
        }
      }
    )
  }

  goToPlaceDetail(event): void {
    this.navCtrl.push(PlaceDetail, {
      place: event.place,
      config: this.config
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
