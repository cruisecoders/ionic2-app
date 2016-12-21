import { PlaceListItem } from './place-list-item';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { LuggageService } from '../../providers/luggage-service';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: 'city-list.html'
})
export class CityList implements OnInit {

    public autocomplete: { id: number, name: string } = { id: 0, name: "" };
    public cities: Array<{ id: number, name: String }>;
    public errorMessage: any;
    public loading: any;
    public showList: boolean = false;
    public autocompleteItems: any[] = [];
    public config: string;

    constructor(private luggageService: LuggageService,
        public loadingCtrl: LoadingController,
        private alertController: AlertController,
        private navParams: NavParams,
        private navCtrl: NavController) {
    }

    ngOnInit() {
        this.config = this.navParams.data.config;
    }

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
        this.gotoPlaceListPage(this.autocomplete);
    }

    gotoPlaceListPage(item): void {
        this.navCtrl.push(PlaceListItem, {
            config: this.config,
            city: item
        });
    }

    dismiss(): void {
        this.autocomplete.name = '';
        this.autocomplete.id = 0;
        this.showList = false;
    }

    updateSearch(): void {
        if (this.autocomplete.name == '') {
            this.showList = false;
            return;
        }
        this.showList = true;
        this.autocompleteItems = this.filterItems(this.autocomplete.name, this.cities);
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