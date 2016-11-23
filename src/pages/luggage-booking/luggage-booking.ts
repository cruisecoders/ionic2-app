import { Component, OnInit, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LuggageDetail } from '../luggage-detail/luggage-detail';

declare var google: any;

@Component({
  selector: 'page-luggage-booking',
  templateUrl: 'luggage-booking.html'
})
export class LuggageBooking implements OnInit {
  
  public showList: boolean = true;

  public autocompleteItems: any[] = [];
  public placeList: any[] = [];


  public autocomplete = {
    query: ''
  };

  private service = new google.maps.places.AutocompleteService();

  constructor(
    private navCtrl: NavController,
    private zone: NgZone
  ) { }

  ngOnInit() {

  }

  chooseItem(item: any) {
    this.autocomplete.query = item.description;
    this.showList = false;

    this.getPlaces(item);
  }

  getPlaces(place) {

    this.placeList = [
      {
        id : 1,
        name: "Bag2Bag Hotel yogiraj",
        tagLine1: "Enjoy darshan with yogiraj",
        tagLine2: "1 Km from Saibaba mandir",
        img: "assets/images/places/6.jpg",
        rate: 100,
        address: "xyz sjh jsdhj jshdj aiji"
      },
      {
        id : 2,
        name: "Bag2Bag Hotel Sun and Shine",
        tagLine1: "Enjoy darshan with Sun and Shine",
        tagLine2: "1 Km from Saibaba mandir",
        img: "assets/images/places/2.jpg",
        rate: 100,
        address: "xyz sjh jsdhj jshdj aiji"
      },
      {
        id : 3,
        name: "Bag2Bag Hotel Sai Palace",
        tagLine1: "Enjoy darshan with Sai Palace",
        tagLine2: "1 Km from Saibaba mandir",
        img: "assets/images/places/3.jpg",
        rate: 100,
        address: "xyz sjh jsdhj jshdj aiji"
      },
      {
        id : 4,
        name: "Bag2Bag Hotel Saish",
        tagLine1: "Enjoy darshan with Saish",
        tagLine2: "1 Km from Saibaba mandir",
        img: "assets/images/places/4.jpg",
        rate: 100,
        address: "xyz sjh jsdhj jshdj aiji"
      },
      {
        id : 5,
        name: "Bag2Bag Hotel Disha",
        tagLine1: "Enjoy darshan with Disha",
        tagLine2: "1 Km from Saibaba mandir",
        img: "assets/images/places/5.jpg",
        rate: 100,
        address: "xyz sjh jsdhj jshdj aiji"
      }

    ]

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

  _setPlacePredictions() {
    this.showList = true;
    let me = this;
    this.service.getPlacePredictions({
      input: this.autocomplete.query,
      componentRestrictions: { country: 'IN' }
    },
      function (predictions, status) {
        me.autocompleteItems = [];
        me.zone.run(function () {
          predictions.forEach(function (prediction) {
            me.autocompleteItems.push(prediction);
          });
        });
      });
  }

  goToPlaceDetail(event) {
    this.navCtrl.push(LuggageDetail, {
      place: event.place
    });
  }

}
