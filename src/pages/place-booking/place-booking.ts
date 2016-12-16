import { LuggageService } from '../../providers/luggage-service';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { PlaceDetail } from '../place-detail/place-detail';

@Component({
  selector: 'page-place-booking',
  templateUrl: 'place-booking.html'
})

export class PlaceBooking implements OnInit {

  public showList: boolean = false;
  public showWall: boolean = true;
  public title: string;
  public autocompleteItems: any[] = [];
  public cities: Array<{ id: number, name: String }>;
  public placeList: any[] = [];
  public errorMessage: any;
  private config: string;
  public loading: any;

  public autocomplete: { id: number, name: string } = { id: 0, name: "" };

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

  ionViewDidEnter(): void {

    this.cities = this.luggageService.loadCities();

    if (this.cities == null || this.cities == undefined || this.cities.length == 0) {
      this.showLoader();
      this.luggageService.getCities().subscribe(
        data => {
          this.cities = data;
          this.luggageService.setCities(this.cities);
          this.dismissLoader();
        },
        error => {
          this.errorMessage = <any>error;
          this.errorHandler();
          this.dismissLoader();
        }
      )
    }

  }

  chooseItem(item: any): void {
    this.autocomplete = Object.assign({}, item);
    this.showList = false;
    this.getPlacesByCityAndPlaceType(item, this.config);
  }

  dismiss(): void {
    this.autocomplete.name = '';
    this.autocomplete.id = 0;
    this.showList = false;
    this.placeList = [];
    this.showWall = true;
  }

  updateSearch(): void {
    if (this.autocomplete.name == '') {
      this.showList = false;
      this.showWall = true;
      this.autocompleteItems = [];
      this.placeList = [];
      return;
    }
    this.showList = true;
    this.autocompleteItems = this.filterItems(this.autocomplete.name, this.cities);
  }

  getPlacesByCityAndPlaceType(city: any, placeType: string): void {
    this.showLoader();
    this.luggageService.getPlacesByCityAndPlaceType(city, placeType).subscribe(
      data => {
        this.showWall = false;
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

  private filterItems(searchTerm, items): any {
    return items.filter((item) => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

  }

}
