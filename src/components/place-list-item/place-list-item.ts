import { PlaceDetail } from '../../pages/place-detail/place-detail';
import { LuggageService } from '../../providers/luggage-service';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { APP_CONFIG, AppConfig } from '../../app/app-config';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'place-list-item',
  templateUrl: 'place-list-item.html',
})
export class PlaceListItem implements OnInit {

  public imgPath: string;
  public placeList: any[] = [];
  public errorMessage: any;
  public loading: any;
  public city: any;
  public config: string;

  constructor(
    @Inject(APP_CONFIG) private apiConfig: AppConfig,
    public loadingCtrl: LoadingController,
    private alertController: AlertController,
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
    this.showLoader();
    this.luggageService.getPlacesByCityAndPlaceType(city, placeType).subscribe(
      data => {
        this.placeList = data;
        this.dismissLoader();
        if(this.placeList.length == 0){
          this.showAlert("Ooops", "We do not serve in "+ city.name + ". Try with different city");
        }
      },
      error => {
        this.errorMessage = <any>error;
        this.errorHandler();
        this.dismissLoader();
      }
    )
  }

  private errorHandler() {
    if (this.errorMessage.data != undefined) {
      this.showAlert("Ooops", this.errorMessage.data);
    } else {
      this.showAlert("Ooops", "Please check your internet connection");
    }
  }

  private showAlert(title: string, subtitle: string): void {
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
