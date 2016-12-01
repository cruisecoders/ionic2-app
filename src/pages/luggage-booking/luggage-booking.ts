import { APP_CONFIG, AppConfig } from '../../app/app-config';
import { LuggageService } from '../../providers/luggage-service';
import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LuggageDetail } from '../luggage-detail/luggage-detail';

@Component({
  selector: 'page-luggage-booking',
  templateUrl: 'luggage-booking.html'
})

export class LuggageBooking implements OnInit {

  public showList: boolean = true;
  public autocompleteItems: any[] = [];
  public placeList: any[] = [];
  public errorMessage: string = '';

  public autocomplete = {
    query: ''
  };

  constructor(
    private navCtrl: NavController,
    private luggageService: LuggageService,
    @Inject(APP_CONFIG) private config: AppConfig
  ) { }

  ngOnInit() {

  }

  chooseItem(item: any) {
    this.autocomplete.query = item.name;
    this.showList = false;
    this.getPlacesByCityAndPlaceType(item, this.config.FRESHENUP);
  }

  dismiss() {
    this.autocomplete.query = '';
    this.showList = false;
  }

  updateSearch() {
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
    this.luggageService.getPlacesByCityAndPlaceType(city, placeType).subscribe(
      data => {
        this.placeList = data;
      },
      error => {
        error => this.errorMessage = <any>error;
      }
    )
  }

  goToPlaceDetail(event) {
    this.navCtrl.push(LuggageDetail, {
      place: event.place
    });
  }
}
