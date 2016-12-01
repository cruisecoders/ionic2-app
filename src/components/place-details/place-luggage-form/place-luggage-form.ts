import { User } from '../../../pages/auth-form/user';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'place-luggage-form',
  templateUrl: 'place-luggage-form.html'
})
export class PlaceLuggageForm implements OnInit {

  @Input() place: any;
  @Input() dateLabel: String;
  @Input() user: User;

  currentDate: Date = new Date();
  startDate: String = this.currentDate.toISOString();
  selDate: String = this.currentDate.toISOString();
  endDate: String = this.getDate();
  selectedRate: any = new Object();

  guestMsg: string = "";
  placeLeftMsg: string = "";

  constructor() {
  }

  getDate(): String {
    let d = new Date();
    d.setMonth(d.getMonth() + 3);
    return d.toISOString();
  }

  onSelect(i, rate) {
    this.selectedRate = rate;
  }

  ngOnInit() {
    this.selectedRate = this.place.rates[0];
    this.guestMsg = "Guest to take freshen up";
    this.placeLeftMsg = "Only " + this.place.reservedRooms + " rooms left";
  }


}
