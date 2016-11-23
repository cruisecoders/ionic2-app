import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'luggage-detail.html'
})
export class LuggageDetail implements OnInit {

  public place: any = {};

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.place = this.navParams.data.place;
  }

  getId() {
    return this.place.id;
  }

}
