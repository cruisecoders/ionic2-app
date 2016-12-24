import { Loader } from '../loader/loader';
import { PlaceDetail } from '../../pages/place-detail/place-detail';
import { LuggageService } from '../../providers/luggage-service';
import { NavController, NavParams } from 'ionic-angular';
import { APP_CONFIG, AppConfig } from '../../app/app-config';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'place-list-item',
  templateUrl: 'place-list-item.html',
})
export class PlaceListItem implements OnInit {

  @ViewChild(Loader)
  private loader: Loader;

  public imgPath: string;
  public placeList: any[] = [];
  public errorMessage: any;
  public city: any;
  public config: string;

  constructor(
    @Inject(APP_CONFIG) private apiConfig: AppConfig,
    private luggageService: LuggageService,
    private navParams: NavParams,
    private navCtrl: NavController
  ) {
    this.imgPath = apiConfig.apiImgEndPoint;
  }

  ngOnInit() {
    this.config = this.navParams.data.config;
    this.city = this.navParams.data.city;
    this.getPlacesByCityAndPlaceType(this.city, this.config);
  }

  goToPlaceDetail(place) {
    this.navCtrl.push(PlaceDetail, {
      place: place,
      config: this.config
    });
  }

  getPlacesByCityAndPlaceType(city: any, placeType: string): void {
    this.loader.showLoader();
    this.luggageService.getPlacesByCityAndPlaceType(city, placeType).subscribe(
      data => {
        this.placeList = data;
        this.loader.dismissLoader();
        if (this.placeList.length == 0) {
          this.loader.showAlert("Ooops", "We do not serve in " + city.name + ". Try with different city");
          this.navCtrl.pop();
        }
      },
      error => {
        this.errorMessage = <any>error;
        this.loader.errorHandler(this.errorMessage);
        this.loader.dismissLoader();
      }
    )
  }
}
