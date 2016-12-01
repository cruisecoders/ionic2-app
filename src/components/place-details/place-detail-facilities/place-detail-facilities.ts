import { FacilityPipe } from '../../../pipes/facilityPipe';
import { Component, Input, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'place-detail-facilities',
  templateUrl: 'place-detail-facilities.html'
})
export class PlaceDetailFacilities implements OnInit {

  @Input() place: any;

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {

  }

}
