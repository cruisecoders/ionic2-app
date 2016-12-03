import { User } from '../../../pages/auth-form/user';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'place-luggage-form',
  templateUrl: 'place-luggage-form.html'
})
export class PlaceLuggageForm implements OnInit {

  @Input() place: any;
  @Input() dateLabel: String;
  @Input() user: User;
  @Input() guestMsg: string;
  @Input() roomLeftMsg: string;
  @Output() clicked: EventEmitter<any> = new EventEmitter();

  currentDate: Date = new Date();
  startDate: String = this.currentDate.toISOString();
  selDate: String = this.currentDate.toISOString();
  endDate: String = this.getDate();
  selectedRate: any = new Object();

  constructor() {
  }

  ngOnInit() {
    this.selectedRate = this.place.rates[0];
  }

  getDate(): String {
    let d = new Date();
    d.setMonth(d.getMonth() + 3);
    return d.toISOString();
  }

  goToPlaceDetail() {
    this.clicked.emit({ place: this.place });
  }

  onSelect(i, rate) {
    this.selectedRate = rate;
  }

  confirmBooking() {
    this.clicked.emit({ rate: this.selectedRate, date: this.selDate });
  }

}
