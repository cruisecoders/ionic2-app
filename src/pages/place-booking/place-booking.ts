import { CityList } from '../../components/place-list-item/city-list';
import { APP_CONFIG, AppConfig } from '../../app/app-config';
import { Component, Inject, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-place-booking',
  templateUrl: 'place-booking.html'
})

export class PlaceBooking implements OnInit {

  public title: string;
  public appConfig: any;

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    @Inject(APP_CONFIG) public apiConfig: AppConfig
  ) {
    this.appConfig = apiConfig;
  }

  gotoCityPage(config): void {
    this.navCtrl.push(CityList, {
      config: config
    });
  }

  ngOnInit() {
    this.title = this.navParams.data.title;
  }


}
