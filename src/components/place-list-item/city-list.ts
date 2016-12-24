import { Loader } from '../loader/loader';
import { PlaceListItem } from './place-list-item';
import { NavController, NavParams } from 'ionic-angular';
import { LuggageService } from '../../providers/luggage-service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    templateUrl: 'city-list.html'
})
export class CityList implements OnInit {

    @ViewChild(Loader)
    private loader: Loader;

    public autocomplete: { id: number, name: string } = { id: 0, name: "" };
    public cities: Array<{ id: number, name: String }>;
    public errorMessage: any;
    public showList: boolean = false;
    public autocompleteItems: any[] = [];
    public config: string;

    constructor(private luggageService: LuggageService,
        private navParams: NavParams,
        private navCtrl: NavController) {
    }

    ngOnInit() {
        this.config = this.navParams.data.config;
    }

    ionViewDidEnter(): void {

        this.cities = this.luggageService.loadCities();

        if (this.cities == null || this.cities == undefined || this.cities.length == 0) {
            this.loader.showLoader();
            this.luggageService.getCities().subscribe(
                data => {
                    this.cities = data;
                    this.luggageService.setCities(this.cities);
                    this.loader.dismissLoader();
                },
                error => {
                    this.errorMessage = <any>error;
                    this.loader.errorHandler(this.errorMessage);
                    this.loader.dismissLoader();
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

    private filterItems(searchTerm, items): any {
        return items.filter((item) => {
            return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });

    }
}